import { useState } from "react";
import { PostCard } from "../components/PostCard";
import { UserInfoCard } from "../components/UserInfoCard";
import { AppButton } from "../components/AppButton";
import { AppCard } from "../components/AppCard";
import { AppModal } from "../components/AppModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Test data for posts with comments
  const posts = [
    {
      id: 1,
      user: {
        username: "f.e.h.farshad",
        name: "Farshad Hosseini",
      },
      message: "Hello! This is my first post on Socially. Glad to be here!",
      date: "8 days ago",
      likes: 12,
      isLiked: false,
      commentsList: [
        {
          id: 1,
          user: {
            username: "a.mousavi8",
            name: "Ali Mousavi",
          },
          message: "Awesome!",
          date: "2 days ago",
        },
        {
          id: 2,
          user: {
            username: "samb.1376",
            name: "Seyed Ali Mousavi",
          },
          message: "Thanks for the useful post",
          date: "1 day ago",
        },
        {
          id: 3,
          user: {
            username: "mohammadfallah.w",
            name: "Mohammad Fallah",
          },
          message: "Thanks",
          date: "about 6 hours ago",
        },
      ],
    },
    {
      id: 2,
      user: {
        username: "a.mousavi8",
        name: "Ali Mousavi",
      },
      message:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "3 days ago",
      likes: 8,
      isLiked: true,
      commentsList: [
        {
          id: 4,
          user: {
            username: "f.e.h.farshad",
            name: "Farshad Hosseini",
          },
          message: "Great post!",
          date: "2 days ago",
        },
      ],
    },
    {
      id: 3,
      user: {
        username: "samb.1376",
        name: "Seyed Ali Mousavi",
      },
      message: "Post with no comments!",
      date: "1 day ago",
      likes: 3,
      isLiked: false,
      commentsList: [],
    },
  ];

  // Test data for user profiles
  const userData = {
    username: "f.e.h.farshad",
    name: "Farshad Hosseini",
    followers: 1234,
    following: 567,
    isFollow: false,
    location: "Tehran, Iran",
    website: "https://farshad.dev",
    joinedDate: "November 2025",
    bio: "Frontend Developer | React & Tailwind enthusiast",
  };

  const handleComment = (postId: number, text: string) => {
    console.log(`New comment for post ${postId}: ${text}`);
  };

  const handleDeleteComment = (commentId: number) => {
    console.log(`Comment ${commentId} deleted`);
  };

  return (
    <div className="min-h-screen bg-bg p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-text">Component Testing</h1>
          <p className="text-text-secondary">
            All components are responsive and support dark/light theme
          </p>
        </div>

        {/* ============================================ */}
        {/* SECTION 1: AppButton */}
        {/* ============================================ */}
        <section>
          <h2 className="text-lg font-bold text-text mb-4 border-b border-border pb-2">
            1. AppButton
          </h2>
          <div className="flex flex-wrap gap-3">
            <AppButton variant="primary">Primary</AppButton>
            <AppButton variant="secondary">Secondary</AppButton>
            <AppButton variant="danger">Danger</AppButton>
            <AppButton variant="ghost">Ghost</AppButton>
            <AppButton variant="primary" onClick={() => setIsModalOpen(true)}>
              Open Modal
            </AppButton>
          </div>
          <div className="flex flex-wrap gap-3 mt-3">
            <AppButton size="sm">Small</AppButton>
            <AppButton size="md">Medium</AppButton>
            <AppButton size="lg">Large</AppButton>
            <AppButton fullWidth>Full Width</AppButton>
            <AppButton disabled>Disabled</AppButton>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: AppModal */}
        {/* ============================================ */}
        <AppModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Sample Modal"
          footer={
            <>
              <AppButton variant="ghost" onClick={() => setIsModalOpen(false)}>
                Cancel
              </AppButton>
              <AppButton
                variant="primary"
                onClick={() => setIsModalOpen(false)}
              >
                Confirm
              </AppButton>
            </>
          }
        >
          <div className="space-y-3">
            <p className="text-text">
              This is a sample modal dialog. You can put any content here.
            </p>
            <div className="bg-border/30 rounded-xl p-4 text-text-secondary text-sm">
              <ul className="list-disc list-inside space-y-1">
                <li>Click outside to close</li>
                <li>Press ESC to close</li>
                <li>Responsive on all devices</li>
              </ul>
            </div>
          </div>
        </AppModal>

        {/* ============================================ */}
        {/* SECTION 3: AppCard */}
        {/* ============================================ */}
        <section>
          <h2 className="text-lg font-bold text-text mb-4 border-b border-border pb-2">
            2. AppCard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AppCard>
              <p className="text-text">
                Basic card with default padding and border
              </p>
            </AppCard>
            <AppCard hoverable>
              <p className="text-text">Hoverable card with shadow effect</p>
            </AppCard>
            <AppCard borderless className="bg-border/20">
              <p className="text-text">Card without border</p>
            </AppCard>
            <AppCard noPadding>
              <div className="p-4 bg-brand/5 rounded-2xl">
                <p className="text-text">
                  Card without padding (content controls padding)
                </p>
              </div>
            </AppCard>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: PostCard */}
        {/* ============================================ */}
        <section>
          <h2 className="text-lg font-bold text-text mb-4 border-b border-border pb-2">
            3. PostCard
          </h2>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                user={post.user}
                postId={post.id}
                message={post.message}
                date={post.date}
                likes={post.likes}
                isLiked={post.isLiked}
                commentsList={post.commentsList}
                onLike={() => console.log(`Liked post ${post.id}`)}
                onComment={(text) => handleComment(post.id, text)}
                onDeleteComment={handleDeleteComment}
              />
            ))}
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 5: UserInfoCard */}
        {/* ============================================ */}
        <section>
          <h2 className="text-lg font-bold text-text mb-4 border-b border-border pb-2">
            4. UserInfoCard
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UserInfoCard
              user={userData}
              onFollow={() => console.log("Followed")}
              onUnfollow={() => console.log("Unfollowed")}
            />
            <UserInfoCard
              user={{
                ...userData,
                username: "a.mousavi8",
                name: "Ali Mousavi",
                followers: 892,
                following: 234,
                isFollow: true,
                location: "Shiraz, Iran",
                website: "https://alimousavi.dev",
                joinedDate: "September 2025",
                bio: "UI/UX Designer | Tailwind CSS expert",
              }}
              onFollow={() => console.log("Followed")}
              onUnfollow={() => console.log("Unfollowed")}
            />
          </div>
        </section>

        {/* ============================================ */}
        {/* SUMMARY */}
        {/* ============================================ */}
        <AppCard className="bg-brand/5 border-brand/20">
          <div className="space-y-2">
            <p className="font-bold text-text">All components are ready:</p>
            <ul className="text-text-secondary space-y-1 list-disc list-inside text-sm">
              <li>
                <strong>AppButton</strong> - Button with variants, sizes, icons,
                and full-width support
              </li>
              <li>
                <strong>AppCard</strong> - Container card with header, footer,
                hover, and padding options
              </li>
              <li>
                <strong>AppImage</strong> - Image component with letter
                placeholder (first letter of name)
              </li>
              <li>
                <strong>AppModal</strong> - Modal with animations, close on
                outside click &amp; ESC key
              </li>
              <li>
                <strong>PostCard</strong> - Post card with like, comments, and
                delete comment functionality
              </li>
              <li>
                <strong>UserInfoCard</strong> - User profile card with
                follow/unfollow functionality
              </li>
            </ul>
            <div className="flex flex-wrap gap-2 mt-2 text-xs text-text-secondary">
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                Responsive
              </span>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                Dark/Light Theme
              </span>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                TypeScript
              </span>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                JSDoc Documentation
              </span>
              <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                Delete Comment
              </span>
            </div>
          </div>
        </AppCard>
      </div>
    </div>
  );
}

export default App;
