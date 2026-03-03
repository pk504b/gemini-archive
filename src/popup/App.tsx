export default function App() {
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
          className="text-center underline underline-offset-2 text-sm font-bold"
        >
          Support the developer
        </a>
      </div>
    </div>
  );
}
