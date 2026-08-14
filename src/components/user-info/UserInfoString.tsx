import React from "react";
import type { HTMLAttributes } from "react";

export interface UserInfoStringProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /**
   * برچسب کوتاهی که زیر مقدار متنی نمایش داده می‌شود.
   */
  label: string;
  /**
   * مقدار متنی دریافت‌شده از API یا state برنامه.
   */
  value: string;
  /**
   * متنی که در صورت خالی بودن مقدار اصلی نمایش داده می‌شود؛ مقدار پیش‌فرض «—» است.
   */
  fallback?: string;
}

const containerClasses = "flex min-w-0 flex-col items-center justify-center";
const valueClasses =
  "max-w-full truncate text-base font-semibold leading-5 text-slate-950 dark:text-white";
const labelClasses = "mt-1 text-sm leading-5 text-slate-500 dark:text-slate-400";

/**
 * یک بخش کوتاه از اطلاعات متنی کاربر را نمایش می‌دهد.
 *
 * برای مواردی مانند موقعیت مکانی، نقش، نام کاربری یا سایر اطلاعات متادیتای
 * پروفایل استفاده می‌شود. این کامپوننت مقدار خالی را به شکل کنترل‌شده مدیریت
 * می‌کند، اما مسئول دریافت یا تغییر داده نیست.
 *
 * @param props - تنظیمات و ویژگی‌های HTML مربوط به کامپوننت.
 * @param props.label - عنوانی که زیر مقدار متنی نمایش داده می‌شود.
 * @param props.value - مقدار متنی دریافتی از API یا state.
 * @param props.fallback - مقدار جایگزین در صورت خالی بودن `value`.
 * @returns یک عنصر `div` شامل مقدار متنی و برچسب آن.
 *
 * @example
 * ```tsx
 * <UserInfoString label="موقعیت" value="Reading, UK" />
 * ```
 *
 * @example
 * ```tsx
 * <UserInfoString label="وب‌سایت" value="" fallback="ثبت نشده" />
 * ```
 */
export function UserInfoString({
  label,
  value,
  fallback = "—",
  className,
  ...props
}: UserInfoStringProps) {
  // فاصله‌های ابتدا و انتهای مقدار حذف می‌شوند تا رشته‌ای که فقط شامل فاصله است نیز خالی در نظر گرفته شود.
  const displayValue = value.trim() || fallback;

  // کلاس پیش‌فرض کامپوننت را با className اختیاری مصرف‌کننده ترکیب می‌کنیم.
  const containerClassName = [containerClasses, className].filter(Boolean).join(" ");

  return (
    <div {...props} className={containerClassName}>
      <span title={displayValue} className={valueClasses}>
        {displayValue}
      </span>
      <span className={labelClasses}>{label}</span>
    </div>
  );
}
