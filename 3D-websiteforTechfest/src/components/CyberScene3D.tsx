import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { BOOTHS_DATA } from '../data/techfestData';
import { Booth } from '../types/techfest';
import { cyberSound } from '../audio/cyberSound';

interface CyberScene3DProps {
  activeBoothId: string | null;
  onSelectBooth: (booth: Booth) => void;
  onHoverBooth: (booth: Booth | null) => void;
  scrollProgress: number; // 0 to 1
  isFreeOrbit: boolean;
  onToggleFreeOrbit: () => void;
}

export const CyberScene3D: React.FC<CyberScene3DProps> = ({
  activeBoothId,
  onSelectBooth,
  onHoverBooth,
  scrollProgress,
  isFreeOrbit,
  onToggleFreeOrbit,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeBoothIdRef = useRef(activeBoothId);
  const scrollProgressRef = useRef(scrollProgress);
  const isFreeOrbitRef = useRef(isFreeOrbit);

  useEffect(() => {
    activeBoothIdRef.current = activeBoothId;
  }, [activeBoothId]);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    isFreeOrbitRef.current = isFreeOrbit;
  }, [isFreeOrbit]);

  const [hoveredBooth, setHoveredBoothInternal] = useState<Booth | null>(null);
  const [isSceneReady, setIsSceneReady] = useState(false);

  // References for camera tweening and animation loop
  const cameraTargetPos = useRef(new THREE.Vector3(0, 18, 55));
  const cameraTargetLook = useRef(new THREE.Vector3(0, 5, 0));
  const currentCameraLook = useRef(new THREE.Vector3(0, 5, 0));

  // Raycasting ref
  const raycastObjectsRef = useRef<{ mesh: THREE.Object3D; booth: Booth }[]>([]);

  // Interactive mouse drag for Free Orbit
  const isDraggingRef = useRef(false);
  const prevMousePosRef = useRef({ x: 0, y: 0 });
  const orbitAngleRef = useRef({ theta: 0, phi: 0.35, radius: 55 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070f);
    scene.fog = new THREE.FogExp2(0x05070f, 0.014);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 18, 55);
    camera.lookAt(0, 5, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x1a243b, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00f3ff, 1.8);
    dirLight.position.set(30, 60, 40);
    scene.add(dirLight);

    const magentaLight = new THREE.DirectionalLight(0xff007f, 1.4);
    magentaLight.position.set(-40, 50, -30);
    scene.add(magentaLight);

    const centerPointLight = new THREE.PointLight(0x00f3ff, 2.5, 80);
    centerPointLight.position.set(0, 12, 0);
    scene.add(centerPointLight);

    // 5. Cyber Grid Floor
    const gridHelper = new THREE.GridHelper(260, 65, 0x00f3ff, 0x111c38);
    gridHelper.position.y = -0.1;
    scene.add(gridHelper);

    // Secondary subtle ground glow plane
    const planeGeo = new THREE.PlaneGeometry(300, 300);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x05070f,
      depthWrite: false,
    });
    const floorMesh = new THREE.Mesh(planeGeo, planeMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -0.2;
    scene.add(floorMesh);

    // 6. Cyber City Procedural Skyscrapers
    const buildingGroup = new THREE.Group();
    const buildingGeo = new THREE.BoxGeometry(1, 1, 1);
    
    // Materials for buildings
    const darkBuildingMat = new THREE.MeshStandardMaterial({
      color: 0x0a101f,
      roughness: 0.2,
      metalness: 0.85,
    });
    const cyanWindowMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
    const magentaWindowMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
    const amberWindowMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    // Seeded random distribution of skyscrapers
    const buildingCoords: { x: number; z: number; w: number; d: number; h: number }[] = [];
    const minDistance = 22; // Keep central booth arena clear

    for (let i = 0; i < 65; i++) {
      const angle = (i / 65) * Math.PI * 2 + (Math.sin(i * 1.5) * 0.4);
      const dist = 40 + (i % 6) * 11 + Math.sin(i * 3) * 8;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      if (Math.sqrt(x * x + z * z) < minDistance) continue;

      const w = 4 + (i % 4) * 2.5;
      const d = 4 + ((i + 2) % 4) * 2.5;
      const h = 20 + ((i * 13) % 65);

      buildingCoords.push({ x, z, w, d, h });

      // Skyscraper body
      const buildingMesh = new THREE.Mesh(buildingGeo, darkBuildingMat);
      buildingMesh.scale.set(w, h, d);
      buildingMesh.position.set(x, h / 2, z);
      buildingGroup.add(buildingMesh);

      // Skyscraper window neon stripes
      const stripeCount = Math.floor(h / 12);
      for (let s = 1; s <= stripeCount; s++) {
        const stripeGeo = new THREE.BoxGeometry(w * 1.02, 0.4, d * 1.02);
        const stripeMat = (i + s) % 3 === 0 ? cyanWindowMat : ((i + s) % 3 === 1 ? magentaWindowMat : amberWindowMat);
        const stripeMesh = new THREE.Mesh(stripeGeo, stripeMat);
        stripeMesh.position.set(x, s * 11 + 2, z);
        buildingGroup.add(stripeMesh);
      }

      // Roof Antenna / Beacon
      if (h > 45) {
        const antennaGeo = new THREE.CylinderGeometry(0.1, 0.2, 8, 6);
        const antennaMesh = new THREE.Mesh(antennaGeo, (i % 2 === 0 ? cyanWindowMat : magentaWindowMat));
        antennaMesh.position.set(x, h + 4, z);
        buildingGroup.add(antennaMesh);
      }
    }
    scene.add(buildingGroup);

    // 7. Elevated Sky Bridges
    const bridgeMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true });
    for (let b = 0; b < 4; b++) {
      const b1 = buildingCoords[b * 7];
      const b2 = buildingCoords[b * 7 + 2];
      if (b1 && b2) {
        const bridgeGeo = new THREE.CylinderGeometry(0.8, 0.8, 1, 8);
        const bridge = new THREE.Mesh(bridgeGeo, bridgeMat);
        const midX = (b1.x + b2.x) / 2;
        const midZ = (b1.z + b2.z) / 2;
        const bridgeY = Math.min(b1.h, b2.h) * 0.7;
        const length = Math.hypot(b2.x - b1.x, b2.z - b1.z);
        
        bridge.scale.set(1, length, 1);
        bridge.position.set(midX, bridgeY, midZ);
        bridge.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          new THREE.Vector3(b2.x - b1.x, 0, b2.z - b1.z).normalize()
        );
        scene.add(bridge);
      }
    }

    // 8. Cyber Flying Vehicles Traffic Streams (Floating Light Ribbons)
    const trafficParticles = new THREE.Group();
    const trafficCount = 36;
    const trafficMeshes: { mesh: THREE.Mesh; angle: number; radius: number; speed: number; y: number }[] = [];
    const trafficGeo = new THREE.BoxGeometry(1.6, 0.3, 0.6);

    for (let t = 0; t < trafficCount; t++) {
      const isCyan = t % 2 === 0;
      const mat = new THREE.MeshBasicMaterial({ color: isCyan ? 0x00f3ff : 0xff007f });
      const mesh = new THREE.Mesh(trafficGeo, mat);
      const radius = 32 + (t % 5) * 8;
      const angle = (t / trafficCount) * Math.PI * 2;
      const y = 14 + (t % 4) * 7;
      const speed = (0.006 + (t % 3) * 0.003) * (t % 2 === 0 ? 1 : -1);

      mesh.position.set(Math.cos(angle) * radius, y, Math.sin(angle) * radius);
      trafficParticles.add(mesh);
      trafficMeshes.push({ mesh, angle, radius, speed, y });
    }
    scene.add(trafficParticles);

    // 9. Floating Volumetric Data Particle Field
    const particleCount = 450;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let p = 0; p < particleCount; p++) {
      particlePositions[p * 3] = (Math.random() - 0.5) * 160;
      particlePositions[p * 3 + 1] = Math.random() * 50 + 1;
      particlePositions[p * 3 + 2] = (Math.random() - 0.5) * 160;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x00f3ff,
      size: 0.6,
      transparent: true,
      opacity: 0.65,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    scene.add(particleSystem);

    // 10. Construct 5 Interactive 3D Booth Pavilions
    const boothsGroup = new THREE.Group();
    const raycastList: { mesh: THREE.Object3D; booth: Booth }[] = [];
    const animatedBoothObjects: {
      update: (time: number) => void;
      group: THREE.Group;
      booth: Booth;
    }[] = [];

    BOOTHS_DATA.forEach((booth) => {
      const boothGroup = new THREE.Group();
      boothGroup.position.set(...booth.position3D);

      const color = new THREE.Color(booth.themeColor);

      // Base Pedestal: Hexagonal Cyber Platform
      const baseGeo = new THREE.CylinderGeometry(5.2, 5.8, 1.2, 6);
      const baseMat = new THREE.MeshStandardMaterial({
        color: 0x090f20,
        roughness: 0.3,
        metalness: 0.9,
      });
      const baseMesh = new THREE.Mesh(baseGeo, baseMat);
      baseMesh.position.y = 0.6;
      boothGroup.add(baseMesh);

      // Neon Rim Ring around Pedestal
      const ringGeo = new THREE.TorusGeometry(5.5, 0.12, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 1.25;
      boothGroup.add(ringMesh);

      // Holographic Light Beacon Column
      const colGeo = new THREE.CylinderGeometry(4.2, 4.2, 12, 16, 1, true);
      const colMat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.08,
        side: THREE.DoubleSide,
      });
      const colMesh = new THREE.Mesh(colGeo, colMat);
      colMesh.position.y = 7;
      boothGroup.add(colMesh);

      // Specialized 3D Hero Object for Each Booth
      const heroGroup = new THREE.Group();
      heroGroup.position.y = 3.6;

      if (booth.modelType === 'robowars') {
        // --- BOOTH 1: ROBOWARS COMBAT MECH ---
        // Chassis
        const bodyGeo = new THREE.BoxGeometry(2.4, 1.2, 2.8);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        heroGroup.add(body);

        // Armor Plate
        const plateGeo = new THREE.BoxGeometry(2.6, 0.3, 3.0);
        const plateMat = new THREE.MeshBasicMaterial({ color: 0xff007f });
        const plate = new THREE.Mesh(plateGeo, plateMat);
        plate.position.y = 0.7;
        heroGroup.add(plate);

        // Rotating Spinner Blade / Kinetic Weapon
        const bladeGeo = new THREE.BoxGeometry(4.2, 0.2, 0.8);
        const bladeMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, metalness: 1.0, roughness: 0.1 });
        const blade = new THREE.Mesh(bladeGeo, bladeMat);
        blade.position.set(0, 0.4, 1.6);
        heroGroup.add(blade);

        // Geodesic Energy Dome (Cage)
        const domeGeo = new THREE.IcosahedronGeometry(4.2, 1);
        const domeMat = new THREE.MeshBasicMaterial({ color: 0xff007f, wireframe: true, transparent: true, opacity: 0.35 });
        const dome = new THREE.Mesh(domeGeo, domeMat);
        heroGroup.add(dome);

        animatedBoothObjects.push({
          group: heroGroup,
          booth,
          update: (time) => {
            blade.rotation.y += 0.3; // High-speed weapon spinner
            dome.rotation.y = time * 0.2;
            heroGroup.rotation.y = Math.sin(time * 0.5) * 0.4;
          },
        });
      } else if (booth.modelType === 'quantum_ai') {
        // --- BOOTH 2: QUANTUM AI NEXUS ---
        // Floating Central Quantum Polyhedron
        const coreGeo = new THREE.IcosahedronGeometry(1.8, 0);
        const coreMat = new THREE.MeshStandardMaterial({
          color: 0x00f3ff,
          metalness: 0.95,
          roughness: 0.1,
          wireframe: false,
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        heroGroup.add(core);

        // Inner glowing wireframe
        const wireGeo = new THREE.IcosahedronGeometry(2.0, 1);
        const wireMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff, wireframe: true });
        const wire = new THREE.Mesh(wireGeo, wireMat);
        heroGroup.add(wire);

        // Concentric Gimbal Flux Rings
        const ring1Geo = new THREE.TorusGeometry(3.0, 0.08, 8, 32);
        const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        heroGroup.add(ring1);

        const ring2Geo = new THREE.TorusGeometry(3.6, 0.08, 8, 32);
        const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        heroGroup.add(ring2);

        animatedBoothObjects.push({
          group: heroGroup,
          booth,
          update: (time) => {
            core.rotation.x = time * 0.8;
            core.rotation.y = time * 1.1;
            wire.rotation.x = -time * 0.5;
            wire.rotation.z = time * 0.7;
            ring1.rotation.x = time * 1.2;
            ring1.rotation.y = time * 0.6;
            ring2.rotation.y = -time * 1.0;
            ring2.rotation.z = time * 0.8;
            heroGroup.position.y = 3.6 + Math.sin(time * 2) * 0.35;
          },
        });
      } else if (booth.modelType === 'aerospace') {
        // --- BOOTH 3: AEROSPACE SATELLITE PROBE ---
        // Main Satellite Body
        const satBodyGeo = new THREE.CylinderGeometry(1.0, 1.0, 2.4, 8);
        const satBodyMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 });
        const satBody = new THREE.Mesh(satBodyGeo, satBodyMat);
        heroGroup.add(satBody);

        // Solar Array Wings
        const wingGeo = new THREE.BoxGeometry(5.4, 0.1, 1.2);
        const wingMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, metalness: 0.8, roughness: 0.3 });
        const wing = new THREE.Mesh(wingGeo, wingMat);
        heroGroup.add(wing);

        // Dish Antenna
        const dishGeo = new THREE.SphereGeometry(1.0, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2);
        const dishMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, side: THREE.DoubleSide });
        const dish = new THREE.Mesh(dishGeo, dishMat);
        dish.position.y = 1.4;
        dish.rotation.x = -Math.PI / 4;
        heroGroup.add(dish);

        // Orbiting Ring
        const orbRingGeo = new THREE.TorusGeometry(3.6, 0.06, 6, 32);
        const orbRingMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });
        const orbRing = new THREE.Mesh(orbRingGeo, orbRingMat);
        orbRing.rotation.x = Math.PI / 3;
        heroGroup.add(orbRing);

        animatedBoothObjects.push({
          group: heroGroup,
          booth,
          update: (time) => {
            heroGroup.rotation.y = time * 0.5;
            heroGroup.position.y = 3.6 + Math.cos(time * 1.8) * 0.3;
            orbRing.rotation.z = time * 0.7;
          },
        });
      } else if (booth.modelType === 'cybersec') {
        // --- BOOTH 4: CYBERSECURITY VAULT TESSERACT ---
        // Outer Cube Wireframe
        const cube1Geo = new THREE.BoxGeometry(2.8, 2.8, 2.8);
        const cube1Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, wireframe: true });
        const cube1 = new THREE.Mesh(cube1Geo, cube1Mat);
        heroGroup.add(cube1);

        // Inner Solid Emerald Core
        const cube2Geo = new THREE.BoxGeometry(1.6, 1.6, 1.6);
        const cube2Mat = new THREE.MeshStandardMaterial({ color: 0x059669, metalness: 0.8, roughness: 0.2 });
        const cube2 = new THREE.Mesh(cube2Geo, cube2Mat);
        heroGroup.add(cube2);

        // Defensive Laser Barrier Rings
        const ringGeo = new THREE.TorusGeometry(3.4, 0.06, 8, 32);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
        const ringA = new THREE.Mesh(ringGeo, ringMat);
        ringA.rotation.x = Math.PI / 4;
        heroGroup.add(ringA);

        const ringB = new THREE.Mesh(ringGeo, ringMat);
        ringB.rotation.y = Math.PI / 4;
        heroGroup.add(ringB);

        animatedBoothObjects.push({
          group: heroGroup,
          booth,
          update: (time) => {
            cube1.rotation.x = time * 0.6;
            cube1.rotation.y = time * 0.8;
            cube2.rotation.x = -time * 0.9;
            cube2.rotation.z = time * 0.7;
            ringA.rotation.z = time * 1.0;
            ringB.rotation.z = -time * 1.0;
            heroGroup.position.y = 3.6 + Math.sin(time * 1.5) * 0.25;
          },
        });
      } else {
        // --- BOOTH 5: MADHAV AGRAWAL DEVELOPER PAVILION ---
        // Floating Central Architect Prism (Double Octahedron)
        const octGeo = new THREE.OctahedronGeometry(2.2, 0);
        const octMat = new THREE.MeshStandardMaterial({
          color: 0x00f3ff,
          metalness: 0.95,
          roughness: 0.1,
        });
        const oct = new THREE.Mesh(octGeo, octMat);
        heroGroup.add(oct);

        // Wireframe Crystal Envelope
        const octWireGeo = new THREE.OctahedronGeometry(2.6, 1);
        const octWireMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
        const octWire = new THREE.Mesh(octWireGeo, octWireMat);
        heroGroup.add(octWire);

        // Floating Developer Project Orbiters
        const orbiterGroup = new THREE.Group();
        for (let o = 0; o < 3; o++) {
          const orbNodeGeo = new THREE.SphereGeometry(0.35, 12, 12);
          const orbNodeMat = new THREE.MeshBasicMaterial({ color: 0x00f3ff });
          const orbNode = new THREE.Mesh(orbNodeGeo, orbNodeMat);
          const orbAngle = (o / 3) * Math.PI * 2;
          orbNode.position.set(Math.cos(orbAngle) * 3.4, 0, Math.sin(orbAngle) * 3.4);
          orbiterGroup.add(orbNode);
        }
        heroGroup.add(orbiterGroup);

        // Vertical Architect Sky Beam
        const beamGeo = new THREE.CylinderGeometry(0.15, 0.4, 40, 12, 1, true);
        const beamMat = new THREE.MeshBasicMaterial({
          color: 0x00f3ff,
          transparent: true,
          opacity: 0.35,
          side: THREE.DoubleSide,
        });
        const beam = new THREE.Mesh(beamGeo, beamMat);
        beam.position.y = 20;
        heroGroup.add(beam);

        animatedBoothObjects.push({
          group: heroGroup,
          booth,
          update: (time) => {
            oct.rotation.y = time * 0.9;
            oct.rotation.x = Math.sin(time * 0.5) * 0.2;
            octWire.rotation.y = -time * 0.7;
            orbiterGroup.rotation.y = time * 1.3;
            heroGroup.position.y = 3.6 + Math.sin(time * 2.2) * 0.35;
          },
        });
      }

      boothGroup.add(heroGroup);

      // Invisible Raycasting Click Target Sphere (for easy selection)
      const hitSphereGeo = new THREE.SphereGeometry(6.5, 8, 8);
      const hitSphereMat = new THREE.MeshBasicMaterial({ visible: false });
      const hitSphere = new THREE.Mesh(hitSphereGeo, hitSphereMat);
      hitSphere.position.y = 3.5;
      boothGroup.add(hitSphere);

      raycastList.push({ mesh: hitSphere, booth });
      boothsGroup.add(boothGroup);
    });

    scene.add(boothsGroup);
    raycastObjectsRef.current = raycastList;

    // 11. Mouse & Raycasting Setup
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-1000, -1000);

    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Handle Free Orbit Drag
      if (isFreeOrbitRef.current && isDraggingRef.current) {
        const deltaX = e.clientX - prevMousePosRef.current.x;
        const deltaY = e.clientY - prevMousePosRef.current.y;
        prevMousePosRef.current = { x: e.clientX, y: e.clientY };

        orbitAngleRef.current.theta -= deltaX * 0.006;
        orbitAngleRef.current.phi = Math.max(
          0.1,
          Math.min(Math.PI / 2.2, orbitAngleRef.current.phi - deltaY * 0.005)
        );
      }
    };

    const onPointerDown = (e: MouseEvent) => {
      if (isFreeOrbitRef.current) {
        isDraggingRef.current = true;
        prevMousePosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (isFreeOrbitRef.current) {
        orbitAngleRef.current.radius = Math.max(
          20,
          Math.min(95, orbitAngleRef.current.radius + e.deltaY * 0.05)
        );
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clickMouse = new THREE.Vector2(
        ((e.clientX - rect.left) / rect.width) * 2 - 1,
        -((e.clientY - rect.top) / rect.height) * 2 + 1
      );
      raycaster.setFromCamera(clickMouse, camera);
      const meshesToTest = raycastObjectsRef.current.map((r) => r.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const match = raycastObjectsRef.current.find((r) => r.mesh === intersects[0].object);
        if (match) {
          cyberSound.playWarp();
          onSelectBooth(match.booth);
        }
      }
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: true });
    container.addEventListener('click', onClick);

    // 12. Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Context loss prevention
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('WebGL context lost, pausing render.');
    };
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

    setIsSceneReady(true);

    // 13. Cinematic Camera Tour Waypoints for Scroll Progress
    const tourWaypoints = [
      {
        pos: new THREE.Vector3(0, 18, 55),
        look: new THREE.Vector3(0, 5, 0),
      },
      {
        pos: new THREE.Vector3(-25, 12, 35),
        look: new THREE.Vector3(-35, 4, 15),
      }, // RoboWars
      {
        pos: new THREE.Vector3(-6, 14, 5),
        look: new THREE.Vector3(-12, 6, -20),
      }, // Quantum AI
      {
        pos: new THREE.Vector3(12, 16, -5),
        look: new THREE.Vector3(20, 8, -25),
      }, // Aerospace
      {
        pos: new THREE.Vector3(24, 12, 28),
        look: new THREE.Vector3(35, 5, 12),
      }, // CyberSec
      {
        pos: new THREE.Vector3(0, 16, 22),
        look: new THREE.Vector3(0, 7, 0),
      }, // Madhav Developer Pavilion
    ];

    // Helper: Interpolate between waypoints along scroll progress [0, 1]
    const getScrollCameraPos = (progress: number) => {
      const clamped = Math.max(0, Math.min(0.999, progress));
      const totalSegments = tourWaypoints.length - 1;
      const floatIndex = clamped * totalSegments;
      const index = Math.floor(floatIndex);
      const t = floatIndex - index;

      const p0 = tourWaypoints[index].pos;
      const p1 = tourWaypoints[index + 1].pos;
      const l0 = tourWaypoints[index].look;
      const l1 = tourWaypoints[index + 1].look;

      const outPos = new THREE.Vector3().lerpVectors(p0, p1, t);
      const outLook = new THREE.Vector3().lerpVectors(l0, l1, t);
      return { pos: outPos, look: outLook };
    };

    // 14. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Animate booth hero models
      animatedBoothObjects.forEach((item) => {
        item.update(elapsed);
      });

      // Animate flying vehicles
      trafficMeshes.forEach((t) => {
        t.angle += t.speed;
        t.mesh.position.x = Math.cos(t.angle) * t.radius;
        t.mesh.position.z = Math.sin(t.angle) * t.radius;
        t.mesh.quaternion.setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          new THREE.Vector3(-Math.sin(t.angle), 0, Math.cos(t.angle)).normalize()
        );
      });

      // Animate particle dust
      particleSystem.rotation.y = elapsed * 0.02;

      // Raycast hovering test
      raycaster.setFromCamera(mouse, camera);
      const meshesToTest = raycastObjectsRef.current.map((r) => r.mesh);
      const intersects = raycaster.intersectObjects(meshesToTest);

      if (intersects.length > 0) {
        const found = raycastObjectsRef.current.find((r) => r.mesh === intersects[0].object);
        if (found) {
          setHoveredBoothInternal(found.booth);
          onHoverBooth(found.booth);
          if (container) container.style.cursor = 'pointer';
        }
      } else {
        setHoveredBoothInternal(null);
        onHoverBooth(null);
        if (container) container.style.cursor = isFreeOrbitRef.current ? 'grab' : 'default';
      }

      // Camera Movement Logic
      if (isFreeOrbitRef.current) {
        // Free Orbit Mode
        const { theta, phi, radius } = orbitAngleRef.current;
        const x = radius * Math.sin(phi) * Math.sin(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.cos(theta);

        camera.position.lerp(new THREE.Vector3(x, y, z), 0.08);
        currentCameraLook.current.lerp(new THREE.Vector3(0, 5, 0), 0.08);
        camera.lookAt(currentCameraLook.current);
      } else if (activeBoothIdRef.current) {
        // Focused on a specific booth
        const selected = BOOTHS_DATA.find((b) => b.id === activeBoothIdRef.current);
        if (selected) {
          cameraTargetPos.current.set(...selected.cameraPosition);
          cameraTargetLook.current.set(...selected.cameraLookAt);

          camera.position.lerp(cameraTargetPos.current, 0.06);
          currentCameraLook.current.lerp(cameraTargetLook.current, 0.06);
          camera.lookAt(currentCameraLook.current);
        }
      } else {
        // Scroll-driven tour mode
        const { pos, look } = getScrollCameraPos(scrollProgressRef.current);
        camera.position.lerp(pos, 0.07);
        currentCameraLook.current.lerp(look, 0.07);
        camera.lookAt(currentCameraLook.current);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onHoverBooth, onSelectBooth]);

  return (
    <div className="relative w-full h-full select-none">
      {/* 3D Canvas Container */}
      <div ref={containerRef} className="w-full h-full absolute inset-0 z-0" />

      {/* Subtle Cyber Scanline Overlay */}
      <div className="absolute inset-0 cyber-scanlines z-[1] pointer-events-none opacity-30" />

      {/* Floating 3D Hover Tooltip HUD */}
      {hoveredBooth && (
        <div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none cyber-glass px-5 py-3 rounded-lg border border-cyan-400/40 shadow-2xl transition-all duration-200 animate-fadeIn"
        >
          <div className="flex items-center gap-3">
            <span
              className="w-2.5 h-2.5 rounded-full shadow-lg"
              style={{ backgroundColor: hoveredBooth.themeColor }}
            />
            <div>
              <div className="text-[11px] font-mono tracking-wider text-cyan-400">
                {hoveredBooth.codename}
              </div>
              <div className="text-base font-cyber font-bold text-white tracking-wide">
                {hoveredBooth.name}
              </div>
              <div className="text-xs text-slate-300">
                {hoveredBooth.tagline} · Click to Warp Inspect
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Camera Controls HUD */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        <button
          onClick={() => {
            cyberSound.playClick();
            onToggleFreeOrbit();
          }}
          className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-all ${
            isFreeOrbit
              ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,243,255,0.3)]'
              : 'bg-black/60 text-slate-300 border-slate-700 hover:border-cyan-500/50'
          }`}
          title="Toggle free orbit camera mode"
        >
          {isFreeOrbit ? 'Orbit Active (Drag to Rotate)' : '3D Scroll Tour Active'}
        </button>
      </div>
    </div>
  );
};
