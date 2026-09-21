const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'SalcedoMicaela_CV.pdf');
const outLegacy = path.join(outDir, 'HojaDeVida.pdf');

const doc = new PDFDocument({ size: 'A4', margins: { top: 0, bottom: 0, left: 0, right: 0 } });
const stream = fs.createWriteStream(out);
doc.pipe(stream);
stream.on('finish', () => {
  try { fs.copyFileSync(out, outLegacy); console.log('PDF legacy copiado en', outLegacy); } catch (e) { console.error('copy error', e); }
});

// --- Colors & Styles (llamativo) ---
const violet = '#7C3AED';
const violetDark = '#6D28D9';
const fuchsia = '#EC4899';
const violetLight = '#F5F3FF';
const dark = '#18181B';
const gray = '#71717A';
const gray2 = '#27272A';
const grayLight = '#FAFAFA';
const borderLight = '#E4E4E7';

const W = 595; // A4 width
const H = 842;

// Helper to draw pills/tags
function drawPills(texts, x, y, maxW, opts = {}) {
  const padX = 7, padY = 3, gap = 5;
  const fontSize = opts.fontSize || 6.5;
  const bg = opts.bg || violet;
  const color = opts.color || '#FFFFFF';
  let cx = x, cy = y;
  doc.fontSize(fontSize).font('Helvetica-Bold');
  texts.forEach(t => {
    const w = doc.widthOfString(t) + padX * 2;
    const h = 14;
    if (cx + w > x + maxW) { cx = x; cy += h + gap; }
    if (cy + h > H - 30) return; // avoid overflow
    doc.roundedRect(cx, cy, w, h, 7).fill(bg);
    doc.fillColor(color).text(t, cx + padX, cy + 4.2, { lineBreak: false });
    cx += w + gap;
  });
  return cy + 14 + 4;
}

// Section header llamativo (violet badge + line)
function section(title, y, icon) {
  // check page overflow
  if (y > H - 80) { doc.addPage(); y = 40; }
  const badgeW = doc.widthOfString(title.toUpperCase()) + 22;
  doc.roundedRect(30, y, badgeW, 18, 9).fill(violet);
  doc.fillColor('#FFFFFF').fontSize(7.5).font('Helvetica-Bold').text(title.toUpperCase(), 30 + 11, y + 5.8);
  // line under
  doc.moveTo(30 + badgeW + 8, y + 9).lineTo(W - 30, y + 9).strokeColor(borderLight).lineWidth(1).stroke();
  doc.fillColor(dark);
  return y + 24;
}

function itemCard(opts) {
  // opts: { title, subtitle, date, desc, bullets, tags, y }
  let y = opts.y;
  if (y > H - 90) { doc.addPage(); y = 40; }
  const cardX = 30, cardW = W - 60;
  const startY = y;
  // Card background
  // We'll draw after measuring height; easier: just text flow without card bg for simplicity except left violet border
  // left accent
  doc.save();
  // We'll estimate height after writing then draw border
  let contentY = y;
  // Title
  doc.fontSize(9).font('Helvetica-Bold').fillColor(dark).text(opts.title, cardX + 10, contentY, { width: cardW - 90, lineBreak: true });
  const titleH = doc.heightOfString(opts.title, { width: cardW - 90 });
  // date on right
  if (opts.date) {
    const dateW = 110;
    doc.fontSize(6.5).font('Helvetica-Bold').fillColor('#FFFFFF');
    const dw = doc.widthOfString(opts.date) + 12;
    const dx = W - 30 - dw;
    const dy = contentY;
    doc.roundedRect(dx, dy, dw, 12, 6).fill(opts.dateBg || '#10B981');
    doc.fillColor('#FFFFFF').text(opts.date, dx + 6, dy + 3, { lineBreak: false });
  }
  contentY += Math.max(titleH, 12) + 2;
  if (opts.subtitle) {
    doc.fontSize(7.5).font('Helvetica-Oblique').fillColor(violet).text(opts.subtitle, cardX + 10, contentY, { width: cardW - 20 });
    contentY += doc.heightOfString(opts.subtitle, { width: cardW - 20 }) + 3;
  }
  if (opts.desc) {
    doc.fontSize(7.5).font('Helvetica').fillColor(gray2).text(opts.desc, cardX + 10, contentY, { width: cardW - 20, align: 'justify' });
    contentY += doc.heightOfString(opts.desc, { width: cardW - 20 }) + 4;
  }
  if (opts.bullets) {
    opts.bullets.forEach(b => {
      doc.fontSize(7).font('Helvetica').fillColor(gray2).text('•  ' + b, cardX + 14, contentY, { width: cardW - 24 });
      contentY += doc.heightOfString('•  ' + b, { width: cardW - 24 }) + 1.5;
    });
    contentY += 1;
  }
  if (opts.tags && opts.tags.length) {
    doc.fontSize(6).font('Helvetica-Bold').fillColor(gray);
    // draw pills
    const nextY = drawPills(opts.tags, cardX + 10, contentY, cardW - 20, { bg: '#18181B', fontSize: 6 });
    contentY = nextY;
  }
  const cardH = contentY - startY + 8;
  // draw card border + left violet accent
  doc.roundedRect(cardX, startY - 4, cardW, cardH, 8).strokeColor(borderLight).lineWidth(0.6).stroke();
  doc.roundedRect(cardX, startY - 4, 4, cardH, 2).fill(violet);
  doc.restore();
  return contentY + 10;
}

