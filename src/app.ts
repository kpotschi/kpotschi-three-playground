import { GUI } from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Ball from './entities/Ball';
import Cube from './entities/Cube';
import Ground from './entities/Ground';
import Tree from './entities/Tree';
import LightManager from './managers/LightManager';
import LoadingManager from './managers/loading/CustomLoadingManager';
import CustomLoadingManager from './managers/loading/CustomLoadingManager';

export default class App {
	public scene: THREE.Scene;
	public renderer: THREE.WebGLRenderer;
	public camera: THREE.OrthographicCamera | THREE.PerspectiveCamera;
	readonly frustumSize = 20;
	public loader: CustomLoadingManager;
	private ground: Ground;
	private cube: Cube;
	private ball: Ball;
	private tree: Tree;
	public envMap: THREE.DataTexture;
	readonly debug: GUI | null = null;
	private lightManager: LightManager;

	constructor() {
		// debug

		if (window.location.hash === '#debug') this.debug = new GUI().close();

		this.loader = new LoadingManager(this);
		this.loader.preload();

		this.scene = new THREE.Scene();
		this.createRenderer();
		this.createCamera();
		this.lightManager = new LightManager(this);
		this.create();
		new OrbitControls(this.camera, this.renderer.domElement);
	}

	public create() {
		this.createLandscape();
		this.animate();
	}

	private animate() {
		this.cube.rotateY(0.01);
		// this.ball.position.z = Math.sin(Date.now() * 0.001) * 2;
		requestAnimationFrame(this.animate.bind(this));
		this.renderer.render(this.scene, this.camera);
	}

	private createRenderer() {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('app')?.appendChild(this.renderer.domElement);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1;
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		window.addEventListener('resize', () => {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			const newAspect = window.innerWidth / window.innerHeight;
			if (this.camera instanceof THREE.OrthographicCamera) {
				this.camera.left = (this.frustumSize * newAspect) / -2;
				this.camera.right = (this.frustumSize * newAspect) / 2;
				this.camera.top = this.frustumSize / 2;
				this.camera.bottom = this.frustumSize / -2;
			}
			this.camera.updateProjectionMatrix();
			this.renderer.render(this.scene, this.camera);
		});
	}

	private createCamera() {
		const aspectRatio = window.innerWidth / window.innerHeight;

		this.camera = new THREE.OrthographicCamera(
			(this.frustumSize * aspectRatio) / -2, // left
			(this.frustumSize * aspectRatio) / 2, // right
			this.frustumSize / 2, // top
			this.frustumSize / -2, // bottom
			0.1, // near
			1000 // far
		);
		this.camera.position.set(50, 30, -50);

		// this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
		// this.camera.position.set(12, 7, 0);

		this.camera.lookAt(0, 0, 0);

		this.scene.add(this.camera);
	}

	private createLandscape() {
		if (this.debug) {
			const folder = this.debug.addFolder('Landscape');
		}
		this.ground = new Ground(this);

		this.cube = new Cube(this);

		this.ball = new Ball(this);

		this.tree = new Tree(this);
	}
}

new App();
