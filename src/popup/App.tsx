import { useEffect, useState } from "react";

export default function App() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    chrome.storage.local.get(["archivingEnabled"], (result) => {
      if (result.archivingEnabled !== undefined) {
        setEnabled(!!result.archivingEnabled);
      }
    });
  }, []);

  const toggleEnabled = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    chrome.storage.local.set({ archivingEnabled: newValue });
  };

  return (
    <div className="bg-neutral-200 text-neutral-900 dark:bg-neutral-900 dark:text-neutral-200 p-8 pt-12 pb-10 w-xs space-y-6">
      <div className="flex items-center gap-4">
        <img src="/icon48.png" alt="logo" className="w-12 h-full" />
        <div className="">
          <h1 className="text-xl font-bold">Gemini Archive</h1>
          <p className="text-xs font-medium">
            Archive conversations in Google Gemini without deleting them
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-sm p-4 rounded-lg border border-white/10 dark:border-white/5">
        <div className="flex flex-col">
          <span className="font-bold text-sm">Status</span>
          <span className="text-[10px] opacity-70">
            {enabled ? "Extension is active" : "Extension is paused"}
          </span>
        </div>
        <button
          onClick={toggleEnabled}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out cursor-pointer focus:outline-none ${
            enabled
              ? "bg-linear-to-r from-[#9747ff] to-[#4e8cff] shadow-[0_0_10px_rgba(151,71,255,0.3)]"
              : "bg-neutral-300 dark:bg-neutral-700"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ease-in-out ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      <button
        className="w-full flex items-center justify-center rounded-full gap-4 py-2 cursor-pointer bg-linear-to-tr from-[#4e8cff] via-[#9747ff] to-[#f481a5]"
        onClick={() => {
          chrome.tabs.create({ url: "https://gemini.google.com" });
        }}
      >
        <span className="font-semibold text-lg">Open Gemini</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z"
          />
        </svg>
      </button>

      <div className="flex items-center justify-center">
        <a
          href="https://ko-fi.com/pk504b"
          target="_blank"
          className="text-center underline underline-offset-4 text-xs font-bold opacity-60 hover:opacity-100 transition-opacity"
        >
          Support the developer
        </a>
      </div>
    </div>
  );
}
