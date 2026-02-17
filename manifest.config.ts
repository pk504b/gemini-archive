import { defineManifest } from "@crxjs/vite-plugin";
import pkg from "./package.json";

export default defineManifest({
  manifest_version: 3,
  name: "Gemini Archive",
  description:
    "Archive and declutter your Google Gemini chats without deleting them permanently.",
  version: pkg.version,
  icons: {
    "16": "public/icon16.png",
    "32": "public/icon32.png",
    "48": "public/icon48.png",
    "128": "public/icon128.png",
  },
  action: {
    default_icon: {
      48: "public/icon48.png",
    },
    default_popup: "src/popup/index.html",
  },
  permissions: ["storage"],
  content_scripts: [
    {
      js: ["src/content/main.tsx"],
      matches: ["https://gemini.google.com/*"],
    },
  ],
  host_permissions: ["https://gemini.google.com/*"],
  // side_panel: {
  //   default_path: "src/sidepanel/index.html",
  // },
});
