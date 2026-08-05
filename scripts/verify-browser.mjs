// Four-city browser smoke tests against a running app.
// Usage: node scripts/verify-browser.mjs [origin]
import { chromium } from "playwright-core";

const origin = process.argv[2] ?? "http://localhost:3000";
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "desktop", width: 1280, height: 800 },
];
const cityStops = { bristol: 8, macon: 9, atlanta: 9, nashville: 9 };
let failures = 0;

const check = (ok, label, detail = "") => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${detail ? ` — ${detail}` : ""}`);
  if (!ok) failures++;
};

const browser = await chromium.launch();

for (const viewport of viewports) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });

  await open(page, `${origin}/`);
  for (const [count, occurrences] of [[11, 1], [9, 2], [13, 1]]) {
    check(
      await page.getByText(`${count} pins`, { exact: true }).count() === occurrences,
      `${viewport.name}: overview shows ${occurrences} ${count}-pin ${occurrences === 1 ? "city" : "cities"}`
    );
  }

  for (const [city, stopCount] of Object.entries(cityStops)) {
    errors.length = 0;
    await open(page, `${origin}/${city}`);
    check(
      await page.getByText("Walk the trail", { exact: true }).count() === 1,
      `${viewport.name}: ${city} opens with its trail`
    );
    await page.getByText("Walk the trail", { exact: true }).click();
    check(
      await page.getByText(`Stop 1 of ${stopCount}`, { exact: true }).count() > 0,
      `${viewport.name}: ${city} trail starts`
    );

    await page.getByLabel("Next stop").click();
    await page.getByLabel("Previous stop").click();
    check(
      await page.getByText(`Stop 1 of ${stopCount}`, { exact: true }).count() > 0,
      `${viewport.name}: ${city} trail reverses`
    );
    for (let index = 1; index < stopCount; index++) {
      await page.getByLabel("Next stop").click();
    }
    check(
      await page.getByText(`Stop ${stopCount} of ${stopCount}`, { exact: true }).count() > 0 &&
        (await page.getByLabel("Next stop").isDisabled()),
      `${viewport.name}: ${city} trail reaches final stop`
    );
    check(errors.length === 0, `${viewport.name}: ${city} has no console errors`, errors[0]);
  }

  errors.length = 0;
  await open(page, `${origin}/nashville?pin=ryman-auditorium`);
  const ryman = page.locator("aside");
  check(await ryman.locator("img").count() === 1, `${viewport.name}: story image renders`);
  check(await ryman.locator("figcaption").count() === 1, `${viewport.name}: image attribution renders`);
  check(await ryman.locator("iframe[title^='Spotify']").count() === 1, `${viewport.name}: Spotify embed renders`);
  check(await ryman.getByText(/What.s there now/, { exact: true }).count() === 1, `${viewport.name}: current-state text renders`);
  check(await ryman.getByText("Active venue", { exact: true }).count() === 1, `${viewport.name}: active venue status renders`);
  check(await ryman.getByText("Official site", { exact: true }).count() === 1, `${viewport.name}: official link renders`);
  check(await ryman.getByText("Shows & tickets", { exact: true }).count() === 1, `${viewport.name}: ticket link renders`);
  check(await ryman.getByText("Past setlists", { exact: true }).count() === 1, `${viewport.name}: setlist link renders`);

  await open(page, `${origin}/nashville?pin=club-baron`);
  const closed = page.locator("aside");
  check(await closed.getByText("Closed venue", { exact: true }).count() === 1, `${viewport.name}: closed venue status renders`);
  check(await closed.getByText("Shows & tickets", { exact: true }).count() === 0, `${viewport.name}: closed venue hides tickets`);

  await open(page, `${origin}/atlanta?pin=ameris-bank-amphitheatre`);
  check(
    await page.locator("aside").getByText("Seasonal venue", { exact: true }).count() === 1,
    `${viewport.name}: amphitheatre uses seasonal venue label`
  );
  await open(page, `${origin}/bristol?pin=rhythm-and-roots`);
  check(
    await page.locator("aside").getByText("Seasonal festival", { exact: true }).count() === 1,
    `${viewport.name}: festival uses seasonal festival label`
  );

  await open(page, `${origin}/bristol?pin=bristol-sessions-site`);
  const thread = page.locator("aside button").filter({ hasText: "Nassau" }).first();
  await thread.click();
  await page.getByRole("button", { name: "Go to pin" }).click();
  await page.waitForURL(/\/atlanta\?pin=152-nassau-street/);
  check(
    page.url().includes("/atlanta?pin=152-nassau-street"),
    `${viewport.name}: inter-city thread navigation preserves deep link`
  );
  check(errors.length === 0, `${viewport.name}: story-card flows have no console errors`, errors[0]);

  await context.close();
}

await browser.close();
console.log(failures === 0 ? "\nALL BROWSER CHECKS PASSED" : `\n${failures} BROWSER CHECKS FAILED`);
process.exit(failures === 0 ? 0 : 1);

async function open(page, url) {
  await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(750);
}
