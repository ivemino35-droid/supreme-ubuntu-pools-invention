# Ubuntu Pools (Fresh Build)

Clean React + Vite + TypeScript preview build for Ubuntu Pools.

## Run locally (VS Code)
1. Install Node.js LTS
2. In the project folder:
   - npm install
   - npm run dev
3. Open the URL printed (usually http://localhost:5173)

## Routes (HashRouter)
- /#/            Dashboard
- /#/create      Create Pool
- /#/agreement/:id  Pool Constitution
- /#/pool/:id    Pool Operations (demo governance)
- /#/manifesto   Manifesto
- /#/trust-graph Ubuntu Score Trust Graph

## GitHub Pages deployment
1. Edit vite.config.ts:
   - Set base to '/REPO_NAME/' (example '/ubuntu-pools/')
2. Build:
   - npm run build
3. Push to GitHub.
4. GitHub Settings → Pages:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /dist
5. Site URL:
   - https://YOUR_USERNAME.github.io/REPO_NAME/

## Notes
- Non-custodial preview using localStorage.
- No backend required for preview.
