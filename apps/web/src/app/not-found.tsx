import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <style>{`header { display: none !important; }`}</style>
      <div className="h-full flex flex-col items-center justify-center gap-4 text-center px-4">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-muted">
          The page you are looking for does not exist.
        </p>
        <Link href="/" className="hover:underline underline-offset-4">
          Go back home
        </Link>
      </div>
    </>
  );
}
