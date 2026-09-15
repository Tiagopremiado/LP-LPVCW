import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const PORT = 3000;
const PAGGPAY_API_URL = "https://api.paggpay.com/api/v1/pix";

function getPaggPayApiKey(): string {
  let key = process.env.PAGGPAY_API_KEY || "";
  key = key.trim().replace(/^["']|["']$/g, "");
  if (!key) {
    throw new Error(
      "A variável de ambiente PAGGPAY_API_KEY não foi configurada no servidor."
    );
  }
  return key;
}

async function startServer() {
  const app = express();

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // Create Pix Charge via PaggPay API
  app.post("/api/pix/create", async (req, res) => {
    try {
      const apiKey = getPaggPayApiKey();
      const { value, customerName, customerEmail } = req.body;

      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 192) {
        return res.status(400).json({
          error: "O valor mínimo para apoio via Pix é de R$ 1,92 (192 centavos).",
          minimum_value_minor: 192,
        });
      }

      const payload = {
        value: Math.round(numValue),
        customer: {
          name: (customerName && String(customerName).trim()) || "Apoiador LPVCW",
          email: (customerEmail && String(customerEmail).trim()) || "apoio@lpvcw.com",
        },
      };

      const response = await fetch(PAGGPAY_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data: any = await response.json().catch(() => null);

      if (!response.ok) {
        let errorMsg = "Erro ao gerar cobrança Pix na PaggPay";
        if (typeof data?.message === "string") {
          errorMsg = data.message;
        } else if (typeof data?.error === "string") {
          errorMsg = data.error;
        } else if (data?.error && typeof data.error === "object") {
          errorMsg = data.error.message || JSON.stringify(data.error);
        } else if (data?.message && typeof data.message === "object") {
          errorMsg = data.message.message || JSON.stringify(data.message);
        }

        return res.status(response.status).json({
          error: errorMsg,
          details: data,
        });
      }

      if (!data) {
        return res.status(502).json({
          error: "Resposta vazia da API PaggPay.",
        });
      }

      return res.json({
        success: true,
        pix: {
          qrcode: data.pix?.qrcode || null,
          base64_image: data.pix?.base64_image || null,
          code: data.pix?.code || null,
          expiration_date: data.pix?.expiration_date || null,
        },
        transaction: {
          id: data.transaction?.id || data.pix?.id || null,
          status: data.transaction?.status || data.pix?.status || "pending",
          currency: data.transaction?.currency_code || "BRL",
        },
        amount_in_cents: Math.round(numValue),
      });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Erro desconhecido ao processar pagamento";
      console.error("[PaggPay API Error]:", message);
      return res.status(500).json({
        error: message,
      });
    }
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
