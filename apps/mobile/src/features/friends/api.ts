import type { Friend } from "@cutin/types";
import { friends, requests, suggested } from "@/mocks/seed";

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface FriendsOverview {
  friends: Friend[];
  suggested: Friend[];
  requests: Friend[];
}

export async function fetchFriendsOverview(): Promise<FriendsOverview> {
  await delay(300);
  return { friends, suggested, requests };
}
