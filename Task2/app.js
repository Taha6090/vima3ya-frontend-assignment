        (async function init() {
            const startTotal = performance.now();
            
            // Dynamically import Three.js (lazy loading)
            const THREE = await import('https://unpkg.com/three@0.128.0/build/three.module.js');
            const { GLTFLoader } = await import('https://unpkg.com/three@0.128.0/examples/jsm/loaders/GLTFLoader.js');
            const { DRACOLoader } = await import('https://unpkg.com/three@0.128.0/examples/jsm/loaders/DRACOLoader.js');
            const { OrbitControls } = await import('https://unpkg.com/three@0.128.0/examples/jsm/controls/OrbitControls.js');
            
            console.log('✅ Three.js loaded dynamically');
            
            // Setup Scene
            const scene = new THREE.Scene();
            scene.background = new THREE.Color(0x0a0a2a);
            scene.fog = new THREE.FogExp2(0x0a0a2a, 0.015); // Subtle fog for depth
            
            // Camera
            const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(4, 3, 6);
            camera.lookAt(0, 0, 0);
            
            // Renderer
            const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            document.body.appendChild(renderer.domElement);
            
            // Lighting System
            const ambientLight = new THREE.AmbientLight(0x404060, 0.6);
            scene.add(ambientLight);
            
            const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
            mainLight.position.set(3, 5, 2);
            mainLight.castShadow = true;
            mainLight.receiveShadow = true;
            mainLight.shadow.mapSize.width = 1024;
            mainLight.shadow.mapSize.height = 1024;
            scene.add(mainLight);
            
            const fillLight = new THREE.PointLight(0x4466cc, 0.4);
            fillLight.position.set(1, 2, 3);
            scene.add(fillLight);
            
            const backLight = new THREE.PointLight(0xffaa66, 0.3);
            backLight.position.set(-2, 1.5, -3);
            scene.add(backLight);
            
            const rimLight = new THREE.PointLight(0xff66aa, 0.25);
            rimLight.position.set(1.5, 1, -2);
            scene.add(rimLight);
            
            // Helper grid
            const gridHelper = new THREE.GridHelper(10, 20, 0x88aaff, 0x335588);
            gridHelper.position.y = -0.5;
            scene.add(gridHelper);
            
            // Orbit Controls
            const controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.05;
            controls.rotateSpeed = 1.2;
            controls.zoomSpeed = 1.2;
            controls.enableZoom = true;
            controls.enablePan = true;
            controls.target.set(0, 0.5, 0);
            
            // Auto-rotate toggle
            let autoRotate = false;
            const autoRotateBtn = document.getElementById('auto-rotate-btn');
            autoRotateBtn.addEventListener('click', () => {
                autoRotate = !autoRotate;
                controls.autoRotate = autoRotate;
                controls.autoRotateSpeed = 1.5;
                autoRotateBtn.textContent = autoRotate ? '🔄 Auto-rotate: ON' : '🔄 Auto-rotate: OFF';
            });
            
            // Loading UI elements
            const loadingOverlay = document.getElementById('loading-overlay');
            const loadingPercentElem = document.getElementById('loading-percent');
            const infoPanel = document.getElementById('info-panel');
            const errorDetailElem = document.getElementById('error-detail');
            
            // Configure Draco Loader
            const dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
            
            const loader = new GLTFLoader();
            loader.setDRACOLoader(dracoLoader);
            
            const modelUrl = './model-compressed.glb';
            const modelLoadStart = performance.now();
            
            // Function to create a demo model (when GLB file is missing)
            function createDemoModel() {
                console.log('🎨 Creating demo model (your model-compressed.glb was not found)');
                const demoGroup = new THREE.Group();
                
                // Create a sleek central object - a metallic torus knot
                const geometry = new THREE.TorusKnotGeometry(0.8, 0.22, 180, 24, 3, 4);
                const material = new THREE.MeshStandardMaterial({
                    color: 0x3a86ff,
                    metalness: 0.85,
                    roughness: 0.25,
                    emissive: 0x001133,
                    emissiveIntensity: 0.3
                });
                const knot = new THREE.Mesh(geometry, material);
                knot.castShadow = true;
                knot.receiveShadow = true;
                knot.position.y = 0.3;
                demoGroup.add(knot);
                
                // Add floating spheres around it
                const sphereMat = new THREE.MeshStandardMaterial({
                    color: 0xff006e,
                    metalness: 0.6,
                    roughness: 0.3,
                    emissive: 0x330011
                });
                
                const positions = [
                    [1.2, 0.5, 0.8], [-1.1, 0.6, -0.9], [0.9, -0.2, -1.1], [-0.8, 0.7, 1.0],
                    [0.5, 1.1, 0.6], [-0.6, -0.3, 1.2], [1.0, -0.4, -0.7]
                ];
                
                positions.forEach(pos => {
                    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), sphereMat);
                    sphere.position.set(pos[0], pos[1], pos[2]);
                    sphere.castShadow = true;
                    demoGroup.add(sphere);
                });
                
                // Add a glowing ring
                const ringGeo = new THREE.TorusGeometry(1.1, 0.05, 64, 200);
                const ringMat = new THREE.MeshStandardMaterial({ color: 0x00d4ff, metalness: 0.9, roughness: 0.1, emissive: 0x004466 });
                const ring = new THREE.Mesh(ringGeo, ringMat);
                ring.rotation.x = Math.PI / 2;
                ring.position.y = -0.1;
                demoGroup.add(ring);
                
                // Add small floating particles
                const particleCount = 300;
                const particleGeo = new THREE.BufferGeometry();
                const particlePositions = new Float32Array(particleCount * 3);
                for (let i = 0; i < particleCount; i++) {
                    particlePositions[i*3] = (Math.random() - 0.5) * 5;
                    particlePositions[i*3+1] = (Math.random() - 0.5) * 3 + 0.5;
                    particlePositions[i*3+2] = (Math.random() - 0.5) * 5;
                }
                particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
                const particleMat = new THREE.PointsMaterial({ color: 0x88aaff, size: 0.03 });
                const particles = new THREE.Points(particleGeo, particleMat);
                demoGroup.add(particles);
                
                scene.add(demoGroup);
                
                // Animate the floating particles and ring rotation in animation loop
                let time = 0;
                const originalAnimate = animate;
                window.animate = function() {
                    time += 0.012;
                    ring.rotation.z = time * 0.5;
                    knot.rotation.y = time * 0.3;
                    knot.rotation.x = Math.sin(time * 0.4) * 0.2;
                    particles.rotation.y = time * 0.1;
                    originalAnimate();
                };
                
                return demoGroup;
            }
            
            // Try to load the model
            let modelLoaded = false;
            
            loader.load(
                modelUrl,
                (gltf) => {
                    const loadTime = (performance.now() - modelLoadStart).toFixed(2);
                    console.log(`✅ Model loaded successfully in ${loadTime}ms`);
                    infoPanel.innerHTML = `📦 Compressed model loaded in ${loadTime}ms | Draco`;
                    
                    const model = gltf.scene;
                    model.traverse((child) => {
                        if (child.isMesh) {
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    scene.add(model);
                    modelLoaded = true;
                    
                    // Hide loading overlay
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.display = 'none';
                    }, 500);
                    
                    // Center camera on model
                    const box = new THREE.Box3().setFromObject(model);
                    const center = box.getCenter(new THREE.Vector3());
                    controls.target.copy(center);
                    controls.update();
                },
                (progress) => {
                    if (progress.lengthComputable) {
                        const percent = Math.floor((progress.loaded / progress.total) * 100);
                        loadingPercentElem.textContent = `${percent}%`;
                    } else {
                        loadingPercentElem.textContent = `Loading... ${Math.floor(progress.loaded / 1024)} KB`;
                    }
                },
                (error) => {
                    console.warn('Could not load model-compressed.glb, creating demo model instead:', error);
                    const loadTime = (performance.now() - modelLoadStart).toFixed(2);
                    infoPanel.innerHTML = `🎨 Demo mode (${loadTime}ms) - Place model-compressed.glb in folder`;
                    loadingPercentElem.textContent = 'Using Demo Model';
                    errorDetailElem.style.display = 'block';
                    errorDetailElem.innerHTML = '⚠️ model-compressed.glb not found.<br>Showing interactive demo instead.';
                    
                    // Create demo model after short delay
                    setTimeout(() => {
                        createDemoModel();
                        loadingOverlay.style.opacity = '0';
                        setTimeout(() => {
                            loadingOverlay.style.display = 'none';
                        }, 500);
                    }, 800);
                }
            );
            
            // Handle window resize
            window.addEventListener('resize', onWindowResize, false);
            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            }
            
            // Animation loop with memoization for demo mode
            let demoTime = 0;
            let demoRing = null;
            let demoKnot = null;
            let demoParticles = null;
            
            function animate() {
                controls.update();
                
                // If demo mode is active (check for ring in scene)
                if (!modelLoaded) {
                    demoTime += 0.016;
                    // Find demo elements if they exist
                    const ring = scene.children.find(c => c.isGroup && c.children.some(ch => ch.geometry && ch.geometry.type === 'TorusGeometry'));
                    if (ring) {
                        const ringMesh = ring.children.find(c => c.geometry && c.geometry.type === 'TorusGeometry');
                        const knotMesh = ring.children.find(c => c.geometry && c.geometry.type === 'TorusKnotGeometry');
                        const particles = ring.children.find(c => c.isPoints);
                        if (ringMesh) ringMesh.rotation.z = demoTime * 0.8;
                        if (knotMesh) {
                            knotMesh.rotation.y = demoTime * 0.5;
                            knotMesh.rotation.x = Math.sin(demoTime * 0.6) * 0.3;
                        }
                        if (particles) particles.rotation.y = demoTime * 0.15;
                    }
                }
                
                renderer.render(scene, camera);
                requestAnimationFrame(animate);
            }
            
            animate();
            
            const totalTime = (performance.now() - startTotal).toFixed(2);
            console.log(`✨ Application ready in ${totalTime}ms`);
            
            // Cleanup on page unload
            window.addEventListener('beforeunload', () => {
                console.log('🧹 Cleaning up resources...');
                scene.traverse((obj) => {
                    if (obj.isMesh) {
                        if (obj.geometry) obj.geometry.dispose();
                        if (obj.material) {
                            if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
                            else obj.material.dispose();
                        }
                    }
                });
                renderer.dispose();
                controls.dispose();
                dracoLoader.dispose();
            });
        })();