import * as THREE from 'three';
import { RGBELoader } from 'three-stdlib';
import App from '../../app';
import BaseLoader from './BaseLoader';

export default class CustomLoadingManager extends THREE.LoadingManager {
	readonly cache: Map<string, THREE.Texture> = new Map();
	readonly textureLoader: BaseLoader<THREE.Texture>;
	readonly rgbeLoader: BaseLoader<THREE.Texture>;

	constructor(readonly app: App) {
		super();

		// loaders
		this.textureLoader = new BaseLoader(new THREE.TextureLoader(this));
		this.rgbeLoader = new BaseLoader(new RGBELoader(this));

		// events
		this.onStart = () => console.log('Loading started');
		this.onProgress = (url, itemsLoaded, itemsTotal) =>
			console.log(`Loading progress: ${itemsLoaded} / ${itemsTotal}`);
		this.onError = (url) => console.error(`Error loading ${url}`);

		// add missing texture to cache
		this.textureLoader.preload({
			name: 'missing',
			path: 'static/textures/missing.png',
		});
	}

	public preload() {
		this.textureLoader.preload([
			{
				name: 'fabric-color',
				path: 'static/textures/boucle-fabric-bubbly/color.jpg',
			},
			{
				name: 'sand-color',
				path: 'static/textures/GroundSand005/GroundSand005_COL_2K.jpg',
			},
			{
				name: 'sand-normal',
				path: 'static/textures/GroundSand005/GroundSand005_NRM_2K.jpg',
			},
			{
				name: 'sand-bump',
				path: 'static/textures/GroundSand005/GroundSand005_BUMP_2K.jpg',
			},
			{
				name: 'sand-ao',
				path: 'static/textures/GroundSand005/GroundSand005_AO_2K.jpg',
			},
			{
				name: 'towel-color',
				path: 'static/textures/TowelCotton001/TowelCotton001_COL_1K_METALNESS.png',
			},
			{
				name: 'towel-normal',
				path: 'static/textures/TowelCotton001/TowelCotton001_NRM_1K_METALNESS.png',
			},
		]);

		this.rgbeLoader.preload({
			name: 'env-map',
			path: 'static/env-maps/spruit_sunrise_1k.hdr',
		});
	}

	public getTexture(name: string): THREE.Texture {
		const texture = this.cache.get(name);
		if (!texture) {
			console.log(`No texture found for ${name}`);
			return this.cache.get('missing')!;
		}
		return texture;
	}
}

// // Get a specific texture from a set
// public getTexture(name: string): THREE.Texture {
// 	const texture = this.cache.get(name);
// 	if (!texture) {
// 		console.log(`No texture found for ${name}`);
// 		return this.cache.get('missing')!;
// 	}
// 	return texture;
// }
