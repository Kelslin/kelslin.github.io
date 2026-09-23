import React, { useMemo } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

// 1. Define the props interface
// 1. Add 'original' to the union type
interface LiuliLilyModelProps {
  variant?: 'xray' | 'amber' | 'glass' | 'original';
}

export default function LiuliLilyModel({ variant = 'xray' }: LiuliLilyModelProps) {
  const { scene } = useGLTF('/lily.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  useMemo(() => {
    // If 'original', don't override the materials at all—keep Meshy's exact original export!
    if (variant === 'original') return;

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const oldMat = mesh.material as THREE.MeshStandardMaterial;

        if (variant === 'xray') {
          mesh.material = new THREE.MeshPhysicalMaterial({
            map: oldMat.map || null,
            transmission: 0.95,
            transparent: true,
            opacity: 1.0,
            ior: 1.54,
            thickness: 1.6,
            roughness: 0.12,
            metalness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.08,
            sheen: 1.0,
            sheenColor: new THREE.Color('#70CFFF'),
            sheenRoughness: 0.2,
            color: new THREE.Color('#EBF6FF'),
            attenuationColor: new THREE.Color('#002FA7'),
            attenuationDistance: 0.8,
          });
        } else if (variant === 'amber') {
          mesh.material = new THREE.MeshPhysicalMaterial({
            map: oldMat.map || null,
            transmission: 0.75,
            transparent: true,
            opacity: 1.0,
            ior: 1.52,
            thickness: 1.2,
            roughness: 0.18,
            metalness: 0.05,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            sheen: 0.8,
            sheenColor: new THREE.Color('#FF5500'),
            sheenRoughness: 0.3,
          });
        }
        
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [clonedScene, variant]);

  return (
    <primitive object={clonedScene} scale={2.2} position={[0, -0.6, 0]} />
  );
}