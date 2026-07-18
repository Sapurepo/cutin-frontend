import { createQueryClient as create } from "@cutin/api";

import { toast } from "@/stores/toastStore";

// 앱별 wiring: mutation 실패 메시지를 토스트로 표면화한다.
export const createQueryClient = () =>
  create({ onMutationError: (message) => toast.error(message) });
