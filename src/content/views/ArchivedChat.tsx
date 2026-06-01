import UnarchiveButton from "./UnarchiveButton";

export default function ArchivedChat({
  chat,
  handleUnarchive,
}: {
  chat: any;
  handleUnarchive: (id: string) => void;
}) {
  console.log(chat);
  return (
    <div key={chat.id} className="archived-item">
      <span
        className="chat-name mat-ripple mat-mdc-tooltip-trigger conversation ng-tns-c3578707374-6 ng-trigger ng-trigger-conversationListRevealAnimation mat-mdc-tooltip-disabled"
        title={chat.name}
      >
        {chat.name}
      </span>
      <UnarchiveButton onAction={() => handleUnarchive(chat.id)} />
    </div>
  );
}
