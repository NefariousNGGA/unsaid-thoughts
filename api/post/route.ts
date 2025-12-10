import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${process.env.POST_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, content, tags } = await req.json();

  const slug = title.toLowerCase().replace(/\s+/g, "-");
  const markdown = `---
title: "${title}"
date: "${new Date().toISOString()}"
tags: [${tags.map((t: string) => `"${t}"`).join(", ")}]
---

${content}
`;

  const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

  try {
    await octokit.repos.createOrUpdateFileContents({
      owner: "NefariousNGGA", // replace with your GitHub username
      repo: "unsaid-thoughts", // replace with your repo name
      path: `content/${slug}.md`,
      message: `Add new post: ${title}`,
      content: Buffer.from(markdown).toString("base64"),
      committer: {
        name: "Dan",
        email: "danyhezov@gmail.com"
      },
      author: {
        name: "Dan",
        email: "danyhezov@gmail.com"
      }
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
                                                   }
