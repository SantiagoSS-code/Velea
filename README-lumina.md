# LUMINA — Luxury Skincare Landing Page

A pixel-faithful replica of the Lumina luxury skincare landing page, built as a clean multi-file static site ready for GitHub Pages.

## 🗂 Project Structure

```
lumina/
├── index.html                  ← Main HTML (entry point)
├── README.md
└── assets/
    ├── css/
    │   └── style.css           ← All styles, animations, responsive rules
    ├── js/
    │   ├── constellation.js    ← Animated particle network (Community section)
    │   └── main.js             ← Pill alignment, scroll reveal, nav behaviour
    └── images/
        └── (drop real photos here — see "Adding Photos" below)
```

## 🚀 Deploy to GitHub Pages

1. **Fork or upload** this folder to a new GitHub repository.
2. Go to **Settings → Pages**.
3. Under *Source*, select `main` branch and `/ (root)`.
4. Click **Save** — your site will be live at:
   ```
   https://<your-username>.github.io/<repo-name>/
   ```

## 🖼 Adding Real Photos

The product and philosophy image placeholders are CSS gradients. To swap in real photos:

### Product grid (Hero / Products section)
Replace the `<div class="pg-img img-serum">` divs with:
```html
<img src="assets/images/serum.jpg" alt="Restorative Serum" class="pg-img" />
```

### Philosophy section images
Replace `<div class="phil-img phil-img-1">` divs with:
```html
<img src="assets/images/botanicals.jpg" alt="Active Botanicals" class="phil-img" />
```

### Recommended image sizes
| Slot | Recommended size |
|---|---|
| Product grid squares | 400 × 400 px |
| Product grid tall (3rd item) | 400 × 820 px |
| Philosophy thumbnails | 240 × 192 px |
| Avatar photos | 80 × 80 px |

## ✨ Features

- **Animated constellation network** — 55 particles with connecting lines (Community section background)
- **Marquee strip** — infinite CSS scroll animation
- **Frosted-glass review cards** — tilted with hover spring-back
- **Scroll reveal** — sections fade up as they enter the viewport
- **Best Seller pill** — JS-aligned to the hero badges row
- **Sticky bottom bar** — hides when footer is visible
- **Fully responsive** — tablet (≤1100px) and mobile (≤768px) breakpoints

## 🛠 Tech Stack

- Vanilla HTML5 / CSS3 / JavaScript (no frameworks, no build step)
- Google Fonts: DM Sans
- Avatar images: [pravatar.cc](https://pravatar.cc) (replace with real photos in production)

## 📄 License

MIT — free to use and modify.
