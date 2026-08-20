
export default function Home() {
  return (
    <main className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4">
      <section className="w-full max-w-3xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400">
          🔐 Secure Authentication Service
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Welcome to the{" "}
          <span className="text-blue-600 dark:text-blue-500">
            Auth Service
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-600 sm:text-lg dark:text-gray-400">
          A secure and reliable authentication service designed to handle
          user registration, login, session management, and protected
          resources with ease.
        </p>

        {/* Features */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 text-2xl">🔑</div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Secure Login
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Securely authenticate users and manage access.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 text-2xl">👤</div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              User Management
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Register and manage user accounts effortlessly.
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <div className="mb-3 text-2xl">🛡️</div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Protected Access
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Protect resources with authentication and authorization.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}