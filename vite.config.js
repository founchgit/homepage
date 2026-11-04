import { defineConfig } from "vite";

// GitHub Pages의 /homepage/ 하위 경로에서도 자산을 불러옵니다.
export default defineConfig({
  base: "./",
});
