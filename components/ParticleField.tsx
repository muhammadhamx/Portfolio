'use client';

import { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleFieldProps {
  scrollProgress: number;
}

export default function ParticleField({ scrollProgress }: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    scrollRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const container = containerRef.current;
    if (!container) return;

    // Clean up any previous renderer (strict mode double-invoke)
    if (rendererRef.current) {
      rendererRef.current.dispose();
      rendererRef.current = null;
    }
    container.innerHTML = '';

    // Create a fresh canvas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
    container.appendChild(canvas);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: false,
      });
    } catch {
      // WebGL context unavailable (strict mode cleanup race)
      return;
    }
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 40;

    const group = new THREE.Group();
    scene.add(group);

    // Particles
    const PARTICLE_COUNT = 1500;
    const SPHERE_RADIUS = 30;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);

    const cyan = new THREE.Color('#00D4FF');
    const violet = new THREE.Color('#7B2FFF');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = SPHERE_RADIUS * Math.cbrt(Math.random());
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.005;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.005;

      const color = Math.random() < 0.7 ? cyan : violet;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 1,
      depthWrite: false,
    });

    const points = new THREE.Points(particleGeometry, particleMaterial);
    group.add(points);

    // Connection lines
    const MAX_CONNECTIONS = 500;
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));
    lineGeometry.setDrawRange(0, 0);

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });

    const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lineSegments);

    // Mouse tracking
    const mouse = new THREE.Vector2(9999, 9999);
    const mouse3D = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const intersectPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation
    let animationId: number;
    const CONNECTION_DISTANCE = 4;
    const MOUSE_RADIUS = 6;
    const PUSH_STRENGTH = 0.3;
    const LERP_BACK = 0.01;
    const CHECK_COUNT = 400;

    const tempVec = new THREE.Vector3();
    const particleVec = new THREE.Vector3();
    const localMouse = new THREE.Vector3();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const fade = 1 - scrollRef.current;

      particleMaterial.opacity = fade;
      lineMaterial.opacity = 0.6 * fade;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(intersectPlane, mouse3D);
      localMouse.copy(mouse3D);
      group.worldToLocal(localMouse);

      const posArray = positions;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const ix = i * 3;
        const iy = ix + 1;
        const iz = ix + 2;

        posArray[ix] += velocities[ix];
        posArray[iy] += velocities[iy];
        posArray[iz] += velocities[iz];

        particleVec.set(posArray[ix], posArray[iy], posArray[iz]);
        const dist = particleVec.distanceTo(localMouse);

        if (dist < MOUSE_RADIUS && dist > 0) {
          tempVec.subVectors(particleVec, localMouse).normalize();
          const force = (1 - dist / MOUSE_RADIUS) * PUSH_STRENGTH;
          posArray[ix] += tempVec.x * force;
          posArray[iy] += tempVec.y * force;
          posArray[iz] += tempVec.z * force;
        }

        posArray[ix] += (originalPositions[ix] - posArray[ix]) * LERP_BACK;
        posArray[iy] += (originalPositions[iy] - posArray[iy]) * LERP_BACK;
        posArray[iz] += (originalPositions[iz] - posArray[iz]) * LERP_BACK;
      }
      (particleGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      // Update connections
      let lineIdx = 0;
      const linePosArr = linePositions;
      const lineColArr = lineColors;

      for (let i = 0; i < CHECK_COUNT && lineIdx < MAX_CONNECTIONS; i++) {
        for (let j = i + 1; j < CHECK_COUNT && lineIdx < MAX_CONNECTIONS; j++) {
          const dx = posArray[i * 3] - posArray[j * 3];
          const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
          const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (d < CONNECTION_DISTANCE) {
            const alpha = 1 - d / CONNECTION_DISTANCE;
            const base = lineIdx * 6;
            linePosArr[base] = posArray[i * 3];
            linePosArr[base + 1] = posArray[i * 3 + 1];
            linePosArr[base + 2] = posArray[i * 3 + 2];
            linePosArr[base + 3] = posArray[j * 3];
            linePosArr[base + 4] = posArray[j * 3 + 1];
            linePosArr[base + 5] = posArray[j * 3 + 2];

            lineColArr[base] = 0.482 * alpha;
            lineColArr[base + 1] = 0.184 * alpha;
            lineColArr[base + 2] = alpha;
            lineColArr[base + 3] = 0.482 * alpha;
            lineColArr[base + 4] = 0.184 * alpha;
            lineColArr[base + 5] = alpha;
            lineIdx++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIdx * 2);
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (lineGeometry.attributes.color as THREE.BufferAttribute).needsUpdate = true;

      group.rotation.y += 0.0008;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      particleGeometry.dispose();
      particleMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      rendererRef.current = null;
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full" />;
}
