import * as THREE from 'three';
// Define texture types for better organization
export type TextureType =
	| 'color'
	| 'normal'
	| 'roughness'
	| 'ao'
	| 'displacement'
	| 'envmap'
	| 'matcap';

export interface TextureSet {
	color?: THREE.Texture;
	normal?: THREE.Texture;
	roughness?: THREE.Texture;
	ao?: THREE.Texture;
	displacement?: THREE.Texture;
	envmap?: THREE.Texture;
	matcap?: THREE.Texture;
}
