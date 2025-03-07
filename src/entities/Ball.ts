import * as THREE from 'three';
import App from '../app';
import GUI from 'lil-gui';
export default class Ball extends THREE.Mesh {
	readonly radius: number = 1;
	declare material: THREE.MeshPhysicalMaterial;

	constructor(readonly app: App) {
		super();
		this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
		this.material = new THREE.MeshPhysicalMaterial({
			// color: new THREE.Color(0x5749ea),
			// roughness: 0.5,
			// metalness: 0,
			transmission: 1, // Allows light to pass through
			opacity: 1, // Fully visible
			transparent: true, // Enables transparency effects
			ior: 1.35, // Similar to jelly
			thickness: 1, // Helps with light scattering
		});

		// this.material.map = this.app.textureManager.getTexture('sand-color');
		this.material.normalMap = this.app.loader.getTexture('sand-normal');
		this.material.aoMap = this.app.loader.getTexture('sand-ao');
		this.material.aoMapIntensity = 3;
		this.material.bumpMap = this.app.loader.getTexture('sand-bump');
		this.position.set(2, 2, -2);

		this.castShadow = true;

		this.app.scene.add(this);

		this.addDebug();
	}

	private addDebug() {
		if (this.app.debug) {
			const folder = this.app.debug.addFolder('Ball');
			folder.addColor(this.material, 'color');
			folder.add(this.material, 'roughness', 0, 1);
			folder.add(this.material, 'metalness', 0, 1);
			folder.add(this.material, 'transmission', 0, 1);
			folder.add(this.material, 'opacity', 0, 1);
			folder.add(this.material, 'ior', 0, 3);
			folder.add(this.material, 'thickness');
		}
	}
}
