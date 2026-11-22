import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import type { Language, ThemeMode } from '../../context/PreferencesContext';

export type ArchitectureNodeId =
  | 'api-gateway'
  | 'rag-engine'
  | 'postgres-pgvector'
  | 'frontend-clients'
  | 'devops-cicd';

export type CameraPresetId = 'global' | 'backend-rag' | 'microservices';

export interface ArchitectureNodeInfo {
  id: ArchitectureNodeId;
  index: string;
  title: string;
  subtitle: string;
  stack: string[];
  description: string;
  accentHex: string;
}

export const ARCHITECTURE_NODES: ArchitectureNodeInfo[] = [
  {
    id: 'api-gateway',
    index: '01',
    title: 'Core API & Microservices',
    subtitle: 'NestJS · Spring Boot · RBAC',
    stack: ['NestJS', 'Spring Boot', 'APIs REST', 'Clean Architecture', 'RBAC'],
    description:
      'Point d’entrée central orchestrant les microservices découplés, la validation des contrats REST et le contrôle d’accès basé sur les rôles.',
    accentHex: '#3B82F6',
  },
  {
    id: 'rag-engine',
    index: '02',
    title: 'Moteur RAG & Embeddings',
    subtitle: 'Ingestion documentaire & Contexte IA',
    stack: ['Pipelines RAG', 'Python', 'NestJS', 'Modélisation UML'],
    description:
      'Découpage sémantique des documents, génération de vecteurs d’embeddings et orchestration des requêtes augmentées par récupération.',
    accentHex: '#60A5FA',
  },
  {
    id: 'postgres-pgvector',
    index: '03',
    title: 'PostgreSQL & pgvector',
    subtitle: 'Stockage relationnel & Index vectoriel',
    stack: ['PostgreSQL', 'pgvector', 'MySQL', 'MongoDB'],
    description:
      'Persistance transactionnelle couplée à la recherche par similarité cosinus sur vecteurs haute dimension directement en base.',
    accentHex: '#38BDF8',
  },
  {
    id: 'frontend-clients',
    index: '04',
    title: 'Clients Web, PWA & Mobile',
    subtitle: 'Angular · React Native · Offline',
    stack: ['Angular', 'React & Next.js', 'React Native', 'Tailwind CSS', 'PWA Hors-ligne'],
    description:
      'Dashboards d’administration Angular, émargement PWA résilient hors-ligne et applications mobiles cross-platform React Native.',
    accentHex: '#818CF8',
  },
  {
    id: 'devops-cicd',
    index: '05',
    title: 'Docker & Pipelines CI/CD',
    subtitle: 'Conteneurisation & Déploiement continu',
    stack: ['Docker', 'GitLab CI', 'GitHub Actions', 'Git Flow', 'Linux (CLI)'],
    description:
      'Isolation des services en conteneurs Docker, automatisation des tests et déploiements continus via GitLab CI et GitHub Actions.',
    accentHex: '#34D399',
  },
];

const ARCHITECTURE_NODES_EN: ArchitectureNodeInfo[] = [
  {
    id: 'api-gateway',
    index: '01',
    title: 'Core API & Microservices',
    subtitle: 'NestJS · Spring Boot · RBAC',
    stack: ['NestJS', 'Spring Boot', 'REST APIs', 'Clean Architecture', 'RBAC'],
    description:
      'Central entry point orchestrating decoupled microservices, REST contract validation, and role-based access control.',
    accentHex: '#3B82F6',
  },
  {
    id: 'rag-engine',
    index: '02',
    title: 'RAG Engine & Embeddings',
    subtitle: 'Document Ingestion & AI Context',
    stack: ['RAG Pipelines', 'Python', 'NestJS', 'UML Modeling'],
    description:
      'Semantic document chunking, vector embedding generation, and retrieval-augmented query orchestration.',
    accentHex: '#60A5FA',
  },
  {
    id: 'postgres-pgvector',
    index: '03',
    title: 'PostgreSQL & pgvector',
    subtitle: 'Relational Store & Vector Index',
    stack: ['PostgreSQL', 'pgvector', 'MySQL', 'MongoDB'],
    description:
      'Transactional persistence paired with high-dimensional cosine similarity vector search directly inside PostgreSQL.',
    accentHex: '#38BDF8',
  },
  {
    id: 'frontend-clients',
    index: '04',
    title: 'Web, PWA & Mobile Clients',
    subtitle: 'Angular · React Native · Offline',
    stack: ['Angular', 'React & Next.js', 'React Native', 'Tailwind CSS', 'Offline PWA'],
    description:
      'Angular admin dashboards, offline-resilient PWA attendance sign-in, and React Native cross-platform mobile apps.',
    accentHex: '#818CF8',
  },
  {
    id: 'devops-cicd',
    index: '05',
    title: 'Docker & CI/CD Pipelines',
    subtitle: 'Containerization & Continuous Delivery',
    stack: ['Docker', 'GitLab CI', 'GitHub Actions', 'Git Flow', 'Linux (CLI)'],
    description:
      'Isolated containerized services with automated test suites and continuous delivery via GitLab CI and GitHub Actions.',
    accentHex: '#34D399',
  },
];

export function getArchitectureNodes(lang: Language): ArchitectureNodeInfo[] {
  return lang === 'en' ? ARCHITECTURE_NODES_EN : ARCHITECTURE_NODES;
}

// Reusable math objects (zero GC in render loop)
const _vec3 = new THREE.Vector3();
const _packetPos = new THREE.Vector3();
const _packetScale = new THREE.Vector3(1, 1, 1);
const _packetQuat = new THREE.Quaternion();
const _packetMat4 = new THREE.Matrix4();
const _desiredCamPos = new THREE.Vector3();
const _desiredTarget = new THREE.Vector3();

