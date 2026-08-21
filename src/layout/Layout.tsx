import { Outlet, useLocation, Link, useNavigate } from "react-router";
import {
  AppNavbar,
  UserInfoCard,
  AppCard,
  AppButton,
  UserRow,
} from "@/components";
import {
  useCurrentUser,
  useRecommendedUsers,
  useToggleFollow,
  useUserProfile,
} from "@/hooks";
import { useLogout } from "@/hooks/useLogout";

export default function Layout() {
  const location = useLocation();

  const { data: currentUser, isLoading, isAuthenticated } = useCurrentUser();
  const currentUsername =
    currentUser?.username ??
    currentUser?.name.toLowerCase().replace(/\s+/g, "") ??
    "";

  const { data: sidebarUser } = useUserProfile(currentUsername);

  const {
    data: recommendedUsers = [],
    isLoading: isRecommendedLoading,
    isError: isRecommendedError,
  } = useRecommendedUsers();

  const toggleFollow = useToggleFollow();

  const isAuth = isAuthenticated;

  const isNotificationsPage = location.pathname.startsWith("/notifications");

  const navigate = useNavigate();

  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg text-text flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      <AppNavbar
        isLoggedIn={isAuth}
        username={
          currentUser?.username ??
          currentUser?.name.toLowerCase().replace(/\s+/g, "") ??
          ""
        }
        onLogout={handleLogout}
      />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-22">
              {isAuth && currentUser ? (
                <UserInfoCard
                  user={{
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
                        Log In
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
            </div>
          </aside>

          <section className="col-span-12 lg:col-span-6">
            <Outlet />
          </section>

          {isAuth && !isNotificationsPage && (
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-22">
                <AppCard
                  header={
                    <h3 className="font-bold text-text">Who to Follow</h3>
                  }
                >
                  <div className="space-y-4">
                    {isRecommendedLoading ? (
                      <p className="text-sm text-text-secondary">
                        Loading suggestions...
                      </p>
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
                          username={user.username ?? user.email.split("@")[0]}
                          name={user.name}
                          avatarSrc={user.image}
                          followers={user.count?.followers ?? 0}
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
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
