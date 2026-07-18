import type { AdminUser, Report } from "@cutin/types";

import { apiClient } from "@/lib/apiClient";

// 백엔드 HTTP 호출(raw fetch). queries가 이걸 감싼다. §10 어드민.
export const moderationApi = {
  getReports: () => apiClient.get<Report[]>("/admin/reports"),
  getUsers: () => apiClient.get<AdminUser[]>("/admin/users"),
};