// ================= HEADER LLAMATIVO =================
doc.rect(0, 0, W, 98).fill(violet);
// subtle gradient simulation: top accent bar fuchsia
doc.rect(0, 0, W, 4).fill(fuchsia);
doc.rect(0, 94, W, 4).fill(fuchsia);

// Nombre
doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(24).text('MICAELA STEFANIA', 0, 18, { align: 'center', width: W });
doc.fillColor('#FFFFFF').font('Helvetica-Bold').fontSize(24).text('SALCEDO CHICHANDE', 0, 40, { align: 'center', width: W });

// Subtitle
doc.fillColor('#EDE9FE').font('Helvetica-Bold').fontSize(9).text('Ingenieria de Software  |  Full Stack Developer  |  Quito, Ecuador', 0, 64, { align: 'center', width: W });

// Contact row (icon style with text)
const contact = 'micaelasalcedo8vof@gmail.com  •  mssalcedo2@espe.edu.ec  •  0962846565  •  github.com/SalcedoMicaela  •  linkedin.com/in/micaela-salcedo-07a693268';
doc.fillColor('#FFFFFF').font('Helvetica').fontSize(6.5).text(contact, 0, 78, { align: 'center', width: W });
doc.fillColor('#FDE68A').font('Helvetica-Bold').fontSize(7).text('Portafolio: https://portafolio-micaela-salcedo.vercel.app/', 0, 88, { align: 'center', width: W, link: 'https://portafolio-micaela-salcedo.vercel.app/' });

// ================= CONTENT START =================
let y = 112;

// Perfil
y = section('Perfil', y);
doc.fontSize(7.8).font('Helvetica').fillColor(gray2).text('Estudiante de Ingenieria de Software (ESPE, 2022 - en curso), creativa y resolutiva con fuerte liderazgo y aprendizaje continuo. Apasionada por backend y frontend: construyo soluciones practicas e innovadoras - desde plataformas sociales hasta sistemas distribuidos con colas, GraphQL y Kubernetes. Experiencia en microservicios, DevSecOps y CI/CD bajo principios SOLID y ACID. Busco aportar impacto desde el dia uno.', 30, y, { width: W - 60, align: 'justify' });
y += doc.heightOfString('Estudiante de Ingenieria de Software (ESPE, 2022 - en curso), creativa y resolutiva con fuerte liderazgo y aprendizaje continuo. Apasionada por backend y frontend: construyo soluciones practicas e innovadoras - desde plataformas sociales hasta sistemas distribuidos con colas, GraphQL y Kubernetes. Experiencia en microservicios, DevSecOps y CI/CD bajo principios SOLID y ACID. Busco aportar impacto desde el dia uno.', { width: W - 60 }) + 8;

// Educacion
y = section('Educacion', y);
y = itemCard({
  title: 'Ingenieria de Software',
  subtitle: 'Universidad de las Fuerzas Armadas - ESPE  |  Dpto. Ciencias de la Computacion  •  Club de Software',
  date: '2022 - En curso',
  desc: null,
  bullets: ['Enfoque en desarrollo full stack, arquitectura y sistemas distribuidos. Participacion en hackathons, CTF y proyectos con impacto social.'],
  tags: ['ESPE', 'Quito'],
  y,
  dateBg: violet
});
y = itemCard({
  title: 'Educacion Secundaria',
  subtitle: 'Colegio 24 de Mayo',
  date: 'Egresada 2021',
  desc: null,
  bullets: null,
  tags: [],
  y,
  dateBg: gray
});

