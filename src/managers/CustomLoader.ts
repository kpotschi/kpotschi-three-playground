import * as THREE from 'three';
import App from '../app';
import TextureManager from './TextureManager';
import { RGBELoader } from 'three-stdlib';

export default class CustomLoader extends THREE.LoadingManager {
	constructor(readonly app: App) {
		super();
		this.onStart = () => console.log('Loading started');
		this.onLoad = () => this.app.create();
		this.onProgress = (url, itemsLoaded, itemsTotal) =>
			console.log(`Loading progress: ${itemsLoaded} / ${itemsTotal}`);
		this.onError = (url) => console.error(`Error loading ${url}`);
	}

	public preload() {
		this.app.textureManager.preload([
			{
				name: 'fabric',
				path: 'static/textures/fabric/BoucleFabricBubbly_BaseColor.jpg',
				type: 'color',
			},
			{
				name: 'fabric',
				path: 'static/textures/fabric/BoucleFabricBubbly_Normal.png',
				type: 'normal',
			},
			{
				name: 'fabric',
				path: 'static/textures/fabric/BoucleFabricBubbly_Roughness.jpg',
				type: 'roughness',
			},

			{
				name: 'gold-shimmer',
				path: 'static/textures/matcap/matcap-gold-shimmer.png',
				type: 'matcap',
			},
		]);

		new RGBELoader(this).load(
			'static/env-maps/spruit_sunrise_1k.hdr',
			(texture) => {
				texture.mapping = THREE.EquirectangularReflectionMapping;
				this.app.envMap = texture;
				// this.app.scene.environment = texture;
				// this.app.scene.background = texture;
			}
		);
	}
}
