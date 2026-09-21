const fs = require('fs');
const path = require('path');
const PDFKit = require('pdfkit');

const outDir = path.join(__dirname, 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'SalcedoMicaela_CV.pdf');
const outLegacy = path.join(outDir, 'HojaDeVida.pdf');

const doc = new PDFKit({ size: 'A4', margins: { top: 36, bottom: 32, left: 40, right: 40 } });
const stream = fs.createWriteStream(out);
doc.pipe(stream);
stream.on('finish', () => {
  try { fs.copyFileSync(out, outLegacy); console.log('PDF legacy copiado en', outLegacy); } catch (e) { console.error(e); }
});

const W = 595;
const dark = '#000000';
const gray = '#333333';
const grayLight = '#555555';

function addPageIfNeeded(needed) {
  if (doc.y + needed > 810) { doc.addPage(); return true; }
  return false;
}
function hr() {
  doc.moveTo(40, doc.y).lineTo(W - 40, doc.y).strokeColor('#000000').lineWidth(0.5).stroke();
  doc.moveDown(0.7);
}
function sectionTitle(title) {
  addPageIfNeeded(26);
  doc.moveDown(0.3);
  doc.font('Helvetica-Bold').fontSize(9).fillColor(dark).text(title.toUpperCase(), { characterSpacing: 0.8 });
  doc.moveDown(0.2);
  hr();
}
function subTitle(text) {
  addPageIfNeeded(16);
  doc.font('Helvetica-Bold').fontSize(8.5).fillColor(dark).text(text);
  doc.moveDown(0.15);
}
function meta(text) {
  doc.font('Helvetica-Oblique').fontSize(7.5).fillColor(grayLight).text(text);
  doc.moveDown(0.3);
}
function body(text) {
  doc.font('Helvetica').fontSize(8).fillColor(gray).text(text, { align: 'justify', lineGap: 1.2 });
  doc.moveDown(0.3);
}
function bullet(text) {
  addPageIfNeeded(14);
  doc.font('Helvetica').fontSize(8).fillColor(gray).text('•  ' + text, { indent: 10, lineGap: 1 });
  doc.moveDown(0.15);
}
function techLine(label, value) {
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor(dark).text(label + ': ', { continued: true });
  doc.font('Helvetica').fontSize(7.5).fillColor(gray).text(value, { lineGap: 1 });
  doc.moveDown(0.25);
}

// ================= HEADER =================
doc.font('Helvetica-Bold').fontSize(16).fillColor(dark).text('MICAELA STEFANIA SALCEDO CHICHANDE', { align: 'center' });
doc.moveDown(0.3);
doc.font('Helvetica').fontSize(9).fillColor(grayLight).text('Ingeniera de Software  |  Full Stack Developer  |  Quito, Ecuador', { align: 'center' });
doc.moveDown(0.4);
doc.font('Helvetica').fontSize(7.5).fillColor(gray).text('micaelasalcedo8vof@gmail.com  |  mssalcedo2@espe.edu.ec  |  0962846565  |  github.com/SalcedoMicaela  |  linkedin.com/in/micaela-salcedo-07a693268  |  portafolio-micaela-salcedo.vercel.app', { align: 'center', lineGap: 1 });
doc.moveDown(0.5);
hr();

// ================= PERFIL =================
sectionTitle('Perfil profesional');
body('Ingeniera de Software (ESPE) Full Stack con experiencia en arquitectura y sistemas distribuidos. Trabajo con microservicios, DevOps/DevSecOps y automatización (Java/Spring Boot, React/Node.js, PostgreSQL, RabbitMQ, GraphQL, Docker/Kubernetes). Creativa, resolutiva y orientada a soluciones escalables. Busco aportar, asumir retos y crecer profesionalmente.');
 
// ================= EDUCACIÓN =================
sectionTitle('Educación');
subTitle('Ingeniería de Software — Universidad de las Fuerzas Armadas ESPE, Quito');
meta('2022 – 2026  |  Club de Software');
bullet('Formación en Full Stack, arquitectura y sistemas distribuidos; hackathons, CTF y proyectos con impacto social.');
doc.moveDown(0.2);
subTitle('Educación secundaria — Colegio 24 de Mayo');
meta('Egresada — 2021');

