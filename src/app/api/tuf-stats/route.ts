import { NextResponse } from "next/server";

const TUF_PROFILE_BASE = "https://takeuforward.org/profile";

export const dynamic = "force-dynamic";

function readLevelStats(html: string, label: string) {
  const match = html.match(
    new RegExp(
      `>${label}<.*?>(\\d+)<!-- -->/<!-- -->(\\d+)<`,
      "s",
    ),
  );

  return {
    solved: match ? Number(match[1]) : 0,
    total: match ? Number(match[2]) : 0,
  };
}

function readTotalDsa(html: string) {
  const match = html.match(
    /profile-dsa-progress-circle-text-label[^>]*>(\d+)</,
  );

  return match ? Number(match[1]) : 0;
}

export async function GET(request: Request) {
  const username = new URL(request.url).searchParams.get("username")?.trim();

  if (!username || !/^[a-zA-Z0-9-]+$/.test(username)) {
    return NextResponse.json({ error: "Invalid TUF username" }, { status: 400 });
  }

  try {
    const response = await fetch(`${TUF_PROFILE_BASE}/${username}`, {
      headers: {
        Accept: "text/html,application/xhtml+xml",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to load TUF profile" },
        { status: response.status },
      );
    }

    const html = await response.text();
    const easy = readLevelStats(html, "Easy");
    const medium = readLevelStats(html, "Medium");
    const hard = readLevelStats(html, "Hard");
    const totalDsa = readTotalDsa(html);

    return NextResponse.json({
      username,
      totalSolved: easy.solved + medium.solved + hard.solved,
      totalQuestions: totalDsa || easy.total + medium.total + hard.total,
      levels: {
        easy,
        medium,
        hard,
      },
      updatedAt: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Unable to reach TUF right now" },
      { status: 502 },
    );
  }
}
