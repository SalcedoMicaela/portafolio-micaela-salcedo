"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "djejlmpnv";
const cldUrl = (publicId: string, w = 800) => {
  const cloud = publicId.startsWith("samples/")
    ? "demo"
    : CLOUDINARY_CLOUD_NAME;
  return `https://res.cloudinary.com/${cloud}/image/upload/c_fill,w_${w},q_auto,f_auto/${publicId}`;
};

const IMAGES = {
  hero: "fotoperfil",
  votaciones: "votaciones",
  fefast: "samples/balloons",
  codeducks: "favoritahacathon",
  ctf: "especoncurso",
  entrega: "mensajeria",
  ecommerce: "ecomercerabbit",
};

const projects = [
  {
    title: "EntregaExpress_P2 — Sistema Logística Distribuido",
    description:
      "Plataforma empresarial de microservicios con Spring Boot (Java 21): API Gateway (8080), Auth, Billing, Fleet y Pedido Service. PostgreSQL por servicio, JWT, GraphQL, Redis Cache, RabbitMQ y deploy en Kubernetes. Factory + Strategy + Gateway Pattern. Aplicando principios SOLID y propiedades ACID en transacciones distribuidas.",
    image: IMAGES.entrega,
    tags: [
      "Java 21",
      "Spring Boot 4",
      "Microservicios",
      "RabbitMQ",
      "GraphQL",
      "Kubernetes",
      "Docker",
      "PostgreSQL",
      "SOLID",
      "ACID",
    ],
    links: { github: "https://github.com/AxelHerrera4/EntregaExpress_P2" },
    highlight: true,
    badge: "Microservicios • 4 colaboradores",
  },
  {
    title: "Microservicios E-commerce — RabbitMQ",
    description:
      "Arquitectura event-driven: Order Service (8080) ↔ Inventory Service (8081) con RabbitMQ (Topic Exchanges). Flujo OrderCreated → StockReserved/Rejected → CONFIRMED/CANCELLED. PostgreSQL independientes, Spring Boot 3.5, Swagger, Docker Compose. Diseño con principios SOLID y consistencia ACID por servicio.",
    image: IMAGES.ecommerce,
    tags: [
      "Java 99%",
      "RabbitMQ",
      "Spring AMQP",
      "PostgreSQL",
      "Docker",
      "Event-Driven",
      "SOLID",
      "ACID",
    ],
    links: {
      github:
        "https://github.com/JairoBonilla2004/microservices-ecommerce-rabbitmq",
    },
    highlight: true,
    badge: "Event-Driven",
  },
  {
    title: "Sistema de Votaciones — Conecta Impacto",
    description:
      "Plataforma web para gestionar votaciones universitarias: registro de participantes, validación y votación en tiempo real. Desplegado en Vercel.",
    image: IMAGES.votaciones,
    tags: ["Next.js", "React", "Vercel"],
    links: {
      demo: "https://votaciones-ten.vercel.app/",
      github: "https://github.com/SalcedoMicaela",
    },
    badge: "En producción",
  },
  {
    title: "CodeDucks — Hackathon ConectaImpacto 2025",
    description:
      "Finalistas TOP 5 entre 25 equipos (4-5 oct, ConQuito). Prototipo para gestión de información y validación de indicadores en organizaciones sociales.",
    image: IMAGES.codeducks,
    tags: ["Prototipado", "Innovación Social"],
    links: { github: "https://github.com/AxelHerrera4/Hackaton" },
    badge: "Finalista TOP 5",
  },
  {
    title: "Capture The Flag — Club de Software ESPE",
    description:
      "Finalista en competencia de ciberseguridad del Club de Software. Retos de seguridad, análisis y resolución.",
    image: IMAGES.ctf,
    tags: ["Ciberseguridad", "CTF"],
    links: {
      instagram: "https://www.instagram.com/p/C5CU2G5uvID/?img_index=1",
    },
    badge: "Finalista",
  },
];

const skills = {
  lenguajes: [
    "C",
    "C++",
    "Java",
    "PHP",
    "JavaScript",
    "Python",
    "SQL",
    "NoSQL",
  ],
  tecnologias: [
    "React",
    "Node.js",
    "Docker",
    "Selenium",
    "Postman",
    "JMeter",
    "Oracle",
    "PostgreSQL",
    "Jira",
    "Cassandra",
    "Android Studio",
    "GitHub",
  ],
  devops: [
    "CI/CD",
    "DevOps",
    "DevSecOps",
    "SOLID",
    "ACID",
    "GitHub Actions",
    "GitLab CI",
    "Pipelines",
    "Docker",
    "Kubernetes",
    "RabbitMQ",
    "GraphQL",
  ],
};

