import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ArrowRight, Check, Copy, Loader2, AlertCircle, RefreshCw, QrCode } from 'lucide-react';

interface SupportSectionProps {
  customBg?: string | null;
}

interface PixData {
  qrcode: string | null;
  base64_image: string | null;
  code: string | null;
  expiration_date?: string | null;
  transaction_id?: string | null;
  amount_formatted: string;
}

export const SupportSection: React.FC<SupportSectionProps> = ({ customBg }) => {
  const [amount, setAmount] = useState<string>('15,00');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pixData, setPixData] = useState<PixData | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const getAmountInCents = (valStr: string): number => {
    const clean = valStr.replace(/[^0-9]/g, '');
    return parseInt(clean, 10) || 0;
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (!val) {
      setAmount('0,00');
      return;
    }
    const num = (parseInt(val, 10) / 100).toFixed(2);
    setAmount(num.replace('.', ','));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const cents = getAmountInCents(amount);
    if (cents < 192) {
      setError('O valor mínimo para pagamento via Pix é de R$ 1,92.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/pix/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          value: cents,
          customerName: 'Apoiador LPVCW',
        }),
      });

      const responseText = await res.text();
      let data: any = null;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(
          `Resposta inválida do servidor (${res.status}). Verifique a chave PAGGPAY_API_KEY na Vercel e faça um novo Redeploy.`
        );
      }

      if (!res.ok || !data?.success) {
        let extractedMsg = '';
        if (typeof data?.error === 'string') {
          extractedMsg = data.error;
        } else if (data?.error && typeof data.error === 'object') {
          extractedMsg = data.error.message || data.error.code || JSON.stringify(data.error);
        } else if (typeof data?.message === 'string') {
          extractedMsg = data.message;
        } else if (data?.message && typeof data.message === 'object') {
          extractedMsg = data.message.message || JSON.stringify(data.message);
        } else if (data?.details && typeof data.details === 'object') {
          extractedMsg = data.details.message || JSON.stringify(data.details);
        }

        if (!extractedMsg || extractedMsg === '[object Object]') {
          extractedMsg = `Erro ${res.status}: Não foi possível gerar a cobrança Pix. Verifique a variável PAGGPAY_API_KEY na Vercel.`;
        }

        throw new Error(extractedMsg);
      }

      setPixData({
        qrcode: data.pix?.qrcode || null,
        base64_image: data.pix?.base64_image || null,
        code: data.pix?.code || null,
        expiration_date: data.pix?.expiration_date || null,
        transaction_id: data.transaction?.id || null,
        amount_formatted: `R$ ${amount}`,
      });
    } catch (err: unknown) {
      let msg = 'Falha na comunicação com a PaggPay.';
      if (err instanceof Error) {
        msg = err.message;
      } else if (typeof err === 'string') {
        msg = err;
      } else if (err && typeof err === 'object') {
        msg = (err as any).message || (err as any).error || JSON.stringify(err);
      }

      if (!msg || msg === '[object Object]') {
        msg = 'Erro ao processar cobrança. Verifique a chave PAGGPAY_API_KEY na Vercel e faça um novo Redeploy.';
      }

      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyPix = () => {
    if (pixData?.code) {
      navigator.clipboard.writeText(pixData.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleResetPix = () => {
    setPixData(null);
    setError(null);
  };

  const bgUrl = customBg || '/assets/section2bg.png';

  return (
    <section
      id="section2-apoio"
      className="relative w-full min-h-[90svh] lg:min-h-screen bg-black text-white flex items-center justify-center overflow-hidden px-6 sm:px-10 md:px-16 lg:px-24 py-20 lg:py-28 z-20"
    >
      {/* Background with /assets/section2bg.png as requested */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 opacity-90"
          style={{ backgroundImage: `url("${bgUrl}")` }}
        />

        {/* Top edge gradient to blend seamlessly with Hero fold */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none" />

        {/* Subtle cold ambient ground highlight */}
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-full max-w-7xl h-48 pointer-events-none opacity-40 mix-blend-screen"
          style={{
            background: 'radial-gradient(ellipse at 50% 100%, rgba(200, 230, 255, 0.25) 0%, rgba(100, 160, 240, 0.08) 45%, transparent 75%)',
          }}
        />

        {/* Bottom edge fade */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />
      </div>

      {/* Main Content: 2-Column Layout strictly matching section2ref */}
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Copy & Primary CTA */}
        <div className="lg:col-span-6 space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.08] text-white"
          >
            O LPVCW é gratuito.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-100 to-neutral-400">
              Doe qualquer valor.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-neutral-400 text-base sm:text-lg max-w-md font-normal leading-relaxed"
          >
            Se esse workflow te ajudou, você pode apoiar o projeto com qualquer valor e fortalecer sua evolução.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2"
          >
            <button
              onClick={() => {
                const card = document.getElementById('card-doacao-input');
                card?.focus();
              }}
              className="inline-flex items-center gap-2.5 px-7 py-3 text-sm font-semibold rounded-full bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.3)] hover:shadow-[0_0_36px_rgba(255,255,255,0.55)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              <span>Apoiar o projeto</span>
              <ArrowRight className="w-4 h-4 stroke-[2.2]" />
            </button>
          </motion.div>
        </div>

        {/* Right Column: Support Card matching section2ref with PaggPay integration */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[420px] rounded-2xl p-8 sm:p-9 bg-[#090b10]/85 backdrop-blur-xl border border-white/15 shadow-[0_12px_48px_rgba(0,0,0,0.8),0_0_24px_rgba(255,255,255,0.03)]"
          >
            {/* Top rim specular highlight */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {pixData ? (
                /* Pix QR Code Display View (from real PaggPay API) */
                <motion.div
                  key="pix-result"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5 text-center"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-neutral-400">
                      <QrCode className="w-4 h-4 text-white" />
                      <span>Pagamento via Pix</span>
                    </div>
                    <span className="font-mono text-sm font-semibold text-white bg-white/10 px-2.5 py-1 rounded-md border border-white/10">
                      {pixData.amount_formatted}
                    </span>
                  </div>

                  {/* QR Code container */}
                  {pixData.qrcode || pixData.base64_image ? (
                    <div className="p-4 bg-white rounded-xl mx-auto w-fit shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                      <img
                        src={pixData.qrcode || `data:image/svg+xml;base64,${pixData.base64_image}`}
                        alt="QR Code Pix"
                        className="w-48 h-48 sm:w-52 sm:h-52 object-contain select-none"
                      />
                    </div>
                  ) : (
                    <div className="p-8 bg-neutral-900 rounded-xl border border-white/10 text-neutral-400 text-xs">
                      QR Code gerado com sucesso
                    </div>
                  )}

                  <p className="text-xs text-neutral-400">
                    Abra o app do seu banco e escaneie o QR Code ou copie o código abaixo.
                  </p>

                  {/* Copy Pix Code Button */}
                  {pixData.code && (
                    <button
                      type="button"
                      onClick={handleCopyPix}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 stroke-[2.5]" />
                          <span>Código Pix Copiado!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 stroke-[2]" />
                          <span>Copiar Código Pix</span>
                        </>
                      )}
                    </button>
                  )}

                  {/* Return / Change Amount */}
                  <button
                    type="button"
                    onClick={handleResetPix}
                    className="w-full flex items-center justify-center gap-1.5 text-xs text-neutral-400 hover:text-white py-1 transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Escolher outro valor</span>
                  </button>
                </motion.div>
              ) : (
                /* Initial Donation Form */
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Header inside card: Heart Icon */}
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-neutral-200 shadow-[0_0_16px_rgba(255,255,255,0.06)]">
                      <Heart className="w-6 h-6 stroke-[1.5] text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-[22px] font-semibold text-white tracking-tight">
                        Valor livre
                      </h3>
                      <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                        Contribua com o valor que fizer sentido para você.
                      </p>
                    </div>
                  </div>

                  {/* Amount Input */}
                  <div className="space-y-2">
                    <div className="relative flex items-center rounded-xl bg-black/60 border border-white/15 px-4 py-3.5 focus-within:border-white/40 focus-within:shadow-[0_0_16px_rgba(255,255,255,0.1)] transition-all">
                      <span className="text-neutral-500 font-mono text-sm mr-3 select-none">
                        R$
                      </span>
                      <input
                        id="card-doacao-input"
                        type="text"
                        value={amount}
                        onChange={handleAmountChange}
                        placeholder="0,00"
                        disabled={loading}
                        className="w-full bg-transparent text-white font-mono text-lg focus:outline-none placeholder:text-neutral-600 disabled:opacity-50"
                      />
                    </div>

                    {error && (
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 pt-1">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-apoiar-agora"
                    disabled={loading}
                    className="w-full relative flex items-center justify-center gap-2 py-3 px-6 rounded-full bg-white text-black font-semibold text-sm shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:shadow-[0_0_36px_rgba(255,255,255,0.5)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin stroke-[2.2]" />
                        <span>Gerando Pix na PaggPay...</span>
                      </>
                    ) : (
                      <>
                        <span>Apoiar agora</span>
                        <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                      </>
                    )}
                  </button>

                  {/* Disclaimer */}
                  <p className="text-center text-neutral-500 text-xs">
                    Sem assinatura. Apoio voluntário via Pix instantâneo.
                  </p>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};


