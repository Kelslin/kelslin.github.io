import * as THREE from 'three';

// Shared singleton store to ensure Layer 1 (X-ray) and Layer 2 (Color Reveal)
// stay pixel-perfect synchronized in camera, rotation, and model orientation.
export const floralSyncState = {
  cameraPos: new THREE.Vector3(0, 0, 4.4),
  cameraLookAt: new THREE.Vector3(0, 0, 0),
  cameraRotation: new THREE.Euler(0, 0, 0),
  cameraQuaternion: new THREE.Quaternion(),
  modelRotation: new THREE.Euler(0, 0, 0),
  bloomProgress: 1,
};
