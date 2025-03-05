import { GUI } from 'lil-gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Ground from './entities/Ground';
import TextureManager from './managers/TextureManager';
import CustomLoader from './managers/CustomLoader';
import Ball from './entities/Ball';
import Cube from './entities/Cube';
import Tree from './entities/Tree';

export default class App {
	public scene: THREE.Scene;
	public renderer: THREE.WebGLRenderer;
	public camera: THREE.OrthographicCamera;
	public gui: GUI;
	public textureManager: TextureManager;
	readonly frustumSize = 20;
	private loader: CustomLoader;
	private ground: Ground;
	private cube: Cube;
	private ball: Ball;
	private tree: Tree;
	public envMap: THREE.DataTexture;

	constructor() {
		this.loader = new CustomLoader(this);
		this.textureManager = new TextureManager(this.loader);
		this.scene = new THREE.Scene();
		this.gui = new GUI();
		this.createRenderer();
		this.createCamera();
		this.createLighting();
		this.loader.preload();
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

	private createLighting() {
		const folder = this.gui.addFolder('Lighting');

		// ambientLight
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		const ambientLightFolder = folder.addFolder('Ambient Light');
		ambientLightFolder.add(ambientLight, 'intensity', 0, 1);
		ambientLightFolder.addColor(ambientLight, 'color');
		this.scene.add(ambientLight);

		// pointLight
		const pointLightFolder = folder.addFolder('Point Light');
		const pointLight = new THREE.PointLight(0xffffff, 140);
		pointLight.position.set(4, 16, 0);
		pointLight.lookAt(0, 0, 0);

		pointLightFolder.add(pointLight.position, 'x', 0, 100);
		pointLightFolder.add(pointLight.position, 'y', 0, 100);
		pointLightFolder.add(pointLight, 'intensity', 0, 200);
		pointLightFolder.addColor(pointLight, 'color');

		const helper = new THREE.PointLightHelper(pointLight);
		this.scene.add(helper);
		this.scene.add(pointLight);
	}

	private createRenderer() {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('app')?.appendChild(this.renderer.domElement);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

		this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		this.renderer.toneMappingExposure = 1;
		this.renderer.shadowMap.enabled = true; // Enable shadow maps
		this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Optional: for softer shadows

		window.addEventListener('resize', () => {
			this.renderer.setSize(window.innerWidth, window.innerHeight);
			const newAspect = window.innerWidth / window.innerHeight;
			this.camera.left = (this.frustumSize * newAspect) / -2;
			this.camera.right = (this.frustumSize * newAspect) / 2;
			this.camera.top = this.frustumSize / 2;
			this.camera.bottom = this.frustumSize / -2;
			this.camera.updateProjectionMatrix();
			this.renderer.render(this.scene, this.camera);
		});
	}

	private createCamera() {
		const aspectRatio = window.innerWidth / window.innerHeight;

		// this.camera = new THREE.OrthographicCamera(
		// 	(this.frustumSize * aspectRatio) / -2, // left
		// 	(this.frustumSize * aspectRatio) / 2, // right
		// 	this.frustumSize / 2, // top
		// 	this.frustumSize / -2, // bottom
		// 	0.1, // near
		// 	1000 // far
		// );
		this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);

		this.camera.position.set(50, 50, 50);
		// this.camera.position.set(0, 10, 0);

		this.camera.lookAt(0, 0, 0);

		this.scene.add(this.camera);
	}

	private createLandscape() {
		const folder = this.gui.addFolder('Landscape');

		this.ground = new Ground(this, folder);

		this.cube = new Cube(this, folder);

		this.ball = new Ball(this);

		this.tree = new Tree(this);
	}
}

new App();
