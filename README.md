# cutin-frontend

**CUTIN** — 사진/영상 컷을 촬영해 템플릿으로 가공·업로드하고, 친구들과 포스트를
공유·반응하는 소셜 기록 서비스의 프론트엔드 모노레포입니다.
기능 명세는 [CUTIN-FEATURES.md](./CUTIN-FEATURES.md)를 따릅니다.

## 기술 스택

| 영역      | 스택                                                            |
| --------- | --------------------------------------------------------------- |
| 모바일 앱 | **Expo SDK 57** (React Native 0.86 · React 19.2) + Expo Router  |
| 어드민    | **Next.js 16** (Turbopack) + React 19 + Tailwind v4             |
| 모노레포  | Turborepo + pnpm workspaces                                     |
| 데이터    | TanStack Query v5 + `@cutin/api` (framework-agnostic HTTP 코어) |
| 목킹      | admin: MSW / mobile: 시드 데이터 기반 목 fetcher                |
| 품질      | ESLint(flat) + Prettier + Vitest, `pnpm check`                  |

클라이언트는 **Expo 단일 코드베이스로 iOS/Android/Web을 모두 커버**합니다
(단일 네이티브 대비 차별점: 1코드베이스 3플랫폼, EAS Update로 OTA 배포,
웹 생태계(TS/React) 공유). 디자인은 Claude Design 프로젝트
"Cutin Service 화면별 디자인"의 모노크롬 디자인 시스템을 따릅니다
(Pretendard + Geist, Lucide 아이콘, 잉크/오프화이트 tone-on-tone).

## Requirements

- Node.js `>=22`
- pnpm `11.1.0`

```bash
nvm use
corepack enable
pnpm -v
```

## Development

```bash
pnpm install
pnpm dev:mobile   # Expo 개발 서버 (i: iOS 시뮬레이터, a: Android, w: 웹)
pnpm dev:admin    # 어드민, http://localhost:3001
```

- `apps/mobile`: CUTIN 클라이언트 앱 — 로그인 → 온보딩 → 5탭(피드/친구/촬영/보관/프로필),
  촬영 플로우(컷 수 → 촬영 → 템플릿 → 편집 → 업로드), 포스트 상세/알림/설정.
  현재는 화면 스켈레톤 단계로 `src/mocks/seed.ts`의 목 데이터로 구동됩니다.
- `apps/admin`: 운영/모더레이션 콘솔 — 로그인(`/`) + 신고 큐(`/reports`) + 사용자 관리(`/users`).
  `.env.local`의 `NEXT_PUBLIC_API_MOCKING=enabled`로 MSW mock과 함께 단독 구동됩니다.

## Quality Gates

```bash
pnpm lint
pnpm typecheck
pnpm format:check
pnpm test
pnpm build        # admin + packages (mobile 번들 검증은 아래)
pnpm --filter @cutin/mobile export:web   # Expo 웹 번들 검증
```

한 번에 확인할 때는 `pnpm check`를 사용합니다.
Next.js 16부터 `next lint`가 제거되었으므로 lint는 ESLint CLI로 직접 실행합니다.

## Structure

- `apps/mobile`: Expo 클라이언트 (라우트 `src/app`, 컴포넌트 `src/components`,
  피처 `src/features`, 시드 `src/mocks`)
- `apps/admin`: Next.js 어드민 (gravity 아키텍처 — BFF/MSW 컨벤션)
- `packages/tokens`: 디자인 토큰 단일 소스 — TS 상수(mobile) + CSS 변수(admin)
- `packages/ui`: 어드민용 공유 UI primitive + Tailwind 테마 + 셀프호스팅 폰트
- `packages/api`: framework-agnostic HTTP/QueryClient 코어
- `packages/types`: CUTIN 도메인 타입 (`Post`, `Draft`, `Report` 등)

feature module 작성 규칙은 `apps/admin/src/features/README.md`를 따릅니다.
