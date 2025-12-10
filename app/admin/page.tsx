"use client";
import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState("");

  async function handleSubmit() {
    setStatus("Posting...");
    try {
      const res = await fetch("/api/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_POST_SECRET}` // 👈 must match your Vercel env var
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map(t => t.trim())
        })
      });

      const result = await res.json();
      if (result.success) {
        setStatus("✅ Posted successfully!");
        setTitle("");
        setContent("");
        setTags("");
      } else {
        setStatus("❌ Failed: " + result.error);
      }
    } catch (err: any) {
      setStatus("❌ Error: " + err.message);
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create a Thought</h1>

      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Content"
        rows={6}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <input
        className="w-full mb-2 p-2 border rounded"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={handleSubmit}
      >
        Post
      </button>

      {status && <p className="mt-3 text-sm">{status}</p>}
    </div>
  );
          }
