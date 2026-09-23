import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

export default function LiuliLilyModel() {
  const groupRef = useRef<THREE.Group>(null);

  // 1. Load the Meshy 3D Model
  const { scene } = useGLTF('/lily.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // Override materials while KEEPING Meshy's original baked texture map!
  useMemo(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const oldMat = mesh.material as THREE.MeshStandardMaterial;

        // Preserve Meshy's original texture map
        const originalMap = oldMat.map;

        mesh.material = new THREE.MeshPhysicalMaterial({
          map: originalMap,                        // <--- KEEPS MESHY'S TEXTURE!
          roughness: 0.18,                         // Glossy crystal surface
          metalness: 0.05,
          transmission: 0.75,                      // Lets light pass through without washing out texture
          ior: 1.52,                               // Glass refraction index
          thickness: 1.2,                          // Physical depth
          clearcoat: 1.0,                          // Wet fired glaze sheen
          clearcoatRoughness: 0.1,
          
          // Subtle Klein Blue edge sheen (only highlights the rim, doesn't overpower the flower)
          sheen: 0.8,
          sheenColor: new THREE.Color('#0044FF'),
          sheenRoughness: 0.3,

          transparent: true,
          opacity: 1.0,
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  // 3. Smooth mouse tilt tracking
  useFrame((state) => {
    if (!groupRef.current) return;
    const { x, y } = state.pointer;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, x * 0.7, 0.04);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -y * 0.4, 0.04);
  });

  return (
    <group ref={groupRef} position={[0, -0.7, 0]} scale={2.0}>
      <Float speed={2.0} rotationIntensity={0.3} floatIntensity={0.5}>
        <primitive object={clonedScene} />
        
        {/* Floating amber and Klein Blue micro-embers */}
        <Sparkles count={45} scale={4.5} size={2.5} speed={0.4} color="#FFA500" />
        <Sparkles count={30} scale={5.0} size={3.0} speed={0.3} color="#0055FF" />
      </Float>
    </group>
  );
}

useGLTF.preload('/lily.glb');