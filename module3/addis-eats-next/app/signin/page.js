
import Link from "next/link";
import { signIn, signOut } from "./actions";

export const dynamic = "force-dynamic";

export default async function SignInPage({ searchParams }) {
  const params = (await searchParams) ?? {};
  const next = typeof params.next === "string" ? params.next : "/";
  const hasError = params.error === "invalid";

  return (
    <main className="mx-auto max-w-md p-6">
      <h1 className="mb-2 text-3xl font-bold">Sign in</h1>
      <p className="mb-6 text-gray-600">
        Sign in to place orders and view your order status.
      </p>

      {hasError && (
        <p className="mb-4 rounded border border-red-300 p-3 text-red-700">
          Incorrect username or password. Please try again.
        </p>
      )}

      <form action={signIn} className="space-y-4">
        <input type="hidden" name="next" value={next} />

        <div>
          <label htmlFor="username" className="mb-1 block font-medium">
            Username
          </label>
          <input
            id="username"
            name="username"
            autoComplete="username"
            required
            className="w-full rounded border p-3"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="w-full rounded border p-3"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded bg-orange-600 p-3 font-semibold text-white"
        >
          Sign in
        </button>
      </form>
       <div className="mt-4 space-y-4">
  <form action={signOut}>
    <button
      type="submit"
      className="w-full rounded border p-3 font-semibold"
    >
      Sign out
    </button>
  </form>

  <p className="text-sm text-gray-600">
    <Link href="/" className="underline">
      Return to Addis Eats
    </Link>
  </p>
</div>
   

 
  
  </main>
  );
}
