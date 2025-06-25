export default async function handler(req, res) {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // Reject all other non-POST methods
  if (req.method !== "POST") {
    console.log("❌ Method not allowed:", req.method);
    return res.status(405).send("Method not allowed");
  }

  const { id, name, username } = req.body;
  console.log("📥 Received user data:", { id, name, username });

  const url = `https://script.google.com/macros/s/AKfycbzXSQA-azJr6Zt1M4Y_7O-f8z7cWwu5ffCMJ0ErvEinHAPdeHEuw4OIwfR0DB7Q9UUTnQ/exec?id=${id}&name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}`;

  try {
    const response = await fetch(url);
    const result = await response.text();
    console.log("✅ Forwarded to Google Sheets:", result);
    return res.status(200).send("Forwarded to Google Sheets: " + result);
  } catch (err) {
    console.error("❌ Failed to forward:", err.message);
    return res.status(500).send("Error forwarding to Google Sheets");
  }
}
