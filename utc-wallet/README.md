# UTC Wallet
Run: `npm install` then `npm run dev` (http://localhost:5173).
Build: `npm run build` (output in `dist`).

## Deploy to GitHub Pages

The GitHub Actions workflow builds and deploys this app when changes are pushed to `main` or `master`. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**. The workflow configures the correct base path for a project site or a `username.github.io` site. Client-side routes are supported through the generated `404.html`.

Live prices use the free CoinGecko API (rate limited); for production use a keyed plan via a server-side proxy.
