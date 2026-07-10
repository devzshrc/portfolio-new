import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";

type GitHubContributionsProps = {
  profileUrl: string;
};

export function GitHubContributions({ profileUrl }: GitHubContributionsProps) {
  const username = profileUrl.split("/").filter(Boolean).pop() ?? "github";

  return (
    <div className="overflow-hidden rounded-lg border bg-card">
      <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">a year of building</p>
          <p className="text-sm text-muted-foreground">
            my open-source contributions on GitHub
          </p>
        </div>
        <Link
          href={profileUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <Github className="size-4" />
          <span>@{username}</span>
        </Link>
      </div>
      <div className="overflow-x-auto p-4">
        <div className="min-w-[720px]">
          <Image
            src={`https://ghchart.rshah.org/${username}`}
            alt={`GitHub contribution graph for ${username}`}
            width={828}
            height={210}
            loading="lazy"
            unoptimized
            className="h-auto w-full"
          />
        </div>
      </div>
    </div>
  );
}
