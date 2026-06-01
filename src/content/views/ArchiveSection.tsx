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
    // <div className="archived-section">
    //   <button
    //     className="archived-toggle"
    //     onClick={() => setShowArchived(!showArchived)}
    //     style={{
    //       backgroundColor: showArchived
    //         ? "rgba(255, 255, 255, 0.05)"
    //         : "transparent",
    //     }}
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="1em"
    //       height="1em"
    //       viewBox="0 0 24 24"
    //       className="gem-nav-list-item-icon ng-star-inserted"
    //     >
    //       <path
    //         fill="currentColor"
    //         d="M10 14h4a1 1 0 0 0 0-2h-4a1 1 0 0 0 0 2m9-11H5a3 3 0 0 0-3 3v3a1 1 0 0 0 1 1h1v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8h1a1 1 0 0 0 1-1V6a3 3 0 0 0-3-3m-1 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8h12Zm2-10H4V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
    //       ></path>
    //     </svg>
    //     <span style={{ flex: 1, textAlign: "left" }}>
    //       Archived Chats ({archivedChats.length})
    //     </span>
    //     <span
    //       className={`arrow ${showArchived ? "up" : "down"}`}
    //       style={{ marginLeft: "8px" }}
    //     >
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         width="1em"
    //         height="1em"
    //         viewBox="0 0 24 24"
    //       >
    //         <path
    //           fill="currentColor"
    //           d="m14.83 11.29l-4.24-4.24a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.29a1 1 0 0 0 .71-.29l4.24-4.24a1 1 0 0 0 0-1.42"
    //         ></path>
    //       </svg>
    //     </span>
    //   </button>

    //   {showArchived && (
    //     <div className="archived-list">
    //       {archivedChats.length === 0 ? (
    //         <div className="empty-msg">No archived chats</div>
    //       ) : (
    //         archivedChats.map((chat) => (
    //           <ArchivedChat
    //             key={chat.id}
    //             chat={chat}
    //             handleUnarchive={handleUnarchive}
    //           />
    //         ))
    //       )}
    //     </div>
    //   )}
    // </div>

    <div className="archived-section">
      <button
        data-test-id=""
        className="expandable-section-header"
        aria-expanded="false"
        aria-controls="sidenav-section-content-chats"
        aria-label="Toggle Archived Chats"
        onClick={() => setShowArchived(!showArchived)}
      >
        <span className="expandable-section-title gds-body-s">Archived</span>
        <span className={`toggle-icon ${showArchived ? "up" : "down"}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            className="mat-icon notranslate lm-icon-s mat-icon-no-color ng-star-inserted lumi-symbols mat-ligature-font"
          >
            <path
              fill="currentColor"
              d="m14.83 11.29l-4.24-4.24a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41L12.71 12l-3.54 3.54a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.29a1 1 0 0 0 .71-.29l4.24-4.24a1 1 0 0 0 0-1.42"
            ></path>
          </svg>
        </span>
      </button>

      {showArchived && (
        <div className="archived-list expandable-section-content">
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
