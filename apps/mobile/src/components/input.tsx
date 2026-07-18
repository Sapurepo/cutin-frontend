import { StyleSheet, Text, TextInput, View } from "react-native";
import { layout, radius, spacing } from "@cutin/tokens";
import { font } from "@/theme/fonts";
import { useTheme } from "@/theme/useTheme";
import { Icon, type IconName } from "./icon";

interface InputProps {
  value?: string;
  placeholder?: string;
  icon?: IconName;
  /** "2/20" 같은 우측 보조 표기(라틴/숫자 — Geist) */
  suffix?: string;
  helper?: string;
  status?: "default" | "valid" | "invalid";
  onChangeText?: (text: string) => void;
}

/** 텍스트 필드 + 인라인 검증 — 상태는 글리프+텍스트로 이중 표기(색 단독 금지). */
export function Input({
  value,
  placeholder,
  icon,
  suffix,
  helper,
  status = "default",
  onChangeText,
}: InputProps) {
  const c = useTheme();
  return (
    <View>
      <View
        style={[
          styles.field,
          {
            backgroundColor: c.surface,
            borderColor: status === "invalid" ? c.danger : c.border,
          },
        ]}
      >
        {icon ? <Icon name={icon} size={18} color={c.textSecondary} /> : null}
        <TextInput
          value={value}
          placeholder={placeholder}
          placeholderTextColor={c.textSecondary}
          onChangeText={onChangeText}
          style={[
            styles.input,
            { fontFamily: font("body"), color: c.textPrimary },
          ]}
        />
        {status === "valid" ? (
          <Icon name="check" size={16} color={c.textPrimary} />
        ) : null}
        {suffix ? (
          <Text
            style={{
              fontFamily: font("latin", "500"),
              fontSize: 12,
              color: c.textSecondary,
            }}
          >
            {suffix}
          </Text>
        ) : null}
      </View>
      {helper ? (
        <Text
          style={{
            fontFamily: font("body"),
            fontSize: 12,
            marginTop: spacing[2],
            color: status === "invalid" ? c.danger : c.textSecondary,
          }}
        >
          {helper}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[2],
    height: layout.tapTarget + 4,
    paddingHorizontal: spacing[4],
    borderRadius: radius.sm,
    borderWidth: 1,
  },
  input: { flex: 1, fontSize: 14, paddingVertical: 0 },
});
