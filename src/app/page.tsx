"use client";

import { useMemo, useState } from "react";

type Footnote = {
  id: string | number;
  ref: string;
  text: string;
};

export default function Home() {
  const [text, setText] = useState("");
  const [footnotes, setFootnotes] = useState<Footnote[]>([]);
  const [title, setTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const charCount = useMemo(() => text.trim().length, [text]);

  async function generateFootnotes() {
    if (!charCount) return;
    try {
      setIsGenerating(true);
      const res = await fetch("/api/footnotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to generate footnotes");
      const data = await res.json();
      setFootnotes((data?.footnotes as Footnote[]) || []);
    } catch (err) {
      console.error(err);
      alert("Sorry, something went wrong generating footnotes.");
    } finally {
      setIsGenerating(false);
    }
  }

  async function saveProject() {
    if (!title.trim()) {
      alert("Please add a project title.");
      return;
    }
    try {
      setIsSaving(true);
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          userText: text,
          footnotes,
        }),
      });
      if (!res.ok) throw new Error("Failed to save project");
      alert("Saved!");
    } catch (err) {
      console.error(err);
      alert("Sorry, something went wrong saving your project.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <main className="min-h-dvh bg-linear-to-b from-slate-50/60 to-white dark:from-neutral-950 dark:to-neutral-900">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:py-14 md:py-20">
        <header className="mb-8 text-center md:mb-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              Scripturify Lite
            </span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-600 dark:text-slate-300/80 sm:text-base">
            Paste your writing, generate smart footnotes, and save projects —
            fast and simple.
          </p>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-6 md:p-8">
          <label
            htmlFor="input-text"
            className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200"
          >
            Your Text
          </label>
          <textarea
            id="input-text"
            className="min-h-40 w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 outline-none ring-blue-500/40 transition focus:border-slate-300 focus:ring-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-slate-100"
            placeholder="Enter your text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="mt-3 flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center">
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {charCount.toLocaleString()} characters
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setText("");
                  setFootnotes([]);
                }}
                className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 active:scale-[0.99] dark:border-neutral-800 dark:text-slate-200 dark:hover:bg-neutral-800/60"
              >
                Clear
              </button>
              <button
                type="button"
                onClick={generateFootnotes}
                disabled={!charCount || isGenerating}
                className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isGenerating ? "Generating..." : "Generate Footnotes"}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 md:mt-10">
          <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            Footnotes
          </h2>
          {footnotes.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-300 p-6 text-sm text-slate-500 dark:border-neutral-800 dark:text-slate-400">
              No footnotes yet. Generate to see results here.
            </div>
          ) : (
            <ul className="grid gap-3">
              {footnotes.map((f) => (
                <li
                  key={f.id}
                  className="rounded-xl border border-slate-200 bg-white/80 p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-900/60"
                >
                  <div className="text-sm text-slate-700 dark:text-slate-200">
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                      {f.ref}
                    </span>
                    <span className="mx-2 text-slate-400">•</span>
                    <span className="text-slate-700 dark:text-slate-200">
                      {f.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8 md:mt-12">
          <h2 className="mb-3 text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-100">
            Save Project
          </h2>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/60 sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none ring-blue-500/40 transition focus:border-slate-300 focus:ring-2 dark:border-neutral-800 dark:bg-neutral-950 dark:text-slate-100"
                placeholder="Project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                type="button"
                onClick={saveProject}
                disabled={isSaving}
                className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 active:scale-[0.99] dark:bg-slate-100 dark:text-slate-900"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Your text and generated footnotes will be stored with this title.
            </p>
          </div>
        </section>

        <footer className="mt-10 text-center text-xs text-slate-400 dark:text-slate-500">
          Built with ❤ — Scripturify Lite
        </footer>
      </div>
    </main>
  );
}
