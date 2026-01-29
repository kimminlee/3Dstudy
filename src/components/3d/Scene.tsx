import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

import ReactorCore from './ReactorCore';
import Particles from './Particles';

/**
 * Scene 컴포넌트 (최종 수정)
 * - TypeScript 오류를 유발하는 EffectComposer의 선택적 속성들을 모두 제거했습니다.
 * - 기능(네온 효과)은 동일하게 작동합니다.
 */
const Scene = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 30], fov: 50 }}
      gl={{ 
        alpha: true,
        toneMapping: THREE.NoToneMapping 
      }}
    >
      {/* 기본 조명 */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />

      {/* 3D 오브젝트 */}
      <ReactorCore />
      <Particles />

      {/* [수정 사항] 
        disableNormalPass, multisampling 등 오류를 유발하는 속성을 제거했습니다.
        이제 순수하게 기본값으로 동작하며 빨간 줄이 사라질 것입니다.
      */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.2}
          mipmapBlur
          intensity={1.5}
          radius={0.6}
        />
      </EffectComposer>

      {/* 컨트롤 */}
      <OrbitControls autoRotate autoRotateSpeed={0.5} enableDamping={true} />
    </Canvas>
  );
};

export default Scene;