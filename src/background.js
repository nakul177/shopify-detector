chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type !== "SHOPIFY_DETECTION") return;

  const tabId = sender.tab?.id;
  if (!tabId) return;

  chrome.action.setTitle({
    tabId,
    title: message.detected ? "Built with Shopify" : "Not a Shopify store",
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.status === "loading") {
    chrome.action.setTitle({ tabId, title: "Shopify Detector" });
  }
});