import puppeteer from "puppeteer";

export const getVideos = async (url) => {
  if (!url) {
    console.log("URL is required");
    return [];
  }

  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
  });

  console.log("[INFO] Launching browser");
  // const browser = await puppeteer.launch();

  console.log("[INFO] Creating new page");
  const page = await browser.newPage();

  console.log(`[INFO] Visiting url: ${url}`);
  await page.goto(url);

  console.log("[INFO] Waiting for content load");
  await page.waitForSelector("video");

  const videoSrcs = await page.evaluate(() => {
    console.log("[INFO] Fetching videos from parsed HTML");
    const videoElements = document.querySelectorAll("video");
    const srcs = [];
    for (let i = 0; i < videoElements.length; i++) {
      srcs.push(videoElements[i].src);
    }
    return srcs;
  });

  await browser.close();

  return videoSrcs;
};
