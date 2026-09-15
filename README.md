# Portafolio — Micaela Salcedo

Portafolio web moderno, llamativo y optimizado para búsqueda de trabajo. Hecho con **Next.js 16 + Tailwind + Cloudinary**, listo para desplegar en **Vercel**.

## Cloudinary
- Las imágenes se sirven desde Cloudinary con optimización automática (`q_auto,f_auto`, `c_fill`).
- Configura `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` en `.env.local` y en Vercel.
- En `src/app/page.tsx` edita el objeto `IMAGES` con tus `publicId`:
  ```ts
  const IMAGES = {
    hero: "micaela/hero",        // tu foto profesional
    votaciones: "micaela/votaciones",
    fefast: "micaela/fefast",
    codeducks: "micaela/codeducks",
    ctf: "micaela/ctf",
  };
  ```
- Si me pasas el link de Cloudinary (ej: `https://res.cloudinary.com/tu-cloud/image/upload/v123/micaela/foto.jpg`) yo extraigo el publicId y lo integro.

## Desarrollo local
```bash
npm install
npm run dev    # http://localhost:3000
npm run build  # verificar build para Vercel
```

## Despliegue en Vercel
1. Sube el código a GitHub
2. En vercel.com -> New Project -> Importa el repo
3. En Settings -> Environment Variables agrega `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
4. Deploy — ¡listo!

## Proyectos incluidos
- Sistema de Votaciones Conecta Impacto (https://votaciones-ten.vercel.app/)
- FEFAST (Síndrome de Turner)
- CodeDucks Hackathon ConectaImpacto 2025 (finalista)
- Capture The Flag ESPE (finalista)
- Pasantía IESS
