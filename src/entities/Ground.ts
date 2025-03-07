import { GUI } from 'lil-gui';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';
import App from '../app';
import { texture } from 'three/tsl';
import { TextureSet } from '../config/types';

export default class Ground extends THREE.Mesh {
	readonly width: number = 2;
	declare material: THREE.MeshStandardMaterial;

	constructor(readonly app: App) {
		super();

		this.createGeometry();
		this.createMaterial();

		this.receiveShadow = true;

		// if (this.app.debug) this.addDebug(parentFolder);
		this.rotateX(-Math.PI / 2);
		this.position.set(0, -this.width / 2, 0);

		this.app.scene.add(this);
	}

	// private addDebug(parentFolder?: GUI) {
	// 	const groundFolder = (parentFolder || this.app.debug)?.addFolder('Ground');
	// 	if (groundFolder) {
	// 		groundFolder.addColor(this.material, 'color');
	// 		groundFolder.add(this.material, 'sheen', 0, 1);
	// 		groundFolder.addColor(this.material, 'sheenColor');
	// 		groundFolder.add(this.material, 'roughness', 0, 1);
	// 		groundFolder.add(this.material, 'metalness', 0, 1);
	// 	}
	// }

	private createGeometry() {
		// geometry
		this.geometry = new RoundedBoxGeometry(10, 10, 2, 3, 0.5);
		// this.geometry = new THREE.BoxGeometry(10, 10, 2);
	}

	private createMaterial() {
		// material
		this.material = new THREE.MeshStandardMaterial();
		// this.material.sheen = 1;
		// this.material.sheenColor = new THREE.Color(0x000000);

		const texture = this.app.loader.getTexture('fabric-color');
		// this.material.map = texture;
		texture.repeat.set(1, 1);
		texture.wrapS = THREE.RepeatWrapping;
		texture.wrapT = THREE.RepeatWrapping;
		// this.receiveShadow = true;
		// this.material.needsUpdate = true;
	}
}
