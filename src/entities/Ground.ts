import { GUI } from 'lil-gui';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three-stdlib';
import App from '../app';
import { texture } from 'three/tsl';
import { TextureSet } from '../config/types';

export default class Ground extends THREE.Mesh {
	readonly width: number = 2;
	declare material: THREE.MeshPhysicalMaterial;

	constructor(readonly app: App, readonly folder: GUI) {
		super();

		this.createGeometry();
		this.createMaterial();

		this.addDebug(folder);
		this.rotateX(-Math.PI / 2);
		this.position.set(0, -this.width / 2, 0);

		this.app.scene.add(this);
	}

	private addDebug(folder: GUI) {
		const groundFolder = folder.addFolder('Ground');
		groundFolder.addColor(this.material, 'color');
		groundFolder.add(this.material, 'sheen', 0, 1);
		groundFolder.addColor(this.material, 'sheenColor');
		groundFolder.add(this.material, 'roughness', 0, 1);
		groundFolder.add(this.material, 'metalness', 0, 1);
	}
	private createGeometry() {
		// geometry
		this.geometry = new RoundedBoxGeometry(10, 10, 2, 3, 0.5);
	}

	private createMaterial() {
		// material
		this.material = new THREE.MeshPhysicalMaterial();
		this.material.sheen = 1;
		this.material.sheenColor = new THREE.Color(0x000000);

		const textureSet = this.app.textureManager.getTextureSet(
			'fabric'
		) as TextureSet;
		this.material.map = textureSet.diffuse!;
		this.material.normalMap = textureSet.normal!;
		this.material.roughnessMap = textureSet.roughness!;
		// this.material.displacementMap = textureSet.displacement;
		this.material.map.wrapS = THREE.RepeatWrapping;
		this.material.map.wrapT = THREE.RepeatWrapping;
		this.material.map.repeat.set(1, 1); // Adjust the repeat values as needed

		this.material.normalMap.wrapS = THREE.RepeatWrapping;
		this.material.normalMap.wrapT = THREE.RepeatWrapping;
		this.material.normalMap.repeat.set(1, 1); // Adjust the repeat values as needed

		this.material.roughnessMap.wrapS = THREE.RepeatWrapping;
		this.material.roughnessMap.wrapT = THREE.RepeatWrapping;
		this.material.roughnessMap.repeat.set(1, 1); // Adjust the repeat values as needed

		this.receiveShadow = true;
		this.material.needsUpdate = true;
	}
}
