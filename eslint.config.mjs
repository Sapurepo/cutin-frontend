import { globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  globalIgnores([
    "**/.next/**",
    "**/.turbo/**",
    "**/dist/**",
    "**/node_modules/**",
    "next-env.d.ts",
    // MSW가 생성하는 service worker 스크립트(직접 수정하지 않음).
    "**/public/mockServiceWorker.js",
    // Expo가 생성하는 산출물(직접 수정하지 않음).
    "**/.expo/**",
    "apps/mobile/expo-env.d.ts",
  ]),
  ...nextVitals,
  ...nextTypescript,
  {
    settings: {
      next: {
        rootDir: ["apps/admin/"],
      },
    },
  },
];

export default eslintConfig;
