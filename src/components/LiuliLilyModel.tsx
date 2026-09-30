import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { Waypoint, PORTFOLIO_WAYPOINTS, LensType } from '../data/portfolioData';

interface LiuliLilyModelProps {
  activeWaypoint?: Waypoint | null;
  activeLens?: LensType;
  heroToAboutTransition?: number; // 0.0 (hero side view) -> 1.0 (top-down bloom view)
  activeProjectIndex?: number; // -1 for hero/about, 0..8 for projects
  activeSection?: string;
  position?: [number, number, number];
  dragAngleOffset?: number;
  dragTiltOffset?: number;
  hoverOffset?: { x: number; y: number };
  manualOrbitRef?: React.MutableRefObject<{
    dragY: number;
    dragTiltX: number;
    hoverX: number;
    hoverY: number;
  }>;
}

export default function LiuliLilyModel({
  heroToAboutTransition = 0,
  activeProjectIndex = -1,
  activeSection = 'hero',
  position = [0, 0, 0],
  dragAngleOffset = 0,
  dragTiltOffset = 0,
  hoverOffset = { x: 0, y: 0 },
  manualOrbitRef,
}: LiuliLilyModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const tiltGroupRef = useRef<THREE.Group>(null);
  const petalSpinGroupRef = useRef<THREE.Group>(null);
  const modelRef = useRef<THREE.Group>(null);

  const currentAngleRef = useRef<number>(0);
  const targetAngleRef = useRef<number>(0);
  const currentTiltXRef = useRef<number>(0.28);
  const currentDragYRef = useRef<number>(0);
  const currentDragXRef = useRef<number>(0);

  // 1. Load the Meshy 3D Model
  const { scene } = useGLTF('/lily.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  // 2. High-Touch Tactile Liuli Glass Material
  useMemo(() => {
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        const oldMat = mesh.material as THREE.MeshStandardMaterial;
        const originalMap = oldMat.map;

        mesh.material = new THREE.MeshPhysicalMaterial({
          map: originalMap || null,
          roughness: 0.12, // High-gloss wet crystal surface
          metalness: 0.05,
          transmission: 0.80, // Refractive light through crystal
          ior: 1.52, // Glass refraction index
          thickness: 0.9, // Physical depth
          clearcoat: 0.9, // Wet fired glaze sheen
          clearcoatRoughness: 0.08,
          sheen: 1.0, // Vivid iridescent sheen along petal rims
          sheenColor: new THREE.Color('#0038FF'), // Electric Klein Blue sheen
          sheenRoughness: 0.22,
          transparent: true,
          opacity: 1.0,
        });

        mesh.castShadow = false; // Disable heavy shadow maps for silky 60fps
        mesh.receiveShadow = false;
      }
    });
  }, [clonedScene]);

  // 3. Butter-smooth physical damping for tilt and horizontal turntable spin
  useFrame((state, delta) => {
    const targetDragY = manualOrbitRef?.current ? manualOrbitRef.current.dragY : dragAngleOffset;
    const targetDragTiltX = manualOrbitRef?.current ? manualOrbitRef.current.dragTiltX : dragTiltOffset;
    const targetHoverX = manualOrbitRef?.current ? manualOrbitRef.current.hoverX : hoverOffset.x;
    const targetHoverY = manualOrbitRef?.current ? manualOrbitRef.current.hoverY : hoverOffset.y;

    // Smoothly damp manual user mouse/touch orbit offsets
    currentDragYRef.current = THREE.MathUtils.damp(
      currentDragYRef.current,
      targetDragY,
      5.0,
      delta
    );
    currentDragXRef.current = THREE.MathUtils.damp(
      currentDragXRef.current,
      targetDragTiltX,
      5.0,
      delta
    );

    // 1. Tilt X: Smoothly interpolate from side profile (0.28) in Hero to top-to-bottom blossom (-0.50)
    if (tiltGroupRef.current) {
      const sideTiltX = 0.28;
      const topTiltX = -0.50; // Points flower face directly up toward camera
      const baseTiltX = THREE.MathUtils.lerp(sideTiltX, topTiltX, heroToAboutTransition);
      const targetTiltX =
        baseTiltX + currentDragXRef.current + targetHoverY * 0.15;

      currentTiltXRef.current = THREE.MathUtils.damp(
        currentTiltXRef.current,
        targetTiltX,
        4.0,
        delta
      );
      tiltGroupRef.current.rotation.x = currentTiltXRef.current;
      tiltGroupRef.current.rotation.z = THREE.MathUtils.lerp(-0.06, 0, heroToAboutTransition);
    }

    // 2. Turntable Spin Y: Rotate the flower so that the corresponding petal aligns with the active project
    if (petalSpinGroupRef.current) {
      const activeWaypoints = PORTFOLIO_WAYPOINTS.filter((w) => w.lens !== 'craft');
      const count = activeWaypoints.length || 1;
      const anglePerProject = (2 * Math.PI) / count;

      if (activeProjectIndex >= 0) {
        // Rotating so project petal is featured
        targetAngleRef.current = -activeProjectIndex * anglePerProject;
      } else if (activeSection === 'hero') {
        // Gentle ambient rotation in hero
        targetAngleRef.current += delta * 0.12;
      } else {
        // In about section: centered symmetry
        targetAngleRef.current = 0;
      }

      currentAngleRef.current = THREE.MathUtils.damp(
        currentAngleRef.current,
        targetAngleRef.current,
        3.8,
        delta
      );
      petalSpinGroupRef.current.rotation.y =
        currentAngleRef.current +
        currentDragYRef.current +
        targetHoverX * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={2.35}>
      {/* Organic floating breath */}
      <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.22}>
        {/* Tilt group: transitions from side view (hero) to centered top-to-bottom bloom (about & projects) */}
        <group ref={tiltGroupRef}>
          {/* Revolving petal carousel group: smoothly spins flower horizontally behind project texts */}
          <group ref={petalSpinGroupRef}>
            <primitive
              ref={modelRef}
              object={clonedScene}
              position={[0, -0.45, 0]}
            />
          </group>
        </group>

        {/* Lightweight Optimized Ambient Fireflies (Performance tuned) */}
        <Sparkles count={40} scale={[8.0, 8.0, 6.0]} size={4.5} speed={0.25} color="#FFB800" />
        <Sparkles count={25} scale={[8.5, 8.5, 6.0]} size={4.0} speed={0.25} color="#0038FF" />
      </Float>
    </group>
  );
}

useGLTF.preload('/lily.glb');