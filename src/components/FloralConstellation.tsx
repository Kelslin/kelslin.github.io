import React, { useMemo } from 'react';
import * as THREE from 'three';
import { PORTFOLIO_WAYPOINTS, Waypoint } from '../data/portfolioData';

interface FloralConstellationProps {
  activeWaypoint: Waypoint | null;
  onSelectWaypoint: (wp: Waypoint | null) => void;
  hoveredWaypoint: Waypoint | null;
  onHoverWaypoint: (wp: Waypoint | null) => void;
  position?: [number, number, number];
}

export default function FloralConstellation({
  activeWaypoint,
  onSelectWaypoint,
  hoveredWaypoint,
  onHoverWaypoint,
  position = [0, -0.6, 0],
}: FloralConstellationProps) {

  // 2. Klein Blue (#002FA7) & Forensic Cyan Constellation Network
  const lineGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    const waypoints = PORTFOLIO_WAYPOINTS;

    const connections: [number, number][] = [
      [0, 1], // Core to Warmilu
      [0, 2], // Core to Luxshare
      [0, 3], // Core to SomaSeek
      [0, 4], // Core to Atelier
      [1, 3], // Warmilu to SomaSeek
      [2, 4], // Luxshare to Atelier
      [3, 2], // SomaSeek to Luxshare
    ];

    connections.forEach(([i, j]) => {
      points.push(new THREE.Vector3(...waypoints[i].position3D));
      points.push(new THREE.Vector3(...waypoints[j].position3D));
    });

    return new THREE.BufferGeometry().setFromPoints(points);
  }, []);

  return (
    <group position={position}>
      {/* Constellation Lines */}
      {!activeWaypoint && (
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            color="#0044FF"
            transparent
            opacity={0.32}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
      )}

      {/* 3D Waypoint Nodes on Petal Tips (Clickable directly on the 3D flower) */}
      {PORTFOLIO_WAYPOINTS.map((wp) => {
        const isHovered = hoveredWaypoint?.id === wp.id;
        const isActive = activeWaypoint?.id === wp.id;

        return (
          <group
            key={wp.id}
            position={wp.position3D}
            onClick={(e) => {
              e.stopPropagation();
              onSelectWaypoint(wp);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              onHoverWaypoint(wp);
            }}
            onPointerOut={() => onHoverWaypoint(null)}
          >
            {/* Generous Invisible Click Area */}
            <mesh visible={false}>
              <sphereGeometry args={[0.12, 12, 12]} />
              <meshBasicMaterial transparent opacity={0} />
            </mesh>

            {/* Glowing 3D Anchor Dot */}
            <mesh>
              <sphereGeometry args={[0.038, 16, 16]} />
              <meshBasicMaterial
                color={isActive || isHovered ? wp.accentColor : '#67E8F9'}
                transparent
                opacity={isActive ? 1.0 : isHovered ? 1.0 : 0.75}
              />
            </mesh>

            {/* Pulsing Aura Ring */}
            {(isHovered || isActive) && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.05, 0.085, 32]} />
                <meshBasicMaterial
                  color={wp.accentColor}
                  transparent
                  opacity={0.75}
                  side={THREE.DoubleSide}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}
