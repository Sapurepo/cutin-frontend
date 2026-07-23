import { useState } from "react";
import { useRouter } from "expo-router";
import { Input } from "@/components/input";
import { OnboardingStep } from "@/components/onboardingStep";

/** §3.1 닉네임 — 실시간 중복 검사(스켈레톤: 길이 기반 유효성 표시만). */
export default function NicknameScreen() {
  const router = useRouter();
  const [nickname, setNickname] = useState("");
  const valid = nickname.length >= 1;

  return (
    <OnboardingStep
      step={0}
      title={"어떤 이름으로\n기록할까요?"}
      description="친구들에게 보여질 닉네임이에요. 나중에 프로필에서 바꿀 수 있어요."
      primaryDisabled={nickname.length === 0 && !valid}
      onPrimary={() => router.push("/notifyTime")}
    >
      <Input
        value={nickname}
        onChangeText={setNickname}
        placeholder="닉네임"
        status={valid ? "valid" : "default"}
        suffix={`${nickname.length}/20`}
        helper={valid ? "사용 가능한 닉네임이에요" : undefined}
      />
    </OnboardingStep>
  );
}
