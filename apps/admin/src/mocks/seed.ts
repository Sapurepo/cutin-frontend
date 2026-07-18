// MSW 가짜 서버의 in-memory 데이터 스토어.
// 핸들러가 이 객체를 읽고/변형하므로 페이지 새로고침 전까지 상태가 유지된다.
// 디자인 시안(Cutin Service 화면별 디자인)의 어드민 데이터셋 포팅.

import type { AdminUser, Report } from "@cutin/types";

export const db = {
  reports: [
    {
      id: "R-2041",
      target: "포스트",
      targetBy: "@anon_92",
      reason: "스팸/광고",
      reporter: "@sumin",
      status: "접수",
      time: "5분 전",
    },
    {
      id: "R-2040",
      target: "댓글",
      targetBy: "@user_1180",
      reason: "욕설/비방",
      reporter: "@doyoon",
      status: "처리중",
      time: "22분 전",
    },
    {
      id: "R-2039",
      target: "프로필",
      targetBy: "@fake_cut",
      reason: "사칭",
      reporter: "@haneul",
      status: "접수",
      time: "1시간 전",
    },
    {
      id: "R-2038",
      target: "포스트",
      targetBy: "@spam_bot",
      reason: "부적절한 콘텐츠",
      reporter: "@jiwoo",
      status: "완료",
      time: "3시간 전",
    },
    {
      id: "R-2037",
      target: "댓글",
      targetBy: "@user_5521",
      reason: "스팸/광고",
      reporter: "@minjun",
      status: "완료",
      time: "어제",
    },
  ] satisfies Report[],
  users: [
    {
      name: "수민",
      handle: "sumin",
      joined: "2026.03.11",
      posts: 42,
      status: "활성",
    },
    {
      name: "도윤",
      handle: "doyoon",
      joined: "2026.02.28",
      posts: 18,
      status: "활성",
    },
    {
      name: "익명92",
      handle: "anon_92",
      joined: "2026.06.30",
      posts: 3,
      status: "정지",
    },
    {
      name: "하늘",
      handle: "haneul",
      joined: "2026.01.09",
      posts: 77,
      status: "활성",
    },
    {
      name: "가짜컷",
      handle: "fake_cut",
      joined: "2026.07.02",
      posts: 1,
      status: "검토중",
    },
  ] satisfies AdminUser[],
};
