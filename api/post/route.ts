import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export async function POST(req: Request) {
  // 🔒 Check secret
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.POST_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 📥 Get post data
  const { title, content, tags } = await req.json();

  // 📝 Build slug + markdown
  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const markdown = `---
title: "${title}"
date: "${new Date().toISOString()}"
tags: [${tags.map((t: string) => `"${t}"`).join(", ")}]
---

${content}
`;

  // 🐙 Connect to GitHub
  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: "NefariousNGGA", // 👈 your GitHub username
      repo: "unsaid-thoughts", // 👈 your repo name
      path: `content/${slug}.md`,
      message: `Add new post: ${title}`,
      content: Buffer.from(markdown).toString("base64"),
      committer: {
        name: "Dan",
        email: "12345678+NefariousNGGA@users.noreply.github.com" // 👈 use your GitHub noreply email
      },
      author: {
        name: "Dan",
        email: "12345678+NefariousNGGA@users.noreply.github.com"
      }
    });

    // ✅ Always return JSON
    return NextResponse.json({ success: true, slug });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}