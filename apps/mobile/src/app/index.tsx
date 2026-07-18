import { Redirect } from "expo-router";

// 스켈레톤 단계: 세션 판별이 없으므로 항상 로그인에서 시작한다.
export default function Index() {
  return <Redirect href="/login" />;
}
