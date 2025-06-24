import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const message = req.body.message;
  if (!message || !message.text) return res.status(200).end();

  const chatId = message.chat.id;
  const text = message.text;

  if (text === "/start") {
    const welcomeText = `Hi, I'm Cobby the Squirrel 🐿️\n\nI love money and I chase it all the time! 💰\n\nI will find and send the best casino offers to you directly.\n\nTap the button below to launch the app and review them yourself.`;

    const payload = {
      chat_id: chatId,
      text: welcomeText,
      reply_markup: {
        inline_keyboard: [[
          {
            text: "Launch App",
            web_app: {
              url: "https://ardayzb.github.io/project-cobby"
            }
          }
        ]]
      }
    };

    try {
      await fetch("https://api.telegram.org/bot7615314767:AAEZfMeuMaL1juW9CjJRZXEOQlylxPlJcAM/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      console.error("Error sending Telegram message:", err.message);
    }
  }

  res.status(200).end();
}
