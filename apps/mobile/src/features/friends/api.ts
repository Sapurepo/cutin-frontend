/* 친구 API — MSW가 인터셉트하는 mocked HTTP를 실제 apiClient로 호출한다. */
import type { Friend } from "@cutin/types";
import { apiClient } from "@/lib/apiClient";

export interface FriendsOverview {
  friends: Friend[];
  suggested: Friend[];
  requests: Friend[];
}

export function fetchFriendsOverview(): Promise<FriendsOverview> {
  return apiClient.get<FriendsOverview>("/friends/overview");
}
