import * as THREE from 'three';
import { TextureSet, TextureType } from '../config/types';

export default class TextureManager {
	readonly textureSets: Map<string, TextureSet>;
	readonly loader: THREE.TextureLoader;

	constructor(readonly loadingManager: THREE.LoadingManager) {
		this.textureSets = new Map();
		this.loader = new THREE.TextureLoader(loadingManager);
	}

	public preload(
		texturesToLoad: { name: string; path: string; type: TextureType }[]
	) {
		// add missing texture
		texturesToLoad.push({
			name: 'missing',
			path: 'static/textures/missing.png',
			type: 'color',
		});

		let loadedCount = 0;
		const total = texturesToLoad.length;

		texturesToLoad.forEach(({ name, path, type }) => {
			// Extract base name without type suffix
			const baseName = name.split('_')[0];

			this.loader.load(path, (texture) => {
				// Create the texture set if it doesn't exist
				if (!this.textureSets.has(baseName)) {
					this.textureSets.set(baseName, {});
				}

				// Get the current texture set
				const textureSet = this.textureSets.get(baseName)!;

				// Add this texture to the appropriate property in the set
				if (textureSet) textureSet[type] = texture;

				// For normal maps, set the appropriate encoding
				if (type === 'normal') {
					// texture.encoding = THREE.LinearEncoding;
				}

				loadedCount++;
			});
		});
	}

	// Get the full texture set
	public getTextureSet(name: string): TextureSet {
		const textureSet = this.textureSets.get(name);
		if (!textureSet) {
			console.log(`No texture set found for ${name}`);
			return this.textureSets.get('missing')!;
		}
		return textureSet;
	}

	// Get a specific texture from a set
	public getTexture(
		name: string,
		type: TextureType = 'color'
	): THREE.Texture | null {
		const textureSet = this.textureSets.get(name);
		if (!textureSet || !textureSet[type]) {
			console.log(`No ${type} texture found for ${name}`);
			return null;
		}
		return textureSet[type]!;
	}

	// Direct access to normal map
	public getNormalMap(name: string): THREE.Texture | null {
		return this.getTexture(name, 'normal');
	}
}
