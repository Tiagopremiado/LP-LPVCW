const PAGGPAY_API_URL = "https://api.paggpay.com/api/v1/pix";

function getPaggPayApiKey(): string {
  let key = process.env.PAGGPAY_API_KEY || "";
  key = key.trim().replace(/^["']|["']$/g, "");
  if (!key) {
    throw new Error(
      "A variável de ambiente PAGGPAY_API_KEY não foi encontrada na Vercel. Configure-a em Settings > Environment Variables no painel da Vercel e faça um novo Redeploy."
    );
  }
  return key;
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Método não permitido. Utilize POST.",
    });
  }

  try {
    const apiKey = getPaggPayApiKey();

    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // Keep body as is
      }
    }

    const { value, customerName, customerEmail } = body || {};

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
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "application/json",
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

    return res.status(200).json({
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
    let message = "Erro desconhecido ao processar pagamento.";
    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "string") {
      message = err;
    } else if (err && typeof err === "object") {
      message = (err as any).message || JSON.stringify(err);
    }

    console.error("[PaggPay Vercel Handler Error]:", message);
    return res.status(500).json({
      error: message,
    });
  }
}
