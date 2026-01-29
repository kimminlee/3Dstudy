import React from 'react';
import Scene from './components/3d/Scene';
import Overlay from './components/ui/Overlay';

/**
 * App 컴포넌트
 * - 3D 캔버스와 2D UI 오버레이를 겹쳐서 렌더링합니다.
 * - z-index 관리는 CSS 및 마크업 순서에 의존합니다.
 */
const App: React.FC = () => {
  return (
    <div className="app-container" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      
      {/* 1. 3D Scene (Background) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Scene />
      </div>

      {/* 2. UI Overlay (Foreground) */}
      {/* Overlay 컴포넌트 내부에서 z-index: 10으로 설정되어 있습니다. */}
      <Overlay />
      
    </div>
  );
};

export default App;