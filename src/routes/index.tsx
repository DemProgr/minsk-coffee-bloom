import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { ReservationForm } from "@/components/reservation-form";
import { ContactForm } from "@/components/contact-form";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paradise — Специальная кофейня на Октябрьской, Минск" },
      {
        name: "description",
        content:
          "Paradise — кофейня специального приготовления на Октябрьской 16/4 в Минске. Смотрите меню, часы работы и пишите нам, чтобы забронировать стол.",
      },
      { property: "og:title", content: "Paradise — Специальный кофе в Минске" },
      {
        property: "og:description",
        content:
          "Специальный кофе на Октябрьской 16/4, Минск. Меню, часы работы, адрес и бронирование.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const PHONE_DISPLAY = "+375 29 696-68-42";
const PHONE_HREF = "tel:+375296966842";
const INSTAGRAM = "https://www.instagram.com/paradise.minsk";
const MAPS = "https://2gis.by/minsk/firm/70000001054378929";

const menu = [
  {
    group: "Эспрессо",
    items: ["Эспрессо", "Кортадо", "Флэт уайт", "Капучино", "Латте"],
  },
  {
    group: "Фильтр и холодный",
    items: ["Пур-over", "Бэтч брю", "Колд-брю", "Чай"],
  },
  {
    group: "К едне",
    items: ["Круассан", "Булочка дня", "Тост", "Десерт"],
  },
];

const hours = [
  { day: "Пн – Пт", time: "11:00 – 21:00" },
  { day: "Суббота", time: "11:00 – 21:00" },
  { day: "Воскресенье", time: "11:00 – 21:00" },
];

function Index() {
  useEffect(() => {
    // Anchor click handler - smooth scroll to target
    const handleAnchorClick = (e: Event) => {
      const anchor = e.target as HTMLAnchorElement;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#") && href !== "#") {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          // Scroll smoothly to target
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    // Add anchor click listeners
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    // Cleanup
    return () => {
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  return (
    <div className="relative font-sans text-ink">
      <div className="pointer-events-none absolute -top-32 -left-24 size-[440px] rounded-full bg-ice/70 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 size-[520px] rounded-full bg-ice2/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-10%] left-1/4 size-[460px] rounded-full bg-ice3/30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-5 py-6 pb-4 sm:px-8 sm:pb-4">
        <nav className="glass grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-2xl px-5 py-3.5">
          <div className="truncate font-display text-lg font-semibold tracking-tight">Paradise</div>
          <div className="flex shrink-0 items-center gap-6 text-sm text-ink/70">
            <a
              href="#menu"
              className="relative hover:scale-105 transition-all duration-300 text-ink"
            >
              Меню
            </a>
            <a href="#about" className="hidden transition-colors hover:text-ink sm:inline">
              О нас
            </a>
            <a href="#visit" className="transition-colors hover:text-ink">
              Адрес
            </a>
            <a
              href="#reserve"
              className="rounded-full bg-ink px-4 py-1.5 font-medium text-frost shadow-lg shadow-ink/20"
            >
              Бронирование
            </a>
          </div>
        </nav>

        <header className="mt-10 sm:mt-16">
          <p className="mb-4 text-xs font-medium tracking-[0.25em] text-ink/50 uppercase">
            Специальный кофе · Минск
          </p>
          <h1 className="font-display text-5xl leading-[0.95] font-semibold tracking-tight text-balance sm:text-7xl">
            Блины-фетучини
            <br />
            авторские напитки
            <br />
            Октябрьская
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/70 text-pretty">
            Маленькая кофейня специального приготовления на Октябрьской 16/4 — эспрессо, фильтр и
            что-то тёплое на есть, в старом фабричном районе Минска.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#reserve"
              className="relative overflow-hidden rounded-full bg-ink px-6 py-3 text-sm font-medium text-frost shadow-xl shadow-ink/25 transition-all duration-300 hover:scale-105 hover:text-frost"
            >
              <span className="relative z-10">Забронировать стол</span>
              <span className="spec absolute inset-0" />
            </a>
            <a
              href="#menu"
              className="glass rounded-full px-6 py-3 text-sm font-medium text-ink transition-all duration-300 hover:scale-105"
            >
              Смотреть меню
            </a>
          </div>
        </header>

        <section id="menu" className="mt-14 scroll-mt-6 sm:mt-20">
          <div className="mb-6 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
            <h2 className="font-display text-3xl font-semibold tracking-tight">Меню</h2>
            <span className="shrink-0 text-xs text-ink/50">Цены у кассы</span>
          </div>

          <p className="glass mb-4 rounded-2xl px-5 py-3 text-xs leading-relaxed text-ink/70">
            Временное меню — эти категории здесь для оформления. Отправьте реальный список напитков
            и еды, и я его добавлю.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            {menu.map((section) => (
              <div key={section.group} className="glass rounded-3xl p-6">
                <p className="text-xs font-semibold tracking-wider text-ice3 uppercase">
                  {section.group}
                </p>
                <div className="mt-4 space-y-3 text-sm">
                  {section.items.map((item) => (
                    <div key={item} className="flex items-baseline justify-between gap-4">
                      <span className="text-ink/80">{item}</span>
                      <span className="shrink-0 font-display text-xs font-medium text-ink/35">
                        —
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="mt-14 grid scroll-mt-6 gap-4 sm:mt-20 sm:grid-cols-2 sm:items-stretch"
        >
          <div className="glass relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-3xl p-6">
            <span className="spec pointer-events-none absolute inset-0 opacity-60" />
            <p className="relative z-10 text-xs font-semibold tracking-wider text-ice3 uppercase">
              О нас
            </p>
            <p className="relative z-10 mt-6 font-display text-2xl leading-snug font-medium tracking-tight text-pretty">
              Небольшая стойка на Октябрьской, короткое меню и достаточно времени, чтобы выпить его
              сидя.
            </p>
          </div>
          <div className="flex items-center">
            <img
              src="/pic.jpg"
              alt="Кофейная стойка на Октябрьской"
              loading="lazy"
              className="size-full min-h-[260px] rounded-3xl object-cover outline-1 -outline-offset-1 outline-ink/5"
            />
          </div>
        </section>

        <section id="visit" className="mt-14 scroll-mt-6 sm:mt-20">
          <div className="glass grid gap-6 rounded-3xl p-6 sm:grid-cols-2 sm:p-8">
            <div>
              <p className="text-xs font-semibold tracking-wider text-ice3 uppercase">Найти нас</p>
              <address className="mt-3 font-display text-xl font-medium tracking-tight not-italic">
                Октябрьская 16/4
                <br />
                Минск, Беларусь
              </address>
              <a
                href={MAPS}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-sm text-ink/70 underline underline-offset-4 transition-colors hover:text-ink"
              >
                Открыть на карте
              </a>
              <p className="mt-4 text-sm">
                <a href={PHONE_HREF} className="text-ink/70 transition-colors hover:text-ink">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
            <div className="sm:border-l sm:border-line/60 sm:pl-8">
              <p className="text-xs font-semibold tracking-wider text-ice3 uppercase">
                Часы работы
              </p>
              <div className="mt-3 space-y-2 text-sm">
                {hours.map((h) => (
                  <div key={h.day} className="flex justify-between gap-4">
                    <span className="text-ink/70">{h.day}</span>
                    <span className="shrink-0 font-display font-medium">{h.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="reserve" className="mt-14 scroll-mt-6 sm:mt-20">
          <div className="glass relative overflow-hidden rounded-3xl p-7 text-center sm:p-12">
            <span className="spec pointer-events-none absolute inset-0 opacity-50" />
            <h2 className="relative z-10 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Сохраните своё место у окна.
            </h2>
            <p className="relative z-10 mx-auto mt-3 max-w-sm text-sm text-ink/70 text-pretty">
              Выберите день, время и количество людей — мы подтвердим по телефону.
            </p>
            <ReservationForm />
            <p className="relative z-10 mt-6 text-xs text-ink/50">
              Лучше поговорить?{" "}
              <a href={PHONE_HREF} className="underline underline-offset-4 hover:text-ink">
                Позвонить {PHONE_DISPLAY}
              </a>
            </p>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 p-3 sm:hidden">
        <a
          href="#reserve"
          className="relative block overflow-hidden rounded-full bg-ink px-5 py-3.5 text-center text-sm font-medium text-frost shadow-xl shadow-ink/25 transition-all duration-300 hover:scale-105"
        >
          <span className="relative z-10">Забронировать стол</span>
          <span className="spec absolute inset-0" />
        </a>
      </div>
    </div>
  );
}
