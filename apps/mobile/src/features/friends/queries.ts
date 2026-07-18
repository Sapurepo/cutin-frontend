import { useQuery } from "@tanstack/react-query";
import { fetchFriendsOverview } from "./api";

export const friendKeys = {
  overview: ["friends", "overview"] as const,
};

export function useFriendsOverview() {
  return useQuery({
    queryKey: friendKeys.overview,
    queryFn: fetchFriendsOverview,
  });
}
