export default function Loading() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 rounded-r-lg bg-primary-subtle">
      <div className="h-full w-1/4 bg-primary animate-loading-bar" />
    </div>
  );
}
