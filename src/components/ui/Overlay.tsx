import React from 'react';
import useEnergyStore from '../../store/useEnergyStore';

/**
 * Overlay 컴포넌트
 * - 3D 캔버스 위에 띄워질 2D UI 레이어입니다.
 * - CSS Modules 대신 인라인 스타일을 사용하여 빠르게 구현했습니다.
 */
const Overlay: React.FC = () => {
  const { energyLevel, setEnergyLevel } = useEnergyStore();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none', // 클릭 이벤트가 3D 캔버스로 통과되도록 설정 (중요)
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px',
        color: 'white',
        fontFamily: 'var(--font-main)',
        zIndex: 10,
      }}
    >
      {/* Header: 시스템 상태 */}
      <div style={{ pointerEvents: 'auto' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>
          SYSTEM STATUS
        </h2>
        <div style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          color: energyLevel > 80 ? '#FF0055' : '#00FFF0',
          textShadow: '0 0 10px currentColor'
        }}>
          {energyLevel > 80 ? 'CRITICAL' : 'NORMAL'}
        </div>
      </div>

      {/* Footer: 에너지 컨트롤러 */}
      <div 
        style={{ 
          pointerEvents: 'auto', // 슬라이더 조작을 위해 포인터 이벤트 활성화
          background: 'rgba(5, 7, 10, 0.6)', 
          backdropFilter: 'blur(10px)',
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          maxWidth: '400px'
        }}
      >
        <label 
          style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '10px',
            fontSize: '1rem',
            fontWeight: 500
          }}
        >
          <span>ENERGY OUTPUT</span>
          <span style={{ color: '#00FFF0' }}>{energyLevel}%</span>
        </label>
        
        <input
          type="range"
          min="0"
          max="100"
          value={energyLevel}
          onChange={(e) => setEnergyLevel(Number(e.target.value))}
          style={{
            width: '100%',
            cursor: 'pointer',
            accentColor: '#00FFF0' // 브라우저 기본 UI 색상 지정
          }}
        />
        <p style={{ margin: '10px 0 0', fontSize: '0.8rem', color: 'gray' }}>
          Drag slider to adjust reactor core rotation speed.
        </p>
      </div>
    </div>
  );
};

export default Overlay;