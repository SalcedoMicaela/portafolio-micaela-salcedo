import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Micaela Salcedo — Desarrolladora de Software",
  description:
    "Portafolio de Micaela Stefania Salcedo — Estudiante de Ingeniería de Software (ESPE). React, Node.js, Python, Java. Proyectos FEFAST, Sistema de Votaciones Conecta Impacto, CodeDucks Hackathon y más.",
  keywords: ["Micaela Salcedo", "Desarrolladora", "Software", "React", "Node.js", "ESPE", "Portafolio"],
  authors: [{ name: "Micaela Salcedo" }],
  openGraph: {
    title: "Micaela Salcedo — Desarrolladora de Software",
    description: "Creativa, responsable y apasionada por crear soluciones prácticas e innovadoras.",
    type: "website",
    locale: "es_EC",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head suppressHydrationWarning>
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `try{const s=localStorage.getItem('theme');const d=window.matchMedia('(prefers-color-scheme: dark)').matches;const t=s?s:(d?'dark':'light');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}`,
          }}
        />
        {/* Elimina atributos inyectados por extensiones (bis_skin_checked, bis_register, __processed_*) ANTES de hidratar */}
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `!function(){function c(){try{document.querySelectorAll('[bis_skin_checked]').forEach(function(e){e.removeAttribute('bis_skin_checked')});document.querySelectorAll('[bis_register]').forEach(function(e){e.removeAttribute('bis_register')});[document.documentElement,document.body].forEach(function(el){if(!el)return;Array.from(el.attributes).forEach(function(a){if(a.name.indexOf('__processed')===0)el.removeAttribute(a.name)})});document.querySelectorAll('[__processed_b799d6a6-15a6-4e93-b25a-4b1b27923fc9__],[__processed_b2e10231-2907-4c2a-a165-80ad7af45b6f__],[__processed_9d140e78-9edc-4465-a367-a0c292487ee9__]').forEach(function(e){Array.from(e.attributes).forEach(function(a){if(a.name.indexOf('__processed')===0)e.removeAttribute(a.name)})})}catch(e){}}c();try{new MutationObserver(function(m){m.forEach(function(r){if(r.target&&r.target.removeAttribute){['bis_skin_checked','bis_register'].forEach(function(n){if(r.target.hasAttribute(n))r.target.removeAttribute(n)});Array.from(r.target.attributes||[]).forEach(function(a){if(a.name.indexOf('__processed')===0)r.target.removeAttribute(a.name)})}})}).observe(document.documentElement,{attributes:true,subtree:true,attributeFilter:['bis_skin_checked','bis_register']});new MutationObserver(c).observe(document.body,{attributes:true,attributeFilter:['bis_register']})}catch(e){}}();`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="antialiased bg-white text-zinc-900 selection:bg-fuchsia-200 selection:text-fuchsia-900 dark:bg-zinc-950 dark:text-zinc-100">
        {children}
      </body>
    </html>
  );
}
