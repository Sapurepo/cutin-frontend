/* 화면 스켈레톤용 시드 데이터 — 디자인 시안(Cutin Service 화면별 디자인)의 갤러리 데이터 포팅.
 * 시스템/플레이스홀더 이미지는 브랜드 톤 유지를 위해 grayscale을 쓴다. */
import type {
  Draft,
  Friend,
  NotificationItem,
  NotifySlot,
  Post,
  ServiceTip,
  UserSummary,
} from "@cutin/types";

export const img = (seed: string) =>
  `https://picsum.photos/seed/${seed}/600/600?grayscale`;

export const me: UserSummary = {
  name: "지민",
  handle: "cut_jimin",
  avatar: img("me99"),
};

export const posts: Post[] = [
  {
    id: "p0",
    author: { name: "지민", handle: "cut_jimin", avatar: img("me99") },
    timeAgo: "30분 전",
    count: 4,
    cuts: [img("m1"), img("m2"), img("m3"), img("m4")],
    caption: "퇴근길에 혼자 네 컷",
    reactions: [
      { emoji: "🔥", count: 5 },
      { emoji: "🙌", count: 1 },
    ],
    comments: [{ name: "수민", text: "표정 뭐야ㅋㅋ", timeAgo: "10분 전" }],
    myReaction: null,
    layout: "2x2",
    frameId: "white",
    createdAt: "2026-07-24T09:30:00.000Z",
  },
  {
    id: "p1",
    author: { name: "수민", handle: "sumin", avatar: img("sumin1") },
    timeAgo: "2시간 전",
    count: 4,
    cuts: [img("a1"), img("a2"), img("a3"), img("a4")],
    caption: "성수 나들이 네 컷 🖤",
    reactions: [
      { emoji: "🔥", count: 14 },
      { emoji: "🩶", count: 6 },
      { emoji: "🙌", count: 2 },
    ],
    comments: [
      {
        name: "도윤",
        text: "여기 어디야?? 나도 가고 싶다",
        timeAgo: "1시간 전",
      },
      { name: "하늘", text: "세 번째 컷 최고", timeAgo: "40분 전" },
    ],
    myReaction: "🔥",
    layout: "2x2",
    frameId: "noir",
    filterId: "sepia",
    createdAt: "2026-07-22T18:30:00.000Z",
    bookmarked: true,
  },
  {
    id: "p2",
    author: { name: "도윤", handle: "doyoon", avatar: img("doyoon1") },
    timeAgo: "5시간 전",
    count: 2,
    cuts: [img("b1"), img("b2")],
    caption: "오늘의 커피",
    reactions: [
      { emoji: "🤎", count: 9 },
      { emoji: "☕", count: 5 },
    ],
    comments: [{ name: "수민", text: "굿", timeAgo: "3시간 전" }],
    myReaction: null,
  },
  {
    id: "p3",
    author: { name: "하늘", handle: "haneul", avatar: img("haneul1") },
    timeAgo: "어제",
    count: 6,
    cuts: [img("c1"), img("c2"), img("c3"), img("c4"), img("c5"), img("c6")],
    caption: "여섯 컷으로 남긴 하루",
    reactions: [
      { emoji: "🔥", count: 22 },
      { emoji: "😮", count: 3 },
    ],
    comments: [],
    myReaction: null,
    frameId: "peach",
    createdAt: "2026-07-23T09:10:00.000Z",
  },
];

export const friends: Friend[] = [
  { name: "수민", handle: "sumin", avatar: img("sumin1") },
  { name: "도윤", handle: "doyoon", avatar: img("doyoon1") },
  { name: "하늘", handle: "haneul", avatar: img("haneul1") },
];

export const suggested: Friend[] = [
  { name: "지우", handle: "jiwoo", avatar: img("jiwoo1"), mutual: 3 },
  { name: "서연", handle: "seoyeon", avatar: img("seoyeon1"), mutual: 1 },
  { name: "민준", handle: "minjun", avatar: img("minjun1"), mutual: 5 },
];

export const requests: Friend[] = [
  { name: "예린", handle: "yerin", avatar: img("yerin1"), mutual: 2 },
];

export const reactionPalette = ["🔥", "🩶", "🙌", "😮", "🤎", "☕"];

// §4.3 알림 목록 — 반응 / 댓글 / 친구요청 / 시스템
export const notifications: NotificationItem[] = [
  {
    kind: "reaction",
    actor: "수민",
    avatar: img("sumin1"),
    text: "님이 회원님의 포스트에 🔥 반응을 남겼어요",
    timeAgo: "10분 전",
    unread: true,
    thumb: img("a2"),
  },
  {
    kind: "friend",
    actor: "예린",
    avatar: img("yerin1"),
    text: "님이 친구 요청을 보냈어요",
    timeAgo: "32분 전",
    unread: true,
    action: true,
  },
  {
    kind: "comment",
    actor: "도윤",
    avatar: img("doyoon1"),
    text: '님이 댓글을 남겼어요: "여기 어디야??"',
    timeAgo: "1시간 전",
    unread: true,
    thumb: img("a1"),
  },
  {
    kind: "reaction",
    actor: "하늘",
    avatar: img("haneul1"),
    text: "님이 회원님의 포스트에 🙌 반응을 남겼어요",
    timeAgo: "3시간 전",
    unread: false,
    thumb: img("c3"),
  },
  {
    kind: "system",
    actor: "CUTIN",
    text: "이번 주 네 컷을 아직 안 남겼어요. 오늘 하루를 기록해보세요.",
    timeAgo: "어제",
    unread: false,
  },
];

// 온보딩 §3.3 — 알림 선호 시간대 슬롯
export const notifySlots: NotifySlot[] = [
  { key: "morning", label: "아침", range: "08–10", icon: "sunrise" },
  { key: "lunch", label: "점심", range: "12–14", icon: "sun" },
  { key: "evening", label: "저녁", range: "18–20", icon: "sunset" },
  { key: "night", label: "밤", range: "21–23", icon: "moon" },
];

// 온보딩 §3.5 — 서비스 팁 카드
export const tips: ServiceTip[] = [
  {
    icon: "camera",
    title: "컷을 남겨요",
    body: "1컷부터 여섯 컷까지, 오늘의 순간을 촬영해요.",
  },
  {
    icon: "layout-grid",
    title: "템플릿으로 가공해요",
    body: "컷 수에 맞는 레이아웃을 골라 하나의 포스트로.",
  },
  {
    icon: "users",
    title: "친구와 나눠요",
    body: "친구 공개로 올리고, 반응과 댓글로 이야기해요.",
  },
];

// §5.3 — 작성 중인 draft (촬영 진입 차단 데모용)
export const draft: Draft = {
  count: 4,
  mode: "single",
  cuts: [img("shot0"), img("shot1")],
};