interface SubLayerRef {
  object: THREE.Object3D;
  baseY: number;
  explodeLift: number;
}

interface NodeRig {
  id: ArchitectureNodeId;
  group: THREE.Group;
  basePosition: THREE.Vector3;
  explodeOffset: THREE.Vector3;
  layers: SubLayerRef[];
  accentRing: THREE.Mesh;
  accentMaterial: THREE.MeshStandardMaterial;
  hitMesh: THREE.Mesh;
  baseEmissiveIntensity: number;
}

interface PacketInstance {
  curveIndex: number;
  t: number;
  speed: number;
}

export interface ArchitectureSceneController {
  setSelectedNode: (id: ArchitectureNodeId | null) => void;
  setExplodeFactor: (value: number) => void;
  setCameraPreset: (preset: CameraPresetId) => void;
  setFlowRunning: (running: boolean) => void;
  setTheme: (theme: ThemeMode) => void;
  dispose: () => void;
}

function detectSoftwareWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) ?? '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return true;
  }
}

function createStudioGridTexture(
  maxAnisotropy: number,
  theme: ThemeMode = 'dark'
): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const isLight = theme === 'light';

  if (ctx) {
    ctx.fillStyle = isLight ? '#cfd9e8' : '#08090d';
    ctx.fillRect(0, 0, size, size);

    const cx = size / 2;
    const cy = size / 2;

    // Fine grid lines
    ctx.strokeStyle = isLight ? 'rgba(51, 65, 85, 0.24)' : 'rgba(63, 63, 70, 0.38)';
    ctx.lineWidth = isLight ? 1.5 : 1;
    const step = 64;
    for (let i = 0; i <= size; i += step) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, size);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(size, i);
      ctx.stroke();
    }

    // Concentric architectural CAD rings
    ctx.strokeStyle = isLight ? 'rgba(30, 58, 138, 0.42)' : 'rgba(96, 165, 250, 0.24)';
    ctx.lineWidth = isLight ? 2.5 : 1.5;
    [130, 240, 350, 465].forEach((radius) => {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Subtle radial degree ticks near outer edge
    ctx.strokeStyle = isLight ? 'rgba(30, 64, 175, 0.48)' : 'rgba(96, 165, 250, 0.3)';
    ctx.lineWidth = 2;
    for (let deg = 0; deg < 360; deg += 15) {
      const rad = (deg * Math.PI) / 180;
      const inner = deg % 45 === 0 ? 446 : 456;
      const outer = 472;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(rad) * inner, cy + Math.sin(rad) * inner);
      ctx.lineTo(cx + Math.cos(rad) * outer, cy + Math.sin(rad) * outer);
      ctx.stroke();
    }

    // Axis crosshairs
    ctx.strokeStyle = isLight ? 'rgba(37, 99, 235, 0.48)' : 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = isLight ? 2.5 : 1.5;
    ctx.beginPath();
    ctx.moveTo(cx, 32);
    ctx.lineTo(cx, size - 32);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(32, cy);
    ctx.lineTo(size - 32, cy);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      10,
      size / 2,
      size / 2,
      size / 2
    );
    grad.addColorStop(0, 'rgba(0, 0, 0, 0.72)');
    grad.addColorStop(0.55, 'rgba(0, 0, 0, 0.28)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createArchitectureScene(
  container: HTMLElement,
  options: {
    initialTheme?: ThemeMode;
    onSelectNode: (id: ArchitectureNodeId) => void;
    onHoverNode: (id: ArchitectureNodeId | null) => void;
    onContextLost?: () => void;
    onContextRestored?: () => void;
  }
): ArchitectureSceneController {
  const isSoftwareGl = detectSoftwareWebGL();
  const width = Math.max(container.clientWidth, 320);
  const height = Math.max(container.clientHeight, 360);
  const startTheme: ThemeMode = options.initialTheme ?? 'dark';
  const isStartLight = startTheme === 'light';
  const startBgHex = isStartLight ? 0xe5ebf3 : 0x050507;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(startBgHex);
  scene.fog = new THREE.FogExp2(startBgHex, isStartLight ? 0.026 : 0.042);

  const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
  camera.position.set(6.4, 4.9, 7.6);

  const renderer = new THREE.WebGLRenderer({
    antialias: !isSoftwareGl,
    powerPreference: 'high-performance',
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = isStartLight ? 0.94 : 1.15;
  renderer.shadowMap.enabled = !isSoftwareGl;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.domElement.style.display = 'block';
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.touchAction = 'pan-y';

  container.appendChild(renderer.domElement);

  // Studio environment reflections (RoomEnvironment)
  const pmremGenerator = new THREE.PMREMGenerator(renderer);
  const envRenderTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
  scene.environment = envRenderTarget.texture;
  pmremGenerator.dispose();

  // OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = !isSoftwareGl;
  controls.dampingFactor = 0.06;
  controls.enablePan = false;
  controls.minDistance = 4.5;
  controls.maxDistance = 14.5;
  controls.minPolarAngle = 0.35;
  controls.maxPolarAngle = Math.PI / 2 - 0.08;
  controls.target.set(0, 0.7, 0);
  controls.update();

  // Three-point studio lighting rig
  const hemiLight = new THREE.HemisphereLight(
    isStartLight ? 0xe2e8f0 : 0x93c5fd,
    isStartLight ? 0x64748b : 0x09090b,
    isStartLight ? 0.62 : 0.55
  );
  scene.add(hemiLight);

  const keyLight = new THREE.DirectionalLight(0xfff7ed, isStartLight ? 1.65 : 2.1);
  keyLight.position.set(6.5, 9.5, 6.0);
  keyLight.castShadow = !isSoftwareGl;
  keyLight.shadow.mapSize.width = 1024;
  keyLight.shadow.mapSize.height = 1024;
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 26;
  keyLight.shadow.camera.left = -6.5;
  keyLight.shadow.camera.right = 6.5;
  keyLight.shadow.camera.top = 6.5;
  keyLight.shadow.camera.bottom = -6.5;
  keyLight.shadow.bias = -0.0005;
  keyLight.shadow.normalBias = 0.02;
  scene.add(keyLight);

  const rimLight = new THREE.DirectionalLight(0x3b82f6, isStartLight ? 0.95 : 1.45);
  rimLight.position.set(-7.0, 4.5, -6.5);
  scene.add(rimLight);

  // Track resources for clean disposal
  const geometries: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];
  const textures: THREE.Texture[] = [];

  const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
    geometries.push(g);
    return g;
  };
  const trackMat = <T extends THREE.Material>(m: T): T => {
    materials.push(m);
    return m;
  };

  // Studio Ground & Elevated Architectural Stage Pedestal
  const maxAniso = renderer.capabilities.getMaxAnisotropy();
  const darkGridTexture = createStudioGridTexture(maxAniso, 'dark');
  const lightGridTexture = createStudioGridTexture(maxAniso, 'light');
  textures.push(darkGridTexture, lightGridTexture);

  const outerFloorGeo = trackGeo(new THREE.CircleGeometry(18, 64));
  const outerFloorMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: isStartLight ? 0xdbe3ee : 0x050507,
      roughness: 0.96,
      metalness: 0.0,
      envMapIntensity: isStartLight ? 0.25 : 0.5,
    })
  );
  const outerFloor = new THREE.Mesh(outerFloorGeo, outerFloorMat);
  outerFloor.rotation.x = -Math.PI / 2;
  outerFloor.position.y = -0.18;
  outerFloor.receiveShadow = true;
  scene.add(outerFloor);

  // Machined circular stage pedestal supporting the 5 modules (top flush at y = 0)
  const stageTopGeo = trackGeo(new THREE.CircleGeometry(5.35, 72));
  const floorMat = trackMat(
    new THREE.MeshStandardMaterial({
      map: isStartLight ? lightGridTexture : darkGridTexture,
      roughness: isStartLight ? 0.92 : 0.78,
      metalness: isStartLight ? 0.04 : 0.2,
      envMapIntensity: isStartLight ? 0.3 : 0.85,
    })
  );
  const stageTop = new THREE.Mesh(stageTopGeo, floorMat);
  stageTop.rotation.x = -Math.PI / 2;
  stageTop.position.y = 0;
  stageTop.receiveShadow = true;
  scene.add(stageTop);

  const stagePlinthMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: isStartLight ? 0x334155 : 0x18181f,
      roughness: 0.42,
      metalness: 0.72,
    })
  );
  const stageSkirtGeo = trackGeo(new THREE.CylinderGeometry(5.38, 5.56, 0.16, 72));
  const stageSkirt = new THREE.Mesh(stageSkirtGeo, stagePlinthMat);
  stageSkirt.position.y = -0.095;
  stageSkirt.castShadow = true;
  stageSkirt.receiveShadow = true;
  scene.add(stageSkirt);

  const stageRimGeo = trackGeo(new THREE.TorusGeometry(5.37, 0.045, 16, 84));
  const stageRimMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: isStartLight ? 0x2563eb : 0x3b82f6,
      emissive: isStartLight ? 0x1d4ed8 : 0x1e40af,
      emissiveIntensity: isStartLight ? 0.35 : 0.65,
      roughness: 0.3,
      metalness: 0.6,
    })
  );
  const stageRim = new THREE.Mesh(stageRimGeo, stageRimMat);
  stageRim.rotation.x = Math.PI / 2;
  stageRim.position.y = -0.015;
  scene.add(stageRim);

  const shadowTex = createContactShadowTexture();
  textures.push(shadowTex);
  const contactShadowMat = trackMat(
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: isStartLight ? 0.48 : 0.55,
      depthWrite: false,
    })
  );

  // Shared PBR material palette (distinct roughness & metalness contrast)
  const matteChassisMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: isStartLight ? 0x1e293b : 0x16161b,
      roughness: 0.72,
      metalness: 0.25,
    })
  );
  const brushedTitaniumMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: isStartLight ? 0x64748b : 0x94a3b8,
      roughness: 0.24,
      metalness: 0.9,
      anisotropy: 0.65,
    })
  );
  const darkAnodizedMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: isStartLight ? 0x334155 : 0x27272f,
      roughness: 0.35,
      metalness: 0.82,
    })
  );
  const crystalGlassMat = trackMat(
    new THREE.MeshPhysicalMaterial({
      color: isStartLight ? 0x3b82f6 : 0x93c5fd,
      roughness: 0.1,
      metalness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.76,
      transparent: true,
      opacity: isSoftwareGl ? (isStartLight ? 0.58 : 0.42) : 1,
      ior: 1.52,
      thickness: 0.6,
      clearcoat: 1.0,
    })
  );

  // Helper to build hexagonal extruded plinths
  const createHexGeometry = (radius: number, depth: number, bevel = 0.04) => {
    const shape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + Math.PI / 6;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    const geo = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: bevel,
      bevelThickness: bevel,
    });
    geo.rotateX(-Math.PI / 2);
    return trackGeo(geo);
  };

  const nodeRigs: NodeRig[] = [];
  const hitTargets: THREE.Mesh[] = [];
  const raycaster = new THREE.Raycaster();
  raycaster.layers.set(1);

  const registerContactShadow = (parent: THREE.Group, scale = 2.4) => {
    const shadowGeo = trackGeo(new THREE.PlaneGeometry(scale, scale));
    const shadow = new THREE.Mesh(shadowGeo, contactShadowMat);
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.015;
    parent.add(shadow);
  };

  const addHitProxy = (
    group: THREE.Group,
    id: ArchitectureNodeId,
    w: number,
    h: number,
    d: number
  ) => {
    const proxyGeo = trackGeo(new THREE.BoxGeometry(w, h, d));
    const proxyMat = trackMat(new THREE.MeshBasicMaterial({ visible: false }));
    const proxy = new THREE.Mesh(proxyGeo, proxyMat);
    proxy.position.y = h / 2;
    proxy.layers.set(1);
    proxy.userData.nodeId = id;
    group.add(proxy);
    hitTargets.push(proxy);
    return proxy;
  };

  // 1. CORE API GATEWAY & MICROSERVICES (Center)
  {
    const id: ArchitectureNodeId = 'api-gateway';
    const group = new THREE.Group();
    const basePos = new THREE.Vector3(0, 0, 0);
    group.position.copy(basePos);
    registerContactShadow(group, 3.1);

    const accentMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        emissive: 0x2563eb,
        emissiveIntensity: 1.4,
        roughness: 0.2,
        metalness: 0.4,
      })
    );

    const plinth = new THREE.Mesh(createHexGeometry(1.15, 0.18, 0.04), matteChassisMat);
    plinth.position.y = 0.04;
    plinth.castShadow = true;
    plinth.receiveShadow = true;

    const ringMesh = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.95, 0.035, 16, 48)),
      accentMat
    );
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.3;

    const coreTower = new THREE.Group();
    const chassis = new THREE.Mesh(createHexGeometry(0.75, 0.72, 0.035), darkAnodizedMat);
    chassis.position.y = 0.34;
    chassis.castShadow = true;
    coreTower.add(chassis);

    // 6 brushed titanium cooling ribs
    for (let i = 0; i < 6; i++) {
      const fin = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(0.12, 0.56, 0.04)),
        brushedTitaniumMat
      );
      const angle = (i / 6) * Math.PI * 2;
      fin.position.set(Math.cos(angle) * 0.76, 0.7, Math.sin(angle) * 0.76);
      fin.rotation.y = -angle;
      fin.castShadow = true;
      coreTower.add(fin);
    }

    const crownGroup = new THREE.Group();
    const glassCore = new THREE.Mesh(
      trackGeo(new THREE.OctahedronGeometry(0.42, 0)),
      crystalGlassMat
    );
    glassCore.position.y = 1.48;
    const crownCap = new THREE.Mesh(createHexGeometry(0.55, 0.1, 0.025), brushedTitaniumMat);
    crownCap.position.y = 1.15;
    crownGroup.add(crownCap, glassCore);

    group.add(plinth, ringMesh, coreTower, crownGroup);
    const hitMesh = addHitProxy(group, id, 2.3, 2.1, 2.3);
    scene.add(group);

    nodeRigs.push({
      id,
      group,
      basePosition: basePos,
      explodeOffset: new THREE.Vector3(0, 0.35, 0),
      layers: [
        { object: plinth, baseY: 0.04, explodeLift: 0 },
        { object: ringMesh, baseY: 0.3, explodeLift: 0.28 },
        { object: coreTower, baseY: 0, explodeLift: 0.55 },
        { object: crownGroup, baseY: 0, explodeLift: 1.05 },
      ],
      accentRing: ringMesh,
      accentMaterial: accentMat,
      hitMesh,
      baseEmissiveIntensity: 1.4,
    });
  }

  // 2. RAG ENGINE & VECTOR EMBEDDINGS (Back-Left)
  {
    const id: ArchitectureNodeId = 'rag-engine';
    const group = new THREE.Group();
    const basePos = new THREE.Vector3(-3.0, 0, -1.8);
    group.position.copy(basePos);
    registerContactShadow(group, 2.3);

    const accentMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        emissive: 0x3b82f6,
        emissiveIntensity: 1.25,
        roughness: 0.25,
        metalness: 0.35,
      })
    );

    const base = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.85, 0.98, 0.2, 32)),
      matteChassisMat
    );
    base.position.y = 0.1;
    base.castShadow = true;
    base.receiveShadow = true;

    const ringMesh = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.76, 0.028, 16, 48)),
      accentMat
    );
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.24;

    const glassLayers: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const layer = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(1.05, 0.08, 1.05)),
        crystalGlassMat
      );
      layer.position.y = 0.48 + i * 0.28;
      layer.rotation.y = (i * Math.PI) / 8;
      glassLayers.push(layer);
    }

    const coreOrb = new THREE.Mesh(
      trackGeo(new THREE.IcosahedronGeometry(0.24, 1)),
      accentMat
    );
    coreOrb.position.y = 1.45;

    const framePillar1 = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.035, 0.035, 1.15, 12)),
      brushedTitaniumMat
    );
    framePillar1.position.set(0.62, 0.78, 0.62);
    const framePillar2 = framePillar1.clone();
    framePillar2.position.set(-0.62, 0.78, -0.62);

    group.add(base, ringMesh, framePillar1, framePillar2, ...glassLayers, coreOrb);
    const hitMesh = addHitProxy(group, id, 1.9, 1.9, 1.9);
    scene.add(group);

    nodeRigs.push({
      id,
      group,
      basePosition: basePos,
      explodeOffset: new THREE.Vector3(-0.75, 0.15, -0.45),
      layers: [
        { object: base, baseY: 0.1, explodeLift: 0 },
        { object: ringMesh, baseY: 0.24, explodeLift: 0.18 },
        { object: glassLayers[0], baseY: 0.48, explodeLift: 0.35 },
        { object: glassLayers[1], baseY: 0.76, explodeLift: 0.62 },
        { object: glassLayers[2], baseY: 1.04, explodeLift: 0.88 },
        { object: coreOrb, baseY: 1.45, explodeLift: 1.15 },
      ],
      accentRing: ringMesh,
      accentMaterial: accentMat,
      hitMesh,
      baseEmissiveIntensity: 1.25,
    });
  }

  // 3. POSTGRESQL & PGVECTOR (Back-Right)
  {
    const id: ArchitectureNodeId = 'postgres-pgvector';
    const group = new THREE.Group();
    const basePos = new THREE.Vector3(3.0, 0, -1.8);
    group.position.copy(basePos);
    registerContactShadow(group, 2.3);

    const accentMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 1.25,
        roughness: 0.2,
        metalness: 0.4,
      })
    );

    const base = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.9, 1.02, 0.2, 32)),
      matteChassisMat
    );
    base.position.y = 0.1;
    base.castShadow = true;

    const ringMesh = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.8, 0.028, 16, 48)),
      accentMat
    );
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.25;

    const platters: THREE.Group[] = [];
    for (let i = 0; i < 3; i++) {
      const pGroup = new THREE.Group();
      const disk = new THREE.Mesh(
        trackGeo(new THREE.CylinderGeometry(0.68, 0.68, 0.16, 32)),
        darkAnodizedMat
      );
      disk.castShadow = true;
      const trim = new THREE.Mesh(
        trackGeo(new THREE.TorusGeometry(0.69, 0.018, 12, 36)),
        brushedTitaniumMat
      );
      trim.rotation.x = Math.PI / 2;
      pGroup.position.y = 0.44 + i * 0.34;
      pGroup.add(disk, trim);
      platters.push(pGroup);
      group.add(pGroup);
    }

    const topSensor = new THREE.Mesh(
      trackGeo(new THREE.CylinderGeometry(0.28, 0.36, 0.14, 24)),
      brushedTitaniumMat
    );
    topSensor.position.y = 1.44;

    group.add(base, ringMesh, topSensor);
    const hitMesh = addHitProxy(group, id, 1.95, 1.85, 1.95);
    scene.add(group);

    nodeRigs.push({
      id,
      group,
      basePosition: basePos,
      explodeOffset: new THREE.Vector3(0.75, 0.15, -0.45),
      layers: [
        { object: base, baseY: 0.1, explodeLift: 0 },
        { object: ringMesh, baseY: 0.25, explodeLift: 0.18 },
        { object: platters[0], baseY: 0.44, explodeLift: 0.35 },
        { object: platters[1], baseY: 0.78, explodeLift: 0.65 },
        { object: platters[2], baseY: 1.12, explodeLift: 0.95 },
        { object: topSensor, baseY: 1.44, explodeLift: 1.25 },
      ],
      accentRing: ringMesh,
      accentMaterial: accentMat,
      hitMesh,
      baseEmissiveIntensity: 1.25,
    });
  }

  // 4. FRONTEND CLIENTS: ANGULAR, REACT NATIVE & PWA (Front-Left)
  {
    const id: ArchitectureNodeId = 'frontend-clients';
    const group = new THREE.Group();
    const basePos = new THREE.Vector3(-2.6, 0, 2.2);
    group.position.copy(basePos);
    group.rotation.y = 0.45;
    registerContactShadow(group, 2.2);

    const accentMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x818cf8,
        emissive: 0x4f46e5,
        emissiveIntensity: 1.2,
        roughness: 0.22,
        metalness: 0.35,
      })
    );

    const base = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(1.5, 0.16, 1.1)),
      matteChassisMat
    );
    base.position.y = 0.08;
    base.castShadow = true;

    const ringMesh = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.62, 0.025, 14, 40)),
      accentMat
    );
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.2;

    const stand = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.22, 0.55, 0.16)),
      brushedTitaniumMat
    );
    stand.position.set(0, 0.44, -0.18);
    stand.castShadow = true;

    const screenGroup = new THREE.Group();
    const screenFrame = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(1.38, 0.84, 0.07)),
      darkAnodizedMat
    );
    screenFrame.castShadow = true;
    const screenGlass = new THREE.Mesh(
      trackGeo(new THREE.PlaneGeometry(1.26, 0.72)),
      crystalGlassMat
    );
    screenGlass.position.z = 0.04;
    screenGroup.position.set(0, 0.88, 0.02);
    screenGroup.rotation.x = -0.18;
    screenGroup.add(screenFrame, screenGlass);

    const mobileDevice = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(0.36, 0.64, 0.05)),
      brushedTitaniumMat
    );
    mobileDevice.position.set(0.62, 0.48, 0.28);
    mobileDevice.rotation.set(-0.25, -0.25, 0);
    mobileDevice.castShadow = true;

    group.add(base, ringMesh, stand, screenGroup, mobileDevice);
    const hitMesh = addHitProxy(group, id, 1.9, 1.65, 1.6);
    scene.add(group);

    nodeRigs.push({
      id,
      group,
      basePosition: basePos,
      explodeOffset: new THREE.Vector3(-0.65, 0.12, 0.55),
      layers: [
        { object: base, baseY: 0.08, explodeLift: 0 },
        { object: ringMesh, baseY: 0.2, explodeLift: 0.18 },
        { object: stand, baseY: 0.44, explodeLift: 0.35 },
        { object: mobileDevice, baseY: 0.48, explodeLift: 0.52 },
        { object: screenGroup, baseY: 0.88, explodeLift: 0.85 },
      ],
      accentRing: ringMesh,
      accentMaterial: accentMat,
      hitMesh,
      baseEmissiveIntensity: 1.2,
    });
  }

  // 5. DOCKER & CI/CD ORCHESTRATION (Front-Right)
  {
    const id: ArchitectureNodeId = 'devops-cicd';
    const group = new THREE.Group();
    const basePos = new THREE.Vector3(2.6, 0, 2.2);
    group.position.copy(basePos);
    group.rotation.y = -0.45;
    registerContactShadow(group, 2.2);

    const accentMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x34d399,
        emissive: 0x059669,
        emissiveIntensity: 1.2,
        roughness: 0.22,
        metalness: 0.35,
      })
    );

    const base = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(1.55, 0.18, 1.2)),
      matteChassisMat
    );
    base.position.y = 0.09;
    base.castShadow = true;

    const ringMesh = new THREE.Mesh(
      trackGeo(new THREE.TorusGeometry(0.68, 0.025, 14, 40)),
      accentMat
    );
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.21;

    const containerOffsets = [
      [-0.36, 0.42, -0.2],
      [0.36, 0.42, -0.2],
      [-0.36, 0.42, 0.24],
      [0.36, 0.42, 0.24],
    ] as const;

    const containers: THREE.Mesh[] = containerOffsets.map(([cx, cy, cz], idx) => {
      const box = new THREE.Mesh(
        trackGeo(new THREE.BoxGeometry(0.56, 0.34, 0.36)),
        idx % 2 === 0 ? darkAnodizedMat : brushedTitaniumMat
      );
      box.position.set(cx, cy, cz);
      box.castShadow = true;
      group.add(box);
      return box;
    });

    const topBridge = new THREE.Mesh(
      trackGeo(new THREE.BoxGeometry(1.18, 0.14, 0.64)),
      brushedTitaniumMat
    );
    topBridge.position.y = 0.82;
    topBridge.castShadow = true;

    group.add(base, ringMesh, topBridge);
    const hitMesh = addHitProxy(group, id, 1.9, 1.45, 1.6);
    scene.add(group);

    nodeRigs.push({
      id,
      group,
      basePosition: basePos,
      explodeOffset: new THREE.Vector3(0.65, 0.12, 0.55),
      layers: [
        { object: base, baseY: 0.09, explodeLift: 0 },
        { object: ringMesh, baseY: 0.21, explodeLift: 0.18 },
        ...containers.map((c, idx) => ({
          object: c,
          baseY: 0.42,
          explodeLift: 0.38 + (idx % 2) * 0.18,
        })),
        { object: topBridge, baseY: 0.82, explodeLift: 0.92 },
      ],
      accentRing: ringMesh,
      accentMaterial: accentMat,
      hitMesh,
      baseEmissiveIntensity: 1.2,
    });
  }

  // Fiber-optic conduit tubes connecting Gateway to all subsystems
  const conduitMat = trackMat(
    new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.45,
      roughness: 0.3,
      metalness: 0.7,
    })
  );

  const conduitCurves: THREE.CatmullRomCurve3[] = [];
  const gatewayPos = nodeRigs[0].basePosition;

  for (let i = 1; i < nodeRigs.length; i++) {
    const target = nodeRigs[i].basePosition;
    const mid = gatewayPos
      .clone()
      .lerp(target, 0.5)
      .add(new THREE.Vector3(0, 0.45, 0));
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(gatewayPos.x, 0.28, gatewayPos.z),
      mid,
      new THREE.Vector3(target.x, 0.24, target.z),
    ]);
    conduitCurves.push(curve);

    const tubeGeo = trackGeo(new THREE.TubeGeometry(curve, 28, 0.024, 8, false));
    const tubeMesh = new THREE.Mesh(tubeGeo, conduitMat);
    scene.add(tubeMesh);
  }

  // Also add RAG <-> PostgreSQL vector link
  {
    const ragPos = nodeRigs[1].basePosition;
    const pgPos = nodeRigs[2].basePosition;
    const vectorCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(ragPos.x, 0.26, ragPos.z),
      new THREE.Vector3(0, 0.58, -2.25),
      new THREE.Vector3(pgPos.x, 0.26, pgPos.z),
    ]);
    conduitCurves.push(vectorCurve);
    const tubeGeo = trackGeo(new THREE.TubeGeometry(vectorCurve, 28, 0.022, 8, false));
    scene.add(new THREE.Mesh(tubeGeo, conduitMat));
  }

  // InstancedMesh animated data packets along conduits
  const packetCount = conduitCurves.length * 4;
  const packetGeo = trackGeo(new THREE.SphereGeometry(0.065, 12, 12));
  const packetMat = trackMat(
    new THREE.MeshBasicMaterial({
      color: isStartLight ? 0x1d4ed8 : 0x60a5fa,
    })
  );
  const packetInstanced = new THREE.InstancedMesh(packetGeo, packetMat, packetCount);
  packetInstanced.frustumCulled = false;
  scene.add(packetInstanced);

  const packets: PacketInstance[] = [];
  for (let i = 0; i < packetCount; i++) {
    packets.push({
      curveIndex: i % conduitCurves.length,
      t: (i / packetCount) % 1,
      speed: 0.24 + (i % 3) * 0.06,
    });
  }

  // Pre-warm shaders when GPU is hardware-accelerated
  if (!isSoftwareGl) {
    renderer.compile(scene, camera);
  }

  // Interactive controller state
  let selectedNodeId: ArchitectureNodeId | null = 'api-gateway';
  let hoveredNodeId: ArchitectureNodeId | null = null;
  let targetExplode = 0;
  let currentExplode = 0;
  let flowRunning = true;
  let cameraTransitionActive = false;

  const PRESETS: Record<CameraPresetId, { pos: [number, number, number]; target: [number, number, number] }> = {
    global: { pos: [6.4, 4.9, 7.6], target: [0, 0.7, 0] },
    'backend-rag': { pos: [-1.2, 3.6, 3.4], target: [-0.8, 0.85, -1.2] },
    microservices: { pos: [4.2, 3.2, 4.8], target: [1.1, 0.75, 0.4] },
  };

  _desiredCamPos.set(...PRESETS.global.pos);
  _desiredTarget.set(...PRESETS.global.target);

  const handleControlsStart = () => {
    cameraTransitionActive = false;
  };
  controls.addEventListener('start', handleControlsStart);

  // Pointer & Raycaster interaction
  const pointer = new THREE.Vector2();
  let lastMoveTime = 0;
  let pointerDownX = 0;
  let pointerDownY = 0;

  const updatePointer = (event: PointerEvent) => {
    const rect = renderer.domElement.getBoundingClientRect();
    pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  };

  const handlePointerMove = (event: PointerEvent) => {
    const now = performance.now();
    if (now - lastMoveTime < 45) return;
    lastMoveTime = now;

    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(hitTargets, false);
    const nextHover =
      hits.length > 0 ? (hits[0].object.userData.nodeId as ArchitectureNodeId) : null;

    if (nextHover !== hoveredNodeId) {
      hoveredNodeId = nextHover;
      renderer.domElement.style.cursor = hoveredNodeId ? 'pointer' : 'grab';
      options.onHoverNode(hoveredNodeId);
    }
  };

  const handlePointerDown = (event: PointerEvent) => {
    pointerDownX = event.clientX;
    pointerDownY = event.clientY;
  };

  const handlePointerUp = (event: PointerEvent) => {
    const dist = Math.hypot(event.clientX - pointerDownX, event.clientY - pointerDownY);
    if (dist > 6) return;

    updatePointer(event);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects(hitTargets, false);
    if (hits.length > 0) {
      const clickedId = hits[0].object.userData.nodeId as ArchitectureNodeId;
      selectedNodeId = clickedId;
      options.onSelectNode(clickedId);

      const rig = nodeRigs.find((r) => r.id === clickedId);
      if (rig) {
        _desiredTarget.copy(rig.group.position).add(_vec3.set(0, 0.85, 0));
        _desiredCamPos.set(
          rig.group.position.x + 2.8,
          3.1,
          rig.group.position.z + 3.6
        );
        cameraTransitionActive = true;
      }
    }
  };

  const handlePointerLeave = () => {
    if (hoveredNodeId !== null) {
      hoveredNodeId = null;
      renderer.domElement.style.cursor = 'grab';
      options.onHoverNode(null);
    }
  };

  const handleContextLost = (e: Event) => {
    e.preventDefault();
    options.onContextLost?.();
  };
  const handleContextRestored = () => {
    options.onContextRestored?.();
  };

  renderer.domElement.style.cursor = 'grab';
  renderer.domElement.addEventListener('pointermove', handlePointerMove);
  renderer.domElement.addEventListener('pointerdown', handlePointerDown);
  renderer.domElement.addEventListener('pointerup', handlePointerUp);
  renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
  renderer.domElement.addEventListener('webglcontextlost', handleContextLost);
  renderer.domElement.addEventListener('webglcontextrestored', handleContextRestored);

  const handleResize = () => {
    const nextW = Math.max(container.clientWidth, 320);
    const nextH = Math.max(container.clientHeight, 360);
    camera.aspect = nextW / nextH;
    camera.updateProjectionMatrix();
    renderer.setSize(nextW, nextH);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(container);

  // Animation loop with software WebGL pacing
  const clock = new THREE.Clock();
  let frameId = 0;
  let disposed = false;

  function afterDraw(cb: () => void) {
    const gl = renderer.getContext() as WebGL2RenderingContext;
    if (!gl || typeof gl.fenceSync !== 'function') {
      frameId = window.setTimeout(cb, 80);
      return;
    }
    const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    gl.flush();
    const poll = () => {
      if (disposed) {
        if (sync) gl.deleteSync(sync);
        return;
      }
      const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
      if (state === gl.UNSIGNALED) {
        frameId = window.setTimeout(poll, 5);
      } else {
        if (sync) gl.deleteSync(sync);
        frameId = window.setTimeout(cb, 80);
      }
    };
    frameId = window.setTimeout(poll, 5);
  }

  function tick() {
    if (disposed) return;

    const delta = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.elapsedTime;

    // Smooth exploded-view damping
    currentExplode = THREE.MathUtils.damp(currentExplode, targetExplode, 7, delta);

    for (let i = 0; i < nodeRigs.length; i++) {
      const rig = nodeRigs[i];
      // Horizontal radial spread + subtle levitation
      rig.group.position.x =
        rig.basePosition.x + rig.explodeOffset.x * currentExplode;
      rig.group.position.z =
        rig.basePosition.z + rig.explodeOffset.z * currentExplode;
      rig.group.position.y =
        rig.basePosition.y +
        rig.explodeOffset.y * currentExplode +
        Math.sin(elapsed * 1.4 + i * 1.2) * 0.035;

      // Vertical layer separation inside each composite model
      for (let j = 0; j < rig.layers.length; j++) {
        const layer = rig.layers[j];
        layer.object.position.y = layer.baseY + layer.explodeLift * currentExplode;
      }

      // Highlight selected / hovered node emissive energy
      const isSelected = rig.id === selectedNodeId;
      const isHovered = rig.id === hoveredNodeId;
      const targetEmissive = isSelected
        ? rig.baseEmissiveIntensity * 2.1
        : isHovered
          ? rig.baseEmissiveIntensity * 1.65
          : rig.baseEmissiveIntensity * 0.85;

      rig.accentMaterial.emissiveIntensity = THREE.MathUtils.damp(
        rig.accentMaterial.emissiveIntensity,
        targetEmissive,
        9,
        delta
      );

      const ringScale = isSelected ? 1.07 : isHovered ? 1.04 : 1.0;
      rig.accentRing.scale.x = THREE.MathUtils.damp(
        rig.accentRing.scale.x,
        ringScale,
        9,
        delta
      );
      rig.accentRing.scale.y = rig.accentRing.scale.x;
    }

    // Update animated data packets along fiber-optic curves
    for (let i = 0; i < packets.length; i++) {
      const p = packets[i];
      if (flowRunning) {
        p.t = (p.t + delta * p.speed) % 1;
      }
      conduitCurves[p.curveIndex].getPointAt(p.t, _packetPos);
      _packetMat4.compose(_packetPos, _packetQuat, _packetScale);
      packetInstanced.setMatrixAt(i, _packetMat4);
    }
    packetInstanced.instanceMatrix.needsUpdate = true;

    // Smooth camera preset / focus transition
    if (cameraTransitionActive) {
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        _desiredCamPos.x,
        5,
        delta
      );
      camera.position.y = THREE.MathUtils.damp(
        camera.position.y,
        _desiredCamPos.y,
        5,
        delta
      );
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        _desiredCamPos.z,
        5,
        delta
      );
      controls.target.x = THREE.MathUtils.damp(
        controls.target.x,
        _desiredTarget.x,
        5,
        delta
      );
      controls.target.y = THREE.MathUtils.damp(
        controls.target.y,
        _desiredTarget.y,
        5,
        delta
      );
      controls.target.z = THREE.MathUtils.damp(
        controls.target.z,
        _desiredTarget.z,
        5,
        delta
      );

      if (
        camera.position.distanceTo(_desiredCamPos) < 0.04 &&
        controls.target.distanceTo(_desiredTarget) < 0.04
      ) {
        cameraTransitionActive = false;
      }
    }

    controls.update();
    renderer.render(scene, camera);

    if (isSoftwareGl) {
      afterDraw(tick);
    } else {
      frameId = requestAnimationFrame(tick);
    }
  }

  tick();

  return {
    setSelectedNode(id: ArchitectureNodeId | null) {
      selectedNodeId = id;
      if (id) {
        const rig = nodeRigs.find((r) => r.id === id);
        if (rig) {
          _desiredTarget.copy(rig.group.position).add(_vec3.set(0, 0.85, 0));
          _desiredCamPos.set(
            rig.group.position.x + 2.8,
            3.1,
            rig.group.position.z + 3.6
          );
          cameraTransitionActive = true;
        }
      }
    },
    setExplodeFactor(value: number) {
      targetExplode = THREE.MathUtils.clamp(value, 0, 1);
    },
    setCameraPreset(preset: CameraPresetId) {
      const cfg = PRESETS[preset];
      _desiredCamPos.set(...cfg.pos);
      _desiredTarget.set(...cfg.target);
      cameraTransitionActive = true;
    },
    setFlowRunning(running: boolean) {
      flowRunning = running;
    },
    setTheme(theme: ThemeMode) {
      const isLight = theme === 'light';
      const bgHex = isLight ? 0xe5ebf3 : 0x050507;
      (scene.background as THREE.Color).setHex(bgHex);
      if (scene.fog instanceof THREE.FogExp2) {
        scene.fog.color.setHex(bgHex);
        scene.fog.density = isLight ? 0.026 : 0.042;
      }

      renderer.toneMappingExposure = isLight ? 0.94 : 1.15;

      outerFloorMat.color.setHex(isLight ? 0xdbe3ee : 0x050507);
      outerFloorMat.envMapIntensity = isLight ? 0.25 : 0.5;

      floorMat.map = isLight ? lightGridTexture : darkGridTexture;
      floorMat.roughness = isLight ? 0.92 : 0.78;
      floorMat.metalness = isLight ? 0.04 : 0.2;
      floorMat.envMapIntensity = isLight ? 0.3 : 0.85;
      floorMat.needsUpdate = true;

      stagePlinthMat.color.setHex(isLight ? 0x334155 : 0x18181f);
      stageRimMat.color.setHex(isLight ? 0x2563eb : 0x3b82f6);
      stageRimMat.emissive.setHex(isLight ? 0x1d4ed8 : 0x1e40af);
      stageRimMat.emissiveIntensity = isLight ? 0.35 : 0.65;

      hemiLight.color.setHex(isLight ? 0xe2e8f0 : 0x93c5fd);
      hemiLight.groundColor.setHex(isLight ? 0x64748b : 0x09090b);
      hemiLight.intensity = isLight ? 0.62 : 0.55;
      keyLight.intensity = isLight ? 1.65 : 2.1;
      rimLight.intensity = isLight ? 0.95 : 1.45;

      contactShadowMat.opacity = isLight ? 0.48 : 0.55;

      matteChassisMat.color.setHex(isLight ? 0x1e293b : 0x16161b);
      brushedTitaniumMat.color.setHex(isLight ? 0x64748b : 0x94a3b8);
      darkAnodizedMat.color.setHex(isLight ? 0x334155 : 0x27272f);
      crystalGlassMat.color.setHex(isLight ? 0x3b82f6 : 0x93c5fd);
      if (isSoftwareGl) {
        crystalGlassMat.opacity = isLight ? 0.58 : 0.42;
      }
      packetMat.color.setHex(isLight ? 0x1d4ed8 : 0x60a5fa);
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      resizeObserver.disconnect();
      controls.removeEventListener('start', handleControlsStart);
      controls.dispose();

      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);
      renderer.domElement.removeEventListener('pointerup', handlePointerUp);
      renderer.domElement.removeEventListener('pointerleave', handlePointerLeave);
      renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
      renderer.domElement.removeEventListener('webglcontextrestored', handleContextRestored);

      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      textures.forEach((t) => t.dispose());
      envRenderTarget.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    },
  };
}
