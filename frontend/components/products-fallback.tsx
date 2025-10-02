export function ProductsFallback({
  message,
  isError = false
}: {
  message: string;
  isError?: boolean;
}) {
  return (
    <div
      style={{
        padding: "2rem",
        borderRadius: "0.75rem",
        backgroundColor: isError ? "#fee2e2" : "#e0f2fe",
        color: isError ? "#991b1b" : "#0c4a6e"
      }}
      role={isError ? "alert" : undefined}
    >
      {message}
    </div>
  );
}
