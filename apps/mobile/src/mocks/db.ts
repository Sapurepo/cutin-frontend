/* MSW 핸들러가 읽고 쓰는 in-memory DB — seed를 초기값으로 복사한다.
 * (seed.ts를 직접 import하는 화면들과 달리, 핸들러 경유 데이터는 여기서 변한다) */
import type { Post } from "@cutin/types";

import { posts as seedPosts } from "./seed";

// 핸들러가 포스트를 제자리에서 수정(반응·보관 토글)하므로 시드와 참조를 끊는다.
const clonePosts = () => structuredClone(seedPosts) as Post[];

export const db = {
  posts: clonePosts(),
};

/** 테스트 간 초기화용. */
export function resetDb() {
  db.posts = clonePosts();
}
