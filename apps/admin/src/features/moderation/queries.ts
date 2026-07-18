import { queryOptions } from "@tanstack/react-query";

import { moderationApi } from "./api";

export const moderationKeys = {
  reports: ["admin", "reports"] as const,
  users: ["admin", "users"] as const,
};

export const reportsQueryOptions = () =>
  queryOptions({
    queryKey: moderationKeys.reports,
    queryFn: () => moderationApi.getReports(),
  });

export const adminUsersQueryOptions = () =>
  queryOptions({
    queryKey: moderationKeys.users,
    queryFn: () => moderationApi.getUsers(),
  });
