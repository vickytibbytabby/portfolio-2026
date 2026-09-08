"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./locked.module.css";

export default function Unlock() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [state, setState] = useState<"idle" | "checking" | "wrong">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("checking");
    const res = await fetch("/api/unlock", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      // the cookie is set; the middleware will let the real page through
      router.refresh();
      router.replace("/work/arena-club");
      return;
    }
    setState("wrong");
  };

  return (
    <form className={styles.form} onSubmit={submit}>
      <input
        className={styles.input}
        type="password"
        name="case-password"
        placeholder="Password"
        aria-label="Password"
        autoComplete="off"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (state === "wrong") setState("idle");
        }}
      />
      <button className={styles.button} type="submit" disabled={state === "checking"}>
        {state === "checking" ? "Checking…" : "Enter"}
      </button>
      <p className={styles.error} data-show={state === "wrong" || undefined} aria-live="polite">
        That isn&rsquo;t it — try again?
      </p>
    </form>
  );
}
