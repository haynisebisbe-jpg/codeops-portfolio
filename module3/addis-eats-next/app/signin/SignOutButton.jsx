import { signOut } from "./actions";

export default function SignOutButton() {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className="rounded border px-3 py-2"
      >
        Sign out
      </button>
    </form>
  );
}