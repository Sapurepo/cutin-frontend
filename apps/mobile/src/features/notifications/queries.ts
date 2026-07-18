import { useQuery } from "@tanstack/react-query";
import { fetchNotifications } from "./api";

export const notificationKeys = {
  all: ["notifications"] as const,
};

export function useNotifications() {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: fetchNotifications,
  });
}
