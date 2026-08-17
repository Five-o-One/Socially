import { useState } from "react";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppImage } from "../components/AppImage";

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

            <div className="mx-2 border-b border-border" />

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
          {/* Posts will be rendered here */}
        </section>
      </div>
    </main>
  );
}
