"use client";

import { useState } from "react";

export function SubmitForm() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submitter_text: value.trim() }),
      });
      if (!res.ok) throw new Error("submit failed");
      setStatus("ok");
      setValue("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="submit" className="bg-teal rounded-[20px] py-12 px-8 mt-12 text-center">
      <h2 className="font-display font-black text-[1.8rem] text-white mb-2">
        Know a Game We're Missing?
      </h2>
      <p className="text-teal-light text-[0.95rem] mb-6">
        Submit a game idea or STEM connection and we'll add it to the library.
      </p>
      {status === "ok" ? (
        <div>
          <p className="text-white font-bold text-base mb-3">
            🎉 Thanks! We'll review your idea and be in touch.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="bg-amber text-white border-none px-[22px] py-[11px] rounded-[10px] font-display font-extrabold text-[0.9rem] cursor-pointer hover:bg-amber-dark"
          >
            Submit another idea ✦
          </button>
        </div>
      ) : (
        <form
          onSubmit={onSubmit}
          className="flex gap-3 max-w-[480px] mx-auto flex-wrap justify-center"
        >
          <label htmlFor="submit-idea" className="sr-only">
            Submit a game idea or STEM connection
          </label>
          <input
            id="submit-idea"
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Game name, STEM topic, or your email…"
            className="flex-1 min-w-[200px] px-4 py-[11px] rounded-[10px] border-none font-display text-[0.95rem] outline-none"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-amber text-white border-none px-[22px] py-[11px] rounded-[10px] font-display font-extrabold text-[0.9rem] cursor-pointer hover:bg-amber-dark disabled:opacity-60"
          >
            {status === "loading" ? "Sending…" : "Submit an Idea ✦"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-amber-mid mt-3 font-bold text-sm">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
