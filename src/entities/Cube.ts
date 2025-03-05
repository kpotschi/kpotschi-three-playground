import * as THREE from 'three';
import App from '../app';
import GUI from 'lil-gui';

export default class Cube extends THREE.Mesh {
	readonly size: number = 2;
	declare material: THREE.MeshStandardMaterial;

	constructor(readonly app: App, readonly gui: GUI) {
		super();

		this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
		this.material = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			metalness: 0.5,
			roughness: 0.1,
			envMap: this.app.envMap, // Apply the environment map
		});
		this.position.set(-2, this.size / 2, 0);
		this.app.scene.add(this);
		this.addDebug();
	}

	private addDebug() {
		const folder = this.gui.addFolder('Cube');
		folder.addColor(this.material, 'color');
		folder.add(this.material, 'metalness', 0, 1);
		folder.add(this.material, 'roughness', 0, 1);
	}
}
