export default async function handler(req, res) {
  // 🌐 CORS preflight support
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // ❌ Reject other methods
  if (req.method !== "POST") {
    console.log("❌ Method not allowed:", req.method);
    return res.status(405).send("Method not allowed");
  }

  // 🧾 Parse user data
  const { id, name, username } = req.body;
  console.log("📥 Received user data:", { id, name, username });

  // 🔗 Google Apps Script Web App URL (expects POST now)
  const scriptUrl = "https://script.google.com/macros/s/AKfycby0syKZRacWu6L0ex1ObAgwTcsjAz3AjApBtUATKG3TOEBCgV5nXQg6VmKciDHaY7pi8g/exec";

  try {
    const response = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name, username })
    });

    const result = await response.text();
    console.log("✅ Forwarded to Google Sheets:", result);
    return res.status(200).send("✅ Forwarded to Google Sheets: " + result);
  } catch (err) {
    console.error("❌ Error forwarding to Google Sheets:", err.message);
    return res.status(500).send("Failed to log user");
  }
}
