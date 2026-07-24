/* MSW 핸들러가 읽고 쓰는 in-memory DB — seed를 초기값으로 복사한다.
 * (seed.ts를 직접 import하는 화면들과 달리, 핸들러 경유 데이터는 여기서 변한다) */
import type { Post } from "@cutin/types";

import { posts as seedPosts } from "./seed";

export const db = {
  posts: [...seedPosts] as Post[],
};

/** 테스트 간 초기화용. */
export function resetDb() {
  db.posts = [...seedPosts];
}
