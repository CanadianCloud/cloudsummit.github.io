import { describe, it, expect } from "vitest";
import { getFooterContent, newsletterContent } from "../lib/content";
import fs from "fs";
import path from "path";

const mockCity = "vancouver";
const footerContent = getFooterContent(mockCity);

describe("Newsletter Target Buttons Unit Tests (#138)", () => {
  // ۱. تست صحت ساختار داده‌ها (Content Data)
  it("should verify the content structure for Newsletter is correctly configured", () => {
    expect(newsletterContent).toBeDefined();
    expect(newsletterContent.ctaText).toBe("Subscribe to Newsletter"); // اصلاح شده بر اساس دیتای واقعی فایل شما
    expect(newsletterContent.ctaHref).toBe("https://tally.so/r/mR6RBl");
  });

  // ۲. تست وجود هاردکد target="_blank" درون کامپوننت کاملا به صورت خودکار
  it("should ensure the HTML link inside Newsletter.astro has target='_blank' and safe rel attributes", () => {
    // خواندن فایل کامپوننت از روی دیسک
    const componentPath = path.resolve(
      process.cwd(),
      "src/components/Newsletter.astro",
    );
    const componentContent = fs.readFileSync(componentPath, "utf8");

    // بررسی وجود دقیق اتربیوت‌ها روی تگ a در کامپوننت
    expect(componentContent).toContain('target="_blank"');
    expect(componentContent).toContain('rel="noopener noreferrer"');

    // بررسی دقیق‌تر ساختار خط تگ a
    const hasCorrectAnchorTag = componentContent.includes(
      '<a target="_blank" rel="noopener noreferrer" href={content.ctaHref} class="newsletter-button">',
    );
    expect(hasCorrectAnchorTag).toBe(true);
  });
});
