import * as THREE from 'three';
// Define texture types for better organization
export type TextureType =
	| 'color'
	| 'normal'
	| 'roughness'
	| 'ao'
	| 'displacement'
	| 'metalness'
	| 'matcap';

export interface TextureSet {
	color?: THREE.Texture;
	normal?: THREE.Texture;
	roughness?: THREE.Texture;
	ao?: THREE.Texture;
	metalness?: THREE.Texture;
	displacement?: THREE.Texture;
	matcap?: THREE.Texture;
}

export type LoaderObject = {
	name: string;
	path: string;
};
