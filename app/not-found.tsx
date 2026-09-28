export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0d0e] px-4 text-white">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-[0.25em] text-[#ccff00]">
          FITLOG
        </p>

        <h1 className="mt-4 text-6xl font-black">404</h1>

        <p className="mt-3 text-gray-400">
          Sorry, the page you are looking for does not exist.
        </p>

        <a
          href="/"
          className="mt-6 inline-flex rounded-full bg-[#ccff00] px-6 py-3 text-sm font-bold text-black transition hover:opacity-90"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}