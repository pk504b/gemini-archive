import ArchivedChat from "./ArchivedChat";

export default function ArchiveSection({
  archivedChats,
  handleUnarchive,
  showArchived,
  setShowArchived,
}: {
  archivedChats: any[];
  handleUnarchive: (id: string) => void;
  showArchived: boolean;
  setShowArchived: (showArchived: boolean) => void;
}) {
  return (
    <div className="archived-section">
      <button
        className="archived-toggle"
        onClick={() => setShowArchived(!showArchived)}
        style={{
          backgroundColor: showArchived
            ? "rgba(255, 255, 255, 0.05)"
            : "transparent",
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27M6.24 5h11.52l.81.97H5.44zM5 19V8h14v11zm8.45-9h-2.9v3H8l4 4l4-4h-2.55z" />
        </svg>
        <span style={{ flex: 1, textAlign: "left" }}>
          Archived Chats ({archivedChats.length})
        </span>
        <span
          className={`arrow ${showArchived ? "up" : "down"}`}
          style={{ marginLeft: "8px" }}
        >
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="m7 10l5 5l5-5z" />
          </svg> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42"
            />
          </svg>
        </span>
      </button>

      {showArchived && (
        <div className="archived-list">
          {archivedChats.length === 0 ? (
            <div className="empty-msg">No archived chats</div>
          ) : (
            archivedChats.map((chat) => (
              <ArchivedChat
                key={chat.id}
                chat={chat}
                handleUnarchive={handleUnarchive}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
