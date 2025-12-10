import { Octokit } from '@octokit/rest';

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function createPostPR(title: string, tags: string[], content: string) {
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const date = new Date().toISOString().split('T')[0];
  
  // Read current posts file
  const { data: currentFile } = await octokit.repos.getContent({
    owner: 'NefariousNGGA',
    repo: 'unsaid-thoughts',
    path: 'lib/posts.ts',
  });

  // Update file with new post
  const newPost = `
  {
    slug: '${slug}',
    title: '${title.replace(/'/g, "\\'")}',
    date: '${date}',
    tags: [${tags.map(t => `'${t.replace(/'/g, "\\'")}'`).join(', ')}],
    excerpt: '${content.substring(0, 100).replace(/'/g, "\\'")}...',
    content: \`${content.replace(/`/g, '\\`')}\`,
    published: true,
    draft: false,
  },`;

  // Create new file content
  const currentContent = Buffer.from((currentFile as any).content, 'base64').toString();
  const insertIndex = currentContent.indexOf('const staticPostsData = [') + 25;
  const newContent = currentContent.slice(0, insertIndex) + newPost + currentContent.slice(insertIndex);

  // Create new branch and PR
  const branchName = `telegram-post-${Date.now()}`;
  
  await octokit.git.createRef({
    owner: 'NefariousNGGA',
    repo: 'unsaid-thoughts',
    ref: `refs/heads/${branchName}`,
    sha: (currentFile as any).sha,
  });

  await octokit.repos.createOrUpdateFileContents({
    owner: 'NefariousNGGA',
    repo: 'unsaid-thoughts',
    path: 'lib/posts.ts',
    message: `[Telegram Bot] Add new post: ${title}`,
    content: Buffer.from(newContent).toString('base64'),
    branch: branchName,
    sha: (currentFile as any).sha,
  });

  await octokit.pulls.create({
    owner: 'NefariousNGGA',
    repo: 'unsaid-thoughts',
    title: `[Telegram Bot] New post: ${title}`,
    head: branchName,
    base: 'main',
    body: `Auto-generated post from Telegram bot.\n\nTags: ${tags.join(', ')}`,
  });

  return { success: true, slug };
}