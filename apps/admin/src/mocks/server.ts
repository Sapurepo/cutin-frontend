import { setupServer } from "msw/node";

import { handlers } from "./handlers";

// 서버 사이드(Server Action·DAL 등 Node 런타임) fetch를 가로채는 MSW 서버.
// instrumentation의 register()에서 기동한다. (브라우저는 ./browser의 worker 사용)
export const server = setupServer(...handlers);
