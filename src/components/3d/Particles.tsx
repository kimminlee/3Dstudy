import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- 상수 정의 ---
const PARTICLE_COUNT = 2000;
const RANGE = 40;
const Y_RANGE = 40;
const SPEED = 0.5;

/**
 * Particles 컴포넌트
 * - BufferGeometry를 사용하여 대량의 점(Points)을 렌더링합니다.
 * - TypeScript 오류 수정을 위해 명시적 타입 캐스팅을 적용했습니다.
 */
const Particles = () => {
  // 제네릭으로 THREE.Points 타입을 명시
  const pointsRef = useRef<THREE.Points>(null!);

  // 1. 초기 위치 데이터 생성
  const positions = useMemo(() => {
    const array = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      array[i * 3] = (Math.random() - 0.5) * RANGE;     // x
      array[i * 3 + 1] = (Math.random() - 0.5) * Y_RANGE; // y
      array[i * 3 + 2] = (Math.random() - 0.5) * RANGE; // z
    }
    return array;
  }, []);

  // 2. 애니메이션 루프
  useFrame((_state, delta) => {
    if (!pointsRef.current) return;

    // [수정 포인트 1] getAttribute로 안전하게 속성 가져오기 및 타입 단언
    // TypeScript에게 이것이 확실히 'BufferAttribute'임을 알려줍니다.
    const positionAttribute = pointsRef.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    
    // [수정 포인트 2] .array를 Float32Array로 캐스팅하여 수정 가능하게 접근
    const posArray = positionAttribute.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // y축 좌표 업데이트 (i * 3 + 1)
      posArray[i * 3 + 1] += delta * SPEED;

      // 경계 체크 (무한 루프)
      if (posArray[i * 3 + 1] > Y_RANGE / 2) {
        posArray[i * 3 + 1] = -Y_RANGE / 2;
      }
    }

    // [수정 포인트 3] 변경 사항을 GPU에 알림
    // 이제 TypeScript가 positionAttribute를 BufferAttribute로 인식하므로 에러가 사라집니다.
    positionAttribute.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        {/* [수정 해결] 
          BufferAttribute는 생성 시 (array, itemSize)를 인자로 받습니다.
          R3F에서는 이를 args prop 배열로 전달해야 타입 에러가 발생하지 않습니다.
        */}
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]} 
        />
      </bufferGeometry>
      
      <pointsMaterial
        size={0.05}
        color="#00FFF0"
        transparent
        opacity={0.6}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default Particles;