# 20 Days to You

A tiny birthday countdown site. Built for GitHub Pages — no build step, just HTML/CSS/JS.

## How to host it on github.io

1. Create a new GitHub repo, e.g. `bday-countdown`.
2. Add these files to the repo root: `index.html`, `style.css`, `script.js`, and an `images/` folder.
3. Push to GitHub.
4. In the repo, go to **Settings → Pages**, set Source to your main branch, root folder.
5. Your site will be live at `https://<your-username>.github.io/bday-countdown/` in a minute or two.

## Customize it

- **Birthday date**: open `script.js`, edit `BIRTHDAY_DATE` and `BIRTHDAY_DISPLAY` at the top.
- **Photos**: drop your images into the `images/` folder named `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, `photo4.jpg` (any image format works, just update the filename in `index.html` to match). Until you add real photos, each spot shows a soft placeholder so nothing looks broken.
- **Daily notes**: the `NOTES` array in `script.js` has one little message per day of the countdown (day 20 down to day 0). Edit any of them to make it more "you two."
- **Colors/fonts**: all in `style.css` under the `:root` section at the top if you want to tweak the palette.

That's it — sweet, simple, and ready to go. 🎂
