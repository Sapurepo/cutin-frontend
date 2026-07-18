import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  transpilePackages: ["@cutin/ui", "@cutin/types", "@cutin/api"],
  // msw를 서버 번들에서 제외해야 msw/node의 네트워크 인터셉션이 동작한다.
  // (번들되면 인터셉터가 런타임 globals를 패치하지 못해 Server Action·DAL fetch가 새어 나간다.)
  serverExternalPackages: ["msw"],
  turbopack: {
    root: path.resolve(dirname, "../.."),
  },
};

export default nextConfig;
