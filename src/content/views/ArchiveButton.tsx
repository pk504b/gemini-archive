import "./App.css";

interface Props {
  onAction?: () => void;
}

export default function ArchiveButton({ onAction }: Props) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onAction?.();
  };

  return (
    <button
      data-test-id="rename-button"
      className="mat-mdc-menu-item mat-focus-indicator ng-tns-c1968356930-8 lm-menu-item-theme ng-star-inserted"
      role="menuitem"
      tabIndex={0}
      aria-disabled={false}
      onClick={handleClick}
    >
      <span className="mat-mdc-menu-item-text">
        <span
          className="mat-icon notranslate lm-icon-m lumi-symbols mat-ligature-font mat-icon-no-color ng-star-inserted"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 14h4a1 1 0 0 0 0-2h-4a1 1 0 0 0 0 2m9-11H5a3 3 0 0 0-3 3v3a1 1 0 0 0 1 1h1v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-8h1a1 1 0 0 0 1-1V6a3 3 0 0 0-3-3m-1 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-8h12Zm2-10H4V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1Z"
            ></path>
          </svg>
        </span>
        <span className="gds-body-m gem-menu-item-label">Archive</span>
      </span>
      <div className="mat-ripple mat-mdc-menu-ripple"></div>
    </button>
  );
}
