# Portafolio — Micaela Stefania Salcedo

Portafolio personal de **Micaela Stefania Salcedo** — Estudiante de Ingeniería de Software (ESPE) y Desarrolladora Full Stack. Diseño moderno, modo oscuro, carruseles y galería optimizada con **Cloudinary**, listo para **Vercel**.

> “El código es creatividad con lógica.”

**Demo:** `https://portafolio-micaela-salcedo.vercel.app` *(actualiza tras el deploy)*

---

## ✨ Destacados

- **Hero animado** con foto Cloudinary (`fotoperfil`) y badge `Full Stack Developer • Quito, Ecuador`
- **Formación Académica** y **Trayectoria en carousel** (IESS — Kubernetes/DevSecOps/CI/CD + FEFAST)
- **Proyectos** con principios **SOLID** y **ACID**, imágenes con lightbox (`mensajeria`, `ecomercerabbit`, `votaciones`, `favoritahacathon`, `especoncurso`)
- **Habilidades blandas en carousel** auto-rotativo
- **Modo oscuro** con persistencia y sin hydration mismatch
- **CV Harvard** descargable (`public/HojaDeVida.pdf`)

## 🛠️ Stack

- **Next.js 16** (App Router) + **TypeScript**
- **Tailwind CSS 3** (`darkMode: "class"`)
- **Cloudinary** (`next-cloudinary` + `cldUrl` con `q_auto,f_auto`)
- **Vercel** para deploy

## 🖼️ Cloudinary

Todas las imágenes se sirven optimizadas:

```ts
// src/app/page.tsx
const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "djejlmpnv"
const cldUrl = (publicId, w=800) => `https://res.cloudinary.com/${cloud}/image/upload/q_auto,f_auto,w_${w}/${publicId}`
const IMAGES = {
  hero: "fotoperfil",
  votaciones: "votaciones",
  entrega: "mensajeria",
  ecommerce: "ecomercerabbit",
  codeducks: "favoritahacathon",
  ctf: "especoncurso",
}
```

Sube tus fotos a `https://console.cloudinary.com` en tu cloud `djejlmpnv` (ej: `fotoperfil.png` → publicId `fotoperfil`) y reemplaza en `IMAGES`. Para trayectoria: `iesspractica` y `Captura_de_pantalla_2026-09-14_191943` ya integradas con lightbox.

## 🚀 Desarrollo local

```bash
npm install
cp .env.example .env.local # configura NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djejlmpnv
npm run dev    # http://localhost:3000
npm run build  # verifica build
```

Variables en `.env.local`:

```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=djejlmpnv
CLOUDINARY_URL=cloudinary://<API_KEY>:JpNXw_YrxvlvORfAmgxcg2jrTxE@djejlmpnv
```

## ☁️ Deploy en Vercel

1. Crea repo **público** en GitHub: `portafolio-micaela-salcedo`
2. `git push` (ver abajo)
3. En `vercel.com` → **Add New Project** → Import repo
4. **Environment Variables**: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = `djejlmpnv` y `CLOUDINARY_URL` completo
5. **Deploy** → tu URL `https://portafolio-micaela-salcedo.vercel.app`

## 📂 Proyectos incluidos

- **EntregaExpress_P2** — Microservicios Spring Boot + RabbitMQ + GraphQL + Kubernetes (SOLID/ACID) → `https://github.com/AxelHerrera4/EntregaExpress_P2`
- **Microservicios E-commerce RabbitMQ** — Event-driven Order↔Inventory → `https://github.com/JairoBonilla2004/microservices-ecommerce-rabbitmq`
- **Sistema de Votaciones** — `https://votaciones-ten.vercel.app/`
- **CodeDucks Hackathon ConectaImpacto 2025** (TOP 5) → `https://github.com/AxelHerrera4/Hackaton`
- **Capture The Flag ESPE** (Finalista)
- **Pasantía IESS** — Arquitectura Kubernetes + DevSecOps + CI/CD + **FEFAST** Síndrome de Turner

## 👩‍💻 Autora

**Micaela Stefania Salcedo** — Quito, Ecuador  
`micaelasalcedo8vof@gmail.com` • `mssalcedo2@espe.edu.ec` • [LinkedIn](https://www.linkedin.com/in/micaela-salcedo-07a693268/) • [GitHub](https://github.com/SalcedoMicaela)

---

Hecho con Next.js + Tailwind + Cloudinary. ¡Gracias por visitarlo!
