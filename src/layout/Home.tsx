// export default function Home() {
//   return <div>Home</div>;
// }
//it is for see what we did in notifecard

import { useState } from "react";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { PostCard } from "../components/PostCard";
import { AppImage } from "../components/AppImage";

const mockPosts = [
  {
    postId: 1,
    user: {
      imageURL: "",
      username: "f.e.h.farshad",
      name: "Farshad Hosseini",
    },
    message: "This is my first post on Socially!",
    date: "8 days ago",
    likes: 1,
    isLiked: false,
    commentsList: [],
  },
  {
    postId: 2,
    user: {
      imageURL: "",
      username: "samb.1376",
      name: "Seyed Ali Mousavi",
    },
    message: "Working on something new.",
    date: "5 days ago",
    likes: 1,
    isLiked: false,
    commentsList: [],
  },
  {
    postId: 3,
    user: {
      imageURL: "",
      username: "mohammadfallah.w",
      name: "Mohammad Fallah",
    },
    message: "salam",
    date: "2 days ago",
    likes: 1,
    isLiked: false,
    commentsList: [],
  },
];

export default function Home() {
  const [postText, setPostText] = useState("");

  const handleCreatePost = () => {
    if (!postText.trim()) return;

    console.log("New post:", postText);

    setPostText("");
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        {/* Create Post */}
        <AppCard className="mb-6">
          <div className="space-y-4">
            {/* User avatar + Post input */}
            <div className="flex items-start gap-3">
              <AppImage src="" alt="Current User" variant="circle" size="md" />

              <textarea
                value={postText}
                onChange={(event) => setPostText(event.target.value)}
                placeholder="What's on your mind?"
                rows={3}
                className="
          flex-1
          resize-none
          bg-transparent
          text-text
          placeholder:text-text-secondary
          outline-none
          pt-1
        "
              />
            </div>

            {/* Separator */}
            <div className="mx-2 border-b border-border" />

            {/* Post button */}
            <div className="flex justify-end">
              <AppButton
                icon="Post"
                onClick={handleCreatePost}
                disabled={!postText.trim()}
              >
                Post
              </AppButton>
            </div>
          </div>
        </AppCard>

        {/* Posts Feed */}
        <section className="space-y-4">
          {mockPosts.map((post) => (
            <PostCard
              key={post.postId}
              {...post}
              onLike={() => console.log("Like:", post.postId)}
              onComment={(text) => console.log("Comment:", post.postId, text)}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
