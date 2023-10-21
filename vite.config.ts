/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: "@src",
                replacement: path.resolve(__dirname, "./src"),
            },
        ],
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: [path.resolve(__dirname, "src/test/setup.ts")],
    },
});
