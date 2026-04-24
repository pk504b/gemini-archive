import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import "./App.css";
import ArchiveButton from "./ArchiveButton";
import ArchivedChat from "./ArchivedChat";
import ArchiveSection from "./ArchiveSection";

interface ArchivedChat {
  id: string;
  name: string;
}

function App() {
  const [targets, setTargets] = useState<
    { id: number; element: HTMLElement; chat: ArchivedChat }[]
  >([]);
  const [archivedChats, setArchivedChats] = useState<ArchivedChat[]>([]);
  const [showArchived, setShowArchived] = useState(false);
  const [sidebarTarget, setSidebarTarget] = useState<HTMLElement | null>(null);

  const [enabled, setEnabled] = useState(true);

  // Load archived IDs and enabled state
  useEffect(() => {
    chrome.storage.local.get(
      ["archivedChatsData", "archivingEnabled"],
      (result) => {
        if (result && result.archivedChatsData) {
          setArchivedChats(result.archivedChatsData as ArchivedChat[]);
        }
        if (result && result.archivingEnabled !== undefined) {
          setEnabled(!!result.archivingEnabled);
        }
      },
    );

    const handleStorageChange = (changes: {
      [key: string]: chrome.storage.StorageChange;
    }) => {
      if (changes.archivedChatsData) {
        setArchivedChats(
          (changes.archivedChatsData.newValue as ArchivedChat[]) || [],
        );
      }
      if (changes.archivingEnabled) {
        setEnabled(!!(changes.archivingEnabled.newValue ?? true));
      }
    };
    chrome.storage.onChanged.addListener(handleStorageChange);
    return () => chrome.storage.onChanged.removeListener(handleStorageChange);
  }, []);

  useEffect(() => {
    let idCounter = 0;
    let timeoutId: number | null = null;

    const findTargets = () => {
      if (timeoutId) return;

      timeoutId = window.setTimeout(() => {
        if (!enabled) {
          // 0. Cleanup if disabled
          document
            .querySelectorAll(".archiveBtn-wrapper")
            .forEach((el) => el.remove());
          document
            .querySelectorAll(".conversation-items-container")
            .forEach((conv) => {
              (conv as HTMLElement).style.display = "";
            });
          const archivedWrapper = document.getElementById(
            "archived-section-wrapper",
          );
          if (archivedWrapper) {
            archivedWrapper.style.display = "none";
          }
          setTargets([]);
          timeoutId = null;
          return;
        }

        // 1. Inject Archive button into context menus
        const menus = document.querySelector(".mat-mdc-menu-content");
        const newItems: {
          id: number;
          element: HTMLElement;
          chat: ArchivedChat;
        }[] = [];

        // menus.forEach((menu) => {
        const deleteButton = menus?.querySelector(
          '[data-test-id="delete-button"]',
        );
        if (deleteButton && !menus?.querySelector(".archiveBtn-wrapper")) {
          // Find the chat ID from the button that opened this menu
          const activeMenuButton = document.querySelector(
            'button[data-test-id="actions-menu-button"][aria-expanded="true"]',
          );
          const chatContainer = activeMenuButton?.closest(
            ".conversation-items-container",
          );
          const chatLink = chatContainer?.querySelector(
            'a[data-test-id="conversation"]',
          ) as HTMLAnchorElement;

          const chatId = chatLink?.href.split("/").pop() || "unknown";
          const chatName = chatLink?.innerText.trim() || "Untitled Chat";

          const wrapper = document.createElement("div");
          wrapper.className = "archiveBtn-wrapper";
          deleteButton.parentNode?.insertBefore(wrapper, deleteButton);
          newItems.push({
            id: idCounter++,
            element: wrapper,
            chat: { id: chatId, name: chatName },
          });
        }
        // });

        setTargets((prev) => {
          const active = prev.filter((t) => document.contains(t.element));
          if (newItems.length === 0 && active.length === prev.length)
            return prev;
          return [...active, ...newItems];
        });

        // 2. Hide archived chats in the main list
        const archivedIds = archivedChats.map((c) => c.id);
        const conversations = document.querySelectorAll(
          ".conversation-items-container",
        );
        conversations.forEach((conv) => {
          const link = conv.querySelector(
            'a[data-test-id="conversation"]',
          ) as HTMLAnchorElement;
          const id = link?.href.split("/").pop();
          if (id && archivedIds.includes(id)) {
            (conv as HTMLElement).style.display = "none";
          } else {
            (conv as HTMLElement).style.display = "";
          }
        });

        // 3. Find sidebar to inject "Archived" section
        let archivedWrapper = document.getElementById(
          "archived-section-wrapper",
        );
        if (!sidebarTarget && !archivedWrapper) {
          const conversationsList =
            document.querySelector("conversations-list");
          if (conversationsList) {
            archivedWrapper = document.createElement("div");
            archivedWrapper.id = "archived-section-wrapper";
            conversationsList.parentNode?.insertBefore(
              archivedWrapper,
              conversationsList.nextSibling,
            );
            setSidebarTarget(archivedWrapper);
          }
        } else if (archivedWrapper) {
          archivedWrapper.style.display = "";
        }

        timeoutId = null;
      }, 100);
    };

    findTargets();
    const observer = new MutationObserver(findTargets);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [archivedChats, sidebarTarget, enabled]);

  const handleArchive = (chat: ArchivedChat) => {
    const updated = [...archivedChats, chat];
    // Filter out duplicates just in case
    const unique = updated.filter(
      (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
    );
    chrome.storage.local.set({ archivedChatsData: unique });
  };

  const handleUnarchive = (chatId: string) => {
    const updated = archivedChats.filter((chat) => chat.id !== chatId);
    chrome.storage.local.set({ archivedChatsData: updated });
  };

  return (
    <>
      {enabled && (
        <>
          {/* Injected Archive buttons in menus */}
          {targets.map((target) =>
            createPortal(
              <ArchiveButton
                key={target.id}
                onAction={() => handleArchive(target.chat)}
              />,
              target.element,
            ),
          )}

          {/* Archived section in sidebar */}
          {sidebarTarget &&
            createPortal(
              <ArchiveSection
                archivedChats={archivedChats}
                handleUnarchive={handleUnarchive}
                showArchived={showArchived}
                setShowArchived={setShowArchived}
              />,
              sidebarTarget,
            )}
        </>
      )}
    </>
  );
}

export default App;
