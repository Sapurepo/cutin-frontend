import { createQueryClient } from "@cutin/api";

// 스켈레톤 단계: 토스트 스토어가 아직 없어 mutation 에러는 콘솔로만 표면화한다.
export const queryClient = createQueryClient({
  onMutationError: (message) => console.warn(message),
});
