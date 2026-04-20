"use client";

import { lessons, sections, type Lesson } from "@/lib/lessons";
import { useState } from "react";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className ?? "w-4 h-4"} fill="currentColor" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg className="w-3.5 h-3.5 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M6 21h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      {direction === "left" ? (
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      )}
    </svg>
  );
}

function encodePath(filename: string) {
  const base = process.env.NEXT_PUBLIC_RESOURCES_URL;
  if (base) {
    return `${base}/${encodeURIComponent(filename)}`;
  }
  return `/resources/${encodeURIComponent(filename)}`;
}

function LessonLabel({ lesson }: { lesson: Lesson }) {
  if (lesson.number !== null) {
    return (
      <>
        <span className="text-accent font-semibold shrink-0">L{lesson.number}</span>
        <span className="truncate">{lesson.title}</span>
      </>
    );
  }
  return <span className="truncate">{lesson.title}</span>;
}

export default function CoursePage() {
  const [activeLesson, setActiveLesson] = useState<Lesson>(lessons[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentIndex = lessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  function selectLesson(lesson: Lesson) {
    setActiveLesson(lesson);
    setSidebarOpen(false);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-80 bg-surface border-r border-border
          flex flex-col
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Sidebar header */}
        <div className="p-5 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-bold text-accent tracking-tight">
                Lashes Design Academy
              </h1>
              <p className="text-xs text-muted mt-0.5">
                {lessons.length} lecții
              </p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-muted hover:text-foreground"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Lesson list */}
        <nav className="flex-1 overflow-y-auto py-2">
          {sections.map((section) => {
            const sectionLessons = lessons.filter((l) => l.section === section.key);
            if (sectionLessons.length === 0) return null;
            return (
              <div key={section.key} className="mb-1">
                <div className="px-5 py-2">
                  <h2 className="text-[11px] font-semibold uppercase tracking-wider text-muted/70">
                    {section.label}
                  </h2>
                </div>
                {sectionLessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => selectLesson(lesson)}
                    className={`
                      w-full flex items-center gap-2.5 px-5 py-2.5 text-sm text-left transition-colors
                      ${activeLesson.id === lesson.id
                        ? "bg-accent/10 text-accent border-r-2 border-accent"
                        : "text-muted hover:text-foreground hover:bg-white/5"
                      }
                    `}
                  >
                    <PlayIcon className={`w-3.5 h-3.5 shrink-0 ${activeLesson.id === lesson.id ? "text-accent" : ""}`} />
                    <LessonLabel lesson={lesson} />
                    {lesson.pdfFile && <FileIcon />}
                  </button>
                ))}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1 text-muted hover:text-foreground"
          >
            <MenuIcon />
          </button>
          <div className="min-w-0">
            <h2 className="text-base font-semibold truncate">
              {activeLesson.number !== null && (
                <span className="text-accent mr-1.5">Lecția {activeLesson.number}</span>
              )}
              {activeLesson.title}
            </h2>
          </div>
        </header>

        {/* Video player */}
        <div className="flex-1 flex flex-col items-center justify-start p-4 md:p-8">
          <div className="w-full max-w-5xl">
            <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl shadow-black/50" style={{ aspectRatio: "16/9" }}>
              <video
                key={activeLesson.id}
                className="w-full h-full"
                controls
                autoPlay
                playsInline
                preload="auto"
              >
                <source src={encodePath(activeLesson.videoFile)} type="video/mp4" />
                Browserul tău nu suportă redarea video.
              </video>
            </div>

            {/* Lesson info bar */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {activeLesson.number !== null && (
                    <span className="text-accent">L{activeLesson.number} – </span>
                  )}
                  {activeLesson.title}
                </h3>
                <p className="text-sm text-muted mt-1">
                  {activeLesson.section === "theory" && "Lecție teoretică"}
                  {activeLesson.section === "practice" && "Lecție practică"}
                  {activeLesson.section === "intro" && "Introducere în curs"}
                  {activeLesson.section === "outro" && "Încheierea cursului"}
                </p>
              </div>

              {activeLesson.pdfFile && (
                <a
                  href={encodePath(activeLesson.pdfFile)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent/15 text-accent hover:bg-accent/25 rounded-lg text-sm font-medium transition-colors shrink-0"
                >
                  <DownloadIcon />
                  Descarcă PDF
                </a>
              )}
            </div>

            {/* PDF preview */}
            {activeLesson.pdfFile && (
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-muted mb-3 uppercase tracking-wider">Resursă PDF</h4>
                <div className="w-full rounded-xl overflow-hidden border border-border bg-white" style={{ height: "80vh" }}>
                  <iframe
                    key={activeLesson.id + "-pdf"}
                    src={encodePath(activeLesson.pdfFile)}
                    className="w-full h-full"
                    title={`PDF – ${activeLesson.title}`}
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-8 flex items-center justify-between gap-4 border-t border-border pt-6">
              {prevLesson ? (
                <button
                  onClick={() => selectLesson(prevLesson)}
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <ChevronIcon direction="left" />
                  <span className="hidden sm:inline">
                    {prevLesson.number !== null ? `L${prevLesson.number} – ` : ""}
                    {prevLesson.title}
                  </span>
                  <span className="sm:hidden">Anterior</span>
                </button>
              ) : (
                <div />
              )}
              <span className="text-xs text-muted">
                {currentIndex + 1} / {lessons.length}
              </span>
              {nextLesson ? (
                <button
                  onClick={() => selectLesson(nextLesson)}
                  className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
                >
                  <span className="hidden sm:inline">
                    {nextLesson.number !== null ? `L${nextLesson.number} – ` : ""}
                    {nextLesson.title}
                  </span>
                  <span className="sm:hidden">Următor</span>
                  <ChevronIcon direction="right" />
                </button>
              ) : (
                <div />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
