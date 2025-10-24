import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 🔑 SUA CHAVE DO OPENROUTER AQUI
const OPENROUTER_KEY = "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";

app.post("/proxy", async (req, res) => {
  try {
    const response = await fetch("https://api.openrouter.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENROUTER_KEY}`
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Erro no proxy:", error);
    res.status(500).json({ error: "Proxy falhou (Render)" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🌐 Proxy rodando na porta ${PORT}`));
