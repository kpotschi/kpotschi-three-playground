# Threejs Journey Notes

## Textures

### Loader

- Textureloader works for all jpg and png files

### Mipmap

- mipmap minFilter applies when the texture is displayed smaller
- mipmap magFilter is applied when the camera moves close to the texture

- if a texture is too small to cover the face/object it will get blurry by default. solution is magFilter = THREE.NearestFilter (Minecraftstyle textures)

- THREE.NearestFilter better for performance than THREE.LinearFilter

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
