import { setupServer } from "msw/native";

import { handlers } from "./handlers";

/** RN 런타임의 in-process fetch 인터셉트 서버 — 실기기에서도 네트워크 없이 동작한다. */
export const server = setupServer(...handlers);
