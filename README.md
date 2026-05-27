# 📚 Book Store Frontend

프로그래머스 북스토어 풀스택 과정에서 제작한 온라인 서점 프론트엔드 프로젝트입니다.
도서 검색, 카테고리 탐색, 장바구니, 주문 등 이커머스 핵심 기능을 구현했습니다.

## 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | React 19, TypeScript |
| Routing | React Router DOM v7 |
| 상태 관리 | Zustand |
| 서버 상태 | TanStack Query (React Query) v5 |
| HTTP 클라이언트 | Axios |
| 스타일링 | Styled-Components |
| 폼 관리 | React Hook Form |
| 날짜 처리 | Day.js |
| 슬라이더 | React Slick |
| 아이콘 | React Icons |
| API Mocking | MSW (Mock Service Worker) v2 |
| 빌드 도구 | CRA + CRACO |
| 테스트 | Testing Library, Jest |

## ✨ 주요 기능

- 도서 목록 조회 및 카테고리 필터링
- 도서 상세 페이지
- 도서 검색
- 장바구니 담기 / 수량 변경 / 삭제
- 주문 및 주문 내역 확인
- 회원가입 / 로그인 / 로그아웃
- 좋아요 기능

## 📁 프로젝트 구조

```
src/
├── api/           # Axios 기반 API 통신 모듈
├── components/    # 재사용 가능한 공통 컴포넌트
├── hooks/         # 커스텀 훅 (useXxx)
├── pages/         # 라우트 단위 페이지 컴포넌트
├── store/         # Zustand 전역 상태
├── models/        # TypeScript 타입/인터페이스 정의
├── utils/         # 유틸리티 함수
├── mocks/         # MSW 핸들러 (개발용 API 모킹)
└── style/         # 전역 스타일, 테마
```

## 🔗 관련 저장소

- 백엔드: [백엔드 깃허브 저장소](https://github.com/eunmilee89/prgms-book-store-backend)
