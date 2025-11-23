## Purpose
This repository is a small React + Webpack app that renders image collections and a minimal Express server that serves static assets and generates placeholder JPEGs. The instructions below help an AI coding assistant quickly understand architecture, workflows, conventions, and where to make safe changes.

**High level**
- The app is a client-side React app built with Webpack; entry is `./index.js` and the built bundle is `dist/application.js` served by `server.js`.
- Server: `server.js` (Express) serves `index.html`, CSS, and generates jpgs on-the-fly using `jpeg-js` for placeholder images.
- Source: `src/` contains React components, utilities, and SCSS under `src/sass/`.
- Data/layout helpers: `sheets/` contains image collection data; `view-strategies/` contains rendering strategies.

**Key commands**
- Install: `npm install` (reads `package.json`).
- Lint: `npm run lint` (uses `.eslintrc.json`, includes `sheets/`).
- Tests: `npm test` (Mocha; tests live in `test/`, uses `enzyme` + `jsdom`).
- Build (dev): `npm run build` — runs lint/test then `webpack -d`.
- Build (prod): `npm run build:prod` — runs lint/test then `webpack -p`.
- Start example server: `node ./server.js` (listens on port 9320).

**Why these choices matter**
- Webpack bundles JS and SCSS; CSS is imported at runtime (see `src/App.jsx` where `require('./sass/app.scss')` runs in `componentDidMount`).
- Tests rely on Babel/register and enzyme; the repo now requires Node >= 24.0.0 and uses `npm` for package management.
	- Note: `node-sass` was replaced with `sass` (dart-sass) to avoid native bindings issues on newer Node versions.

**Project-specific patterns and gotchas**
- JSX files use `.jsx` extension (e.g., `src/App.jsx`, `src/components/TransitionableThumb.jsx`).
- The app constructs image lookup IDs via base64 in `src/App.jsx` (function `_toBase64`), so when changing item identifiers be mindful of decoding/encoding logic.
- Image and background URLs are normalized with `url-join` in `src/App.jsx`; use this when constructing paths to `sheets/*` images or `cacheUrl` usage.
- Lint command explicitly includes the `sheets/` directory — adding files there may trigger lint failures if they violate rules.
- Tests include an `scss-stub.js` helper; component tests under `test/components/` rely on the current enzyme/react version (React 16 adapter).

**Where to change core behaviors**
- Frontend rendering: edit `src/App.jsx` and files under `src/components/` and `view-strategies/`.
- Data: edit or add datasets in `sheets/`. Many modules in `sheets/` export collection data consumed by `index.js`.
- Build configuration: `webpack.config.js` controls bundling and loaders for SCSS/JSX.
- Server-side image generation: `server.js` contains the regex routes that generate placeholder `.jpg` images — modify there to change dynamic image behavior.

**Tests and CI notes for an AI agent**
- Run `npm test` locally to validate changes; tests are Mocha-based and run the `test/` tree recursively.
- Pretest runs the linter (`pretest` in `package.json`). Be ready to fix ESLint issues rather than bypass linting.

**Examples (quick references)**
- Entry point: `index.js` imports `./src/nouns-and-verbs.js` and is the starting point for Webpack.
- Bundle output seen by the server: `dist/application.js` (served by `server.js` route `/application.js`).
- Image path handling: `src/App.jsx` uses `urljoin(extras.cacheUrl, item.image.replace('./', ''))`.

If anything in this instruction set is unclear or you want more detail (e.g., call graph for `src/` modules, a list of `sheets/` files and their formats, or how tests bootstrap), tell me which area and I'll expand or adjust the file.
