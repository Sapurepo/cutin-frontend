# features

도메인별 데이터/비즈니스 로직을 모아두는 디렉토리. 각 feature는 아래 파일들로 구성된다.

| 파일                    | 역할                                                        | 실행 위치       |
| ----------------------- | ----------------------------------------------------------- | --------------- |
| `api.ts`                | 백엔드 HTTP 호출(raw fetch). 다른 레이어가 이걸 감싼다.     | 서버/클라이언트 |
| `actions.ts`            | Server Actions(`"use server"`). 서버에서만 가능한 mutation. | 서버 전용       |
| `dal.ts`                | Data Access Layer. 서버 컴포넌트가 읽는 데이터 조회.        | 서버 전용       |
| `session.ts`            | 세션 쿠키 관리(`"server-only"`).                            | 서버 전용       |
| `queries.ts` / `hooks/` | tanstack query 기반 클라이언트 캐시 read/mutation.          | 클라이언트      |
| `types.ts`              | feature 내 타입.                                            | -               |

> 이 스켈레톤에는 예시로 `greeting` feature(`api.ts` + `queries.ts` + `hooks/` +
> `types.ts`)만 들어 있다. 새 도메인은 이 패턴을 복제해 추가한다.

## Server Actions(`actions.ts`) vs tanstack query — 언제 무엇을 쓰나

두 가지는 경쟁 관계가 아니라 **서로 다른 경계**를 담당한다. 중복 레이어가 아니다.

### Server Actions를 쓰는 경우 — "서버에서만 할 수 있는 일"

다음 중 하나라도 필요하면 Server Action(`actions.ts`)으로 처리한다.

1. **HTTP-only 쿠키 set/delete** — 가장 결정적인 이유.
   `httpOnly: true` 쿠키는 서버만 설정/삭제할 수 있고(브라우저 `Set-Cookie`), 클라이언트 JS는 물리적으로 불가능하다. 세션 토큰을 JS가 읽을 수 있는 곳(localStorage/일반 쿠키)에 두면 XSS에 노출되므로, 인증은 반드시 서버에서 처리한다.
2. **서버 사이드 redirect** — `redirect("/")` 같은 네비게이션.
3. **토큰 비노출** — access token을 클라이언트에 내려보내지 않고 서버에서 백엔드를 호출해야 할 때.
4. **`<form action>` progressive enhancement** — JS 하이드레이션 전에도 동작하는 폼. (클라이언트에서는 `useActionState`로 `[state, action, pending]`을 받아 쓴다.)

### tanstack query를 쓰는 경우 — "클라이언트가 캐싱하는 서버 데이터"

콘텐츠성 데이터의 read/CRUD로, 다음이 필요하면 query(`queries.ts` + `hooks/`)를 쓴다.

- 캐싱·자동 refetch·`invalidateQueries`로 목록 갱신
- 낙관적 업데이트, 로딩/에러 상태 관리

mutation 성공 시 `queryClient.invalidateQueries`로 관련 캐시를 갱신한다.

### 빠른 판단 기준

```
세션/쿠키/redirect/토큰 보호가 얽혀 있나?
  ├─ 예  → Server Action (actions.ts)
  └─ 아니오, 그냥 서버 데이터 read/CRUD인가?
          └─ 예 → tanstack query (queries.ts + hooks/)
```

## 클라이언트 전역 상태(zustand)는?

서버 상태는 query가, 세션은 서버 쿠키가 담당하므로 zustand가 필요한 자리는 거의 없다.
**URL에도 서버에도 둘 곳이 없고 여러 컴포넌트가 공유하는 순수 클라이언트 UI 상태**(예: 전역 토스트)가 생길 때만 `src/stores`에 추가한다. 폼 로컬 상태, URL로 표현 가능한 필터/탭은 전역화하지 않는다.
