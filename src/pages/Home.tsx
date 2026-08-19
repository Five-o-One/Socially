import { useState } from "react";
import { AppCard, AppImage, AppButton, PostCard } from "@/components";
import type { Post } from "@/types";

const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    authorId: "user-farshad",
    content:
      "سوشالی؛ پروژه‌ای برای محک زدن مهارت‌های فرانت‌اند و کار تیمی 🚀\nپیاده‌سازی تمیز دیزاین توییتر با ری‌اکت و تیلویند.",
    createdAt: "8 days ago",
    updatedAt: "8 days ago",
    author: {
      id: "user-farshad",
      name: "Farshad Hosseini",
      username: "f.e.h.farshad",
      image: null,
    },
    likes: [{ userId: "current-user-id" }],
    comments: [
      {
        id: "c1",
        content: "ساختار کامپوننت‌ها عالی پیاده شده 👌",
        createdAt: "about 6 hours ago",
        author: {
          id: "user-mohammad",
          name: "Mohammad Fallah",
          username: "mohammadfallah.w",
          image: null,
        },
      },
    ],
    _count: { likes: 1, comments: 1 },
  },
  {
    id: "2",
    authorId: "current-user-id",
    content:
      "این یک پست تستی از طرف کاربر جاری است تا دکمه حذف و عملکرد مودال تست شود.",
    createdAt: "Just now",
    updatedAt: "Just now",
    author: {
      id: "current-user-id",
      name: "Seyed Ali Mousavi",
      username: "samb.1376",
      image: null,
    },
    likes: [],
    comments: [],
    _count: { likes: 0, comments: 0 },
  },
];

export default function Home() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [postContent, setPostContent] = useState("");

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      authorId: "current-user-id",
      content: postContent.trim(),
      createdAt: "Just now",
      updatedAt: "Just now",
      author: {
        id: "current-user-id",
        name: "Seyed Ali Mousavi",
        username: "samb.1376",
        image: null,
      },
      likes: [],
      comments: [],
      _count: { likes: 0, comments: 0 },
    };

    setPosts([newPost, ...posts]);
    setPostContent("");
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== postId));
  };

  return (
    <div className="space-y-4">
      {/* Create Post Card */}
      <AppCard>
        <form onSubmit={handleCreatePost} className="space-y-3">
          <div className="flex items-start gap-3">
            <AppImage
              src=""
              alt="Seyed Ali Mousavi"
              variant="circle"
              size="md"
            />
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={3}
              className="flex-1 resize-none bg-transparent pt-1 text-sm text-text placeholder:text-text-secondary focus:outline-none"
            />
          </div>

          <div className="border-t border-border pt-3 flex justify-end">
            <AppButton
              type="submit"
              variant="primary"
              size="md"
              icon="Send"
              disabled={!postContent.trim()}
            >
              Post
            </AppButton>
          </div>
        </form>
      </AppCard>

      {/* Posts Feed */}
      <section className="space-y-4">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            currentUserId="current-user-id"
            onDeletePost={handleDeletePost}
          />
        ))}
      </section>
    </div>
  );
}
