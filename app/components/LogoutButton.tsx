"use client";

export default function LogoutButton() {
  return (
    <form
      action="/api/auth/logout"
      method="post"
      onSubmit={async (event) => {
        event.preventDefault();
        try {
          const res = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ redirectTo: '/' })
          });
          const redirectTo = res.headers.get('X-Redirect-To') || '/';
          window.location.href = redirectTo;
        } catch {
          window.location.href = '/';
        }
      }}
    >
      <button type="submit" className="nav-logout">
        Log out
      </button>
    </form>
  );
}

