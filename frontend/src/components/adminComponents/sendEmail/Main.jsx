import EmailForm from "./EmailForm";

export default function Main() {
  return (
    <main className="min-h-screen bg-paper flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 mb-5">
            <svg
              className="w-6 h-6 text-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.8}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5A2.25 2.25 0 002.25 6.75m19.5 0l-9.75 6.75L2.25 6.75"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-ink">
            Send an Email
          </h1>
          <p className="mt-1.5 text-sm text-slate">
            Compose and send directly from your Gmail account.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lifted border border-mist p-8">
          <EmailForm />
        </div>
      </div>
    </main>
  );
}