"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  GitFork,
  Github,
  Star,
} from "lucide-react";

type Repository = {
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
};

type GitHubRepositoriesProps = {
  profileUrl: string;
};

function RepositoryPlaceholder() {
  return (
    <div className="h-28 animate-pulse rounded-lg border bg-muted/30" />
  );
}

export function GitHubRepositories({
  profileUrl,
}: GitHubRepositoriesProps) {
  const username = profileUrl.split("/").filter(Boolean).pop() ?? "github";
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRepositories() {
      try {
        const response = await fetch(
          `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=pushed&direction=desc&per_page=4`,
          {
            headers: { Accept: "application/vnd.github+json" },
            signal: controller.signal,
          },
        );

        if (!response.ok) throw new Error("Unable to load repositories");

        const data = (await response.json()) as Repository[];
        setRepositories(data.filter((repository) => !repository.fork));
      } catch (requestError) {
        if (requestError instanceof DOMException && requestError.name === "AbortError") {
          return;
        }

        setError(true);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadRepositories();

    return () => controller.abort();
  }, [username]);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">recent public repositories</p>
        <Link
          href={`${profileUrl}?tab=repositories`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          <span>view all</span>
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <RepositoryPlaceholder />
          <RepositoryPlaceholder />
          <RepositoryPlaceholder />
          <RepositoryPlaceholder />
        </div>
      )}

      {!loading && error && (
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 text-foreground">
            <Github className="size-4" />
            <span>GitHub repositories are unavailable right now.</span>
          </div>
          <Link
            href={`${profileUrl}?tab=repositories`}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-flex items-center gap-1 underline underline-offset-4"
          >
            Browse them on GitHub <ArrowUpRight className="size-3.5" />
          </Link>
        </div>
      )}

      {!loading && !error && repositories.length === 0 && (
        <div className="rounded-lg border p-4 text-sm text-muted-foreground">
          No public repositories to show yet.
        </div>
      )}

      {!loading && !error && repositories.length > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {repositories.map((repository) => (
            <Link
              key={repository.html_url}
              href={repository.html_url}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border p-3 transition-colors hover:bg-muted/40"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2">
                  <Code2 className="size-4 shrink-0 text-muted-foreground" />
                  <h3 className="truncate text-sm font-medium">
                    {repository.name}
                  </h3>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <p className="mt-2 line-clamp-1 text-xs text-muted-foreground">
                {repository.description ?? "A public project by Devashish."}
              </p>
              <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                {repository.language && (
                  <span className="flex items-center gap-1.5">
                    <span className="size-2 rounded-full bg-foreground/60" />
                    {repository.language}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Star className="size-3.5" />
                  {repository.stargazers_count}
                </span>
                <span className="flex items-center gap-1">
                  <GitFork className="size-3.5" />
                  {repository.forks_count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
