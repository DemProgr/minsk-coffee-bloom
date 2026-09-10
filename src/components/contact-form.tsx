import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Назовите ваше имя").max(100),
  message: z.string().trim().min(1, "Напишите ваш вопрос").max(1000),
});

const fieldClass =
  "w-full rounded-2xl border border-line/60 bg-white/50 px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-ink/30 focus:bg-white/70";

export function ContactForm() {
  const [pending, setPending] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const parsed = schema.safeParse(Object.fromEntries(new FormData(form).entries()));
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Пожалуйста, проверьте форму");
      return;
    }
    setPending(true);
    const { error } = await supabase.from("contact_messages").insert(parsed.data);
    setPending(false);
    if (error) {
      toast.error("Мы не смогли отправить ваше сообщение. Попробуйте ещё раз.");
      return;
    }
    form.reset();
    toast.success("Сообщение отправлено — мы ответим вам.");
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 grid gap-3">
      <div className="grid gap-3">
        <label className="grid gap-1.5 text-xs font-medium text-ink/60">
          Имя
          <input
            name="name"
            required
            maxLength={100}
            placeholder="Ваше имя"
            className={fieldClass}
          />
        </label>
        <label className="grid gap-1.5 text-xs font-medium text-ink/60">
          Ваш вопрос
          <textarea
            name="message"
            required
            maxLength={1000}
            rows={4}
            placeholder="Задайте нам что-нибудь — групповые бронирования, зерно, аллергены…"
            className={`${fieldClass} resize-none`}
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={pending}
        className="mt-1 rounded-full bg-ink px-7 py-3.5 text-sm font-medium text-frost shadow-xl shadow-ink/25 transition-all duration-300 hover:scale-105 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/50"
      >
        {pending ? "Отправка…" : "Отправить сообщение"}
      </button>
    </form>
  );
}
