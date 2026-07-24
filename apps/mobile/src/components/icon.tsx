/* CUTIN 단일 아이콘 시스템 — Lucide(outline, 2px stroke).
 * 항상 이 래퍼를 거쳐 stroke/size/color 일관성을 유지한다.
 * 이모지는 반응 콘텐츠로만 쓰고 UI 아이콘으로 쓰지 않는다. */
import type { LucideIcon } from "lucide-react-native";
import {
  ArrowLeft,
  Bell,
  Bookmark,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Flag,
  Globe,
  Home,
  LayoutGrid,
  Lock,
  LogOut,
  MessageCircle,
  Moon,
  MoreHorizontal,
  Pencil,
  Search,
  Settings,
  Share2,
  Shield,
  Smartphone,
  Sun,
  Sunrise,
  Sunset,
  SwitchCamera,
  Trash2,
  Upload,
  User,
  UserPlus,
  Users,
  X,
} from "lucide-react-native";

export type IconName =
  | "arrow-left"
  | "bell"
  | "bookmark"
  | "camera"
  | "check"
  | "chevron-left"
  | "chevron-right"
  | "flag"
  | "globe"
  | "home"
  | "layout-grid"
  | "lock"
  | "log-out"
  | "message-circle"
  | "moon"
  | "more-horizontal"
  | "pencil"
  | "search"
  | "settings"
  | "share"
  | "shield"
  | "smartphone"
  | "sun"
  | "sunrise"
  | "sunset"
  | "switch-camera"
  | "trash-2"
  | "upload"
  | "user"
  | "user-plus"
  | "users"
  | "x";

const icons: Record<IconName, LucideIcon> = {
  "arrow-left": ArrowLeft,
  bell: Bell,
  bookmark: Bookmark,
  camera: Camera,
  check: Check,
  "chevron-left": ChevronLeft,
  "chevron-right": ChevronRight,
  flag: Flag,
  globe: Globe,
  home: Home,
  "layout-grid": LayoutGrid,
  lock: Lock,
  "log-out": LogOut,
  "message-circle": MessageCircle,
  moon: Moon,
  "more-horizontal": MoreHorizontal,
  pencil: Pencil,
  search: Search,
  settings: Settings,
  share: Share2,
  shield: Shield,
  smartphone: Smartphone,
  sun: Sun,
  sunrise: Sunrise,
  sunset: Sunset,
  "switch-camera": SwitchCamera,
  "trash-2": Trash2,
  upload: Upload,
  user: User,
  "user-plus": UserPlus,
  users: Users,
  x: X,
};

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
}

export function Icon({ name, size = 24, color, strokeWidth = 2 }: IconProps) {
  const Glyph = icons[name];
  return <Glyph size={size} color={color} strokeWidth={strokeWidth} />;
}
