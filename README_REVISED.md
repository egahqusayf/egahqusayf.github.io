# Egah Qusay Fatanasyah — Robotics & AI Portfolio

A static portfolio website designed for GitHub Pages. The site presents selected AI, robotics, software, and data projects as visual case studies.

## Main features

- Full personal title: **Egah Qusay Fatanasyah**
- Three leadership and competition highlights
- One-row project carousel with visible left/right controls
- Automatic project rotation every 6 seconds
- Compact journey carousel with automatic image transitions every 6 seconds
- Light and dark mode with saved preference
- Project category filters
- Keyboard navigation for project carousel
- Quick navigation / command palette using `Ctrl + K`, `Cmd + K`, or `/`
- Responsive design for desktop, tablet, and mobile
- Scroll progress, scrollspy navigation, reveal animations, copy-email action, and back-to-top control
- Case-study pages that link to GitHub repositories, not PDF files
- Open Graph metadata, web app manifest, and `.nojekyll` for GitHub Pages compatibility

## Local preview

Because the project content is loaded from `data/content.json`, preview it through a local server instead of opening `index.html` directly.

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Copy all files in this folder into the root of the `egahqusayf.github.io` repository.
2. Commit and push the files to the `main` branch.
3. Open the repository settings and select **Pages**.
4. Use the `main` branch and the repository root as the publishing source.
5. After deployment finishes, open `https://egahqusayf.github.io`.

## Editing content

Most homepage content is stored in:

```text
data/content.json
```

Images are stored in:

```text
assets/img/
```

Project case studies are stored in:

```text
projects/
```

## Local AI Document Intelligence

The featured Local AI project uses the grounded-answer interface as its main visual. Its case study contains the project description, architecture, indexing workflow, retrieval modes, answer engine, testing, limitations, roadmap, and GitHub repository link. No project button opens a PDF.
