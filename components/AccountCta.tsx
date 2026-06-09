import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, UserRound } from "lucide-react";

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

  return (
    <Link className={user ? "topbar__cta topbar__cta--account" : "topbar__cta"} href={user ? "/account" : "/account/register"}>
      {user ? <UserRound size={16} /> : null}
      {checked ? accountLabel(user) : "Зарегистрироваться"}
      {!user ? <ArrowRight size={16} /> : null}
    </Link>
  );
}
