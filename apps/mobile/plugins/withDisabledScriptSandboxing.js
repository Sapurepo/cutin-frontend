// config plugin은 Expo CLI가 CommonJS로 로드하므로 require를 써야 한다.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { withXcodeProject } = require("expo/config-plugins");

/**
 * Xcode 26 + RN 0.86 조합에서 ENABLE_USER_SCRIPT_SANDBOXING=YES면 빌드 스크립트의
 * 파일 쓰기(ip.txt 등)가 차단돼 빌드가 실패한다. ios/는 prebuild 생성물(gitignore)이라
 * pbxproj 직접 수정은 재생성 시 사라지므로, 플러그인으로 매 prebuild마다 꺼 준다.
 */
module.exports = function withDisabledScriptSandboxing(config) {
  return withXcodeProject(config, (config) => {
    const configurations = config.modResults.pbxXCBuildConfigurationSection();
    for (const key of Object.keys(configurations)) {
      const { buildSettings } = configurations[key] ?? {};
      if (buildSettings) {
        buildSettings.ENABLE_USER_SCRIPT_SANDBOXING = "NO";
      }
    }
    return config;
  });
};
