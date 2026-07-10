"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Brain, CheckCircle2, Target } from "lucide-react";

type LevelStats = {
  solved: number;
  total: number;
};

type TufStats = {
  username: string;
  totalSolved: number;
  totalQuestions: number;
  levels: {
    easy: LevelStats;
    medium: LevelStats;
    hard: LevelStats;
  };
  updatedAt: string;
};

type TufProfileStatsProps = {
  profileUrl: string;
};

const levelStyles = {
  easy: {
    label: "easy",
    bar: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  medium: {
    label: "medium",
    bar: "bg-amber-500",
    text: "text-amber-600 dark:text-amber-400",
  },
  hard: {
    label: "hard",
    bar: "bg-rose-500",
    text: "text-rose-600 dark:text-rose-400",
  },
} as const;

function StatPlaceholder() {
  return <div className="h-16 animate-pulse rounded-lg border bg-muted/30" />;
}

function percentage(solved: number, total: number) {
  if (!total) return 0;
  return Math.min(100, Math.round((solved / total) * 100));
}

export function TufProfileStats({ profileUrl }: TufProfileStatsProps) {
  const username = profileUrl.split("/").filter(Boolean).pop() ?? "profile";
  const [stats, setStats] = useState<TufStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadStats() {
      try {
        const response = await fetch(
          `/api/tuf-stats?username=${encodeURIComponent(username)}`,
          { signal: controller.signal, cache: "no-store" },
        );

        if (!response.ok) throw new Error("Unable to load stats");
        setStats((await response.json()) as TufStats);
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }

        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadStats();
    return () => controller.abort();
  }, [username]);

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-3 border-b p-3">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-md bg-muted">
            <Brain className="size-3.5" />
          </div>
          <div>
            <p className="text-sm font-medium">DSA progress</p>
            <p className="text-xs text-muted-foreground">live from takeUforward</p>
          </div>
        </div>
        <Link
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>@{username}</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {loading && (
        <div className="grid grid-cols-3 gap-2 p-3">
          <StatPlaceholder />
          <StatPlaceholder />
          <StatPlaceholder />
        </div>
      )}

      {!loading && error && (
        <div className="p-4 text-sm text-muted-foreground">
          <p>Live TUF stats are unavailable right now.</p>
          <Link
            href={profileUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 underline underline-offset-4"
          >
            View the profile on TUF <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      )}

      {!loading && !error && stats && (
        <div className="space-y-4 p-3">
          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-lg bg-muted/40 p-2.5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="size-3.5" />
                <span className="truncate text-[11px]">solved</span>
              </div>
              <p className="mt-1.5 text-lg font-bold tracking-tight sm:text-xl">
                {stats.totalSolved}
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-2.5">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Target className="size-3.5" />
                <span className="truncate text-[11px]">total</span>
              </div>
              <p className="mt-1.5 text-lg font-bold tracking-tight sm:text-xl">
                {stats.totalQuestions}
              </p>
            </div>
            <div className="rounded-lg bg-muted/40 p-2.5">
              <div className="flex items-center justify-between gap-1 text-[11px] text-muted-foreground">
                <span>overall progress</span>
                <span>
                  {percentage(stats.totalSolved, stats.totalQuestions)}%
                </span>
              </div>
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full bg-foreground transition-all"
                  style={{
                    width: `${percentage(stats.totalSolved, stats.totalQuestions)}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {(Object.keys(levelStyles) as Array<keyof typeof levelStyles>).map(
              (level) => {
                const levelStat = stats.levels[level];
                const style = levelStyles[level];
                const progress = percentage(levelStat.solved, levelStat.total);

                return (
                  <div key={level} className="rounded-lg border p-2.5">
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className={`font-medium ${style.text}`}>
                        {style.label}
                      </span>
                      <span className="text-muted-foreground">
                        {levelStat.solved} / {levelStat.total}
                      </span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full ${style.bar} transition-all`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                );
              },
            )}
          </div>

          <p className="text-xs text-muted-foreground">
            Live stats · refreshes when this page loads.
          </p>
        </div>
      )}
    </div>
  );
}
