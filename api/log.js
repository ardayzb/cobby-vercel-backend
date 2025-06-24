export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { id, name, username } = req.body;
  const url = `https://script.google.com/macros/s/AKfycbzXSQA-azJr6Zt1M4Y_7O-f8z7cWwu5ffCMJ0ErvEinHAPdeHEuw4OIwfR0DB7Q9UUTnQ/exec?id=${id}&name=${encodeURIComponent(name)}&username=${encodeURIComponent(username)}`;

  try {
    const response = await fetch(url);
    const result = await response.text();
    return res.status(200).send("Forwarded to Google Sheets: " + result);
  } catch (err) {
    console.error("Failed to forward:", err.message);
    return res.status(500).send("Error forwarding to Google Sheets");
  }
}
