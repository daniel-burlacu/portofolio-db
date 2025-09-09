import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"]
  },
  // Optional: place for custom rules (you can remove if you don’t need)
  {
    rules: {
      // example: stricter imports later
      // "no-restricted-imports": ["error", { "patterns": ["../*"] }]
    }
  }
];
