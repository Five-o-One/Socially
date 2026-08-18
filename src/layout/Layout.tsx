import { Outlet, useLocation } from "react-router";
import { AppNavbar } from "@/components";
import { UserInfoCard } from "@/components/UserInfoCard";
import { AppCard } from "@/components/AppCard";
import { AppButton } from "@/components/AppButton";

export default function Layout() {
  const location = useLocation();
  const isAuth = true; // در فازهای بعدی به Zustand/AuthStore متصل می‌شود

  // داده‌های موقت کاربر جاری برای نمایش در سایدبار
  const currentUser = {
    name: "Seyed Ali Mousavi",
    username: "samb.1376",
    imageURL: "",
    followers: 0,
    following: 0,
    location: "No location",
    website: "No website",
  };

  const isNotificationsPage = location.pathname.startsWith("/notifications");

  return (
    <div className="min-h-screen bg-bg text-text">
      <AppNavbar isLoggedIn={isAuth} username={currentUser.username} />

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* ستون چپ: مشخصات کاربر یا باکس ورود */}
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
                    <AppButton variant="primary" fullWidth>
                      Log In
                    </AppButton>
                    <AppButton variant="secondary" fullWidth>
                      Sign Up
                    </AppButton>
                  </div>
                </AppCard>
              )}
            </div>
          </aside>

          {/* ستون میانی: محتوای اصلی هر صفحه */}
          <section
            className={`col-span-12 ${
              isNotificationsPage ? "lg:col-span-9" : "lg:col-span-6"
            }`}
          >
            <Outlet />
          </section>

          {/* ستون راست: پیشنهادات دنبال‌کردن (Who to Follow) */}
          {!isNotificationsPage && (
            <aside className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-22">
                <AppCard
                  header={
                    <h3 className="font-bold text-text">Who to Follow</h3>
                  }
                >
                  <div className="space-y-4">
                    {/* لیست آیتم‌های کاربر پیشنهادی */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="h-9 w-9 rounded-full bg-brand/20 flex items-center justify-center font-bold text-brand">
                          M
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-text">
                            @mohammadfallah.w
                          </p>
                          <p className="text-xs text-text-secondary">
                            1 followers
                          </p>
                        </div>
                      </div>
                      <AppButton variant="secondary" size="sm">
                        Follow
                      </AppButton>
                    </div>
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