// ================= EXPERIENCIA =================
sectionTitle('Experiencia profesional');

subTitle('Pasante — Área de Arquitectura y Soluciones | IESS — Quito');
meta('Abril – junio de 2026  |  3 meses');
body('Pruebas de concepto para migración hacia entornos orquestados en laboratorios de arquitectura empresarial.');
bullet('Kubernetes: orquestación y escalabilidad.');
bullet('DevSecOps desde fases iniciales del ciclo de vida.');
bullet('Pipelines CI/CD y arquitectura distribuida.');
techLine('Tecnologías', 'Kubernetes  ·  DevSecOps  ·  CI/CD  ·  QA');
doc.moveDown(0.2);

subTitle('Colaboradora — FEFAST | Plataforma Síndrome de Turner');
meta('Septiembre 2025 – febrero 2026  |  6 meses');
body('Plataforma accesible de apoyo e información para familias y comunidad FEFAST, con enfoque empático y colaborativo.');
bullet('Frontend React con accesibilidad y UX.');
bullet('Backend Node.js + PostgreSQL.');
bullet('Trabajo coordinado en equipo.');
techLine('Tecnologías', 'React  ·  Node.js  ·  PostgreSQL  ·  Accesibilidad');

// ================= PROYECTOS =================
sectionTitle('Proyectos destacados');

subTitle('EntregaExpress_P2 — Sistema de Gestión Logística Distribuido');
meta('2025  |  Java 21 · Spring Boot 4 · Microservicios · RabbitMQ · GraphQL · Kubernetes · PostgreSQL · JWT · Redis  |  github.com/AxelHerrera4/EntregaExpress_P2');
doc.font('Helvetica').fontSize(7.5).fillColor(grayLight).text('Repositorio: https://github.com/AxelHerrera4/EntregaExpress_P2', { link: 'https://github.com/AxelHerrera4/EntregaExpress_P2', lineGap: 1 });
doc.moveDown(0.3);
bullet('Plataforma con API Gateway (8080), Auth (8081), Billing (8082), Fleet (8083), Pedido (8084); BD por servicio, JWT y RabbitMQ.');
bullet('Colaboración 4 personas; patrones Strategy/Factory, Redis Cache y despliegue en Kubernetes.');
doc.moveDown(0.3);

subTitle('Microservicios E-commerce con RabbitMQ');
meta('2025  |  Java · Spring Boot 3.5 · Spring AMQP · PostgreSQL · Docker  |  github.com/JairoBonilla2004/microservices-ecommerce-rabbitmq');
doc.font('Helvetica').fontSize(7.5).fillColor(grayLight).text('Repositorio: https://github.com/JairoBonilla2004/microservices-ecommerce-rabbitmq', { link: 'https://github.com/JairoBonilla2004/microservices-ecommerce-rabbitmq', lineGap: 1 });
doc.moveDown(0.3);
bullet('Event-driven: Order ↔ Inventory vía Topic Exchanges (OrderCreated → StockReserved/Rejected → CONFIRMED/CANCELLED).');
bullet('SOLID/ACID, Swagger/OpenAPI, health checks y Docker Compose.');
doc.moveDown(0.3);

subTitle('Sistema de Votaciones — Conecta Impacto');
meta('2025  |  En producción  |  Next.js · React · Vercel  |  votaciones-ten.vercel.app');
doc.font('Helvetica').fontSize(7.5).fillColor(grayLight).text('Sitio: https://votaciones-ten.vercel.app/', { link: 'https://votaciones-ten.vercel.app/', lineGap: 1 });
doc.moveDown(0.3);
bullet('Plataforma de votación universitaria en tiempo real (registro, validación y votación); desplegada en Vercel con Next.js/React.');
doc.moveDown(0.3);

