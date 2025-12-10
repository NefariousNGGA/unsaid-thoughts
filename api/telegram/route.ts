import { NextRequest, NextResponse } from 'next/server';
import { Telegraf } from 'telegraf';

// Initialize bot
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN!);

// Store user sessions
const userStates = new Map<number, {
  step: 'title' | 'tags' | 'content' | 'confirm';
  title?: string;
  tags?: string[];
  content?: string;
}>();

// Handle messages
bot.on('text', async (ctx) => {
  const userId = ctx.from.id;
  const text = ctx.message.text;
  const state = userStates.get(userId) || { step: 'title' };

  if (text === '/start') {
    userStates.set(userId, { step: 'title' });
    return ctx.reply('📝 Welcome to Unsaid Thoughts Bot!\n\nSend me the title of your thought:');
  }

  if (text === '/cancel') {
    userStates.delete(userId);
    return ctx.reply('❌ Cancelled. Use /start to begin again.');
  }

  switch (state.step) {
    case 'title':
      state.title = text;
      state.step = 'tags';
      userStates.set(userId, state);
      return ctx.reply('🏷️ Now send me the tags (comma separated):\nExample: digital, memory, ghosts');

    case 'tags':
      state.tags = text.split(',').map(t => t.trim());
      state.step = 'content';
      userStates.set(userId, state);
      return ctx.reply('📄 Now send me the content (markdown supported):\n\nYou can send multiple messages. When done, send /done');

    case 'content':
      if (text === '/done') {
        state.step = 'confirm';
        userStates.set(userId, state);
        
        // Show preview
        const preview = `
📝 PREVIEW:

**Title:** ${state.title}
**Tags:** ${state.tags?.join(', ')}
**Date:** ${new Date().toISOString().split('T')[0]}

**Content Preview:**
${state.content?.substring(0, 200)}${state.content && state.content.length > 200 ? '...' : ''}

✅ Send /publish to publish
❌ Send /cancel to cancel
        `;
        return ctx.reply(preview);
      }
      
      // Append to content
      state.content = (state.content || '') + text + '\n\n';
      userStates.set(userId, state);
      return ctx.reply('✓ Added. Send more or /done when finished.');

    case 'confirm':
      if (text === '/publish') {
        // Call GitHub API to create post
        await publishToGitHub(state);
        userStates.delete(userId);
        return ctx.reply('✅ Thought published! It will be live on the site in 1-2 minutes.');
      }
      break;
  }
});

// Publish to GitHub function
async function publishToGitHub(state: any) {
  // This would call GitHub API
  // For now, we'll just log
  console.log('Publishing:', state);
}

// Start bot (in production)
if (process.env.NODE_ENV === 'production') {
  bot.launch();
}

export async function POST(request: NextRequest) {
  // Telegram webhook handler
  const update = await request.json();
  await bot.handleUpdate(update);
  
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Telegram bot webhook',
    instructions: 'Set webhook to: https://your-domain.com/api/telegram'
  });
                      }
