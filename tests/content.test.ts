import { describe, it, expect } from "vitest";
import { getFooterContent, footerContent } from "../src/lib/content"; // مسیر دقیق فایل content را کنترل کنید

describe("Issue #131 - Vancouver Archive Links Integration Tests", () => {
  it("should find the exact 'Vancouver - 2026' link inside the previousYears array (Dynamic Function)", () => {
    // ۱. دریافت داده‌های فوتر برای شهر پیش‌فرض از طریق تابع مربوطه
    const dynamicFooter = getFooterContent("vancouver");

    // ۲. جستجو در آرایه previousYears برای پیدا کردن آبجکت هدف
    const archiveInPreviousYears = dynamicFooter.previousYears.find(
      (link) => link.text === "Vancouver - 2026",
    );

    // ۳. تایید وجود المان و صحت آدرس هدایت (href)
    expect(archiveInPreviousYears).toBeDefined();
    expect(archiveInPreviousYears?.href).toBe("/archive/2026/index.html");
  });

  it("should find the exact 'Vancouver - 2026' link inside the footer links list (Static Export)", () => {
    // ۱. بررسی شیء صادر شده برای سازگاری با گذشته (footerContent)
    const linksList = footerContent.links;

    // ۲. جستجو در لیست کل لینک‌های فوتر (ستون ۳) برای یافتن متن اصلاح شده
    const archiveInLinksList = linksList.find(
      (link) => link.text === "Vancouver - 2026" && link.col === 3,
    );

    // ۳. تایید صحت پیاده‌سازی مشخصات لینک در گرید فوتر
    expect(archiveInLinksList).toBeDefined();
    expect(archiveInLinksList?.href).toBe("/archive/2026/index.html");
  });
});
