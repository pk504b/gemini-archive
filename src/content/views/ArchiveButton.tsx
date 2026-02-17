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
      onClick={handleClick}
      //   style={{ width: "100%" }}
      className="mat-mdc-menu-item mat-focus-indicator ng-star-inserted bg-red-100"
      role="menuitem"
      tabIndex={0}
      aria-disabled={false}
    >
      <svg
        className="mat-icon notranslate gds-icon-l google-symbols mat-ligature-font mat-icon-no-color"
        aria-hidden="true"
        data-mat-icon-type="font"
        data-mat-icon-name="archive"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27M6.24 5h11.52l.81.97H5.44zM5 19V8h14v11zm8.45-9h-2.9v3H8l4 4l4-4h-2.55z"
        />
      </svg>
      <span className="mat-mdc-menu-item-text">
        <span className="gds-body-m"> Archive </span>
      </span>
      <div className="mat-ripple mat-mdc-menu-ripple"></div>
    </button>
  );
}
