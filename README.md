# Cargo-style Editorial Artist Template

A framework-free, responsive HTML/CSS/JavaScript template based on the supplied screenshots.

## Files

- `index.html`: page content and accessible dialog/panel markup
- `styles.css`: full-screen hero, halftone texture, contact modal, sliding detail panel, mobile breakpoints
- `script.js`: open/close interactions, Escape key handling, focus trapping, dummy contact form behavior
- `assets/`: replaceable SVG placeholders

## Replace the hero image

1. Add your image to `assets/`, for example `hero.jpg`.
2. In `styles.css`, replace:

```css
background-image: url("assets/hero-placeholder.svg");
```

with:

```css
background-image: url("assets/hero.jpg");
```

## Replace detail images

In `index.html`, change the two `<img src="...">` paths inside `.detail-gallery`.

## Replace text

Edit the text directly in `index.html`. Useful sections:

- `.hero__identity`: site name, contact, Instagram
- `.hero__work`: featured work title and artist name
- `.hero__summary`: introduction and Read more link
- `.detail-content`: biography, captions, copyright

## Contact form

The form currently demonstrates interaction only and does not send email. Connect it to your preferred form service or backend by replacing the submit handler in `script.js`.

## Local preview

Run from the project folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.