// Experiencia (AHORA 2 items: IESS + FEFAST)
y = section('Experiencia', y);
y = itemCard({
  title: 'Pasante - Area de Arquitectura y Soluciones',
  subtitle: 'IESS - Instituto Ecuatoriano de Seguridad Social  |  Quito',
  date: 'Abr - Jun 2026  •  3 meses',
  desc: 'Pasantia en laboratorios de arquitectura empresarial. Disene e implemente pruebas de concepto para migracion hacia entornos orquestados.',
  bullets: [
    'Pruebas de concepto de arquitectura basada en Kubernetes (orquestacion y escalabilidad)',
    'Metodologia DevSecOps desde fases iniciales del ciclo de vida del desarrollo',
    'Construccion y validacion de pipelines CI/CD orientados a mejora continua'
  ],
  tags: ['Kubernetes', 'DevSecOps', 'CI/CD', 'Arquitectura'],
  y,
  dateBg: '#059669'
});
y = itemCard({
  title: 'Colaboradora - FEFAST',
  subtitle: 'Plataforma Sindrome de Turner  |  Apoyo e informacion accesible',
  date: 'Sep 2025 - Feb 2026  •  6 meses',
  desc: 'Plataforma de apoyo e informacion con enfoque accesible, empatico y colaborativo para familias y comunidad FEFAST.',
  bullets: [
    'Desarrollo frontend con React enfocado en accesibilidad y experiencia empatica',
    'Backend Node.js + PostgreSQL para gestion de contenidos e informacion',
    'Trabajo colaborativo y comunicacion constante con el equipo'
  ],
  tags: ['React', 'Node.js', 'PostgreSQL', 'Accesibilidad'],
  y,
  dateBg: '#7C3AED'
});

// Proyectos Destacados (TODO lo de la pagina: 5 proyectos)
y = section('Proyectos Destacados', y);
y = itemCard({
  title: 'EntregaExpress_P2 - Sistema de Gestion Logistica Distribuido  [ Destacado ]',
  subtitle: 'Java 21  •  Spring Boot 4  •  Microservicios  •  RabbitMQ  •  GraphQL  •  Kubernetes  •  PostgreSQL  |  github.com/AxelHerrera4/EntregaExpress_P2',
  date: '2025',
  desc: 'Plataforma empresarial con API Gateway (8080), Auth (8081), Billing (8082), Fleet (8083) y Pedido Service (8084). Base de datos por servicio, JWT, Redis Cache, RabbitMQ, Strategy/Factory y despliegue en Kubernetes.',
  bullets: ['Colaboracion 4 personas - rol desarrollo y documentacion', 'Orquestacion: Pedido -> Billing (tarifa Strategy) -> Fleet (asignacion) -> Auth (JWT)'],
  tags: ['Java', 'Microservicios', 'RabbitMQ', 'GraphQL', 'K8s'],
  y
});
y = itemCard({
  title: 'Microservicios E-commerce - RabbitMQ',
  subtitle: 'Java  •  Spring Boot 3.5  •  Spring AMQP  •  PostgreSQL  •  Docker  |  github.com/JairoBonilla2004/microservices-ecommerce-rabbitmq',
  date: '2025',
  desc: 'Sistema event-driven: Order Service (8080) <-> Inventory Service (8081) mediante Topic Exchanges. Consistencia ACID por servicio y patrones SOLID.',
  bullets: ['Flujo: OrderCreated -> StockReserved/Rejected -> CONFIRMED/CANCELLED', 'Swagger/OpenAPI, health checks y Docker Compose'],
  tags: ['Event-Driven', 'RabbitMQ', 'Docker', 'SOLID', 'ACID'],
  y
});
y = itemCard({
  title: 'Sistema de Votaciones - Conecta Impacto',
  subtitle: 'Next.js  •  React  •  Vercel  |  votaciones-ten.vercel.app  •  En produccion',
  date: '2025',
  desc: 'Plataforma web para gestionar votaciones universitarias: registro de participantes, validacion y votacion en tiempo real. Desplegado en Vercel.',
  bullets: null,
  tags: ['Next.js', 'React', 'Vercel'],
  y
});
y = itemCard({
  title: 'CodeDucks - Hackathon ConectaImpacto 2025  [ Finalista TOP 5 / 25 ]',
  subtitle: 'Prototipado  •  Innovacion Social  |  github.com/AxelHerrera4/Hackaton  •  ConQuito 4-5 oct',
  date: 'Oct 2025',
  desc: 'Prototipo para gestion de informacion y validacion de indicadores en organizaciones sociales. Finalistas entre 25 equipos.',
  bullets: null,
  tags: ['Prototipado', 'TOP 5'],
  y
});
y = itemCard({
  title: 'Capture The Flag - Club de Software ESPE  [ Finalista ]',
  subtitle: 'Ciberseguridad  •  ESPE',
  date: '2024',
  desc: 'Competencia de ciberseguridad: retos de seguridad, analisis y resolucion. instagram.com/p/C5CU2G5uvID/',
  bullets: null,
  tags: ['CTF', 'Ciberseguridad'],
  y
});

