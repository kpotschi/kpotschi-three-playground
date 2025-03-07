import * as THREE from 'three';
import App from '../app';
import GUI from 'lil-gui';

export default class Cube extends THREE.Mesh {
	readonly size: number = 2;
	declare material: THREE.MeshStandardMaterial;

	constructor(readonly app: App) {
		super();

		this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
		this.material = new THREE.MeshStandardMaterial({
			color: 0xff0000,
			metalness: 0.18,
			roughness: 0.14,
			// envMap: this.app.envMap, // Apply the environment map
		});
		this.position.set(-2, this.size / 2, -2);
		this.app.scene.add(this);
		this.castShadow = true;

		if (this.app.debug) this.addDebug(this.app.debug);
	}

	private addDebug(debugFolder: GUI) {
		const folder = debugFolder.addFolder('Cube');
		folder.addColor(this.material, 'color');
		folder.add(this.material, 'metalness', 0, 1);
		folder.add(this.material, 'roughness', 0, 1);
	}
}
