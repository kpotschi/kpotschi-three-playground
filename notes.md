# Threejs Journey Notes

## Camera

### `PerspectiveCamera`

- FOV (Field of View): 50–75 is typical. Lower values (e.g., 30) flatten depth, while higher values (e.g., 90) exaggerate perspective.

- For human-scale scenes, `near = 0.1` and `far = 1000` works well.

## Material

### **Basic Materials**

- **`MeshBasicMaterial`** – Unlit material, ignores lights, good for wireframes or stylized rendering.

### **Shaded Materials**

- **`MeshLambertMaterial`** – Fast, supports diffuse shading with soft lighting, no specular highlights.
- **`MeshPhongMaterial`** – Supports specular highlights and shininess, useful for glossy surfaces.
- **`MeshToonMaterial`** – Creates a cartoon-like shading effect with step-based lighting.

### **Physically Based Rendering (PBR) Materials**

- **`MeshStandardMaterial`** – More realistic than Phong/Lambert, supports metallic and roughness properties.
- **`MeshPhysicalMaterial`** – Extends `MeshStandardMaterial` with clearcoat, reflectivity, and transparency effects.

### **Advanced/Utility Materials**

- **`MeshDepthMaterial`** – Renders depth from the camera’s perspective, useful for effects like fog.
- **`MeshNormalMaterial`** – Renders surface normals as RGB colors, great for debugging.
- **`ShadowMaterial`** – Invisible except for receiving shadows.
- **`RawShaderMaterial` & `ShaderMaterial`** – Custom GLSL shaders for advanced rendering effects.

## Textures

### Loader

- Textureloader works for all jpg and png files
- all map and matcap need to be `THREE.Texture.colorspace = THREE.SRGBColorSpace`

### Mipmap

- mipmap minFilter applies when the texture is displayed smaller
- mipmap magFilter is applied when the camera moves close to the texture

- if a texture is too small to cover the face/object it will get blurry by default. solution is magFilter = THREE.NearestFilter (Minecraftstyle textures)

- `THREE.NearestFilter` better for performance than `THREE.LinearFilter`

### Files

- jpg lossy but smaller files
- png lossless but bigger

- tinypng for compression
- keep textures as small as possible to not put stress on GPU
- mipmapping only works on pow2 image sizes

### links

- poliigon
- 3dtextures.me
- arroway-textures.ch
- poly haven
- https://brunosimon.notion.site/Assets-953f65558015455eb65d38a7a5db7171

## Lights

- If you don’t enable physically correct lighting, intensity is arbitrary (e.g., 1 is normal, 10 is bright)

### RectAreaLight

- only compatible with MeshStandardMaterial and MeshPhysicalMaterial
- Helper is in addons module

### Spotlight

- `angle` measured in radians
- `penumbra` makes edges of light blurry or sharp
- `decay` usually 1
- can't use `lookAt` really.
- have to add `spotLight.target` to scene to change where its pointing

### Cost

- **Low**
  - `AmbientLight` and `HemisphereLight`
- **Moderate**
  - `DirectionalLight` and `PointLight`
- **High**
  - `SpotLight` and `RectAreaLight`

# Three.js Materials, Textures, and Lighting Matrix

| Material Type        | Basic Texture 🎨 | Normal Map 🏔️ | Roughness ⚡      | Metalness 🔩 | Emissive 💡 | Shadows 🌑 | Opacity 🌫️ | Double-Sided 🔄 | Clearcoat ✨ | Sheen 🌟 |
| -------------------- | ---------------- | ------------- | ----------------- | ------------ | ----------- | ---------- | ---------- | --------------- | ------------ | -------- |
| MeshBasicMaterial    | ✅               | ❌            | ❌                | ❌           | ❌          | ❌         | ✅         | ✅              | ❌           | ❌       |
| MeshStandardMaterial | ✅               | ✅            | ✅                | ✅           | ✅          | ✅         | ✅         | ✅              | ❌           | ❌       |
| MeshPhysicalMaterial | ✅               | ✅            | ✅                | ✅           | ✅          | ✅         | ✅         | ✅              | ✅           | ✅       |
| MeshLambertMaterial  | ✅               | ❌            | ❌                | ❌           | ❌          | ✅         | ✅         | ✅              | ❌           | ❌       |
| MeshPhongMaterial    | ✅               | ✅            | ✅ (via specular) | ❌           | ✅          | ✅         | ✅         | ✅              | ❌           | ❌       |
| MeshToonMaterial     | ✅               | ❌            | ❌                | ❌           | ❌          | ✅         | ✅         | ✅              | ❌           | ❌       |
| MeshDepthMaterial    | ❌               | ❌            | ❌                | ❌           | ❌          | ✅         | ❌         | ✅              | ❌           | ❌       |
| MeshNormalMaterial   | ❌               | ❌            | ❌                | ❌           | ❌          | ✅         | ❌         | ✅              | ❌           | ❌       |
| PointsMaterial       | ✅               | ❌            | ❌                | ❌           | ❌          | ❌         | ✅         | ❌              | ❌           | ❌       |
| LineBasicMaterial    | ✅               | ❌            | ❌                | ❌           | ❌          | ❌         | ✅         | ❌              | ❌           | ❌       |
| ShadowMaterial       | ❌               | ❌            | ❌                | ❌           | ❌          | ✅         | ✅         | ✅              | ❌           | ❌       |

✅ = Supported, ❌ = Not Supported

## Shadows

- only supported by `PointLight`, `DirectionalLight` and `SpotLight`

- better quality shadows when setting `THREE.Light.shadow.mapSize.width` to power of 2 size (default should be 512px)

- can add `THREE.CameraHelper` onto light in order to debug far and near as well as amplitude (left, right, top, bottom) - keep it precise for performance

### Shadow Algorithm

- PCFShadowMap is default, PCFSoftShadowMap is more quality but less performance

###

- baked shadows just as `THREE.Material.map`
