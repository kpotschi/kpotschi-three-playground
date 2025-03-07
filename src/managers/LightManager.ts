import * as THREE from 'three';
import App from '../app';
import GUI from 'lil-gui';

export default class LightManager {
	private scene: THREE.Scene;
	private debugFolder: GUI;

	constructor(readonly app: App) {
		this.scene = app.scene;
		if (app.debug) this.debugFolder = app.debug.addFolder('Lighting');

		this.createAmbientLight();
		this.createDirectionalLight();
		this.createPointLight();
		this.createSpotLight();
	}

	private createPointLight() {
		const pointLight = new THREE.PointLight(0xf4a499, 10);
		pointLight.position.set(-2, 1, -4.5);
		pointLight.lookAt(0, 0, 0);
		pointLight.castShadow = true;
		this.scene.add(pointLight);

		if (this.app.debug) {
			const pointLightFolder = this.debugFolder.addFolder('Point Light');
			pointLightFolder.add(pointLight.position, 'x', -20, 20);
			pointLightFolder.add(pointLight.position, 'y', 0, 20);
			pointLightFolder.add(pointLight.position, 'z', -20, 20);
			pointLightFolder.add(pointLight, 'intensity', 0, 10);
			pointLightFolder.addColor(pointLight, 'color');
			const pointLightHelper = new THREE.PointLightHelper(pointLight);
			this.scene.add(pointLightHelper);
		}
	}
	private createSpotLight() {
		const spotLight = new THREE.SpotLight(0xffcf50, 8);
		spotLight.position.set(4, 4, 4);
		spotLight.target.position.set(2, 0, 2);
		spotLight.angle = Math.PI / 8;
		spotLight.penumbra = 0.18;
		spotLight.decay = 1;
		spotLight.castShadow = true;

		this.scene.add(spotLight);
		this.scene.add(spotLight.target);

		if (this.app.debug) {
			const spotLightFolder = this.debugFolder.addFolder('Spot Light');
			spotLightFolder.add(spotLight.position, 'x', 0, 100);
			spotLightFolder.add(spotLight.position, 'y', 0, 100);
			spotLightFolder.add(spotLight.position, 'z', 0, 100);
			spotLightFolder.add(spotLight, 'intensity', 0, 10);
			spotLightFolder.add(spotLight, 'angle', 0, Math.PI / 2);
			spotLightFolder.add(spotLight, 'penumbra', 0, 1);
			spotLightFolder.addColor(spotLight, 'color');

			const spotLightHelper = new THREE.SpotLightHelper(spotLight);
			this.scene.add(spotLightHelper);
		}
	}
	private createDirectionalLight() {
		const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
		directionalLight.position.set(0, 5, 0);
		directionalLight.castShadow = true;
		directionalLight.shadow.mapSize.width = 1024;
		directionalLight.shadow.mapSize.height = 1024;
		directionalLight.shadow.camera.far = 10;
		this.app.scene.add(directionalLight);

		if (this.app.debug) {
			const directionalLightFolder =
				this.debugFolder.addFolder('Directional Light');
			directionalLightFolder.add(directionalLight.position, 'x', 0, 100);
			directionalLightFolder.add(directionalLight.position, 'y', 0, 100);
			directionalLightFolder.add(directionalLight.position, 'z', 0, 100);
			directionalLightFolder.add(directionalLight, 'intensity', 0, 1);
			directionalLightFolder.addColor(directionalLight, 'color');
			const directionalLightHelper = new THREE.DirectionalLightHelper(
				directionalLight
			);
			this.scene.add(directionalLightHelper);
			const shadowCameraHelper = new THREE.CameraHelper(
				directionalLight.shadow.camera
			);
			this.scene.add(shadowCameraHelper);
		}
	}

	private createAmbientLight() {
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		this.app.scene.add(ambientLight);

		if (this.app.debug) {
			const ambientLightFolder = this.debugFolder.addFolder('Ambient Light');
			ambientLightFolder.add(ambientLight, 'intensity', 0, 1);
			ambientLightFolder.addColor(ambientLight, 'color');
		}
	}
}
