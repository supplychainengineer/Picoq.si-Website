import { site } from "@/content/site";

export function SparkMark() {
  return <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" className="spark-mark"><path d="M32 4v56M4 32h56M12.2 12.2l39.6 39.6M12.2 51.8l39.6-39.6" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" /></svg>;
}

export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" className={className}>
      <path d="M8 20a12 12 0 1 1 12 12H8V20Z" stroke="currentColor" strokeWidth="5" />
      <path d="m24 24 9 9" stroke="currentColor" strokeWidth="5" strokeLinecap="square" />
      <circle cx="20" cy="20" r="3.3" fill="currentColor" />
    </svg>
  );
}

export function Wordmark({ large = false }: { large?: boolean }) {
  return <span className={`wordmark ${large ? "wordmark-large" : ""}`}><BrandMark />{site.wordmark}<span className="wordmark-dot">.</span></span>;
}
