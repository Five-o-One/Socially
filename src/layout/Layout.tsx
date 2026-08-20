import { Outlet, useLocation, Link } from "react-router";
import {
  AppNavbar,
  UserInfoCard,
  AppCard,
  AppButton,
  UserRow,
} from "@/components";

export default function Layout() {
  const location = useLocation();
  const isAuth = true; // برای تست حالت Sign-out روی false قرار دهید

  const currentUser = {
    name: "Seyed Ali Mousavi",
    username: "samb.1376",
    imageURL: "",
    followers: 0,
    following: 0,
    location: "No location",
    website: "No website",
  };

  const recommendedUsers = [
    { username: "mohammadfallah.w", name: "Mohammad Fallah", followers: 1 },
    { username: "f.e.h.farshad", name: "Farshad Hosseini", followers: 1 },
  ];

  const isNotificationsPage = location.pathname.startsWith("/notifications");

  return (
    <div className="min-h-screen bg-bg text-text">
      <AppNavbar isLoggedIn={isAuth} username={currentUser.username} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-22">
              {isAuth ? (
                <UserInfoCard user={currentUser} />
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
                    {recommendedUsers.map((user) => (
                      <UserRow
                        key={user.username}
                        username={user.username}
                        name={user.name}
                        followers={user.followers}
                      />
                    ))}
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
