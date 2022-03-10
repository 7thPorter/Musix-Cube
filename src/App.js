import { useEffect, useRef } from "react";
import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  MeshStandardMaterial,
  MeshToonMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import "./App.css";

function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new WebGLRenderer();

    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    const geometry = new BoxGeometry(3, 3, 3);

    const material = new MeshStandardMaterial({ color: 0x8fd6f0 });
    const cube = new Mesh(geometry, material);
    // cube.faces[0].color.setHex(0x8fd6f0);
    const ambientLight = new AmbientLight(0xb68cb8, 1);
    const directionalLight = new DirectionalLight(0xffffff, 1);
    const directionalLight2 = new DirectionalLight(0xffffff, 1);
    // directionalLight2.position = (0, -1, 0);

    scene.add(cube);
    scene.add(ambientLight);
    scene.add(directionalLight);
    // scene.add(directionalLight2);
    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.005;
      cube.rotation.y += 0.005;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef}></div>;
}

export default App;
