import * as THREE from 'three';
import App from '../app';
import GUI from 'lil-gui';

export default class Tree extends THREE.Group {
	constructor(readonly app: App, readonly parentFolder?: GUI) {
		super();

		const trunkGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.8);
		const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
		const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
		trunk.position.set(0, 0.4, 0);
		trunk.castShadow = true;
		this.add(trunk);

		const topGeometry = new THREE.CylinderGeometry(0.2, 0.6, 1.4);
		const topMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
		// topMaterial.transparent = true;
		// topMaterial.opacity = 0.9;
		// topMaterial.flatShading = false;
		// topMaterial.metalness = 0.9;
		// topMaterial.roughness = 0.9;

		const top = new THREE.Mesh(topGeometry, topMaterial);
		top.position.set(0, 1.5, 0);
		this.add(top);
		// top.castShadow = true; // Enable shadow casting for the top

		top.castShadow = true;
		app.scene.add(this);

		this.position.set(2, 0, 2);
	}
}
