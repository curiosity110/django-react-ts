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
        borderRadius: "1.25rem",
        background: isError
          ? "linear-gradient(135deg, rgba(254, 202, 202, 0.3), rgba(248, 113, 113, 0.25))"
          : "linear-gradient(135deg, rgba(191, 219, 254, 0.35), rgba(221, 214, 254, 0.35))",
        color: isError ? "#7f1d1d" : "#312e81",
        border: "1px solid rgba(148, 163, 184, 0.25)",
        boxShadow: "0 18px 36px -24px rgba(30, 64, 175, 0.45)",
        textAlign: "center",
        fontWeight: 500
      }}
      role={isError ? "alert" : undefined}
    >
      {message}
    </div>
  );
}
