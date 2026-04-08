async function run() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) return;

  try {
    const url = new URL(tab.url);
    document.getElementById("footer-url").textContent = url.hostname;
  } catch (e) {
    console.log(e);
  }

  let results;
  try {
    [results] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const r = {
          globalShopify:    typeof window.Shopify !== "undefined",
          cdnScripts: Array.from(document.querySelectorAll("script[src]"))
            .some(s => /cdn\.shopify\.com/i.test(s.src)),
          cdnLinks: Array.from(document.querySelectorAll("link[href]"))
            .some(l => /cdn\.shopify\.com/i.test(l.href)),
          cookie: document.cookie ? /_shopify_/i.test(document.cookie) : false,
        };
        r.detected = Object.values(r).some(Boolean);
        return r;
      },
    });
  } catch (err) {
    console.error("Shopify Detector popup error:", err);
    updateUI(null);
    return;
  }


  updateUI(results?.result ?? null);
}

function updateUI(data) {

  console.log("Data" , data)

  const card = document.getElementById("status-card");
  const dots = [
    document.getElementById("dot-0"),
    document.getElementById("dot-1"),
    document.getElementById("dot-2"),
    document.getElementById("dot-3"),
  ];

  if (!data) {
    card.className = "status-card loading";
    card.innerHTML = `
      <div class="status-text">
        <h2>Can't scan this page</h2>
        <p>Extension can't run on browser pages .</p>
      </div>
    `;
    return;
  }

  const signals = [
    data.globalShopify,
    data.cdnScripts,
    data.cdnLinks,
    data.cookie,
  ];

  signals.forEach((hit, i) => {
    if (hit) dots[i].classList.add("hit");
  });

  if (data.detected) {
    card.className = "status-card shopify";
    card.innerHTML = `
      <img class="status-emoji" src="../../icons/shopify.png" />
      <div class="status-text">
        <h2>Built with Shopify</h2>
        <p>A banner has been added to the page.</p>
      </div>
    `;
  } else {
    card.className = "status-card not-shopify";
    card.innerHTML = `
      <img class="status-emoji" src="../../icons/not-shopify.png"/>
      <div class="status-text">
        <h2>Not a Shopify store</h2>
        <p>No Shopify signals detected on this page.</p>
      </div>
    `;
  }
}

run();