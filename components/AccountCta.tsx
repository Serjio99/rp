import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, LogOut, UserRound } from "lucide-react";

type AccountUser = {
  displayName?: string;
  username?: string | null;
  email?: string | null;
};

function accountLabel(user: AccountUser | null) {
  if (!user) return "Зарегистрироваться";
  return user.displayName || user.username || user.email || "Мой кабинет";
}

export function AccountCta() {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [checked, setChecked] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    let alive = true;

    async function loadUser() {
      try {
        const response = await fetch("/api/auth/me", { credentials: "same-origin" });
        if (!alive) return;
        if (!response.ok) {
          setUser(null);
          return;
        }

        const data = await response.json();
        setUser(data.user || null);
      } catch {
        if (alive) setUser(null);
      } finally {
        if (alive) setChecked(true);
      }
    }

    void loadUser();

    return () => {
      alive = false;
    };
  }, []);

  async function logout() {
    if (loggingOut) return;
    setLoggingOut(true);

    try {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
    } finally {
      setUser(null);
      setLoggingOut(false);
      window.location.assign("/");
    }
  }

  if (user) {
    return (
      <div className="account-cta-group">
        <Link className="topbar__cta topbar__cta--account" href="/account">
          <UserRound size={16} />
          {checked ? accountLabel(user) : "Мой кабинет"}
        </Link>
        <button className="topbar__logout" type="button" onClick={logout} disabled={loggingOut}>
          <LogOut size={16} />
          {loggingOut ? "Выходим..." : "Выйти"}
        </button>
      </div>
    );
  }

  return (
    <Link className="topbar__cta" href="/account/register">
      {checked ? "Зарегистрироваться" : "Зарегистрироваться"}
      <ArrowRight size={16} />
    </Link>
  );
}
