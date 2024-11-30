import { defineConfig } from "astro/config";
import arraybuffer from "vite-plugin-arraybuffer";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	vite: {
		plugins: [arraybuffer()],
	},

	integrations: [react()],
});
