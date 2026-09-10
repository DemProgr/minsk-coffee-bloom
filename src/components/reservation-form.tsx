import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Назовите ваше имя").max(100),
  phone: z.string().trim().min(5, "Добавьте номер телефона").max(40),
  party_size: z.coerce.number().int().min(1).max(20),
  reserved_date: z.string().min(1, "Выберите дату"),
  reserved_time: z.string().min(1, "Выберите время"),
  note: z.string().trim().max(500).optional(),
});

const fieldClass =
  "w-full rounded-2xl border border-line/60 bg-white/50 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-ink/30 focus:bg-white/70";

const today = () => new Date().toISOString().slice(0, 10);

export function ReservationForm() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Пожалуйста, проверьте форму");
      return;
    }
    setPending(true);
    const { error } = await supabase.from("reservations").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      party_size: parsed.data.party_size,
      reserved_date: parsed.data.reserved_date,
      reserved_time: parsed.data.reserved_time,
      note: parsed.data.note || null,
    });
    setPending(false);
    if (error) {
      toast.error("Мы не смогли сохранить ваше бронирование. Попробуйте ещё раз.");
      return;
    }
    // Отправка в Telegram
    await sendTelegramBooking(parsed.data);
    form.reset();
    setDone(true);
    toast.success("Стол забронирован — мы подтвердим по телефону.");
  }

  if (done) {
    return (
      <div className="relative z-10 mx-auto mt-8 max-w-md rounded-3xl border border-line/60 bg-white/50 p-8 text-center">
        <p className="font-display text-xl font-medium tracking-tight">Спасибо.</p>
        <p className="mt-2 text-sm text-ink/70">
          Ваш запрос на бронирование принят — мы перезвоним для подтверждения.
        </p>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-5 text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
        >
          Забронировать другой стол
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative z-10 mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-2"
    >
      <label className="grid gap-1.5 text-xs font-medium text-ink/60">
        Имя
        <input name="name" required maxLength={100} placeholder="Ваше имя" className={fieldClass} />
      </label>
      <label className="grid gap-1.5 text-xs font-medium text-ink/60">
        Телефон
        <input
          name="phone"
          required
          maxLength={40}
          inputMode="tel"
          placeholder="+375 …"
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1.5 text-xs font-medium text-ink/60">
        Дата
        <input name="reserved_date" type="date" required min={today()} className={fieldClass} />
      </label>
      <label className="grid gap-1.5 text-xs font-medium text-ink/60">
        Время
        <input
          name="reserved_time"
          type="time"
          required
          defaultValue="12:00"
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1.5 text-xs font-medium text-ink/60">
        Гости
        <input
          name="party_size"
          type="number"
          min={1}
          max={20}
          defaultValue={2}
          required
          className={fieldClass}
        />
      </label>
      <label className="grid gap-1.5 text-xs font-medium text-ink/60">
        Что-нибудь ещё
        <input name="note" maxLength={500} placeholder="Необязательно" className={fieldClass} />
      </label>
      <button
        type="submit"
        disabled={pending}
        className="mt-2 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-frost shadow-xl shadow-ink/25 transition-all duration-300 hover:scale-105 hover:text-frost focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50 sm:col-span-2"
      >
        {pending ? "Отправка…" : "Забронировать стол"}
      </button>
    </form>
  );
}

async function sendTelegramBooking(data: {
  name: string;
  phone: string;
  party_size: number;
  reserved_date: string;
  reserved_time: string;
  note?: string | null;
}) {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.warn("Telegram bot token or chat ID not configured");
    return;
  }

  const message = `
🆕 Новое бронирование в Paradise:

👤 Имя: ${data.name}
📞 Телефон: ${data.phone}
👥 Гостей: ${data.party_size}
📅 Дата: ${data.reserved_date}
⏰ Время: ${data.reserved_time}
${data.note ? `💬 Примечание: ${data.note}` : ""}

Подтвердить звонком: +375 29 696-68-42
`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
      }),
    });
  } catch (error) {
    console.error("Ошибка отправки в Telegram:", error);
  }
}
