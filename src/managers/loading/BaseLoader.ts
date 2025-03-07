import * as THREE from 'three';
import { LoaderObject } from '../../config/types';
import CustomLoadingManager from './CustomLoadingManager';

export default class BaseLoader<T extends THREE.Texture> {
	readonly cache: Map<string, THREE.Texture>;

	constructor(private loader: THREE.Loader) {
		this.cache = (loader.manager as CustomLoadingManager).cache;
	}

	public preload(files: LoaderObject | LoaderObject[]): void {
		const filesToLoad = Array.isArray(files) ? files : [files];
		filesToLoad.forEach((file) => this.loadFile(file));
	}

	protected loadFile(file: LoaderObject): void {
		const textureLoader = this.loader as THREE.TextureLoader;
		const texture = textureLoader.load(
			file.path,
			(data: THREE.Texture) => {
				return data;
			},
			undefined,
			() => this.handleLoadError(file)
		);
		this.configureTexture(file.name, texture);

		this.cache.set(file.name, texture);
	}

	protected handleLoadError(file: LoaderObject): void {
		console.warn(`Failed to load texture: ${file.path}`);
		const missingTexture = this.cache.get('missing');
		if (missingTexture) {
			this.cache.set(file.name, missingTexture);
		}
	}

	protected configureTexture(name: string, texture: THREE.Texture): void {
		if (
			name.includes('color') ||
			name.includes('diffuse') ||
			name.includes('albedo')
		) {
			texture.colorSpace = THREE.SRGBColorSpace;
		}
	}
}