subTitle('CodeDucks — Hackathon ConectaImpacto');
meta('Octubre 2025  |  Finalista TOP 5 / 25 equipos  |  ConQuito 4–5 oct  |  github.com/AxelHerrera4/Hackaton');
doc.font('Helvetica').fontSize(7.5).fillColor(grayLight).text('Repositorio: https://github.com/AxelHerrera4/Hackaton', { link: 'https://github.com/AxelHerrera4/Hackaton', lineGap: 1 });
doc.moveDown(0.3);
bullet('Prototipo para gestión y validación de indicadores en organizaciones sociales.');
doc.moveDown(0.3);

subTitle('Capture The Flag — Club de Software ESPE');
meta('2024  |  Finalista  |  Ciberseguridad');
doc.font('Helvetica').fontSize(7.5).fillColor(grayLight).text('Ref: https://www.instagram.com/p/C5CU2G5uvID/', { link: 'https://www.instagram.com/p/C5CU2G5uvID/', lineGap: 1 });
doc.moveDown(0.3);
bullet('Retos de análisis y seguridad; finalista de la competencia.');
doc.moveDown(0.2);

// ================= HABILIDADES =================
sectionTitle('Habilidades técnicas');
doc.font('Helvetica-Bold').fontSize(8).fillColor(dark).text('Lenguajes');
doc.moveDown(0.15);
body('C / C++  ·  Java  ·  PHP  ·  JavaScript  ·  Python  ·  SQL  ·  NoSQL');
doc.font('Helvetica-Bold').fontSize(8).fillColor(dark).text('Frameworks y tecnologías');
doc.moveDown(0.15);
body('React  ·  Node.js  ·  Spring Boot  ·  GraphQL  ·  RabbitMQ  ·  Redis  ·  Docker  ·  Kubernetes  ·  Selenium  ·  Postman  ·  JMeter  ·  Oracle  ·  PostgreSQL  ·  Cassandra  ·  Android Studio  ·  GitHub  ·  Jira');
doc.font('Helvetica-Bold').fontSize(8).fillColor(dark).text('DevOps y prácticas');
doc.moveDown(0.15);
body('CI/CD  ·  DevOps  ·  DevSecOps  ·  GitHub Actions  ·  GitLab CI  ·  Pipelines  ·  Microservicios  ·  SOLID  ·  ACID');
doc.font('Helvetica-Bold').fontSize(8).fillColor(dark).text('Herramientas y colaboración');
doc.moveDown(0.15);
body('Git/GitHub  ·  Postman  ·  Jira  ·  Documentación técnica  ·  Metodologías colaborativas');

sectionTitle('Habilidades blandas');
bullet('Creatividad — soluciones originales y prácticas.');
bullet('Liderazgo — coordinación empática.');
bullet('Trabajo en equipo — cumplimiento de objetivos comunes.');
bullet('Aprendizaje continuo — mejora constante.');
bullet('Resolución de problemas — análisis y alternativas orientadas a resultados.');
bullet('Responsabilidad — compromiso y calidad.');

sectionTitle('Idiomas');
bullet('Español: nativo.');
bullet('Inglés: intermedio.');
doc.moveDown(0.2);
sectionTitle('Información adicional');
bullet('Ubicación: Quito, Ecuador — Presencial o remoto.');
doc.moveDown(0.2);

sectionTitle('Enlaces');
doc.font('Helvetica').fontSize(8).fillColor(gray);
doc.text('Correo personal: micaelasalcedo8vof@gmail.com', { link: 'mailto:micaelasalcedo8vof@gmail.com', lineGap: 1.5 });
doc.text('Correo institucional: mssalcedo2@espe.edu.ec', { link: 'mailto:mssalcedo2@espe.edu.ec', lineGap: 1.5 });
doc.text('GitHub: https://github.com/SalcedoMicaela', { link: 'https://github.com/SalcedoMicaela', lineGap: 1.5 });
doc.text('LinkedIn: https://www.linkedin.com/in/micaela-salcedo-07a693268', { link: 'https://www.linkedin.com/in/micaela-salcedo-07a693268', lineGap: 1.5 });
doc.text('Portafolio: https://portafolio-micaela-salcedo.vercel.app/', { link: 'https://portafolio-micaela-salcedo.vercel.app/', lineGap: 1.5 });

doc.end();
console.log('PDF generado en', out);
