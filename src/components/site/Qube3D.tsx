import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const MOD_COLORS = ["#F24A2D", "#7FA3E6", "#E9DFC6", "#F2B53D", "#EE5FB4", "#F0B596", "#A6D44F", "#9C7BEA", "#5FD0C2"];

function Cubes() {
  const group = useRef<THREE.Group>(null);
  const refs = useRef<THREE.Mesh[]>([]);
  const cells = useMemo(() => {
    const out: { p: THREE.Vector3; color: string; accent: boolean }[] = [];
    let k = 0;
    for (let x = -1; x <= 1; x++)
      for (let y = -1; y <= 1; y++)
        for (let z = -1; z <= 1; z++) {
          const front = z === 1;
          out.push({ p: new THREE.Vector3(x, y, z), color: front ? MOD_COLORS[k++ % 9] : "#22272A", accent: front });
        }
    return out;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const g = group.current;
    if (!g) return;
    const px = state.pointer.x, py = state.pointer.y;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, t * 0.25 + px * 0.6, 0.05);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, 0.45 - py * 0.4, 0.05);
    const spread = 1.08 + (Math.sin(t * 0.8) * 0.5 + 0.5) * 0.28;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const c = cells[i].p;
      m.position.lerp(new THREE.Vector3(c.x * spread, c.y * spread, c.z * spread), 0.1);
    });
  });

  return (
    <group ref={group}>
      {cells.map((c, i) => (
        <RoundedBox key={i} ref={(el) => { if (el) refs.current[i] = el as unknown as THREE.Mesh; }} args={[0.94, 0.94, 0.94]} radius={0.08} smoothness={4}>
          <meshStandardMaterial
            color={c.color}
            metalness={c.accent ? 0.35 : 0.7}
            roughness={c.accent ? 0.35 : 0.45}
            emissive={c.accent ? c.color : "#000"}
            emissiveIntensity={c.accent ? 0.18 : 0}
          />
        </RoundedBox>
      ))}
    </group>
  );
}

export default function Qube3D() {
  return (
    <Canvas camera={{ position: [0, 0, 8.2], fov: 38 }} dpr={[1, 1.8]} gl={{ antialias: true, alpha: true }}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 6, 5]} intensity={2.2} />
      <pointLight position={[-6, -2, 3]} intensity={40} color="#F24A2D" />
      <pointLight position={[4, -4, -4]} intensity={20} color="#F5F3ED" />
      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
        <Cubes />
      </Float>
    </Canvas>
  );
}
