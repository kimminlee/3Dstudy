import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/global.css'; // 전역 스타일 적용

/**
 * 애플리케이션 진입점
 * StrictMode는 개발 환경에서 컴포넌트 생명주기 검증을 위해 활성화합니다.
 * (R3F 사용 시 이중 렌더링으로 인한 이슈가 발생할 수 있으나, 초기 개발 단계에서는 켜두는 것이 권장됩니다.)
 */
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);