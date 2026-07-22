# The Danang Birth Collaborative - Website Concepts

Two client-ready static website concepts for The Danang Birth Collaborative in Da Nang, Vietnam.

## Live Demos

- [Demo 1 - clean editorial](https://nguyenvuong789.github.io/danang-birth-collaborative-demo/)
- [Demo 2 - soft maternal](https://nguyenvuong789.github.io/danang-birth-collaborative-demo/demo-2/)

Each concept includes a homepage, About page, Contact page, English/Vietnamese switching, service information, an information-request form, and a lead-gated Cross-Cultural Guide to Birth.

## Structure

- Demo 1 pages and styles live at the repository root.
- Demo 2 pages and styles live in `demo-2/`.
- Both concepts share `script.js` and `i18n.js`.
- The project is plain HTML, CSS, and JavaScript with no build step.

## Local Preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Then open `http://127.0.0.1:8765/` or `http://127.0.0.1:8765/demo-2/`.

## AI Handoff

Read `AGENTS.md` before making changes. It documents the client brief, content boundaries, file map, accessibility requirements, translation behavior, lead-capture flow, verification steps, and deployment process.
