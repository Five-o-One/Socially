import type { HTMLAttributes } from "react";

export interface UserInfoNumberProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * برچسب کوتاهی که زیر مقدار عددی نمایش داده می‌شود؛ مانند «دنبال‌کننده‌ها» یا «پست‌ها».
   */
  label: string;
  /**
   * مقدار عددی آماری که از API یا state دریافت می‌شود.
   */
  value: number;
  /**
   * اگر فعال باشد، اعداد بزرگ با قالب فشرده و متناسب با locale نمایش داده می‌شوند؛
   * برای نمونه 1200 می‌تواند به شکل 1.2K نمایش داده شود.
   */
  compact?: boolean;
}

const containerClasses = "flex min-w-0 flex-col items-center justify-center";
const valueClasses = "text-base font-semibold leading-5 text-slate-950 dark:text-white";
const labelClasses = "mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400";

/**
 * یک آمار عددی مربوط به کاربر را نمایش می‌دهد.
 *
 * این کامپوننت برای مواردی مانند تعداد پست‌ها، دنبال‌کننده‌ها و دنبال‌شونده‌ها
 * طراحی شده است. مسئولیت آن فقط قالب‌بندی مقدار برای نمایش و رندر رابط کاربری است.
 * دریافت داده، درخواست API، mutation و مدیریت state باید در لایه بالاتر انجام شوند.
 *
 * @param props - تنظیمات و ویژگی‌های HTML مربوط به کامپوننت.
 * @param props.label - عنوانی که زیر مقدار عددی نمایش داده می‌شود.
 * @param props.value - مقدار عددی دریافتی از API یا state.
 * @param props.compact - مشخص می‌کند مقدار عددی به شکل فشرده نمایش داده شود یا نه.
 * @returns یک عنصر `div` شامل مقدار عددی و برچسب آن.
 *
 * @example
 * ```tsx
 * <UserInfoNumber label="دنبال‌کننده‌ها" value={1280} compact />
 * ```
 */
export default function UserInfoNumber({
  label,
  value,
  compact = false,
  className,
  ...props
}: UserInfoNumberProps) {
  // مقدار عددی را فقط برای نمایش قالب‌بندی می‌کنیم و مقدار اصلی را تغییر نمی‌دهیم.
  const formattedValue = compact
    ? Intl.NumberFormat(undefined, { notation: "compact", maximumFractionDigits: 1 }).format(value)
    : value.toLocaleString();

  // کلاس پیش‌فرض کامپوننت را با className اختیاری مصرف‌کننده ترکیب می‌کنیم.
  const containerClassName = [containerClasses, className].filter(Boolean).join(" ");

  return (
    <div {...props} className={containerClassName}>
      <span className={valueClasses}>{formattedValue}</span>
      <span className={labelClasses}>{label}</span>
    </div>
  );
}
