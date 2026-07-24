/* 알림 API — MSW가 인터셉트하는 mocked HTTP를 실제 apiClient로 호출한다. */
import type { NotificationItem } from "@cutin/types";
import { apiClient } from "@/lib/apiClient";

export function fetchNotifications(): Promise<NotificationItem[]> {
  return apiClient.get<NotificationItem[]>("/notifications");
}
