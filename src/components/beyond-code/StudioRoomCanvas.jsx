import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { beyondCodeData } from '../../data/beyondCodeData';
import './StudioRoomCanvas.css';

/**
 * Beyond Code — Miniature Creative Studio in a Sunlit Garden Clearing
 * Art Direction: Warm natural wooden architecture, buttery cream walls, climbing ivy,
 * lush contoured garden clearing with wildflowers & framing trees, golden afternoon sunlight.
 * Clean, artefact-free rendering with procedural textures, instanced vegetation & rich lived-in details.
 */

export default function StudioRoomCanvas({
  selectedAreaId,
  onSelectArea,
  lightingMood = 'golden'
}) {
  const mountRef = useRef(null);
  const [hoveredArea, setHoveredArea] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [isWebGLError, setIsWebGLError] = useState(false);
  const [isCanvasLoading, setIsCanvasLoading] = useState(true);

  // References to keep animation loop and scene objects in sync
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const interactiveGroupsRef = useRef({});
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2(-999, -999));
  const cameraTargetRef = useRef(new THREE.Vector3(0, 3.2, 0));
  const cameraBasePosRef = useRef(new THREE.Vector3(29, 22.6, 29));
  const currentCameraPosRef = useRef(new THREE.Vector3(29, 22.6, 29));
  const isDraggingRef = useRef(false);
  const previousPointerRef = useRef({ x: 0, y: 0 });
  const lightsRef = useRef({});

  // Focus coordinates for the 6 interactive areas
  const areaFocusCoords = {
    baking: new THREE.Vector3(-4.8, 2.6, -2.6),
    writing: new THREE.Vector3(-1.8, 2.9, -5.6),
    reading: new THREE.Vector3(5.2, 3.4, -5.2),
    photography: new THREE.Vector3(5.8, 3.0, -0.6),
    workshop: new THREE.Vector3(0.4, 2.4, 1.8),
    personal: new THREE.Vector3(4.5, 2.3, 4.4)
  };

  // Helper to build reusable styled materials with warm natural tones
  const createMaterial = (colorHex, roughness = 0.55, metalness = 0.08) => {
    return new THREE.MeshStandardMaterial({
      color: new THREE.Color(colorHex),
      roughness,
      metalness,
      flatShading: false
    });
  };

  // =========================================================================
  // PROCEDURAL TEXTURE GENERATION (100% Z-fighting & shimmer free)
  // =========================================================================

  // Procedural Wood Plank Floor Texture with subtle grain, grooves & peg nails
  const createWoodPlankTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Base warm honey-oak background
    ctx.fillStyle = '#B27E4E';
    ctx.fillRect(0, 0, 1024, 1024);

    const numPlanks = 12;
    const plankHeight = 1024 / numPlanks;
    const plankShades = ['#BA8554', '#B27E4E', '#AB7747', '#BD8958', '#A67343', '#B68250'];

    for (let i = 0; i < numPlanks; i++) {
      const y = i * plankHeight;
      // Individual board color variation
      ctx.fillStyle = plankShades[i % plankShades.length];
      ctx.fillRect(0, y, 1024, plankHeight);

      // Subtle longitudinal wood grain lines
      ctx.fillStyle = 'rgba(78, 45, 18, 0.06)';
      for (let g = 0; g < 6; g++) {
        const gy = y + 4 + g * (plankHeight / 6.5);
        ctx.fillRect(0, gy, 1024, 1.5);
      }

      // Staggered vertical butt joints & wooden pegs
      const jointX = (i % 2 === 0) ? 460 : 780;
      ctx.fillStyle = '#5A3618';
      ctx.fillRect(jointX, y, 2.5, plankHeight);

      // Wooden peg nails at joint ends
      ctx.fillStyle = '#4A2A10';
      ctx.beginPath();
      ctx.arc(jointX - 12, y + 10, 2.2, 0, Math.PI * 2);
      ctx.arc(jointX + 12, y + 10, 2.2, 0, Math.PI * 2);
      ctx.arc(jointX - 12, y + plankHeight - 10, 2.2, 0, Math.PI * 2);
      ctx.arc(jointX + 12, y + plankHeight - 10, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // Recessed dark seam between boards
      ctx.fillStyle = '#5A3618';
      ctx.fillRect(0, y + plankHeight - 2.5, 1024, 2.5);
      // Soft highlight on upper bevel
      ctx.fillStyle = 'rgba(255, 238, 205, 0.18)';
      ctx.fillRect(0, y, 1024, 1.2);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  };

  // Procedural Artisan Woven Rug Texture (Terracotta, Cream, Sage diamond motif)
  const createArtisanRugTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Terracotta base
    ctx.fillStyle = '#C85830';
    ctx.fillRect(0, 0, 512, 512);

    // Warm cream inner field
    ctx.fillStyle = '#FAF6EC';
    ctx.fillRect(36, 36, 440, 440);

    // Sage green framing border
    ctx.strokeStyle = '#4A7A40';
    ctx.lineWidth = 10;
    ctx.strokeRect(54, 54, 404, 404);

    // Terracotta decorative geometric diamond row
    ctx.fillStyle = '#C85830';
    const numDiamonds = 5;
    const step = 404 / numDiamonds;
    for (let ix = 0; ix < numDiamonds; ix++) {
      for (let iy = 0; iy < numDiamonds; iy++) {
        const cx = 54 + (ix + 0.5) * step;
        const cy = 54 + (iy + 0.5) * step;
        ctx.beginPath();
        ctx.moveTo(cx, cy - 20);
        ctx.lineTo(cx + 20, cy);
        ctx.lineTo(cx, cy + 20);
        ctx.lineTo(cx - 20, cy);
        ctx.closePath();
        ctx.fill();

        // Small amber center pip
        ctx.fillStyle = '#F5B72F';
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#C85830';
      }
    }

    // Fringed ends detail
    ctx.fillStyle = '#EDE5D2';
    for (let f = 10; f < 502; f += 8) {
      ctx.fillRect(f, 0, 3, 10);
      ctx.fillRect(f, 502, 3, 10);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.generateMipmaps = true;
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return texture;
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. WebGL Support Check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLError(true);
        setIsCanvasLoading(false);
        return;
      }
    } catch (e) {
      setIsWebGLError(true);
      setIsCanvasLoading(false);
      return;
    }

    // 2. Scene & Renderer Initialization
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#F2EEE3');
    sceneRef.current = scene;

    // Isometric-style Perspective Camera
    const camera = new THREE.PerspectiveCamera(28, width / height, 0.5, 240);
    const isMobile = width < 768;
    const initialDistance = isMobile ? 41 : 29;
    const heightFactor = isMobile ? 0.64 : 0.78;
    camera.position.set(initialDistance, initialDistance * heightFactor, initialDistance);
    camera.lookAt(0, isMobile ? 2.6 : 3.2, 0);
    cameraRef.current = camera;
    currentCameraPosRef.current.copy(camera.position);
    cameraBasePosRef.current.copy(camera.position);

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
        alpha: false
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.06;
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.error('Failed to create WebGLRenderer:', err);
      setIsWebGLError(true);
      setIsCanvasLoading(false);
      return;
    }

    // 3. Warm Afternoon Sunlight & Atmospheric Lighting
    const ambientLight = new THREE.AmbientLight('#FFF5E6', 0.95);
    scene.add(ambientLight);
    lightsRef.current.ambient = ambientLight;

    // Main Golden Afternoon Sun (tuned bias & normalBias to eliminate shadow acne completely)
    const sunLight = new THREE.DirectionalLight('#FFE2B5', 1.75);
    sunLight.position.set(19, 29, 17);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 2;
    sunLight.shadow.camera.far = 80;
    sunLight.shadow.camera.left = -22;
    sunLight.shadow.camera.right = 22;
    sunLight.shadow.camera.top = 22;
    sunLight.shadow.camera.bottom = -22;
    sunLight.shadow.bias = -0.0001;
    sunLight.shadow.normalBias = 0.025;
    scene.add(sunLight);
    lightsRef.current.sun = sunLight;

    // Sky Fill Light (Soft cool azure to contrast warm sunlight)
    const skyLight = new THREE.DirectionalLight('#C5E0F2', 0.45);
    skyLight.position.set(-18, 16, 12);
    scene.add(skyLight);
    lightsRef.current.fill = skyLight;

    // Warm Terracotta Bounce Rim Light
    const bounceLight = new THREE.DirectionalLight('#E08264', 0.38);
    bounceLight.position.set(0, 14, -20);
    scene.add(bounceLight);
    lightsRef.current.rim = bounceLight;

    // Cozy Interior Glows
    const ovenGlow = new THREE.PointLight('#FF6B4A', 1.3, 5);
    ovenGlow.position.set(-5.6, 2.2, -3.2);
    scene.add(ovenGlow);

    const deskGlow = new THREE.PointLight('#FFF1C7', 1.15, 4.5);
    deskGlow.position.set(-2.0, 3.4, -6.2);
    scene.add(deskGlow);

    const readingGlow = new THREE.PointLight('#FFE2B8', 1.3, 6);
    readingGlow.position.set(6.2, 4.3, -5.4);
    scene.add(readingGlow);

    // =========================================================================
    // 4. THE LUSH GARDEN CLEARING (Extending beyond room, organic & landscaped)
    // =========================================================================
    const gardenRoot = new THREE.Group();
    scene.add(gardenRoot);

    // Organic Garden Ground Terrain (large contoured meadow clearing)
    const meadowGeo = new THREE.CylinderGeometry(23.5, 24.5, 1.4, 48);
    const meadowMat = createMaterial('#5A8A4C', 0.88, 0.02); // Rich natural meadow green
    const meadow = new THREE.Mesh(meadowGeo, meadowMat);
    meadow.position.y = -0.7;
    meadow.receiveShadow = true;
    gardenRoot.add(meadow);

    // Outer Shaded Woodland Berm / Rich Forest Underlayer
    const woodlandBermGeo = new THREE.CylinderGeometry(26, 27, 0.8, 48);
    const woodlandBermMat = createMaterial('#446B38', 0.95);
    const woodlandBerm = new THREE.Mesh(woodlandBermGeo, woodlandBermMat);
    woodlandBerm.position.y = -1.1;
    woodlandBerm.receiveShadow = true;
    gardenRoot.add(woodlandBerm);

    // Organic Rolling Knolls & Grassy Mounds (Framing the clearing naturally)
    const moundMat1 = createMaterial('#4E7D42', 0.9);
    const moundMat2 = createMaterial('#568548', 0.9);
    const moundMat3 = createMaterial('#416634', 0.92);

    const moundDefs = [
      { x: -14.5, y: -0.3, z: -11.5, rx: 6.2, ry: 1.4, rz: 5.5, mat: moundMat1 },
      { x: 0.5, y: -0.25, z: -16.5, rx: 7.5, ry: 1.6, rz: 5.2, mat: moundMat3 },
      { x: 14.5, y: -0.3, z: -12.5, rx: 6.5, ry: 1.5, rz: 5.8, mat: moundMat2 },
      { x: 17.5, y: -0.35, z: 3.5, rx: 5.5, ry: 1.3, rz: 6.2, mat: moundMat1 },
      { x: -16.5, y: -0.35, z: 4.5, rx: 5.8, ry: 1.3, rz: 6.5, mat: moundMat2 }
    ];

    moundDefs.forEach(({ x, y, z, rx, ry, rz, mat }) => {
      const knoll = new THREE.Mesh(new THREE.SphereGeometry(1, 16, 12), mat);
      knoll.scale.set(rx, ry, rz);
      knoll.position.set(x, y, z);
      knoll.receiveShadow = true;
      gardenRoot.add(knoll);
    });

    // Dark Mulch / Forest Soil Garden Beds around tree perimeter
    const soilBedMat = createMaterial('#38281B', 0.96);
    const soilBeds = [
      { x: -15, z: -13, r: 4.2 },
      { x: -1, z: -17, r: 4.8 },
      { x: 15.5, z: -13.5, r: 4.5 },
      { x: 18, z: 4, r: 4.0 },
      { x: -18, z: 5, r: 4.0 }
    ];
    soilBeds.forEach(({ x, z, r }) => {
      const bed = new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.1, 0.18, 20), soilBedMat);
      bed.position.set(x, 0.08, z);
      bed.receiveShadow = true;
      gardenRoot.add(bed);
    });

    // Flagstone Garden Stepping Stones (Natural curved garden path leading to front)
    const stoneGeo = new THREE.CylinderGeometry(0.85, 0.9, 0.14, 9);
    const stoneMat = createMaterial('#D6C8B5', 0.88); // Natural limestone
    const stoneCoords = [
      [2.8, 0.07, 8.6, 0.12, 1.1, 0.95],
      [1.4, 0.07, 10.2, -0.25, 0.95, 1.15],
      [-0.3, 0.07, 11.8, 0.18, 1.2, 0.9],
      [-2.1, 0.07, 13.4, -0.15, 1.05, 1.05],
      [-3.9, 0.07, 14.8, 0.28, 1.15, 0.92]
    ];
    stoneCoords.forEach(([sx, sy, sz, srot, scx, scz]) => {
      const stone = new THREE.Mesh(stoneGeo, stoneMat);
      stone.position.set(sx, sy, sz);
      stone.rotation.y = srot;
      stone.scale.set(scx, 1, scz);
      stone.castShadow = true;
      stone.receiveShadow = true;
      gardenRoot.add(stone);
    });

    // Moss Tufts cushioning rock borders
    const mossMat = createMaterial('#426830', 0.95);
    const mossGeo = new THREE.SphereGeometry(0.3, 8, 6);
    [
      [2.0, 0.08, 9.2], [3.6, 0.08, 8.1], [0.6, 0.08, 10.9],
      [-1.1, 0.08, 12.6], [-2.8, 0.08, 14.1]
    ].forEach(([mx, my, mz]) => {
      const moss = new THREE.Mesh(mossGeo, mossMat);
      moss.scale.set(1.4, 0.45, 1.2);
      moss.position.set(mx, my, mz);
      moss.receiveShadow = true;
      gardenRoot.add(moss);
    });

    // =========================================================================
    // 5. TREES FRAMING THE ROOM (Back and Sides - Center Open)
    // =========================================================================
    const barkMat = createMaterial('#4A321E', 0.88); // Warm dark hardwood bark
    const birchBarkMat = createMaterial('#C4B49E', 0.75); // Birch bark
    const leafDarkMat = createMaterial('#2E5022', 0.85); // Deep canopy shade
    const leafMidMat = createMaterial('#4A7C38', 0.85); // Rich meadow green
    const leafLightMat = createMaterial('#6BA34B', 0.8); // Sunlit warm green
    const blossomMat = createMaterial('#FFF0F4', 0.7); // Delicate flowering blossoms

    // Helper: Create a stately stylized tree with multi-tiered canopy
    const createFramingTree = (tx, tz, height, canopyRadius, isBirch = false, hasFlowers = false) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tx, 0, tz);

      // Tapered Main Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.38, 0.65, height * 0.6, 10);
      const trunk = new THREE.Mesh(trunkGeo, isBirch ? birchBarkMat : barkMat);
      trunk.position.y = (height * 0.6) / 2;
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      treeGroup.add(trunk);

      // Secondary spreading boughs
      const boughGeo = new THREE.CylinderGeometry(0.18, 0.28, height * 0.35, 8);
      [
        { rotZ: 0.35, rotY: 0.5, py: height * 0.45 },
        { rotZ: -0.38, rotY: 2.1, py: height * 0.48 },
        { rotX: 0.32, rotY: -1.2, py: height * 0.52 }
      ].forEach(({ rotZ = 0, rotY = 0, rotX = 0, py }) => {
        const bough = new THREE.Mesh(boughGeo, isBirch ? birchBarkMat : barkMat);
        bough.position.y = py;
        bough.rotation.x = rotX;
        bough.rotation.y = rotY;
        bough.rotation.z = rotZ;
        bough.castShadow = true;
        treeGroup.add(bough);
      });

      // Layered Multi-Tiered Canopy Clustered Clouds
      const cloudGeo = new THREE.DodecahedronGeometry(canopyRadius * 0.62, 1);
      const canopyOffsets = [
        { dx: 0, dy: height * 0.82, dz: 0, s: 1.15, mat: leafMidMat },
        { dx: canopyRadius * 0.4, dy: height * 0.72, dz: canopyRadius * 0.35, s: 0.95, mat: leafLightMat },
        { dx: -canopyRadius * 0.45, dy: height * 0.74, dz: -canopyRadius * 0.3, s: 0.9, mat: leafDarkMat },
        { dx: canopyRadius * 0.3, dy: height * 0.88, dz: -canopyRadius * 0.35, s: 0.85, mat: leafLightMat },
        { dx: -canopyRadius * 0.35, dy: height * 0.86, dz: canopyRadius * 0.3, s: 0.88, mat: leafMidMat },
        { dx: 0, dy: height * 0.98, dz: 0, s: 0.75, mat: leafLightMat }
      ];

      canopyOffsets.forEach(({ dx, dy, dz, s, mat }) => {
        const cloud = new THREE.Mesh(cloudGeo, mat);
        cloud.position.set(dx, dy, dz);
        cloud.scale.set(s, s * 0.85, s);
        cloud.castShadow = true;
        cloud.receiveShadow = true;
        treeGroup.add(cloud);
      });

      // Optional Blossom Clusters
      if (hasFlowers) {
        const blossomGeo = new THREE.DodecahedronGeometry(canopyRadius * 0.28, 1);
        [
          { dx: canopyRadius * 0.5, dy: height * 0.82, dz: 0.2 },
          { dx: -canopyRadius * 0.35, dy: height * 0.8, dz: canopyRadius * 0.4 },
          { dx: 0.2, dy: height * 0.92, dz: -canopyRadius * 0.4 }
        ].forEach(({ dx, dy, dz }) => {
          const blossom = new THREE.Mesh(blossomGeo, blossomMat);
          blossom.position.set(dx, dy, dz);
          blossom.scale.set(0.9, 0.9, 0.9);
          treeGroup.add(blossom);
        });
      }

      gardenRoot.add(treeGroup);
      return treeGroup;
    };

    // 5 Stately Trees Framing the Room (Room remains central focal point!)
    // 1. Back-Left Stately Elm
    createFramingTree(-15.5, -13.0, 16.5, 4.2, false, false);
    // 2. Far Back-Center Depth Canopy
    createFramingTree(-1.5, -17.8, 18.0, 4.8, false, false);
    // 3. Back-Right Flowering Orchard Tree
    createFramingTree(15.8, -13.5, 15.5, 4.0, false, true);
    // 4. Side-Right Medium Companion Birch
    createFramingTree(18.8, 3.8, 13.0, 3.5, true, false);
    // 5. Side-Left Lush Companion Tree
    createFramingTree(-18.5, 4.5, 13.5, 3.6, false, false);

    // Flowering Garden Shrubs (Hydrangea & Rhododendron clusters between trees)
    const bushGeo = new THREE.DodecahedronGeometry(1.2, 1);
    const coralBushMat = createMaterial('#D46238', 0.75);
    const creamBushMat = createMaterial('#FAF4E6', 0.8);
    const lilacBushMat = createMaterial('#9A7BA8', 0.8);

    const shrubLocations = [
      { x: -11.5, z: -11.0, col: coralBushMat, s: 1.1 },
      { x: -8.5, z: -14.5, col: leafMidMat, s: 1.3 },
      { x: 7.5, z: -15.0, col: creamBushMat, s: 1.2 },
      { x: 11.5, z: -11.5, col: lilacBushMat, s: 1.1 },
      { x: 16.0, z: -4.5, col: coralBushMat, s: 1.0 },
      { x: -15.5, z: -3.5, col: creamBushMat, s: 1.1 }
    ];

    shrubLocations.forEach(({ x, z, col, s }) => {
      const shrub = new THREE.Mesh(bushGeo, col);
      shrub.position.set(x, 0.95 * s, z);
      shrub.scale.set(s, s * 0.8, s);
      shrub.castShadow = true;
      shrub.receiveShadow = true;
      gardenRoot.add(shrub);
    });

    // =========================================================================
    // INSTANCED WILDFLOWERS & GROUND COVER (High performance & rich detail)
    // =========================================================================
    const dummy = new THREE.Object3D();

    // A. White Daisies with Yellow Centers (80 instances)
    const daisyPetalGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.03, 7);
    const daisyMat = createMaterial('#FAF8F1', 0.6);
    const daisyMesh = new THREE.InstancedMesh(daisyPetalGeo, daisyMat, 80);
    daisyMesh.receiveShadow = true;

    const daisyPositions = [];
    for (let di = 0; di < 80; di++) {
      const angle = (di / 80) * Math.PI * 2 + (Math.sin(di * 3.7) * 0.5);
      const rad = 8.8 + ((di * 13) % 11) * 1.15;
      const dx = Math.cos(angle) * rad;
      const dz = Math.sin(angle) * rad;
      // Keep pathway and room interior clear
      if (Math.abs(dx) < 7.5 && dz > -7.5 && dz < 7.5) continue;
      if (dx > -3.5 && dx < 3.5 && dz > 7.5) continue; // pathway

      daisyPositions.push({ x: dx, z: dz });
      dummy.position.set(dx, 0.12, dz);
      dummy.rotation.x = (Math.sin(di) * 0.1);
      dummy.rotation.y = di * 0.8;
      dummy.rotation.z = (Math.cos(di) * 0.1);
      const sc = 0.75 + (di % 5) * 0.1;
      dummy.scale.set(sc, 1, sc);
      dummy.updateMatrix();
      daisyMesh.setMatrixAt(di, dummy.matrix);
    }
    daisyMesh.instanceMatrix.needsUpdate = true;
    gardenRoot.add(daisyMesh);

    // B. Yellow Buttercups (60 instances)
    const buttercupGeo = new THREE.SphereGeometry(0.18, 7, 6);
    const buttercupMat = createMaterial('#F5B72F', 0.45);
    const buttercupMesh = new THREE.InstancedMesh(buttercupGeo, buttercupMat, 60);

    for (let bi = 0; bi < 60; bi++) {
      const angle = (bi / 60) * Math.PI * 2 + 1.2;
      const rad = 9.2 + ((bi * 17) % 9) * 1.2;
      const bx = Math.cos(angle) * rad;
      const bz = Math.sin(angle) * rad;
      if (Math.abs(bx) < 7.5 && bz > -7.5 && bz < 7.5) continue;
      if (bx > -3.5 && bx < 3.5 && bz > 7.5) continue;

      dummy.position.set(bx, 0.14, bz);
      dummy.rotation.y = bi * 0.7;
      const sc = 0.8 + (bi % 4) * 0.12;
      dummy.scale.set(sc, sc * 0.7, sc);
      dummy.updateMatrix();
      buttercupMesh.setMatrixAt(bi, dummy.matrix);
    }
    buttercupMesh.instanceMatrix.needsUpdate = true;
    gardenRoot.add(buttercupMesh);

    // C. Scarlet & Coral Poppy Accents (35 instances)
    const poppyGeo = new THREE.CylinderGeometry(0.22, 0.22, 0.04, 6);
    const poppyMat = createMaterial('#D94B34', 0.5);
    const poppyMesh = new THREE.InstancedMesh(poppyGeo, poppyMat, 35);

    for (let pi = 0; pi < 35; pi++) {
      const angle = (pi / 35) * Math.PI * 2 + 0.6;
      const rad = 10.0 + ((pi * 11) % 8) * 1.25;
      const px = Math.cos(angle) * rad;
      const pz = Math.sin(angle) * rad;
      if (Math.abs(px) < 7.5 && pz > -7.5 && pz < 7.5) continue;

      dummy.position.set(px, 0.13, pz);
      dummy.rotation.y = pi * 1.1;
      const sc = 0.7 + (pi % 3) * 0.15;
      dummy.scale.set(sc, 1, sc);
      dummy.updateMatrix();
      poppyMesh.setMatrixAt(pi, dummy.matrix);
    }
    poppyMesh.instanceMatrix.needsUpdate = true;
    gardenRoot.add(poppyMesh);

    // D. Delicate Fern Fronds around shady foundations & trees
    const fernMat = createMaterial('#385E2B', 0.85);
    const fernGeo = new THREE.BoxGeometry(0.12, 0.02, 0.75);
    const fernClusters = [
      [-8.8, 0.12, -7.5], [-9.2, 0.12, 2.5], [8.6, 0.12, -7.2],
      [-12.5, 0.12, -10.5], [13.2, 0.12, -11.0]
    ];
    fernClusters.forEach(([fx, fy, fz]) => {
      const fGroup = new THREE.Group();
      fGroup.position.set(fx, fy, fz);
      for (let fi = 0; fi < 6; fi++) {
        const frond = new THREE.Mesh(fernGeo, fernMat);
        frond.rotation.y = (fi / 6) * Math.PI * 2;
        frond.rotation.x = 0.45;
        frond.position.set(Math.cos(fi) * 0.25, 0.15, Math.sin(fi) * 0.25);
        fGroup.add(frond);
      }
      gardenRoot.add(fGroup);
    });

    // E. Fallen Autumn Leaves scattered on grass & stone edges
    const leafGeoShared = new THREE.PlaneGeometry(0.22, 0.32);
    const fallenMat1 = createMaterial('#D46238', 0.9);
    const fallenMat2 = createMaterial('#E29D44', 0.9);
    const fallenCoords = [
      [2.2, 0.11, 8.2, 0.3, fallenMat1],
      [1.6, 0.11, 9.8, -0.6, fallenMat2],
      [0.2, 0.11, 11.2, 0.8, fallenMat1],
      [-1.5, 0.11, 12.8, -0.4, fallenMat2],
      [-7.5, 0.11, 6.5, 1.2, fallenMat1],
      [7.2, 0.11, 6.8, -0.9, fallenMat2],
      [6.8, 0.11, -2.5, 0.5, fallenMat1]
    ];
    fallenCoords.forEach(([lx, ly, lz, lrot, lmat]) => {
      const leafMesh = new THREE.Mesh(leafGeoShared, lmat);
      leafMesh.rotation.x = -Math.PI / 2;
      leafMesh.rotation.z = lrot;
      leafMesh.position.set(lx, ly, lz);
      gardenRoot.add(leafMesh);
    });

    // =========================================================================
    // 6. MINIATURE STUDIO ARCHITECTURE (Clean, coplanar-free & non-flickering)
    // =========================================================================
    const roomRoot = new THREE.Group();
    scene.add(roomRoot);

    const darkWoodMat = createMaterial('#6A401C', 0.72, 0.05); // Deep walnut timbers
    const warmCreamWallMat = createMaterial('#FDF8EE', 0.75); // Buttery cream
    const paleYellowWallMat = createMaterial('#FFF6DC', 0.75); // Soft sunlight pale yellow
    const terracottaMat = createMaterial('#D46238', 0.7); // Warm terracotta

    // Room Foundation Platform (Distinct vertical slab, no overlap)
    const platformGeo = new THREE.BoxGeometry(17.2, 0.35, 17.2);
    const platformMat = createMaterial('#7E4C20', 0.85);
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.175;
    platform.receiveShadow = true;
    roomRoot.add(platform);

    // Wood Plank Floor inside room (Single seamless mesh textured procedurally)
    const woodPlankTex = createWoodPlankTexture();
    const floorMat = new THREE.MeshStandardMaterial({
      map: woodPlankTex,
      roughness: 0.72,
      metalness: 0.05
    });
    const floorGeo = new THREE.BoxGeometry(16.8, 0.18, 16.8);
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.position.y = 0.09;
    floor.receiveShadow = true;
    roomRoot.add(floor);

    // Handwoven Artisan Rug (Terracotta, Cream, Sage diamond motif)
    const rugTex = createArtisanRugTexture();
    const rugMat = new THREE.MeshStandardMaterial({
      map: rugTex,
      roughness: 0.9,
      metalness: 0.02
    });
    const rugGeo = new THREE.BoxGeometry(7.2, 0.04, 5.6);
    const rug = new THREE.Mesh(rugGeo, rugMat);
    rug.position.set(0.6, 0.20, 0.8);
    rug.receiveShadow = true;
    roomRoot.add(rug);

    // --- Back-Left Wall: Buttery Cream with Arched Picture Window ---
    // Height 11.8 (y from 0.18 to 11.98), stops cleanly beneath ring beams
    const leftWallGeo = new THREE.BoxGeometry(0.45, 11.8, 16.8);
    const leftWall = new THREE.Mesh(leftWallGeo, warmCreamWallMat);
    leftWall.position.set(-8.55, 6.08, 0);
    leftWall.receiveShadow = true;
    roomRoot.add(leftWall);

    // --- Back-Right Wall: Soft Pale Yellow with Wood Molding ---
    const backWallGeo = new THREE.BoxGeometry(16.8, 11.8, 0.45);
    const backWall = new THREE.Mesh(backWallGeo, paleYellowWallMat);
    backWall.position.set(0, 6.08, -8.55);
    backWall.receiveShadow = true;
    roomRoot.add(backWall);

    // Corner Support Timber Posts (Height 11.8, flush with walls)
    const pillarGeo = new THREE.BoxGeometry(0.65, 11.8, 0.65);
    const cornerPillar = new THREE.Mesh(pillarGeo, darkWoodMat);
    cornerPillar.position.set(-8.5, 6.08, -8.5);
    roomRoot.add(cornerPillar);

    const pillarFrontL = new THREE.Mesh(pillarGeo, darkWoodMat);
    pillarFrontL.position.set(-8.5, 6.08, 8.35);
    roomRoot.add(pillarFrontL);

    const pillarFrontR = new THREE.Mesh(pillarGeo, darkWoodMat);
    pillarFrontR.position.set(8.35, 6.08, -8.5);
    roomRoot.add(pillarFrontR);

    // Baseboards along walls (Height 0.5, y from 0.18 to 0.68)
    const baseboardGeoL = new THREE.BoxGeometry(0.55, 0.5, 16.8);
    const baseboardL = new THREE.Mesh(baseboardGeoL, darkWoodMat);
    baseboardL.position.set(-8.45, 0.43, 0);
    roomRoot.add(baseboardL);

    const baseboardGeoB = new THREE.BoxGeometry(16.8, 0.5, 0.55);
    const baseboardB = new THREE.Mesh(baseboardGeoB, darkWoodMat);
    baseboardB.position.set(0, 0.43, -8.45);
    roomRoot.add(baseboardB);

    // Wooden Wainscoting / Chair Rail (Height 0.22 at y = 3.8)
    const chairRailL = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.22, 16.8), darkWoodMat);
    chairRailL.position.set(-8.48, 3.8, 0);
    roomRoot.add(chairRailL);

    const chairRailB = new THREE.Mesh(new THREE.BoxGeometry(16.8, 0.22, 0.52), darkWoodMat);
    chairRailB.position.set(0, 3.8, -8.48);
    roomRoot.add(chairRailB);

    // Upper Wall Plates / Ring Beams (Resting on wall tops: y from 11.98 to 12.48)
    const topBeamL = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, 17.2), darkWoodMat);
    topBeamL.position.set(-8.55, 12.23, 0);
    roomRoot.add(topBeamL);

    const topBeamB = new THREE.Mesh(new THREE.BoxGeometry(17.2, 0.5, 0.55), darkWoodMat);
    topBeamB.position.set(0, 12.23, -8.55);
    roomRoot.add(topBeamB);

    // Roof Rafter Beams spanning across ceiling (Resting atop ring beams: y from 12.48 to 12.92)
    const rafterGeo = new THREE.BoxGeometry(17.2, 0.44, 0.36);
    [-5.6, -1.8, 1.8, 5.6].forEach((rz) => {
      const rafter = new THREE.Mesh(rafterGeo, darkWoodMat);
      rafter.position.set(0, 12.7, rz);
      rafter.castShadow = true;
      roomRoot.add(rafter);
    });

    // Large Studio Timber Window on Left Wall overlooking Lush Garden
    const windowCasingMat = darkWoodMat;
    const glassMat = new THREE.MeshStandardMaterial({
      color: '#E0F3EC',
      roughness: 0.2,
      metalness: 0.05,
      emissive: '#BCE8D5',
      emissiveIntensity: 0.55
    });
    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.06, 5.4, 4.6), glassMat);
    glass.position.set(-8.30, 6.8, -0.4);
    roomRoot.add(glass);

    // Frame Border: Top, Bottom, Sides (Framing glass without overlap)
    const frameTop = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 4.8), windowCasingMat);
    frameTop.position.set(-8.22, 9.5, -0.4);
    roomRoot.add(frameTop);

    const frameBottom = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.25, 4.8), windowCasingMat);
    frameBottom.position.set(-8.22, 4.1, -0.4);
    roomRoot.add(frameBottom);

    const frameSide1 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5.4, 0.25), windowCasingMat);
    frameSide1.position.set(-8.22, 6.8, -2.68);
    roomRoot.add(frameSide1);

    const frameSide2 = new THREE.Mesh(new THREE.BoxGeometry(0.2, 5.4, 0.25), windowCasingMat);
    frameSide2.position.set(-8.22, 6.8, 1.88);
    roomRoot.add(frameSide2);

    // Window Mullions (6 divided panes)
    const mullionV1 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 5.4, 0.12), windowCasingMat);
    mullionV1.position.set(-8.20, 6.8, -1.15);
    roomRoot.add(mullionV1);

    const mullionV2 = new THREE.Mesh(new THREE.BoxGeometry(0.14, 5.4, 0.12), windowCasingMat);
    mullionV2.position.set(-8.20, 6.8, 0.35);
    roomRoot.add(mullionV2);

    const mullionH = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.12, 4.6), windowCasingMat);
    mullionH.position.set(-8.20, 6.8, -0.4);
    roomRoot.add(mullionH);

    // Soft Cream Linen Curtains gathered at sides
    const curtainMat = createMaterial('#FAF6EE', 0.9);
    const curtainL = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.38, 5.6, 10), curtainMat);
    curtainL.position.set(-8.12, 6.8, -2.5);
    curtainL.castShadow = true;
    roomRoot.add(curtainL);

    const curtainR = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.38, 5.6, 10), curtainMat);
    curtainR.position.set(-8.12, 6.8, 1.7);
    curtainR.castShadow = true;
    roomRoot.add(curtainR);

    // Curtain Rod in warm brass
    const rodMat = createMaterial('#E0A535', 0.2, 0.9);
    const curtainRod = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 5.2, 8), rodMat);
    curtainRod.rotation.x = Math.PI / 2;
    curtainRod.position.set(-8.02, 9.65, -0.4);
    roomRoot.add(curtainRod);

    // Timber Window Sill with Potted Herbs & Blooming Flowers
    const windowSill = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.2, 5.2), darkWoodMat);
    windowSill.position.set(-8.02, 3.95, -0.4);
    windowSill.castShadow = true;
    roomRoot.add(windowSill);

    const sillPot = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.2, 0.5, 12), terracottaMat);
    sillPot.position.set(-7.98, 4.3, -1.6);
    sillPot.castShadow = true;
    roomRoot.add(sillPot);

    const herbBush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35), createMaterial('#4E7C3C', 0.8));
    herbBush.position.set(-7.98, 4.7, -1.6);
    herbBush.castShadow = true;
    roomRoot.add(herbBush);

    const sillPot2 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.16, 0.42, 12), terracottaMat);
    sillPot2.position.set(-7.98, 4.25, 0.8);
    sillPot2.castShadow = true;
    roomRoot.add(sillPot2);

    const flowerBush = new THREE.Mesh(new THREE.DodecahedronGeometry(0.28), createMaterial('#D46238', 0.7));
    flowerBush.position.set(-7.98, 4.6, 0.8);
    roomRoot.add(flowerBush);

    // =========================================================================
    // 7. ROOF VEGETATION & CLIMBING IVY (Natural, varied & center open)
    // =========================================================================
    const foliageGroup = new THREE.Group();
    roomRoot.add(foliageGroup);

    const ivyLeafGeo = new THREE.ConeGeometry(0.18, 0.42, 4);
    const ivyLeafDark = createMaterial('#325624', 0.8);
    const ivyLeafMid = createMaterial('#4A7C38', 0.8);
    const ivyLeafLight = createMaterial('#6BA34B', 0.75);
    const starBlossomGeo = new THREE.DodecahedronGeometry(0.08, 1);
    const starBlossomMat = createMaterial('#FFFBF0', 0.5);

    // Helper: Add trailing ivy branch with leaves and occasional delicate blossoms
    const addTrailingVine = (startX, startY, startZ, length, direction = 'down') => {
      const vineGroup = new THREE.Group();
      vineGroup.position.set(startX, startY, startZ);

      const segments = Math.floor(length * 3.8);
      for (let s = 0; s < segments; s++) {
        const t = s / segments;
        const leaf = new THREE.Mesh(ivyLeafGeo, s % 3 === 0 ? ivyLeafLight : (s % 2 === 0 ? ivyLeafMid : ivyLeafDark));
        const yOff = direction === 'down' ? -t * length : (Math.sin(t * Math.PI) * 0.35);
        const xOff = (Math.sin(s * 1.4) * 0.22);
        const zOff = direction === 'down' ? (Math.cos(s * 1.6) * 0.2) : t * length;

        leaf.position.set(xOff, yOff, zOff);
        leaf.rotation.x = Math.PI / 2 + Math.sin(s) * 0.35;
        leaf.rotation.z = Math.cos(s * 2) * 0.55;
        leaf.scale.set(1 - t * 0.38, 1 - t * 0.38, 1 - t * 0.38);
        leaf.castShadow = true;
        vineGroup.add(leaf);

        // Mix in delicate star blossoms every 4-5 leaves
        if (s % 5 === 0 && s > 0) {
          const flower = new THREE.Mesh(starBlossomGeo, starBlossomMat);
          flower.position.set(xOff + 0.08, yOff, zOff + 0.08);
          vineGroup.add(flower);
        }
      }
      foliageGroup.add(vineGroup);
    };

    // Vines along the back-left ceiling rafter and window beam
    addTrailingVine(-8.2, 12.0, -1.8, 3.8, 'down');
    addTrailingVine(-8.2, 12.0, 0.4, 3.2, 'down');
    addTrailingVine(-8.2, 12.0, 1.8, 2.5, 'down');
    addTrailingVine(-7.2, 12.4, -5.6, 3.6, 'across');
    addTrailingVine(-2.2, 12.0, -8.3, 3.0, 'down');

    // Climbing ivy curling around corner posts
    addTrailingVine(-8.2, 10.5, -8.2, 3.5, 'down');
    addTrailingVine(8.1, 10.5, -8.2, 2.8, 'down');

    // Macrame Hanging Ceramic Planter
    const hangerGroup = new THREE.Group();
    hangerGroup.position.set(-4.6, 10.2, -4.6);

    const ropeGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.4, 6);
    const ropeMat = createMaterial('#D9CDBC', 0.9);
    [-0.28, 0.28].forEach((rx) => {
      const rope = new THREE.Mesh(ropeGeo, ropeMat);
      rope.position.set(rx, 1.2, 0);
      hangerGroup.add(rope);
    });

    const hangPotGeo = new THREE.SphereGeometry(0.55, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.6);
    const hangPotMat = createMaterial('#FDF8EE', 0.5);
    const hangPot = new THREE.Mesh(hangPotGeo, hangPotMat);
    hangPot.rotation.x = Math.PI;
    hangerGroup.add(hangPot);

    // Cascading string-of-pearls foliage
    for (let hf = 0; hf < 9; hf++) {
      const hLeaf = new THREE.Mesh(ivyLeafGeo, ivyLeafMid);
      hLeaf.position.set(Math.cos(hf) * 0.35, -0.4 - (hf * 0.16), Math.sin(hf) * 0.35);
      hLeaf.rotation.x = Math.PI / 2 + 0.3;
      hLeaf.scale.set(0.8, 0.8, 0.8);
      hangerGroup.add(hLeaf);
    }
    foliageGroup.add(hangerGroup);

    // =========================================================================
    // 8. RICH LIVED-IN INTERIOR DECORATIONS (Artwork, Lighting, Plants, Books)
    // =========================================================================
    const decorRoot = new THREE.Group();
    roomRoot.add(decorRoot);

    // A. Framed Artwork Gallery on Back & Left Walls
    const frameBorderMat = createMaterial('#4A2E16', 0.75); // Dark timber frame
    const artPrintMat1 = createMaterial('#4A708B', 0.65); // Architectural blueprint blue
    const artPrintMat2 = createMaterial('#D46238', 0.65); // Terracotta botanical
    const artPrintMat3 = createMaterial('#2E3238', 0.65); // Minimalist typography

    // Print 1: Blueprint on Back Wall
    const art1 = new THREE.Group();
    art1.position.set(-3.4, 7.8, -8.3);
    const frame1 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 1.6, 0.08), frameBorderMat);
    const print1 = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.3, 0.09), artPrintMat1);
    art1.add(frame1, print1);
    decorRoot.add(art1);

    // Print 2: Terracotta Botanical on Back Wall
    const art2 = new THREE.Group();
    art2.position.set(1.2, 8.2, -8.3);
    const frame2 = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.0, 0.08), frameBorderMat);
    const print2 = new THREE.Mesh(new THREE.BoxGeometry(1.3, 1.7, 0.09), artPrintMat2);
    art2.add(frame2, print2);
    decorRoot.add(art2);

    // Print 3: Minimalist Typography on Back Wall
    const art3 = new THREE.Group();
    art3.position.set(-1.0, 7.4, -8.3);
    const frame3 = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.5, 0.08), frameBorderMat);
    const print3 = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.3, 0.09), artPrintMat3);
    art3.add(frame3, print3);
    decorRoot.add(art3);

    // Print 4: Landscape Art on Left Wall
    const art4 = new THREE.Group();
    art4.position.set(-8.3, 7.6, 3.8);
    art4.rotation.y = Math.PI / 2;
    const frame4 = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.6, 0.08), frameBorderMat);
    const print4 = new THREE.Mesh(new THREE.BoxGeometry(1.7, 1.3, 0.09), artPrintMat2);
    art4.add(frame4, print4);
    decorRoot.add(art4);

    // B. Stately Fiddle-Leaf Fig Tree in Woven Rattan Basket (Beside Bookshelf)
    const fiddleGroup = new THREE.Group();
    fiddleGroup.position.set(3.0, 0.18, -4.8);

    const rattanMat = createMaterial('#C2A578', 0.9);
    const basket = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.65, 1.4, 14), rattanMat);
    basket.position.y = 0.7;
    basket.castShadow = true;
    fiddleGroup.add(basket);

    const figStem = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 3.8, 8), darkWoodMat);
    figStem.position.y = 2.4;
    fiddleGroup.add(figStem);

    // Broad Paddle Fig Leaves
    const figLeafGeo = new THREE.ConeGeometry(0.48, 1.1, 4);
    const figLeafMat = createMaterial('#2F5625', 0.75);
    for (let fl = 0; fl < 7; fl++) {
      const fLeaf = new THREE.Mesh(figLeafGeo, figLeafMat);
      fLeaf.position.set(Math.cos(fl * 1.1) * 0.55, 2.2 + fl * 0.32, Math.sin(fl * 1.1) * 0.55);
      fLeaf.rotation.x = Math.PI / 2 + 0.35;
      fLeaf.rotation.z = fl * 1.1;
      fLeaf.castShadow = true;
      fiddleGroup.add(fLeaf);
    }
    decorRoot.add(fiddleGroup);

    // C. Arched Slender Brass Floor Lamp in Reading Nook
    const brassFloorLamp = new THREE.Group();
    brassFloorLamp.position.set(3.4, 0.18, -2.6);

    const lampBrassMat = createMaterial('#E0A535', 0.2, 0.85);
    const lampFoot = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.08, 16), lampBrassMat);
    lampFoot.position.y = 0.04;
    brassFloorLamp.add(lampFoot);

    const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 6.0, 8), lampBrassMat);
    lampPole.position.y = 3.0;
    brassFloorLamp.add(lampPole);

    const lampArm = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 1.4, 8), lampBrassMat);
    lampArm.rotation.z = Math.PI / 3;
    lampArm.position.set(0.6, 5.8, 0);
    brassFloorLamp.add(lampArm);

    const pleatedShadeMat = createMaterial('#FAF6EE', 0.7);
    const lampShade = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.65, 0.55, 16, 1, true), pleatedShadeMat);
    lampShade.position.set(1.2, 5.4, 0);
    brassFloorLamp.add(lampShade);

    const shadeGlow = new THREE.PointLight('#FFF1C7', 0.8, 3.5);
    shadeGlow.position.set(1.2, 5.2, 0);
    brassFloorLamp.add(shadeGlow);
    decorRoot.add(brassFloorLamp);

    // D. Stacked Art Books on Floor beside Reading Chair
    const floorBookGroup = new THREE.Group();
    floorBookGroup.position.set(4.2, 0.20, -2.8);

    const stackColors = ['#2C4824', '#D46238', '#FAF8F1'];
    stackColors.forEach((sCol, sIdx) => {
      const sBook = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.14, 0.95), createMaterial(sCol, 0.7));
      sBook.position.y = 0.07 + sIdx * 0.14;
      sBook.rotation.y = (sIdx - 1) * 0.15;
      sBook.castShadow = true;
      floorBookGroup.add(sBook);
    });
    decorRoot.add(floorBookGroup);

    // E. Knitted Floor Pouf Cushion in Warm Sage
    const poufMat = createMaterial('#5A7E56', 0.9);
    const pouf = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.95, 0.55, 14), poufMat);
    pouf.position.set(1.2, 0.45, 3.6);
    pouf.castShadow = true;
    pouf.receiveShadow = true;
    decorRoot.add(pouf);

    // =========================================================================
    // 9. THE SIX DETAILED INTERACTIVE AREAS
    // =========================================================================
    const interactiveGroups = {};
    interactiveGroupsRef.current = interactiveGroups;

    const createAreaGroup = (areaId) => {
      const group = new THREE.Group();
      group.userData = { areaId };
      scene.add(group);
      interactiveGroups[areaId] = group;
      return group;
    };

    const tagMeshes = (parent, areaId) => {
      parent.traverse((child) => {
        if (child.isMesh) {
          child.userData.areaId = areaId;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    };

    // Elegant Floating 3D Badge Indicator
    const addFloatingBadge = (parent, text, colorHex, yOffset = 4.8) => {
      const badgeGroup = new THREE.Group();
      badgeGroup.position.y = yOffset;
      badgeGroup.name = 'floatingBadge';

      const pillGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.1, 16);
      pillGeo.rotateX(Math.PI / 2);
      const pillMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(colorHex),
        emissive: new THREE.Color(colorHex),
        emissiveIntensity: 0.35,
        roughness: 0.25
      });
      const pill = new THREE.Mesh(pillGeo, pillMat);
      badgeGroup.add(pill);

      const ringGeo = new THREE.TorusGeometry(0.55, 0.04, 8, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(colorHex),
        transparent: true,
        opacity: 0.65
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      badgeGroup.add(ring);

      parent.add(badgeGroup);
    };

    // -------------------------------------------------------------------------
    // A. BAKING CORNER (Front-Left / Middle-Left)
    // -------------------------------------------------------------------------
    const bakingGroup = createAreaGroup('baking');
    bakingGroup.position.set(-5.4, 0, -2.6);

    const bakeCounter = new THREE.Mesh(new THREE.BoxGeometry(2.8, 2.2, 4.4), darkWoodMat);
    bakeCounter.position.set(0, 1.1, 0);
    bakingGroup.add(bakeCounter);

    const marbleTop = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.2, 4.6), createMaterial('#F7F5EE', 0.35));
    marbleTop.position.set(0, 2.25, 0);
    bakingGroup.add(marbleTop);

    // Vintage Convection Oven with Glowing Interior
    const ovenBody = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.25, 1.7), createMaterial('#FDF8EE', 0.45));
    ovenBody.position.set(0.1, 2.95, -1.0);
    bakingGroup.add(ovenBody);

    const ovenCap = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.08, 1.75), terracottaMat);
    ovenCap.position.set(0.1, 3.6, -1.0);
    bakingGroup.add(ovenCap);

    const ovenDoor = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.85, 1.25), createMaterial('#30343B', 0.2, 0.7));
    ovenDoor.position.set(0.92, 2.95, -1.0);
    bakingGroup.add(ovenDoor);

    const ovenRack = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 1.1), createMaterial('#C0C0C0', 0.2, 0.8));
    ovenRack.position.set(0.1, 2.85, -1.0);
    bakingGroup.add(ovenRack);

    const ovenBar = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.1, 8), createMaterial('#F5B72F', 0.2, 0.9));
    ovenBar.position.set(0.98, 3.3, -1.0);
    bakingGroup.add(ovenBar);

    // Mixing Bowls & Rolling Pin
    const bowlOuter = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.3, 0.45, 16, 1, true), terracottaMat);
    bowlOuter.position.set(0.2, 2.58, 0.5);
    bakingGroup.add(bowlOuter);

    const pinRoller = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.2, 12), darkWoodMat);
    pinRoller.rotation.x = Math.PI / 3;
    pinRoller.position.set(-0.5, 2.45, 0.4);
    bakingGroup.add(pinRoller);

    // Metal Baking Sheet with Chocolate-Chunk Cookies
    const cookieSheet = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.05, 1.5), createMaterial('#88909B', 0.3, 0.8));
    cookieSheet.position.set(0.2, 2.38, 1.3);
    bakingGroup.add(cookieSheet);

    const cookieGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.06, 12);
    const cookieMat = createMaterial('#B07B48', 0.85);
    const chipGeo = new THREE.SphereGeometry(0.04, 6, 6);
    const chipMat = createMaterial('#382312', 0.9);

    for (let ci = -0.32; ci <= 0.32; ci += 0.32) {
      for (let cj = -0.45; cj <= 0.45; cj += 0.45) {
        const cookie = new THREE.Mesh(cookieGeo, cookieMat);
        cookie.position.set(0.2 + ci, 2.44, 1.3 + cj);
        bakingGroup.add(cookie);

        const chip = new THREE.Mesh(chipGeo, chipMat);
        chip.position.set(0.2 + ci + 0.04, 2.48, 1.3 + cj + 0.03);
        bakingGroup.add(chip);
      }
    }

    // Glass ingredient canisters & Ceramic pitcher with wheat stems
    const pitcher = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.32, 0.75, 12), createMaterial('#FAF6EE', 0.4));
    pitcher.position.set(-0.6, 2.75, -1.5);
    bakingGroup.add(pitcher);

    const wheatStemMat = createMaterial('#D9B372', 0.8);
    for (let w = 0; w < 4; w++) {
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.8, 6), wheatStemMat);
      stem.position.set(-0.6 + (w - 1.5) * 0.06, 3.4, -1.5);
      stem.rotation.z = (w - 1.5) * 0.12;
      bakingGroup.add(stem);
    }

    addFloatingBadge(bakingGroup, 'Baking Corner', '#D46238', 4.3);
    tagMeshes(bakingGroup, 'baking');

    // -------------------------------------------------------------------------
    // B. WRITING DESK (Center-Back / Left-Back)
    // -------------------------------------------------------------------------
    const writingGroup = createAreaGroup('writing');
    writingGroup.position.set(-2.0, 0, -5.8);

    const deskTop = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.18, 2.2), darkWoodMat);
    deskTop.position.set(0, 2.3, 0);
    writingGroup.add(deskTop);

    const deskLegGeo = new THREE.CylinderGeometry(0.08, 0.05, 2.2, 8);
    [
      [-1.9, -0.9], [1.9, -0.9], [-1.9, 0.9], [1.9, 0.9]
    ].forEach(([dx, dz]) => {
      const leg = new THREE.Mesh(deskLegGeo, darkWoodMat);
      leg.position.set(dx, 1.1, dz);
      writingGroup.add(leg);
    });

    const deskDrawer = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.45, 2.1), darkWoodMat);
    deskDrawer.position.set(1.1, 1.95, 0);
    writingGroup.add(deskDrawer);

    // Open Leather Journal with Ribbon
    const journalCover = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.06, 1.3), createMaterial('#6A351C', 0.6));
    journalCover.position.set(-0.7, 2.42, 0.2);
    writingGroup.add(journalCover);

    const journalPages = new THREE.Mesh(new THREE.BoxGeometry(0.88, 0.08, 1.2), createMaterial('#FFFBF0', 0.8));
    journalPages.position.set(-0.7, 2.45, 0.2);
    writingGroup.add(journalPages);

    // Slim Modern Laptop with Glowing Screen
    const lapBase = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.04, 0.85), createMaterial('#D6D8DC', 0.25, 0.9));
    lapBase.position.set(0.65, 2.41, 0.1);
    writingGroup.add(lapBase);

    const lapScreen = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.82, 0.04), createMaterial('#2B2E33', 0.3, 0.8));
    lapScreen.position.set(0.65, 2.82, -0.32);
    lapScreen.rotation.x = -0.18;
    writingGroup.add(lapScreen);

    const screenGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.1, 0.74),
      new THREE.MeshBasicMaterial({ color: '#EBF4FF' })
    );
    screenGlow.position.set(0.65, 2.82, -0.29);
    screenGlow.rotation.x = -0.18;
    writingGroup.add(screenGlow);

    // Architect's Brass Desk Lamp
    const lampFootD = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.06, 12), createMaterial('#E0A535', 0.2, 0.9));
    lampFootD.position.set(-1.4, 2.42, -0.6);
    writingGroup.add(lampFootD);

    const lampConeD = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.35, 12), createMaterial('#4A6B50', 0.4));
    lampConeD.position.set(-1.15, 3.25, -0.4);
    lampConeD.rotation.z = -Math.PI / 4;
    writingGroup.add(lampConeD);

    // Mug with Chai & Desk Clock
    const penCup = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.12, 0.38, 12), createMaterial('#FAF6EE', 0.4));
    penCup.position.set(-1.5, 2.58, 0.4);
    writingGroup.add(penCup);

    // Mid-Century Desk Chair
    const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.14, 1.4), darkWoodMat);
    chairSeat.position.set(0, 1.4, 1.8);
    writingGroup.add(chairSeat);

    const chairBack = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.3, 0.12), darkWoodMat);
    chairBack.position.set(0, 2.2, 2.4);
    writingGroup.add(chairBack);

    addFloatingBadge(writingGroup, 'Writing Desk', '#7654C8', 4.5);
    tagMeshes(writingGroup, 'writing');

    // -------------------------------------------------------------------------
    // C. READING NOOK (Back-Right Corner)
    // -------------------------------------------------------------------------
    const readingGroup = createAreaGroup('reading');
    readingGroup.position.set(5.5, 0, -5.8);

    // Built-in Tall Craftsman Wooden Bookshelf (Hollow cabinet with 5 open shelves)
    const bookCaseBack = new THREE.Mesh(new THREE.BoxGeometry(4.2, 8.2, 0.12), darkWoodMat);
    bookCaseBack.position.set(0, 4.1, -0.58);
    bookCaseBack.receiveShadow = true;
    readingGroup.add(bookCaseBack);

    const bookCaseLeft = new THREE.Mesh(new THREE.BoxGeometry(0.18, 8.2, 1.3), darkWoodMat);
    bookCaseLeft.position.set(-2.0, 4.1, 0);
    bookCaseLeft.castShadow = true;
    readingGroup.add(bookCaseLeft);

    const bookCaseRight = new THREE.Mesh(new THREE.BoxGeometry(0.18, 8.2, 1.3), darkWoodMat);
    bookCaseRight.position.set(2.0, 4.1, 0);
    bookCaseRight.castShadow = true;
    readingGroup.add(bookCaseRight);

    const bookCaseTop = new THREE.Mesh(new THREE.BoxGeometry(4.35, 0.25, 1.4), darkWoodMat);
    bookCaseTop.position.set(0, 8.25, 0);
    bookCaseTop.castShadow = true;
    readingGroup.add(bookCaseTop);

    const bookCaseBase = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.35, 1.3), darkWoodMat);
    bookCaseBase.position.set(0, 0.2, 0);
    bookCaseBase.receiveShadow = true;
    readingGroup.add(bookCaseBase);

    const bookColors = ['#D46238', '#447238', '#C28E34', '#3E5C76', '#8A3B29', '#FAF8F1', '#4D6B53', '#E29D44'];
    const shelfLevels = [0.65, 2.15, 3.65, 5.15, 6.65];
    let bookCounter = 0;

    shelfLevels.forEach((sy) => {
      const shelfPlank = new THREE.Mesh(new THREE.BoxGeometry(3.85, 0.12, 1.2), darkWoodMat);
      shelfPlank.position.set(0, sy, 0.02);
      shelfPlank.receiveShadow = true;
      readingGroup.add(shelfPlank);

      let bx = -1.75;
      while (bx < 1.6) {
        const bW = 0.12 + ((bookCounter * 7) % 10) * 0.015;
        const bH = 1.05 + ((bookCounter * 11) % 10) * 0.025;
        const bD = 0.82;
        const bCol = bookColors[bookCounter % bookColors.length];
        bookCounter++;

        const book = new THREE.Mesh(new THREE.BoxGeometry(bW, bH, bD), createMaterial(bCol, 0.65));
        book.position.set(bx + bW / 2, sy + bH / 2 + 0.06, 0.06);
        book.castShadow = true;
        book.receiveShadow = true;
        readingGroup.add(book);
        bx += bW + 0.035;
      }
    });

    // Deep Burnt-Orange Armchair with rolled armrests & throw cushion
    const chairGroup = new THREE.Group();
    chairGroup.position.set(-1.8, 0, 2.8);
    chairGroup.rotation.y = Math.PI / 4;

    const armBase = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.85, 2.0), terracottaMat);
    armBase.position.set(0, 0.95, 0);
    chairGroup.add(armBase);

    const armBack = new THREE.Mesh(new THREE.BoxGeometry(2.1, 2.1, 0.55), terracottaMat);
    armBack.position.set(0, 2.05, -0.75);
    chairGroup.add(armBack);

    [-1.1, 1.1].forEach((ax) => {
      const armRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.9, 12), terracottaMat);
      armRoll.rotation.x = Math.PI / 2;
      armRoll.position.set(ax, 1.45, 0);
      chairGroup.add(armRoll);
    });

    // Tufted Cream Throw Cushion
    const cushionMat = createMaterial('#FAF6EE', 0.85);
    const cushion = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.8, 0.35), cushionMat);
    cushion.position.set(0, 1.55, -0.45);
    cushion.rotation.x = 0.2;
    chairGroup.add(cushion);

    readingGroup.add(chairGroup);

    // Round Side Table with Steaming Chai Mug
    const sideTable = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.1, 16), darkWoodMat);
    sideTable.position.set(0.6, 1.8, 3.8);
    readingGroup.add(sideTable);

    const chaiMug = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.12, 0.32, 12), createMaterial('#FAF8EE', 0.4));
    chaiMug.position.set(0.6, 2.0, 3.8);
    readingGroup.add(chaiMug);

    addFloatingBadge(readingGroup, 'Reading Nook', '#36AFA0', 4.7);
    tagMeshes(readingGroup, 'reading');

    // -------------------------------------------------------------------------
    // D. PHOTOGRAPHY CORNER (Front-Right / Middle-Right)
    // -------------------------------------------------------------------------
    const photoGroup = createAreaGroup('photography');
    photoGroup.position.set(6.2, 0, -0.6);

    // Classic 35mm Rangefinder Camera on Hardwood Surveyor Tripod
    const camBody = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.65, 0.5), createMaterial('#2B2E33', 0.3, 0.5));
    camBody.position.set(0, 2.8, 0);
    camBody.rotation.y = -Math.PI / 4;
    photoGroup.add(camBody);

    const camPlate = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.15, 0.51), createMaterial('#D9DBDF', 0.2, 0.9));
    camPlate.position.set(0, 3.15, 0);
    camPlate.rotation.y = -Math.PI / 4;
    photoGroup.add(camPlate);

    const camLens = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.35, 16), createMaterial('#1A1C1F', 0.2, 0.8));
    camLens.rotation.x = Math.PI / 2;
    camLens.position.set(-0.28, 2.8, 0.28);
    camLens.rotation.y = -Math.PI / 4;
    photoGroup.add(camLens);

    // Surveyor Tripod Legs in Warm Hardwood
    const tripodLegGeo = new THREE.CylinderGeometry(0.04, 0.02, 2.8, 8);
    const leg1 = new THREE.Mesh(tripodLegGeo, darkWoodMat);
    leg1.position.set(-0.55, 1.4, -0.45);
    leg1.rotation.z = 0.22;
    photoGroup.add(leg1);

    const leg2 = new THREE.Mesh(tripodLegGeo, darkWoodMat);
    leg2.position.set(0.55, 1.4, -0.45);
    leg2.rotation.z = -0.22;
    photoGroup.add(leg2);

    const leg3 = new THREE.Mesh(tripodLegGeo, darkWoodMat);
    leg3.position.set(0, 1.4, 0.65);
    leg3.rotation.x = -0.22;
    photoGroup.add(leg3);

    // Framed Cork Pinboard with Polaroids on Right Wall
    const corkBoard = new THREE.Mesh(new THREE.BoxGeometry(0.12, 3.4, 4.4), createMaterial('#C4A882', 0.95));
    corkBoard.position.set(2.25, 5.8, 0);
    photoGroup.add(corkBoard);

    const corkFrame = new THREE.Mesh(new THREE.BoxGeometry(0.16, 3.55, 4.55), darkWoodMat);
    corkFrame.position.set(2.28, 5.8, 0);
    photoGroup.add(corkFrame);

    const polaroidGeo = new THREE.PlaneGeometry(0.85, 1.0);
    const polaroidMatWhite = createMaterial('#FAF8F1', 0.85);
    const pinGeo = new THREE.SphereGeometry(0.04, 6, 6);
    const pinMat = createMaterial('#D46238', 0.4);

    const polaroidCoords = [
      [2.18, 6.4, -1.2, 0.1],
      [2.18, 6.2, 0.1, -0.06],
      [2.18, 6.5, 1.3, 0.12],
      [2.18, 4.9, -0.7, -0.08],
      [2.18, 5.0, 0.8, 0.05]
    ];
    polaroidCoords.forEach(([px, py, pz, rot]) => {
      const snap = new THREE.Mesh(polaroidGeo, polaroidMatWhite);
      snap.rotation.y = -Math.PI / 2;
      snap.rotation.z = rot;
      snap.position.set(px, py, pz);
      photoGroup.add(snap);

      const pin = new THREE.Mesh(pinGeo, pinMat);
      pin.position.set(px - 0.02, py + 0.45, pz);
      photoGroup.add(pin);
    });

    addFloatingBadge(photoGroup, 'Photography Corner', '#4267C8', 4.4);
    tagMeshes(photoGroup, 'photography');

    // -------------------------------------------------------------------------
    // E. CREATIVE WORKSHOP (Center-Fore / Crafting Workbench)
    // -------------------------------------------------------------------------
    const workshopGroup = createAreaGroup('workshop');
    workshopGroup.position.set(0.4, 0, 1.8);

    const benchTop = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.2, 2.2), darkWoodMat);
    benchTop.position.set(0, 1.9, 0);
    workshopGroup.add(benchTop);

    const benchLegGeo = new THREE.BoxGeometry(0.16, 1.8, 0.16);
    [
      [-1.6, -0.9], [1.6, -0.9], [-1.6, 0.9], [1.6, 0.9]
    ].forEach(([bx, bz]) => {
      const bLeg = new THREE.Mesh(benchLegGeo, darkWoodMat);
      bLeg.position.set(bx, 0.95, bz);
      workshopGroup.add(bLeg);
    });

    // Acrylic Bead Organizer with Gemstones
    const trayBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.1, 1.0), createMaterial('#FFFFFF', 0.2, 0.1));
    trayBase.position.set(-0.8, 2.05, 0.2);
    workshopGroup.add(trayBase);

    const beadColors = ['#E25B45', '#3A9E8F', '#F5B72F', '#7E57C2', '#FAF8F1', '#42A5F5'];
    const beadGeo = new THREE.SphereGeometry(0.06, 8, 8);
    for (let bi = 0; bi < 3; bi++) {
      for (let bj = 0; bj < 4; bj++) {
        const bead = new THREE.Mesh(beadGeo, createMaterial(beadColors[(bi * 4 + bj) % beadColors.length], 0.2, 0.3));
        bead.position.set(-1.3 + bj * 0.34, 2.14, -0.1 + bi * 0.3);
        workshopGroup.add(bead);
      }
    }

    // Brass Wire Spool & Precision Pliers
    const spool = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.22, 16), createMaterial('#E0A535', 0.25, 0.9));
    spool.position.set(0.3, 2.12, -0.4);
    workshopGroup.add(spool);

    const plierMat = createMaterial('#2E3238', 0.3, 0.8);
    const plierHandle1 = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.55, 6), createMaterial('#D46238', 0.5));
    plierHandle1.position.set(0.8, 2.05, 0.2);
    plierHandle1.rotation.z = 0.3;
    workshopGroup.add(plierHandle1);

    // Linen Necklace Display Bust with Gold Pendant
    const bustMat = createMaterial('#FAF4E6', 0.9);
    const bust = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 12), bustMat);
    bust.position.set(1.1, 2.45, -0.3);
    workshopGroup.add(bust);

    const pendant = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.025, 8, 16), createMaterial('#E0A535', 0.15, 0.95));
    pendant.position.set(1.1, 2.3, -0.14);
    workshopGroup.add(pendant);

    addFloatingBadge(workshopGroup, 'Creative Workshop', '#F19BC0', 4.3);
    tagMeshes(workshopGroup, 'workshop');

    // -------------------------------------------------------------------------
    // F. PERSONAL CORNER (Fore-Right / Volleyball & Keepsakes)
    // -------------------------------------------------------------------------
    const personalGroup = createAreaGroup('personal');
    personalGroup.position.set(4.5, 0, 4.4);

    // Vintage Collegiate Volleyball (18-panel tri-color)
    const ballMat = createMaterial('#FAF6EE', 0.5);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(0.72, 24, 24), ballMat);
    ball.position.set(-0.2, 0.72, -0.2);
    ball.castShadow = true;
    personalGroup.add(ball);

    // Two-Handled Championship Trophy Cup on Marble Pedestal
    const trophyMat = createMaterial('#E0A535', 0.15, 0.95);
    const marbleMat = createMaterial('#F2EFE9', 0.35);

    const pedestal = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.65, 0.8), marbleMat);
    pedestal.position.set(1.4, 0.35, 0.1);
    personalGroup.add(pedestal);

    const trophyStem = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.18, 0.45, 12), trophyMat);
    trophyStem.position.set(1.4, 0.88, 0.1);
    personalGroup.add(trophyStem);

    const trophyCup = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.18, 0.75, 16, 1, true), trophyMat);
    trophyCup.position.set(1.4, 1.4, 0.1);
    personalGroup.add(trophyCup);

    [-0.42, 0.42].forEach((hx) => {
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 8, 16), trophyMat);
      handle.position.set(1.4 + hx, 1.45, 0.1);
      personalGroup.add(handle);
    });

    // Brass-Bracketed Wooden Keepsake Trunk
    const trunk = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.25, 1.4), darkWoodMat);
    trunk.position.set(0.6, 0.65, 1.8);
    personalGroup.add(trunk);

    const trunkRim = new THREE.Mesh(new THREE.BoxGeometry(2.46, 0.15, 1.46), createMaterial('#C89B3C', 0.25, 0.9));
    trunkRim.position.set(0.6, 1.25, 1.8);
    personalGroup.add(trunkRim);

    addFloatingBadge(personalGroup, 'Personal Corner', '#F5B72F', 4.4);
    tagMeshes(personalGroup, 'personal');

    setIsCanvasLoading(false);

    // =========================================================================
    // 10. ANIMATION LOOP (Smooth Camera Interpolation & Floating Badge Pulse)
    // =========================================================================
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Camera Position & Target Damped Slerp
      camera.position.lerp(currentCameraPosRef.current, 0.055);
      camera.lookAt(cameraTargetRef.current);

      // Animate floating badges gently
      scene.traverse((obj) => {
        if (obj.name === 'floatingBadge') {
          obj.position.y += Math.sin(elapsedTime * 2.5 + obj.id) * 0.0025;
          obj.rotation.y = elapsedTime * 0.8;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // =========================================================================
    // 11. POINTER, RESIZE & INTERACTION HANDLERS
    // =========================================================================
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      const isMob = w < 768;
      const dist = isMob ? 41 : 29;
      const hFactor = isMob ? 0.64 : 0.78;
      cameraBasePosRef.current.set(dist, dist * hFactor, dist);
      if (!selectedAreaId) {
        currentCameraPosRef.current.copy(cameraBasePosRef.current);
        cameraTargetRef.current.set(0, isMob ? 2.6 : 3.2, 0);
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.set(x, y);

      setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });

      // Subtle parallax orbit damping when not focused on an area
      if (!selectedAreaId && !isDraggingRef.current) {
        const parallaxX = x * 1.5;
        const parallaxY = y * 0.8;
        currentCameraPosRef.current.x = cameraBasePosRef.current.x + parallaxX;
        currentCameraPosRef.current.y = cameraBasePosRef.current.y + parallaxY;
      }

      // Raycasting for interactive hover detection
      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const allMeshes = [];
      Object.values(interactiveGroupsRef.current).forEach((grp) => {
        grp.traverse((c) => {
          if (c.isMesh) allMeshes.push(c);
        });
      });

      const intersects = raycasterRef.current.intersectObjects(allMeshes, false);
      if (intersects.length > 0) {
        const hitAreaId = intersects[0].object.userData.areaId;
        if (hitAreaId) {
          setHoveredArea(hitAreaId);
          container.style.cursor = 'pointer';
          return;
        }
      }

      setHoveredArea(null);
      container.style.cursor = isDraggingRef.current ? 'grabbing' : 'default';
    };

    const handlePointerDown = (e) => {
      isDraggingRef.current = true;
      previousPointerRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      container.style.cursor = 'default';
    };

    const handleClick = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseRef.current.set(x, y);

      raycasterRef.current.setFromCamera(mouseRef.current, camera);
      const allMeshes = [];
      Object.values(interactiveGroupsRef.current).forEach((grp) => {
        grp.traverse((c) => {
          if (c.isMesh) allMeshes.push(c);
        });
      });

      const intersects = raycasterRef.current.intersectObjects(allMeshes, false);
      if (intersects.length > 0) {
        const hitAreaId = intersects[0].object.userData.areaId;
        if (hitAreaId) {
          onSelectArea(hitAreaId);
        }
      }
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('click', handleClick);

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [onSelectArea, selectedAreaId]);

  // Adjust camera position & target when area selection changes
  useEffect(() => {
    if (!cameraRef.current) return;

    if (selectedAreaId && areaFocusCoords[selectedAreaId]) {
      const focus = areaFocusCoords[selectedAreaId];
      cameraTargetRef.current.copy(focus);
      currentCameraPosRef.current.set(focus.x + 12, focus.y + 10, focus.z + 12);
    } else {
      cameraTargetRef.current.set(0, 3.2, 0);
      currentCameraPosRef.current.copy(cameraBasePosRef.current);
    }
  }, [selectedAreaId]);

  // Adjust lighting mood when toggled
  useEffect(() => {
    if (!lightsRef.current.sun) return;

    if (lightingMood === 'daylight') {
      lightsRef.current.ambient.color.set('#FFF8EC');
      lightsRef.current.ambient.intensity = 0.95;
      lightsRef.current.sun.color.set('#FFF2D4');
      lightsRef.current.sun.intensity = 1.6;
    } else if (lightingMood === 'night') {
      lightsRef.current.ambient.color.set('#3C3358');
      lightsRef.current.ambient.intensity = 0.65;
      lightsRef.current.sun.color.set('#7C8BE0');
      lightsRef.current.sun.intensity = 0.75;
    } else {
      // Golden Hour (Default Art Direction)
      lightsRef.current.ambient.color.set('#FFE6CA');
      lightsRef.current.ambient.intensity = 0.95;
      lightsRef.current.sun.color.set('#FFB366');
      lightsRef.current.sun.intensity = 1.75;
    }
  }, [lightingMood]);

  if (isWebGLError) {
    return (
      <div className="webgl-fallback-container">
        <div className="fallback-card">
          <div className="fallback-badge">Interactive Garden Studio Mode</div>
          <h3>Creative Studio Overview</h3>
          <p>
            Your browser does not support full 3D hardware acceleration. You can still explore all 6 creative areas below:
          </p>
          <div className="fallback-areas-grid">
            {Object.values(beyondCodeData.areas).map((area) => (
              <button
                key={area.id}
                type="button"
                className="fallback-area-btn"
                style={{ borderColor: area.accentColor }}
                onClick={() => onSelectArea(area.id)}
              >
                <span className="fallback-btn-dot" style={{ backgroundColor: area.accentColor }} />
                <span>{area.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="studio-canvas-wrapper" ref={mountRef}>
      {isCanvasLoading && (
        <div className="canvas-loading-curtain">
          <div className="loading-spinner-ring" />
          <span className="loading-label">Growing Studio Garden &amp; Workshop...</span>
        </div>
      )}

      {/* Floating Tooltip tracking hovered 3D object */}
      {hoveredArea && beyondCodeData.areas[hoveredArea] && (
        <div
          className="canvas-hover-tooltip"
          style={{
            transform: `translate3d(${tooltipPos.x + 16}px, ${tooltipPos.y - 20}px, 0)`,
            borderColor: beyondCodeData.areas[hoveredArea].accentColor
          }}
        >
          <span
            className="tooltip-dot"
            style={{ backgroundColor: beyondCodeData.areas[hoveredArea].accentColor }}
          />
          <div className="tooltip-text-col">
            <span className="tooltip-name">{beyondCodeData.areas[hoveredArea].name}</span>
            <span className="tooltip-action">Click to explore story →</span>
          </div>
        </div>
      )}
    </div>
  );
}
