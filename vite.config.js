import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// Replace the __BUILD_HASH__ token in dist/sw.js after the build so each
// deploy gets its own cache bucket (see public/sw.js).
const injectServiceWorkerHash = () => ({
  name: "inject-sw-build-hash",
  apply: "build",
  closeBundle() {
    const swPath = resolve(__dirname, "dist", "sw.js");
    if (!existsSync(swPath)) return;
    const hash = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
    const content = readFileSync(swPath, "utf8");
    writeFileSync(swPath, content.replace(/__BUILD_HASH__/g, hash));
  },
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), injectServiceWorkerHash()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          icons: ["lucide-react"],
          particles: ["@tsparticles/react", "@tsparticles/slim"],
          // Encoder modules grouped by domain so the index chunk stays lean.
          "encoders-core": [
            "./src/utils/encoders/computer.js",
            "./src/utils/encoders/ciphers.js",
            "./src/utils/encoders/classic.js",
            "./src/utils/encoders/shared.js",
          ],
          "encoders-creative": [
            "./src/utils/encoders/fun.js",
            "./src/utils/encoders/artistic.js",
            "./src/utils/encoders/aesthetic.js",
            "./src/utils/encoders/effects.js",
            "./src/utils/encoders/retro.js",
            "./src/utils/encoders/ancient.js",
            "./src/utils/encoders/fantasy.js",
            "./src/utils/encoders/visual.js",
          ],
          "encoders-advanced": [
            "./src/utils/encoders/patterns.js",
            "./src/utils/encoders/forensics.js",
            "./src/utils/encoders/scientific.js",
            "./src/utils/encoders/modern.js",
            "./src/utils/encoders/advanced.js",
            "./src/utils/encoders/steganography.js",
          ],
          "encoders-misc": [
            "./src/utils/encoders/cultural.js",
            "./src/utils/encoders/communication.js",
            "./src/utils/encoders/games.js",
            "./src/utils/encoders/nature.js",
            "./src/utils/encoders/linguistic.js",
            "./src/utils/encoders/unique.js",
            "./src/utils/encoders/shuffle.js",
          ],
          // parameterized.js is huge (>4k LOC), so it gets its own chunk.
          "encoders-parameterized": [
            "./src/utils/encoders/parameterized.js",
          ],
          // Security-flavoured (synthetic) encoders share a chunk.
          "encoders-security": [
            "./src/utils/encoders/crypto.js",
            "./src/utils/encoders/signatures.js",
            "./src/utils/encoders/military.js",
          ],
        },
      },
    },
    // We intentionally split aggressively; allow chunks up to ~400 KB.
    chunkSizeWarningLimit: 400,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test-setup.js",
  },
});