// Habilidades Tecnicas - llamativo con pills
y = section('Habilidades Tecnicas', y);
// Lenguajes
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(violet).text('LENGUAJES', 30, y);
y += 10;
y = drawPills(['C', 'C++', 'Java', 'PHP', 'JavaScript', 'Python', 'SQL', 'NoSQL'], 30, y, W - 60, { bg: '#FFFFFF', color: dark });
doc.save(); doc.roundedRect(30, y - 18 - 10, W - 60, y - (y - 18 - 10) - 4, 8).strokeColor(borderLight).lineWidth(0.5).stroke(); doc.restore();
y += 6;
// Tecnologias
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(violet).text('TECNOLOGIAS', 30, y);
y += 10;
y = drawPills(['React', 'Node.js', 'Docker', 'Selenium', 'Postman', 'JMeter', 'Oracle', 'PostgreSQL', 'Jira', 'Cassandra', 'Android Studio', 'GitHub'], 30, y, W - 60, { bg: violet, color: '#FFFFFF' });
y += 6;
// Practicas Modernas
doc.fontSize(7.5).font('Helvetica-Bold').fillColor('#059669').text('PRACTICAS MODERNAS', 30, y);
doc.fontSize(6).font('Helvetica').fillColor(gray).text('Implementando en proyectos recientes', W - 30 - 130, y, { width: 130, align: 'right' });
y += 10;
y = drawPills(['CI/CD', 'DevOps', 'DevSecOps', 'SOLID', 'ACID', 'GitHub Actions', 'GitLab CI', 'Pipelines', 'Docker', 'Kubernetes', 'RabbitMQ', 'GraphQL', 'Redis'], 30, y, W - 60, { bg: '#ECFDF5', color: '#065F46' });
y += 4;
doc.fontSize(6.5).font('Helvetica-Oblique').fillColor(gray).text('Entrega de codigo mas rapida y de calidad con pipelines en GitHub & GitLab.', 30, y, { width: W - 60 });
y += 12;

// Habilidades Blandas
y = section('Habilidades Blandas', y);
const soft = [
  'Creatividad - soluciones originales con impacto real',
  'Liderazgo - guio equipos con empatia y energia',
  'Trabajo en equipo - colaboro y construyo donde cada persona brilla',
  'Aprendizaje continuo - cada reto es oportunidad de crecer',
  'Resolucion de problemas - logica, creatividad y foco en resultados',
  'Responsabilidad - compromiso y relaciones interpersonales'
];
soft.forEach(s => {
  if (y > H - 40) { doc.addPage(); y = 40; }
  doc.fontSize(7).font('Helvetica').fillColor(gray2).text('◆  ' + s, 34, y, { width: W - 68 });
  y += doc.heightOfString('◆  ' + s, { width: W - 68 }) + 2;
});
y += 4;

// Idiomas
y = section('Idiomas', y);
doc.fontSize(7.5).font('Helvetica').fillColor(gray2).text('Espanol nativo  •  Ingles intermedio  |  Disponibilidad: Quito, Ecuador  •  Modalidad: Presencial / Remoto', 30, y, { width: W - 60 });
y += 14;

// Footer lamativo
if (y > H - 50) { doc.addPage(); y = H - 50; }
doc.rect(0, H - 28, W, 28).fill(dark);
doc.fillColor('#FFFFFF').font('Helvetica').fontSize(6).text('micaelasalcedo8vof@gmail.com  •  mssalcedo2@espe.edu.ec  •  github.com/SalcedoMicaela  •  Portafolio: https://portafolio-micaela-salcedo.vercel.app/', 0, H - 18, { align: 'center', width: W });
doc.fillColor('#A78BFA').font('Helvetica-Bold').fontSize(5.5).text('CV generado automaticamente - SalcedoMicaela_CV.pdf', 0, H - 10, { align: 'center', width: W });

doc.end();
console.log('PDF generado en', out);
