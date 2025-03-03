import { GUI } from 'lil-gui';
import { RoundedBoxGeometry } from 'three-stdlib';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export default class App {
	public scene: THREE.Scene;
	public renderer: THREE.WebGLRenderer;
	public camera: THREE.OrthographicCamera;
	public gui: GUI;
	readonly frustumSize = 20;

	constructor() {
		console.log('App is running');
		this.scene = new THREE.Scene();
		this.gui = new GUI();
		this.createRenderer();
		this.createCamera();

		this.animate();

		this.createLandscape();
		new OrbitControls(this.camera, this.renderer.domElement);
	}

	private animate() {
		requestAnimationFrame(this.animate.bind(this));
		this.renderer.render(this.scene, this.camera);
	}

	private createRenderer() {
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		document.getElementById('app')?.appendChild(this.renderer.domElement);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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

		this.camera = new THREE.OrthographicCamera(
			(this.frustumSize * aspectRatio) / -2, // left
			(this.frustumSize * aspectRatio) / 2, // right
			this.frustumSize / 2, // top
			this.frustumSize / -2, // bottom
			0.1, // near
			1000 // far
		);

		this.camera.position.set(50, 50, 50);
		// this.camera.position.set(0, 10, 0);

		this.camera.lookAt(0, 0, 0);

		this.scene.add(this.camera);
	}

	private createLandscape() {
		const groundWidth = 2;
		const groundGeometry = new RoundedBoxGeometry(10, 10, 2, 10, 0.5);
		const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x009900 });
		const ground = new THREE.Mesh(groundGeometry, groundMaterial);
		ground.rotateX(-Math.PI / 2);
		ground.position.set(0, -groundWidth / 2, 0);
		this.scene.add(ground);

		const size = 2;
		const cubeGeometry = new THREE.BoxGeometry(size, size, size);
		const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x000099 });
		const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.position.set(-2, size / 2, 0);

		this.scene.add(cube);

		const sphereRadius = 1;
		const sphereGeometry = new THREE.SphereGeometry(sphereRadius, 32, 32);
		const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
		const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
		sphere.position.set(2, sphereRadius, 0);
		this.scene.add(sphere);

		// const planeGeometry = new THREE.PlaneGeometry(10, 10);
		// const planeMaterial = new THREE.MeshBasicMaterial({
		// 	color: 0x0000ff,
		// 	side: THREE.DoubleSide,
		// });
		// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
		// plane.rotation.x = Math.PI / 2;
		// this.scene.add(plane);
	}
}

new App();
// Create a scene
// const scene = new THREE.Scene();

// // Create a camera
// const camera = new THREE.PerspectiveCamera(
// 	75,
// 	window.innerWidth / window.innerHeight,
// 	0.1,
// 	1000
// );
// camera.position.z = 5;

// // Create a renderer
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('app')?.appendChild(renderer.domElement);

// // Create a cube
// const geometry = new THREE.BoxGeometry();
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // Animation loop
// function animate() {
// 	requestAnimationFrame(animate);
// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;
// 	renderer.render(scene, camera);
// }
// animate();
