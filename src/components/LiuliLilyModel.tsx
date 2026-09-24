import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Waypoint, PORTFOLIO_WAYPOINTS } from '../data/portfolioData';

interface LiuliLilyModelProps {
  activeWaypoint?: Waypoint | null;
  position?: [number, number, number];
  dragAngleOffset?: number;
}

export default function LiuliLilyModel({
  activeWaypoint = null,
  position = [0, 0, 0],
  dragAngleOffset = 0,
}: LiuliLilyModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const petalSpinGroupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  const currentAngleRef = useRef<number>(0);
  const targetAngleRef = useRef<number>(0);
  const prevIndexRef = useRef<number>(-1);

  // 1. Load the Meshy 3D Model
  const { scene } = useGLTF('/lily.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // 2. High-Touch Tactile Liuli Glass Material (Preserves Meshy's baked texture and authentic warm amber crystal)
  useMemo(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const oldMat = mesh.material as THREE.MeshStandardMaterial;
        const originalMap = oldMat.map;

        mesh.material = new THREE.MeshPhysicalMaterial({
          map: originalMap || null,
          roughness: 0.10,                         // High-gloss wet crystal surface
          metalness: 0.05,
          transmission: 0.82,                      // Lets light pass through without washing out texture
          ior: 1.52,                               // Glass refraction index
          thickness: 1.0,                          // Physical depth
          clearcoat: 1.0,                          // Wet fired glaze sheen
          clearcoatRoughness: 0.06,
          sheen: 1.0,                              // Vivid iridescent sheen along petal rims
          sheenColor: new THREE.Color('#A855F7'),   // Purple/violet rim sheen reflection matching reference photo
          sheenRoughness: 0.22,
          transparent: true,
          opacity: 1.0,
        });

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [clonedScene]);

  // 3. Blossoming Intro
  const [bloomProgress, setBloomProgress] = React.useState(0);
  useEffect(() => {
    let start: number | null = null;
    const duration = 1600;

    const animateBloom = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - progress, 3);
      setBloomProgress(ease);

      if (progress < 1) {
        requestAnimationFrame(animateBloom);
      }
    };

    requestAnimationFrame(animateBloom);
  }, []);

  // 4. Smooth Petal Carousel Rotation between Decks (Horizontal Turntable Spin)
  useEffect(() => {
    if (!activeWaypoint) {
      targetAngleRef.current = 0;
      prevIndexRef.current = -1;
      return;
    }

    const newIdx = PORTFOLIO_WAYPOINTS.findIndex((w) => w.id === activeWaypoint.id);
    if (newIdx === -1) return;

    const count = PORTFOLIO_WAYPOINTS.length;
    const anglePerDeck = (2 * Math.PI) / count; // 90° for 4 cards, completing full 360° horizontal carousel

    if (prevIndexRef.current === -1) {
      // First time entering deck mode: rotate to this project's petal directly
      targetAngleRef.current = -newIdx * anglePerDeck;
    } else {
      // Step continuously in the shortest directed angular direction
      let diff = newIdx - prevIndexRef.current;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      targetAngleRef.current -= diff * anglePerDeck;
    }
    prevIndexRef.current = newIdx;
  }, [activeWaypoint]);

  // Butter-smooth physical damping for horizontal flower turntable spin
  useFrame((_, delta) => {
    if (!petalSpinGroupRef.current) return;
    currentAngleRef.current = THREE.MathUtils.damp(
      currentAngleRef.current,
      targetAngleRef.current,
      6.0,
      delta
    );
    // Spinning horizontally around the vertical Y-axis + user drag gesture
    petalSpinGroupRef.current.rotation.y = currentAngleRef.current + dragAngleOffset;
    petalSpinGroupRef.current.rotation.z = 0;
  });

  const currentScale = 2.0 * bloomProgress;

  return (
    <group ref={groupRef} position={position} scale={currentScale}>
      {/* Organic floating breath without conflicting with camera orbit */}
      <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.35}>
        {/* Revolving petal carousel group: smoothly spins flower horizontally between project decks */}
        <group ref={petalSpinGroupRef}>
          {/* Lifted slightly upward matching initial reference file so it orbits easily and elegantly */}
          <primitive
            ref={modelRef}
            object={clonedScene}
            position={[0, -0.45, 0]}
          />
        </group>

        {/* Floating Magical Garden Fireflies (Warm golden embers & celestial fairy lights) */}
        {/* 1. Warm Golden Yellow Fireflies */}
        <Sparkles count={75} scale={[8.0, 8.0, 6.0]} size={5.5} speed={0.4} color="#FFB800" />
        {/* 2. Soft Glowing Amber Embers */}
        <Sparkles count={45} scale={[6.5, 6.5, 5.0]} size={7.5} speed={0.3} color="#FF8800" />
        {/* 3. Celestial Cyan & Fairy Blue Embers */}
        <Sparkles count={45} scale={[8.5, 8.5, 6.0]} size={4.5} speed={0.25} color="#38BDF8" />
        {/* 4. Deep Indigo Starlight Fireflies */}
        <Sparkles count={30} scale={[9.0, 9.0, 7.0]} size={5.0} speed={0.35} color="#0055FF" />
      </Float>
    </group>
  );
}

useGLTF.preload('/lily.glb');