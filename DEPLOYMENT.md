# GitHub Pages Deployment

1. Extract the ZIP package.
2. Copy the contents of the `egahqusayf.github.io` folder into your local repository.
3. Open PowerShell in the repository folder.
4. Run:

```powershell
git status
git add .
git commit -m "Add Botnet Traffic Detection and portfolio V3"
git push origin main
```

GitHub Pages should use the `main` branch and the repository root.

The website must be opened through GitHub Pages or a local web server because `data/content.json` is loaded with `fetch()`.

For local preview:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000`.
