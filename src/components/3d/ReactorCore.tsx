import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import useEnergyStore from '../../store/useEnergyStore';

// --- 상수 정의 ---
const COLOR_SAFE = new THREE.Color('#00FFF0'); // 안전 상태 (Cyan)
const COLOR_DANGER = new THREE.Color('#FF0055'); // 위험 상태 (Red)

/**
 * ReactorCore (Refactored)
 * - 기계적인 자이로스코프 구조 (3축 회전 링)
 * - Zustand 상태(energyLevel)에 따라 회전 속도와 색상이 실시간으로 변합니다.
 */
const ReactorCore = () => {
  // 각 파츠별 참조(Ref) 생성
  const groupRef = useRef<THREE.Group>(null!);
  const outerRingRef = useRef<THREE.Mesh>(null!);
  const midRingRef = useRef<THREE.Mesh>(null!);
  const innerRingRef = useRef<THREE.Mesh>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);

  // Zustand에서 에너지 레벨 구독 (Selector를 사용하여 리렌더링 최적화)
  const energyLevel = useEnergyStore((state) => state.energyLevel);

  useFrame((state, delta) => {
    // 1. 에너지 레벨 정규화 (0.0 ~ 1.0)
    const normalizedEnergy = energyLevel / 100;

    // 2. 색상 보간 (Interpolation)
    // 에너지가 높을수록 Cyan -> Red로 색상이 서서히 변함
    const currentColor = new THREE.Color().lerpColors(COLOR_SAFE, COLOR_DANGER, normalizedEnergy);

    // 3. 회전 속도 계산 (기본 속도 + 에너지 가중치)
    const speed = 0.5 + (normalizedEnergy * 2.0); // 에너지가 100일 때 최대 2.5배 빠름

    // --- 애니메이션 적용 ---
    
    // [그룹] 전체가 천천히 부유함
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;

    // [바깥 링] X축 회전 (가장 느림)
    outerRingRef.current.rotation.x += delta * speed * 0.5;
    outerRingRef.current.rotation.y += delta * 0.1;
    (outerRingRef.current.material as THREE.MeshStandardMaterial).emissive.set(currentColor);

    // [중간 링] Y축 회전 (중간 속도)
    midRingRef.current.rotation.y += delta * speed * 0.8;
    midRingRef.current.rotation.z += delta * 0.2;
    (midRingRef.current.material as THREE.MeshStandardMaterial).emissive.set(currentColor);

    // [안쪽 링] Z축 회전 (가장 빠름)
    innerRingRef.current.rotation.z += delta * speed * 1.2;
    innerRingRef.current.rotation.x += delta * 0.3;
    (innerRingRef.current.material as THREE.MeshStandardMaterial).emissive.set(currentColor);

    // [코어] 맥박치듯 스케일 변화 + 색상 적용
    const pulse = 1 + Math.sin(state.clock.elapsedTime * 5 * speed) * 0.1;
    coreRef.current.scale.set(pulse, pulse, pulse);
    (coreRef.current.material as THREE.MeshStandardMaterial).color.set(currentColor);
    (coreRef.current.material as THREE.MeshStandardMaterial).emissive.set(currentColor);
  });

  // 공통 재질 설정 (금속 느낌)
  const ringMaterialParams = {
    color: '#111111',
    roughness: 0.2,
    metalness: 0.9,
    emissiveIntensity: 1.5, // 자체 발광 강도
  };

  return (
    <group ref={groupRef}>
      {/* 1. Outer Ring (가장 큼) */}
      <mesh ref={outerRingRef}>
        <torusGeometry args={[5, 0.2, 16, 100]} /> {/* 반지름, 두께, 세그먼트 */}
        <meshStandardMaterial {...ringMaterialParams} />
      </mesh>

      {/* 2. Middle Ring (중간) */}
      <mesh ref={midRingRef}>
        <torusGeometry args={[4, 0.3, 16, 100]} />
        <meshStandardMaterial {...ringMaterialParams} />
      </mesh>

      {/* 3. Inner Ring (가장 작음) */}
      <mesh ref={innerRingRef}>
        <torusGeometry args={[3, 0.5, 16, 100]} />
        <meshStandardMaterial {...ringMaterialParams} />
      </mesh>

      {/* 4. Core Sphere (에너지 원천) */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1.5, 32, 32]} />
        {/* 코어는 매우 밝게 빛나야 하므로 emissiveIntensity를 높게 설정 */}
        <meshStandardMaterial 
          color="#ffffff" 
          emissiveIntensity={3} 
          toneMapped={false} // 톤 매핑을 무시하여 순수한 빛으로 표현
        />
      </mesh>
    </group>
  );
};

export default ReactorCore;