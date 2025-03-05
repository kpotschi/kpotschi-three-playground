import * as THREE from 'three';
import App from '../app';
export default class Ball extends THREE.Mesh {
	readonly radius: number = 1;
	declare material: THREE.MeshMatcapMaterial;

	constructor(readonly app: App) {
		super();
		this.geometry = new THREE.SphereGeometry(this.radius, 32, 32);
		this.material = new THREE.MeshMatcapMaterial({ color: 0xffff00 });
		this.material.matcap =
			this.app.textureManager.getTextureSet('gold-shimmer')!.matcap!;

		this.position.set(2, this.radius, -1.5);

		this.app.scene.add(this);
	}
}