// Iconos SVG (sin emojis)
const Icon = {
  Lightbulb: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-7 7c0 2.1 1 4 2.6 5.2L9 16h6l1.4-1.8A7 7 0 0 0 12 2Z" />
    </svg>
  ),
  Users: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Book: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  ),
  Mail: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  ),
  Phone: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12 1.36.4 2.69.83 3.97a2 2 0 0 1-.57 2.11l-1.34 1.34a16 16 0 0 0 6 6l1.34-1.34a2 2 0 0 1 2.11-.57c1.28.43 2.61.71 3.97.83A2 2 0 0 1 22 16.92Z" />
    </svg>
  ),
  MapPin: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  ),
  Graduation: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  Briefcase: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2H10a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  Zap: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  ),
  Rocket: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M5 13c1-4 4-7 8-8l7 7c-1 4-4 7-8 8Z" />
      <path d="M15 7l2 2" />
      <path d="M9 16l-3 3" />
    </svg>
  ),
  Sun: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  Moon: (p: any) => (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      {...p}
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
    </svg>
  ),
};

export default function Home() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [year, setYear] = useState<number | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);
  const [expIndex, setExpIndex] = useState(0);
  const [fefastOpen, setFefastOpen] = useState(false);
  const [iessOpen, setIessOpen] = useState(false);
  const [projLightbox, setProjLightbox] = useState<string | null>(null);
  const softSkills = [
    { title: "Creatividad", desc: "Propongo soluciones originales que rompen esquemas y generan valor real e impacto.", Icon: Icon.Lightbulb },
    { title: "Liderazgo", desc: "Inspiro y guío equipos con empatía, motivando hacia objetivos comunes con energía.", Icon: Icon.Users },
    { title: "Trabajo en equipo", desc: "Colaboro, escucho y construyo ambientes donde cada persona brilla y suma.", Icon: Icon.Users },
    { title: "Aprendizaje continuo", desc: "Nunca paro de aprender. Cada reto es una oportunidad para crecer y mejorar.", Icon: Icon.Book },
    { title: "Resolución de problemas", desc: "Analizo, descompongo y resuelvo con lógica, creatividad y foco en resultados.", Icon: Icon.Lightbulb },
  ];
  const [skillIndex, setSkillIndex] = useState(0);
  const quotes = [
    "El código es creatividad con lógica.",
    "Transformo ideas en sistemas que escalan.",
    "Código limpio, impacto real.",
    "Aprender, construir, mejorar — siempre.",
    "Donde hay un problema, hay una solución por crear.",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  useEffect(() => setYear(new Date().getFullYear()), []);
  useEffect(() => {
    const id = setInterval(() => setSkillIndex((i) => (i + 1) % 5), 3000);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    const id = setInterval(() => setQuoteIndex((i) => (i + 1) % 5), 2600);
    return () => clearInterval(id);
  }, []);
  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem("theme") as "light" | "dark" | null;
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      const initial = saved || (prefersDark ? "dark" : "light");
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    } catch {}
    document
      .querySelectorAll("[bis_skin_checked]")
      .forEach((el) => el.removeAttribute("bis_skin_checked"));
    document
      .querySelectorAll("[bis_register]")
      .forEach((el) => el.removeAttribute("bis_register"));
    const body = document.body;
    if (body.hasAttribute("bis_register")) body.removeAttribute("bis_register");
    if (body.hasAttribute("__processed_b799d6a6-15a6-4e93-b25a-4b1b27923fc9__"))
      body.removeAttribute(
        "__processed_b799d6a6-15a6-4e93-b25a-4b1b27923fc9__",
      );
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("theme", next);
      } catch {}
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  };

  return (
    <main
      suppressHydrationWarning
      className="min-h-screen bg-[#FCFCFD] text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100"
    >
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-zinc-100 bg-white/80 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 font-mono text-sm font-bold text-white">
              MS
            </span>
            <span className="font-semibold tracking-tight">
              Micaela Salcedo
            </span>
          </a>
          <div className="hidden items-center gap-6 md:flex">
            <a
              href="#sobre-mi"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Sobre mí
            </a>
            <a
              href="#habilidades"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Habilidades
            </a>
            <a
              href="#proyectos"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Proyectos
            </a>
            <a
              href="#experiencia"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              Experiencia
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle dark mode"
              suppressHydrationWarning
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:hover:bg-zinc-700"
            >
              <span
                suppressHydrationWarning
                className="flex items-center gap-1.5"
              >
                {mounted ? (
                  theme === "dark" ? (
                    <>
                      <Icon.Sun className="h-4 w-4" /> Claro
                    </>
                  ) : (
                    <>
                      <Icon.Moon className="h-4 w-4" /> Oscuro
                    </>
                  )
                ) : (
                  <>
                    <Icon.Moon className="h-4 w-4" /> Oscuro
                  </>
                )}
              </span>
            </button>
            <a
              href="#contacto"
              className="rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-black dark:bg-white dark:text-zinc-900"
            >
              Contactar
            </a>
          </div>
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              suppressHydrationWarning
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 dark:border-zinc-700"
            >
              <span suppressHydrationWarning>
                {mounted ? (
                  theme === "dark" ? (
                    <Icon.Sun className="h-5 w-5" />
                  ) : (
                    <Icon.Moon className="h-5 w-5" />
                  )
                ) : (
                  <Icon.Moon className="h-5 w-5" />
                )}
              </span>
            </button>
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="rounded-xl border border-zinc-200 p-2 dark:border-zinc-700"
              aria-label="Menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d={
                    mobileMenu
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div className="border-t border-zinc-100 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-zinc-900 md:hidden">
            <div className="flex flex-col gap-4">
              <a
                href="#sobre-mi"
                onClick={() => setMobileMenu(false)}
                className="font-medium"
              >
                Sobre mí
              </a>
              <a
                href="#habilidades"
                onClick={() => setMobileMenu(false)}
                className="font-medium"
              >
                Habilidades
              </a>
              <a
                href="#proyectos"
                onClick={() => setMobileMenu(false)}
                className="font-medium"
              >
                Proyectos
              </a>
              <a
                href="#experiencia"
                onClick={() => setMobileMenu(false)}
                className="font-medium"
              >
                Experiencia
              </a>
              <a
                href="#contacto"
                className="rounded-full bg-zinc-900 px-5 py-3 text-center font-semibold text-white dark:bg-white dark:text-zinc-900"
              >
                Contactar
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-50 via-white to-white dark:from-violet-950/20 dark:via-zinc-950 dark:to-zinc-950" />
        <div className="absolute -top-32 -right-32 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-violet-200 to-fuchsia-200 opacity-30 blur-3xl dark:opacity-10" />
        <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-amber-100 to-pink-200 opacity-30 blur-3xl dark:opacity-10" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-8 sm:grid-cols-2 sm:gap-6 md:gap-10 md:py-20 lg:gap-16">
          <div className="flex flex-col justify-center order-1">
            <h1 className="text-4xl font-black tracking-tight md:text-5xl lg:text-[52px] lg:leading-[0.95] animate-fade-in">
              Hola, soy <span className="gradient-text">Micaela</span> <span className="inline-block animate-float">✨</span>
              <br />
              <span className="font-extrabold">Stefania Salcedo</span>
            </h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 dark:border-violet-800 dark:bg-violet-950/30 dark:text-violet-300">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Full Stack Developer <span className="opacity-60">•</span> Quito, Ecuador
            </p>
            <p className="mt-4 text-lg font-medium text-zinc-700 dark:text-zinc-300">
              Estudiante de{" "}
              <span className="font-bold text-violet-700 dark:text-violet-400">
                Ingeniería de Software
              </span>{" "}
              — ESPE
              <br />
              <span className="text-zinc-600 dark:text-zinc-400">
                Apasionada por backend y frontend • Microservicios y APIs REST
              </span>
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Creativa y responsable, con liderazgo y pasión por aprender.
              Construyo soluciones prácticas e innovadoras — desde plataformas
              sociales hasta sistemas distribuidos con colas, GraphQL y
              Kubernetes. En constante aprendizaje y evolución tecnológica.
            </p>
            <p key={quoteIndex} className="mt-3 animate-fade-in border-l-2 border-violet-300 pl-3 text-sm italic text-zinc-500 dark:text-zinc-400">“{quotes[quoteIndex]}”</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#proyectos"
                className="rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-500/20"
              >
                Ver proyectos →
              </a>
              <a
                href="https://github.com/SalcedoMicaela"
                target="_blank"
                className="rounded-full border border-zinc-200 bg-white px-8 py-3.5 text-sm font-semibold hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900"
              >
                GitHub
              </a>
              <a
                href="/HojaDeVida.pdf"
                download="CV-Micaela-Salcedo.pdf"
                className="rounded-full border border-zinc-900 bg-white px-6 py-3.5 text-sm font-semibold dark:border-white dark:bg-zinc-900 dark:text-white"
              >
                Descargar CV ↓
              </a>
            </div>

          </div>
          <div className="relative flex items-center justify-center md:justify-end order-2 animate-float">
            <div className="relative">
              <div className="absolute -inset-4 -z-10 animate-pulse rounded-[2.5rem] bg-gradient-to-br from-violet-600 via-fuchsia-500 to-amber-400 opacity-20 blur-2xl" />
              <div className="relative overflow-hidden rounded-[2rem] border-4 border-white bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-900">
                <Image
                  src={cldUrl(IMAGES.hero, 500)}
                  alt="Micaela Salcedo"
                  width={400}
                  height={480}
                  className="h-[240px] w-[190px] object-cover sm:h-[280px] sm:w-[220px] md:h-[360px] md:w-[300px]"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORMACIÓN ACADÉMICA — debajo del Hero, mismo formato que Trayectoria */}
      <section id="sobre-mi" className="bg-white py-8 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl">
            <p className="flex items-center gap-2 text-sm font-bold tracking-widest text-violet-600 dark:text-violet-400">
              <Icon.Graduation className="h-4 w-4" /> FORMACIÓN ACADÉMICA
            </p>
            <h2 className="mt-2 text-2xl font-black">Estudios</h2>
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <p className="font-black">Ingeniería de Software</p>
              <p className="text-sm font-bold text-violet-700 dark:text-violet-400">
                Universidad de las Fuerzas Armadas — ESPE
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Dpto. Ciencias de la Computación
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE MÍ */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-8 md:grid-cols-5">
          <div className="md:col-span-3">
            <p className="text-sm font-bold tracking-widest text-violet-600 dark:text-violet-400">
              SOBRE MÍ
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Soluciones prácticas,
              <br />
              <span className="text-zinc-400">impacto real</span>
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              Creativa con fuerte inclinación por buscar soluciones innovadoras
              ante los retos. Me gusta aprender constantemente y adquirir nuevas
              habilidades técnicas y personales. Responsable, con buenas
              relaciones interpersonales y capacidad de liderazgo fomentando el
              trabajo en equipo.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                Español nativo
              </span>
              <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                Inglés intermedio
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300">
                <Icon.Phone className="h-3 w-3" /> 0962846565
              </span>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="relative overflow-hidden rounded-2xl border border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400">HABILIDADES BLANDAS</p>
                <div className="flex items-center gap-1">
                  <button onClick={() => setSkillIndex((i) => (i === 0 ? 4 : i - 1))} aria-label="Anterior" className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs dark:border-zinc-700 dark:bg-zinc-800">‹</button>
                  <button onClick={() => setSkillIndex((i) => (i + 1) % 5)} aria-label="Siguiente" className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-xs dark:border-zinc-700 dark:bg-zinc-800">›</button>
                </div>
              </div>
              <div className="mt-4 flex min-h-[110px] items-start gap-4">
                {(() => { const c = softSkills[skillIndex]; return (<><c.Icon className="h-8 w-8 shrink-0 text-violet-600 dark:text-violet-400" /><div><p className="font-black">{c.title}</p><p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{c.desc}</p></div></>); })()}
              </div>
              <div className="mt-4 flex justify-center gap-1.5">
                {softSkills.map((_, i) => (
                  <button key={i} onClick={() => setSkillIndex(i)} aria-label={`Go ${i}`} className={`h-1.5 rounded-full transition-all ${i === skillIndex ? "w-6 bg-violet-600" : "w-1.5 bg-zinc-300 dark:bg-zinc-700"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HABILIDADES */}
      <section
        id="habilidades"
        className="bg-zinc-900 py-14 text-white dark:bg-black"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-bold tracking-widest text-violet-300">
                STACK TÉCNICO
              </p>
              <h2 className="mt-2 text-3xl font-black">Habilidades Técnicas</h2>
              <p className="mt-2 text-sm text-zinc-400">
                Lo que uso para construir productos que funcionan
              </p>
            </div>
            <a
              href="https://github.com/SalcedoMicaela"
              target="_blank"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-bold text-zinc-900"
            >
              Ver código en GitHub →
            </a>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
              <h3 className="font-bold text-violet-200">Lenguajes</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.lenguajes.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-zinc-900"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur">
              <h3 className="font-bold text-fuchsia-200">Tecnologías</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.tecnologias.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 px-3 py-1.5 text-sm font-semibold text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-6 backdrop-blur">
              <h3 className="font-bold text-emerald-200">Prácticas Modernas</h3>
              <p className="mt-1 text-xs text-emerald-200/70">
                Implementando en proyectos recientes
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {skills.devops.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-emerald-400/30 bg-emerald-500 px-3 py-1.5 text-xs font-bold text-white"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-400">
                Entrega de código más rápida y de calidad con pipelines en
                GitHub & GitLab.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* PROYECTOS */}
      <section id="proyectos" className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <p className="text-sm font-bold tracking-widest text-violet-600 dark:text-violet-400">
            PORTAFOLIO
          </p>
          <h2 className="mt-2 text-4xl font-black tracking-tight">
            Proyectos destacados
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            De plataformas sociales a sistemas distribuidos con colas, GraphQL y
            Kubernetes.
          </p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className={`group relative overflow-hidden rounded-[1.7rem] border bg-white shadow-sm card-hover dark:border-zinc-800 dark:bg-zinc-900 ${p.highlight ? "border-violet-200 ring-1 ring-violet-100 dark:border-violet-800" : "border-zinc-100"}`}
            >
              {p.highlight && (
                <div className="absolute left-4 top-4 z-10 rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 px-3 py-1 text-xs font-bold text-white">
                  Destacado
                </div>
              )}
              <div className="absolute right-4 top-4 z-10 rounded-full bg-white px-3 py-1 text-xs font-bold shadow dark:bg-zinc-800 dark:text-white">
                {p.badge}
              </div>
              <button
                onClick={() => setProjLightbox(p.image)}
                className="group/img relative flex h-56 w-full items-center justify-center overflow-hidden bg-zinc-50 p-2 dark:bg-zinc-800"
              >
                <Image
                  src={`https://res.cloudinary.com/${p.image.startsWith("samples/") ? "demo" : CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto,w_900/${p.image}`}
                  alt={p.title}
                  width={900}
                  height={600}
                  className="h-full w-full object-contain transition duration-300 group-hover/img:scale-[1.03]"
                  unoptimized
                />
                <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-[10px] font-bold text-white opacity-0 transition group-hover/img:opacity-100">
                  Click para ampliar
                </span>
              </button>
              <div className="p-6">
                <h3 className="text-lg font-black leading-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-zinc-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.links.demo && (
                    <a
                      href={p.links.demo}
                      target="_blank"
                      className="rounded-full bg-violet-600 px-4 py-2 text-xs font-bold text-white hover:bg-violet-700"
                    >
                      Ver demo ↗
                    </a>
                  )}
                  {p.links.github && (
                    <a
                      href={p.links.github}
                      target="_blank"
                      className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-bold hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800"
                    >
                      GitHub
                    </a>
                  )}
                  {p.links.instagram && (
                    <a
                      href={p.links.instagram}
                      target="_blank"
                      className="rounded-full border border-zinc-200 px-4 py-2 text-xs font-bold hover:bg-zinc-50 dark:border-zinc-700"
                    >
                      Instagram
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TRAYECTORIA — ahora sola, con carousel, mismo formato */}
      <section
        id="experiencia"
        className="bg-zinc-50 py-14 dark:bg-zinc-900/50"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-bold tracking-widest text-zinc-500">
                  <Icon.Briefcase className="h-4 w-4" /> TRAYECTORIA
                </p>
                <h2 className="mt-2 text-2xl font-black">Experiencia</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpIndex((i) => (i === 0 ? 1 : 0))}
                  aria-label="Anterior"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm dark:border-zinc-700 dark:bg-zinc-800"
                >
                  ‹
                </button>
                <span className="text-xs font-semibold text-zinc-500">
                  {expIndex + 1} / 2
                </span>
                <button
                  onClick={() => setExpIndex((i) => (i === 1 ? 0 : 1))}
                  aria-label="Siguiente"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm dark:border-zinc-700 dark:bg-zinc-800"
                >
                  ›
                </button>
              </div>
            </div>
            <div className="mt-6">
              {expIndex === 0 ? (
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black">
                        Pasante — Área de Arquitectura y Soluciones
                      </p>
                      <p className="text-sm font-bold text-violet-700 dark:text-violet-400">
                        IESS — Instituto Ecuatoriano de Seguridad Social
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                      Abr - Jun 2026
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Laboratorios de prueba de{" "}
                    <strong>Arquitectura Kubernetes</strong> con{" "}
                    <strong>DevSecOps</strong> y <strong>CI/CD</strong> desde
                    fases iniciales.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-zinc-800">
                      Kubernetes
                    </span>
                    <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-zinc-800">
                      DevSecOps
                    </span>
                    <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-zinc-800">
                      CI/CD
                    </span>
                  </div>
                  <button
                    onClick={() => setIessOpen(true)}
                    className="group mt-4 block w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50"
                  >
                    <div className="relative">
                      <Image
                        src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto,w_900/iesspractica`}
                        alt="IESS — Práctica"
                        width={900}
                        height={600}
                        className="h-auto max-h-[320px] w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                        unoptimized
                      />
                      <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                        Click para ver detalle
                      </span>
                    </div>
                  </button>
                </div>
              ) : (
                <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-black">Colaboradora — FEFAST</p>
                      <p className="text-sm font-bold text-fuchsia-700 dark:text-fuchsia-400">
                        Plataforma Síndrome de Turner
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
                      Sep 2025 - Feb 2026
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    Plataforma de apoyo e información con enfoque accesible,
                    empático y colaborativo.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-zinc-800">
                      React
                    </span>
                    <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-zinc-800">
                      Node.js
                    </span>
                    <span className="rounded-full bg-zinc-900 px-2.5 py-1 text-xs font-semibold text-white dark:bg-zinc-800">
                      PostgreSQL
                    </span>
                  </div>
                  <button
                    onClick={() => setFefastOpen(true)}
                    className="group mt-4 block w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50"
                  >
                    <div className="relative">
                      <Image
                        src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto,w_900/Captura_de_pantalla_2026-09-14_191943`}
                        alt="FEFAST — Captura"
                        width={900}
                        height={600}
                        className="h-auto max-h-[320px] w-full object-contain transition duration-300 group-hover:scale-[1.02]"
                        unoptimized
                      />
                      <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur">
                        Click para ver detalle
                      </span>
                    </div>
                  </button>
                </div>
              )}
              <div className="mt-3 flex justify-center gap-2">
                <button
                  onClick={() => setExpIndex(0)}
                  className={`h-2 w-6 rounded-full ${expIndex === 0 ? "bg-violet-600" : "bg-zinc-300 dark:bg-zinc-700"}`}
                  aria-label="Slide 1"
                />
                <button
                  onClick={() => setExpIndex(1)}
                  className={`h-2 w-6 rounded-full ${expIndex === 1 ? "bg-violet-600" : "bg-zinc-300 dark:bg-zinc-700"}`}
                  aria-label="Slide 2"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="mx-auto max-w-6xl px-6 py-16">
        <div className="overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-700 p-[1px]">
          <div className="rounded-[2rem] bg-white p-8 dark:bg-zinc-900 md:p-10">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-black tracking-tight">
                  ¿Construimos algo grande?
                  <br />
                  <span className="gradient-text">
                    Tu próximo talento está aquí
                  </span>
                </h2>
                <p className="mt-3 text-zinc-600 dark:text-zinc-400">
                  Transformo ideas en sistemas que escalan — lista para sumar
                  impacto desde el día uno.
                </p>
                <div className="mt-6 space-y-3 text-sm">
                  <a
                    href="mailto:micaelasalcedo8vof@gmail.com"
                    className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-zinc-900">
                      <Icon.Mail className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="font-bold">
                        micaelasalcedo8vof@gmail.com
                      </span>
                      <br />
                      <span className="text-zinc-500">
                        Personal • preferido para reclutadores
                      </span>
                    </span>
                  </a>
                  <a
                    href="mailto:mssalcedo2@espe.edu.ec"
                    className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-zinc-900">
                      <Icon.Graduation className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="font-bold">mssalcedo2@espe.edu.ec</span>
                      <br />
                      <span className="text-zinc-500">Institucional ESPE</span>
                    </span>
                  </a>
                  <a
                    href="tel:+593962846565"
                    className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 dark:border-zinc-800 dark:bg-zinc-800"
                  >
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white dark:bg-zinc-900">
                      <Icon.Phone className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="font-bold">0962846565</span>
                      <br />
                      <span className="text-zinc-500">Teléfono / WhatsApp</span>
                    </span>
                  </a>
                  <div className="flex gap-3">
                    <a
                      href="https://www.linkedin.com/in/micaela-salcedo-07a693268/"
                      target="_blank"
                      className="flex-1 rounded-xl bg-[#0A66C2] py-3 text-center font-bold text-white"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/SalcedoMicaela"
                      target="_blank"
                      className="flex-1 rounded-xl bg-zinc-900 py-3 text-center font-bold text-white dark:bg-white dark:text-zinc-900"
                    >
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fd = new FormData(e.currentTarget as HTMLFormElement);
                  const nombre = fd.get("nombre");
                  const email = fd.get("email");
                  const msg = fd.get("mensaje");
                  window.location.href = `mailto:micaelasalcedo8vof@gmail.com?subject=Contacto portafolio de ${nombre} (${email})&body=${encodeURIComponent(String(msg))}`;
                }}
                className="rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-800"
              >
                <p className="font-bold">Envíame un mensaje</p>
                <div className="mt-4 space-y-4">
                  <input
                    name="nombre"
                    required
                    placeholder="Tu nombre"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                  <input
                    name="email"
                    required
                    type="email"
                    placeholder="Tu email"
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                  <textarea
                    name="mensaje"
                    required
                    rows={4}
                    placeholder="Cuéntame sobre la oportunidad..."
                    className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400 dark:border-zinc-700 dark:bg-zinc-900"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-full bg-zinc-900 py-3.5 text-sm font-bold text-white hover:bg-black dark:bg-white dark:text-zinc-900"
                  >
                    Enviar mensaje →
                  </button>
                  <p className="text-center text-xs text-zinc-500">
                    Se abrirá tu correo hacia micaelasalcedo8vof@gmail.com
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="border-t border-zinc-100 py-8 text-center text-xs text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
        suppressHydrationWarning
      >
        <p suppressHydrationWarning>
          © {year ?? 2026} Micaela Stefania Salcedo — Next.js +
          Tailwind + Cloudinary • Vercel
        </p>
        <p className="mt-1">
          micaelasalcedo8vof@gmail.com • mssalcedo2@espe.edu.ec •
          github.com/SalcedoMicaela
        </p>
      </footer>

      {/* Lightbox FEFAST */}
      {fefastOpen && (
        <div
          onClick={() => setFefastOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-5xl overflow-auto rounded-2xl bg-white p-2 dark:bg-zinc-900"
          >
            <button
              onClick={() => setFefastOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
            >
              ✕
            </button>
            <Image
              src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/Captura_de_pantalla_2026-09-14_191943`}
              alt="FEFAST detalle"
              width={1400}
              height={900}
              className="h-auto w-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
      {/* Lightbox IESS */}
      {iessOpen && (
        <div
          onClick={() => setIessOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-5xl overflow-auto rounded-2xl bg-white p-2 dark:bg-zinc-900"
          >
            <button
              onClick={() => setIessOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
            >
              ✕
            </button>
            <Image
              src={`https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/iesspractica`}
              alt="IESS detalle"
              width={1400}
              height={900}
              className="h-auto w-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
      {/* Lightbox Proyectos */}
      {projLightbox && (
        <div
          onClick={() => setProjLightbox(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[90vh] max-w-5xl overflow-auto rounded-2xl bg-white p-2 dark:bg-zinc-900"
          >
            <button
              onClick={() => setProjLightbox(null)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black"
            >
              ✕
            </button>
            <Image
              src={`https://res.cloudinary.com/${projLightbox.startsWith("samples/") ? "demo" : CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto/${projLightbox}`}
              alt="Proyecto detalle"
              width={1400}
              height={900}
              className="h-auto w-full object-contain"
              unoptimized
            />
          </div>
        </div>
      )}
    </main>
  );
}
