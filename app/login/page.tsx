"use client";

import { useState } from "react";

export default function LoginPage() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                window.location.href = "/";
            } else {
                const data = await res.json();
                setError(data.error || "Eroare");
            }
        } catch {
            setError("Eroare de conexiune");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex h-screen items-center justify-center bg-background px-4">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm bg-surface border border-border rounded-2xl p-8 shadow-xl"
            >
                <h1 className="text-xl font-bold text-accent text-center mb-1">
                    Lashes Design Academy
                </h1>
                <p className="text-sm text-muted text-center mb-8">
                    Introdu parola pentru a accesa cursul
                </p>

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Parolă"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted/50 focus:outline-none focus:border-accent transition-colors"
                    autoFocus
                />

                {error && (
                    <p className="mt-3 text-sm text-red-400 text-center">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading || !password}
                    className="w-full mt-4 px-4 py-3 bg-accent text-background font-semibold rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Se verifică..." : "Intră în curs"}
                </button>
            </form>
        </div>
    );
}
