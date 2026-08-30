/** @file Shared layout containing navigation, sidebars, and routed content. */
import { Outlet, useLocation, Link, useNavigate } from "react-router";
import {
  AppNavbar,
  UserInfoCard,
  AppCard,
  AppButton,
  UserRow,
  AppSpinner,
  ScrollToTop,
} from "@/components";
import {
  useCurrentUser,
  useRecommendedUsers,
  useToggleFollow,
  useUserById,
} from "@/hooks";
import { useLogout } from "@/hooks/useLogout";

/**
 * @component Layout
 * @description Shared application shell containing navigation, sidebars, and routed page content.
 */
export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: currentUser, isAuthenticated } = useCurrentUser();

  const currentUsername =
    currentUser?.username ??
    currentUser?.name.toLowerCase().replace(/\s+/g, "") ??
    "";

  const { data: sidebarUser } = useUserById(currentUser?.id ?? "");

  const {
    data: recommendedUsers = [],
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
  } = useRecommendedUsers(isAuthenticated);

  const toggleFollow = useToggleFollow();
  const logout = useLogout();

  const isAuth = isAuthenticated;
  const isNotificationsPage = location.pathname.startsWith("/notifications");

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  return (
    <div className="min-h-screen bg-bg text-text">
      <AppNavbar
        isLoggedIn={isAuth}
        userId={currentUser?.id}
        onLogout={handleLogout}
      />

      {/* Space reserved for the fixed navbar */}
      <main className="mx-auto max-w-7xl px-4 pt-20 pb-6 sm:px-6 lg:px-8">
        <div className="grid items-start grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Sidebar */}
          <aside className="hidden self-start lg:sticky lg:top-20 lg:col-span-3 lg:block">
            {isAuth && currentUser ? (
              <UserInfoCard
                user={{
                  id: sidebarUser?.id ?? currentUser.id,
                  imageURL: sidebarUser?.image ?? currentUser.image,
                  username: sidebarUser?.username ?? currentUsername,
                  name: sidebarUser?.name ?? currentUser.name,
                  followers:
                    sidebarUser?._count?.followers ??
                    sidebarUser?.count?.followers ??
                    0,
                  following:
                    sidebarUser?._count?.followings ??
                    sidebarUser?._count?.following ??
                    sidebarUser?.count?.followings ??
                    sidebarUser?.count?.following ??
                    0,
                  location: sidebarUser?.location ?? currentUser.location,
                  website: sidebarUser?.website ?? currentUser.website,
                }}
              />
            ) : (
              <AppCard className="text-center">
                <h3 className="text-lg font-bold text-text">Welcome Back!</h3>

                <p className="mt-2 text-sm text-text-secondary">
                  Login to access your profile and connect with others.
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <Link to="/login">
                    <AppButton variant="primary" fullWidth>
                      Sign In
                    </AppButton>
                  </Link>

                  <Link to="/register">
                    <AppButton variant="secondary" fullWidth>
                      Sign Up
                    </AppButton>
                  </Link>
                </div>
              </AppCard>
            )}
          </aside>

          {/* Main Content */}
          <section
            className={`min-w-0 col-span-12 ${
              isNotificationsPage ? "lg:col-span-9" : "lg:col-span-6"
            }`}
          >
            <Outlet />
          </section>

          {/* Right Sidebar */}
          {isAuth && !isNotificationsPage && (
            <aside className="hidden self-start lg:sticky lg:top-20 lg:col-span-3 lg:block">
              <AppCard
                header={<h3 className="font-bold text-text">Who to Follow</h3>}
              >
                <div className="space-y-4">
                  {isRecommendedLoading ? (
                    <div className="flex justify-center py-4">
                      <AppSpinner size={24} />
                    </div>
                  ) : isRecommendedError ? (
                    <p className="text-sm text-danger">
                      Failed to load suggestions.
                    </p>
                  ) : recommendedUsers.length === 0 ? (
                    <p className="text-sm text-text-secondary">
                      No recommendations available.
                    </p>
                  ) : (
                    recommendedUsers.map((user) => (
                      <UserRow
                        key={user.id}
                        id={user.id}
                        username={user.username ?? user.email.split("@")[0]}
                        name={user.name}
                        avatarSrc={user.image}
                        followers={
                          user.count?.followers ?? user._count?.followers ?? 0
                        }
                        isFollowing={user.isFollowing ?? false}
                        onToggleFollow={() => toggleFollow.mutate(user.id)}
                        isFollowLoading={
                          toggleFollow.isPending &&
                          toggleFollow.variables === user.id
                        }
                      />
                    ))
                  )}
                </div>
              </AppCard>
            </aside>
          )}
        </div>
      </main>
      <ScrollToTop />
    </div>
  );
}
