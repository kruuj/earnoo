import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the cinematic portfolio loader", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Erkinbekov Arnoo/);
  assert.match(html, /Erkinbekov Arnoo/);
  assert.match(html, /Collection/);
  assert.match(html, /Selected Work/);
  assert.match(html, /Loading portfolio|aria-busy="true"/);
});

test("keeps heavy media and animation work off the critical path", async () => {
  const [portfolio, hlsVideo] = await Promise.all([
    readFile(new URL("app/Portfolio.tsx", templateRoot), "utf8"),
    readFile(new URL("app/components/HlsVideo.tsx", templateRoot), "utf8"),
  ]);

  assert.match(portfolio, /LoadingScreen/);
  assert.match(portfolio, /isLoading/);
  assert.match(portfolio, /import\("gsap"\)/);
  assert.match(portfolio, /import\("gsap\/ScrollTrigger"\)/);
  assert.match(portfolio, /heroVideoReady/);
  assert.match(portfolio, /preload="metadata"/);
  assert.doesNotMatch(portfolio, /preload="auto"/);
  assert.match(portfolio, /\/images\/finca\.webp/);
  assert.match(portfolio, /\/images\/topfootball\.webp/);

  assert.match(hlsVideo, /import\("hls\.js"\)/);
  assert.match(hlsVideo, /capLevelToPlayerSize: true/);
  assert.doesNotMatch(hlsVideo, /^import Hls/m);
  assert.doesNotMatch(hlsVideo, /preload="auto"/);
});
