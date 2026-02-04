# Reactor Core Visualizer

> **State-Driven 3D Dashboard** > Zustand 상태 관리를 통해 3D Canvas와 DOM UI를 실시간 동기화한 인터랙티브 시각화 프로젝트

![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![R3F](https://img.shields.io/badge/R3F-Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 📖 Project Overview

이 프로젝트는 웹 환경에서의 **고성능 3D 데이터 시각화** 가능성을 탐구하기 위해 개발되었습니다.
단순히 3D 모델을 띄우는 것을 넘어, 외부 UI(DOM)의 조작이 3D 월드(Canvas) 내부의 물리적 속성(회전, 색상, 입자 속도)에 즉각적으로 반영되는 **양방향 상태 동기화 아키텍처**를 구현했습니다.

## 📂 Project Architecture

프로젝트의 폴더 구조와 각 파일의 기술적 의의는 다음과 같습니다.

```bash
root/
├── public/                 # 정적 에셋 (favicon, models 등 빌드 시 루트로 복사됨)
├── src/
│   ├── components/
│   │   ├── 3d/             # [R3F Context] 3D 렌더링 전용 컴포넌트
│   │   │   ├── Particles.tsx    # BufferGeometry 기반 대량 파티클 최적화 렌더링
│   │   │   ├── ReactorCore.tsx  # 상태(Energy)에 반응하는 메인 3D 인터랙티브 객체
│   │   │   └── Scene.tsx        # 조명(Lights) 및 카메라 설정을 포함한 3D 무대 구성
│   │   └── ui/             # [DOM Context] 2D 인터페이스
│   │       └── Overlay.tsx      # Canvas 위에 띄워지는 HUD 및 컨트롤러 (Zustand 제어)
│   ├── store/
│   │   └── useEnergyStore.ts    # [State Bridge] 3D와 UI 간 데이터 동기화를 위한 SSOT (Single Source of Truth)
│   ├── styles/             # 전역 스타일 설정
│   ├── App.tsx             # 3D Canvas와 UI Overlay를 합성하는 메인 레이아웃
│   └── main.tsx            # React DOM 진입점
├── eslint.config.js        # [Quality] 최신 Flat Config 방식의 코드 린팅 규칙 정의
├── index.html              # Vite 앱의 진입점 (Module Script 로드)
├── package.json            # 프로젝트 의존성 및 스크립트 관리
├── tsconfig.json           # [Type] TypeScript 통합 설정
├── tsconfig.app.json       # [Type] 브라우저 환경(App)을 위한 구체적 타입 정의
├── tsconfig.node.json      # [Type] Node.js 환경(Vite Config 등)을 위한 타입 정의
└── vite.config.ts          # [Build] 번들링 최적화 및 플러그인 설정
