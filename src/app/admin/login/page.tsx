"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background p-4 absolute inset-0">
      <div className="bg-surface w-full max-w-[400px] rounded-2xl border-2 border-on-background p-10 shadow-[8px_8px_0px_#1A1A1A] flex flex-col items-center relative transition-transform hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[12px_12px_0px_#1A1A1A] duration-300">
        <div className="text-4xl mb-6 leading-none">🌻</div>
        <h1 className="font-black text-4xl text-center mb-2 text-on-surface">
          Welcome back
        </h1>
        <p className="font-bold text-on-surface-variant text-center mb-8">
          Log in to manage your portfolio.
        </p>

        {error && (
          <div className="w-full mb-6 p-3 bg-red-100 border-2 border-red-500 rounded-lg">
            <p className="text-red-700 text-sm font-bold text-center">
              {error}
            </p>
          </div>
        )}

        <form className="w-full flex flex-col gap-6" onSubmit={handleLogin}>
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-on-surface uppercase text-sm tracking-wider"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full rounded-lg border-2 border-on-background px-4 py-3 text-base font-bold text-on-surface placeholder-on-surface-variant focus:outline-none focus:shadow-[4px_4px_0px_#1A1A1A] focus:-translate-y-1 focus:-translate-x-1 transition-all"
              id="email"
              placeholder="admin@example.com"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 relative">
            <label
              className="font-bold text-on-surface uppercase text-sm tracking-wider"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full rounded-lg border-2 border-on-background px-4 py-3 text-base font-bold text-on-surface placeholder-on-surface-variant focus:outline-none focus:shadow-[4px_4px_0px_#1A1A1A] focus:-translate-y-1 focus:-translate-x-1 transition-all"
              id="password"
              placeholder="••••••••"
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-[#FFD600] text-on-background font-black text-xl rounded-lg py-4 mt-2 border-2 border-on-background shadow-[4px_4px_0px_#1A1A1A] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0px_#1A1A1A] active:translate-y-0 active:translate-x-0 active:shadow-[0px_0px_0px_#1A1A1A] transition-all disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>
        <p className="mt-8 font-bold text-sm text-on-surface-variant text-center">
          Only admin should be here 🌻
        </p>
      </div>
    </div>
  );
}
