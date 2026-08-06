const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // certificate-contract-bindings is a local file: dependency living outside
  // this app's directory (in ../contract/certificate/bindings) — Turbopack
  // needs the monorepo root to resolve/trace it.
  outputFileTracingRoot: path.join(__dirname, ".."),
};

module.exports = nextConfig;
