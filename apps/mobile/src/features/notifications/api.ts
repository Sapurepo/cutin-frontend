import type { NotificationItem } from "@cutin/types";
import { notifications } from "@/mocks/seed";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function fetchNotifications(): Promise<NotificationItem[]> {
  await delay(200);
  return notifications;
}
