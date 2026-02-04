# Ubuntu Pools (Fresh Build)

Clean React + Vite + TypeScript preview build for Ubuntu Pools.

## Quick Start

### Development
1. Install Node.js LTS (v18 or later)
2. In the project folder:
   ```bash
   npm install
   npm run dev
   ```
3. Open the URL printed (usually http://localhost:5173)
4. The dev server will automatically reload when you make changes

### Build and Preview
Build the production-ready application:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

Or build and preview in one command:
```bash
npm run build:preview
```

The preview server will run on http://localhost:4173 and automatically open in your browser.

### Build Output
After running `npm run build`, the optimized production files are in the `dist/` folder:
- Code splitting for better caching
- Minified and optimized assets
- Sourcemaps for debugging
- Vendor chunks separated (react, router, charts)

## Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production with optimizations
- `npm run preview` - Preview production build locally
- `npm run build:preview` - Build and preview in one command
- `npm run build:analyze` - Build with analysis mode
- `npm run clean` - Remove build artifacts

## Routes (HashRouter)
- /#/            Dashboard
- /#/create      Create Pool
- /#/agreement/:id  Pool Constitution
- /#/pool/:id    Pool Operations (demo governance)
- /#/manifesto   Manifesto
- /#/trust-graph Ubuntu Score Trust Graph

## GitHub Pages Deployment
1. Edit vite.config.ts:
   - Set base to '/REPO_NAME/' (example '/ubuntu-pools/')
2. Build:
   ```bash
   npm run build
   ```
3. Push to GitHub.
4. GitHub Settings → Pages:
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /dist
5. Site URL:
   - https://YOUR_USERNAME.github.io/REPO_NAME/

Alternatively, the repository includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages on every push to the main branch.

## Build Optimizations
The build configuration includes:
- **Code Splitting**: Vendor libraries separated into chunks for better caching
  - React & ReactDOM in `react-vendor` chunk
  - React Router in `router-vendor` chunk
  - Recharts in `charts-vendor` chunk
- **Sourcemaps**: Generated for production debugging
- **Minification**: Automatic minification of JS and CSS
- **Tree Shaking**: Removes unused code
- **Asset Optimization**: Images and assets optimized

## Notes
- Non-custodial preview using localStorage.
- No backend required for preview.
- All data is stored in the browser's localStorage.
