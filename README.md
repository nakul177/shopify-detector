# Shopify Detector - Chrome Extension

Automatically detects if a website is built with Shopify and shows a banner on the page.

🔗 GitHub:https://github.com/nakul177/shopify-detector

---

## Install

1. Unzip the folder
2. Open Chrome → go to `chrome://extensions` or click on puzzle icon in toolbar and click manage extension in bottom
3. Turn on **Developer Mode** (top right corner)
4. Click **Load unpacked** → select the `shopify-detector` folder
5. Pin the extension from the puzzle icon in toolbar

---

## How to Use

- Visit any website — it runs automatically
- If the site is Shopify → a banner appears at the top of the page
- Click **✕** to dismiss the banner
- Hover the icon to see the result as a tooltip
- Click the icon to see detailed detection signals

---

## Test it on

- https://plumgoodness.com = Shopify
- https://www.westside.com = Shopify
- https://google.com = Not Shopify

---

## How Detection Works

`window.Shopify` is the main check but some stores hide or remove it. So we check 4 things — if any one matches, it is Shopify:

1. `window.Shopify` — main check
2. Script tags from `cdn.shopify.com` — Shopify always loads scripts from here
3. Link tags from `cdn.shopify.com` — Shopify always loads styles from here
4. `_shopify_` cookies — Shopify sets these on every store

---

## If Not Working

1. Go to `chrome://extensions`
2. Click **Remove** on Shopify Detector
3. Reinstall using the steps above

---

## References

- Chrome Extension basics → https://www.youtube.com/watch?v=2dQJYDAAU4I&t=412s
