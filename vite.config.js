import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "https://mayank-behl.github.io/japanese-quiz/",
  plugins: [react()],
});
