export default function Pause({
  title,
  action,
}: {
  title: string;
  action?: JSX.Element;
}) {
  return (
    <div className="paused">
      <span>{title}</span>
      {action}
    </div>
  );
}
