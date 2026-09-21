const fs = require('fs');
const path = require('path');
const PDFKit = require('pdfkit');

const outDir = path.join(__dirname, 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'SalcedoMicaela_CV.pdf');
const outLegacy = path.join(outDir, 'HojaDeVida.pdf');

// Harvard sobrio: una sola columna, negro sobre blanco, Helvetica — optimizado 2 páginas
const doc = new PDFKit({ size: 'A4', margins: { top: 30, bottom: 28, left: 36, right: 36 } });
const stream = fs.createWriteStream(out);
doc.pipe(stream);
stream.on('finish', () => {
  try { fs.copyFileSync(out, outLegacy); console.log('PDF legacy copiado en', outLegacy); } catch (e) { console.error(e); }
});

const W = 595;
const Mw = W - 72; // usable width (36+36 margins)
const dark = '#000000';
const gray = '#222222';
const grayLight = '#444444';

let y = doc.y;

// Helpers
function addPageIfNeeded(needed) {
  if (doc.y + needed > 805) {
    doc.addPage();
    return true;
  }
  return false;
}

function hr() {
  const curY = doc.y;
  doc.moveTo(36, curY).lineTo(W - 36, curY).strokeColor('#000000').lineWidth(0.4).stroke();
  doc.moveDown(0.05);
}

function sectionTitle(title) {
  addPageIfNeeded(22);
  doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text(title.toUpperCase(), { characterSpacing: 0.7 });
  doc.moveDown(0.05);
  hr();
}

function subTitle(text) {
  doc.font('Helvetica-Bold').fontSize(7.5).fillColor(dark).text(text);
}

function bodyText(text, opts = {}) {
  doc.font('Helvetica').fontSize(7.4).fillColor(gray).text(text, { align: 'justify', lineGap: 0.2, ...opts });
}

function bullet(text) {
  addPageIfNeeded(12);
  doc.font('Helvetica').fontSize(7.4).fillColor(gray).text('•  ' + text, { indent: 8, align: 'left', lineGap: 0.15 });
  doc.moveDown(0.04);
}

function bulletBoldTitle(title, desc) {
  addPageIfNeeded(12);
  doc.font('Helvetica-Bold').fontSize(7.4).fillColor(dark).text(title + ': ', { continued: true });
  doc.font('Helvetica').fillColor(gray).text(desc, { lineGap: 0.15 });
  doc.moveDown(0.04);
}

function linkLine(label, url) {
  doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text(label + ': ', { continued: true });
  doc.font('Helvetica').fontSize(7.6).fillColor('#000000').text(url, { link: url, underline: false, lineGap: 0.15 });
  doc.moveDown(0.04);
}

// ================= HEADER =================
doc.font('Helvetica-Bold').fontSize(14.5).fillColor(dark).text('MICAELA STEFANIA SALCEDO CHICHANDE', { align: 'center' });
doc.moveDown(0.05);
doc.font('Helvetica').fontSize(8).fillColor(grayLight).text('Ingeniera de Software  |  Full Stack Developer  |  Quito, Ecuador', { align: 'center' });
doc.moveDown(0.06);
// Contact - single centered line with links
const contactParts = [
  { t: 'micaelasalcedo8vof@gmail.com', link: 'mailto:micaelasalcedo8vof@gmail.com' },
  { t: 'mssalcedo2@espe.edu.ec', link: 'mailto:mssalcedo2@espe.edu.ec' },
  { t: '0962846565', link: 'tel:+593962846565' },
  { t: 'github.com/SalcedoMicaela', link: 'https://github.com/SalcedoMicaela' },
  { t: 'linkedin.com/in/micaela-salcedo-07a693268', link: 'https://www.linkedin.com/in/micaela-salcedo-07a693268' },
  { t: 'portafolio-micaela-salcedo.vercel.app', link: 'https://portafolio-micaela-salcedo.vercel.app/' },
];
// Render contact as centered text with links - manual
doc.font('Helvetica').fontSize(7.6).fillColor(gray);
let contactText = 'micaelasalcedo8vof@gmail.com  |  mssalcedo2@espe.edu.ec  |  0962846565  |  github.com/SalcedoMicaela  |  linkedin.com/in/micaela-salcedo-07a693268  |  portafolio-micaela-salcedo.vercel.app';
doc.text(contactText, { align: 'center', lineGap: 0.2 });
doc.moveDown(0.05);
hr();
doc.moveDown(0.04);

// ================= PERFIL PROFESIONAL =================
sectionTitle('Perfil profesional');
bodyText('Soy Ingeniera de Software de la Universidad de las Fuerzas Armadas ESPE, con experiencia en desarrollo Full Stack, arquitectura de software y sistemas distribuidos. Me interesa crear soluciones tecnológicas prácticas, escalables e innovadoras, combinando conocimientos de desarrollo backend y frontend.');
doc.moveDown(0.05);
bodyText('He trabajado con microservicios, integración de servicios, automatización de procesos y prácticas DevOps/DevSecOps. En mis proyectos he utilizado tecnologías como Java, Spring Boot, React, Node.js, PostgreSQL, RabbitMQ, GraphQL, Docker y Kubernetes.');
doc.moveDown(0.05);
bodyText('Me caracterizo por mi creatividad, capacidad para resolver problemas, liderazgo, trabajo en equipo y aprendizaje continuo. Busco aportar mis conocimientos, asumir nuevos retos y seguir creciendo profesionalmente en el área del desarrollo de software.');
doc.moveDown(0.04);

// ================= EDUCACIÓN =================
sectionTitle('Educación');
subTitle('Ingeniería de Software');
doc.font('Helvetica').fontSize(7.6).fillColor(grayLight).text('Universidad de las Fuerzas Armadas ESPE  —  Quito, Ecuador  |  2022 – 2026');
doc.moveDown(0.05);
bullet('Me formé en desarrollo Full Stack, arquitectura de software y sistemas distribuidos.');
bullet('Participé en el Club de Software.');
bullet('Participé en hackathons, competencias CTF y proyectos tecnológicos con impacto social.');
bullet('Fortalecí mis conocimientos en diseño, desarrollo e integración de soluciones de software.');
doc.moveDown(0.04);
subTitle('Educación secundaria');
doc.font('Helvetica').fontSize(7.6).fillColor(grayLight).text('Colegio 24 de Mayo  |  Egresada — 2021');
doc.moveDown(0.04);

// ================= EXPERIENCIA PROFESIONAL =================
sectionTitle('Experiencia profesional');

subTitle('Pasante — Área de Arquitectura y Soluciones');
doc.font('Helvetica-Oblique').fontSize(7.6).fillColor(grayLight).text('Instituto Ecuatoriano de Seguridad Social (IESS)  —  Quito, Ecuador  |  Abril – junio de 2026  |  3 meses');
doc.moveDown(0.06);
bodyText('Durante mi pasantía participé en laboratorios de arquitectura empresarial, donde diseñé e implementé pruebas de concepto orientadas a la migración hacia entornos orquestados.');
doc.moveDown(0.06);
doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Responsabilidades y aportes:');
doc.moveDown(0.05);
bullet('Diseñé y desarrollé pruebas de concepto basadas en Kubernetes, enfocadas en la orquestación y escalabilidad.');
bullet('Apliqué prácticas DevSecOps desde las primeras fases del ciclo de vida del desarrollo.');
bullet('Construí y validé pipelines CI/CD orientados a la automatización y mejora continua.');
bullet('Exploré alternativas de arquitectura para entornos distribuidos y orquestados.');
bullet('Fortalecí mis conocimientos sobre automatización, despliegue y arquitectura empresarial.');
doc.moveDown(0.04);
doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Tecnologías: ', { continued: true });
doc.font('Helvetica').fontSize(7.6).fillColor(gray).text('Kubernetes  ·  DevSecOps  ·  CI/CD  ·  QA');
doc.moveDown(0.06);

subTitle('Colaboradora — FEFAST');
doc.font('Helvetica-Oblique').fontSize(7.6).fillColor(grayLight).text('Plataforma Síndrome de Turner  |  Septiembre de 2025 – febrero de 2026  |  6 meses');
doc.moveDown(0.06);
bodyText('Colaboré en el desarrollo de una plataforma de apoyo e información accesible para las familias y la comunidad FEFAST, enfocándome en la empatía, la accesibilidad y el trabajo colaborativo.');
doc.moveDown(0.06);
doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Responsabilidades y aportes:');
doc.moveDown(0.05);
bullet('Desarrollé interfaces frontend con React, considerando la accesibilidad y la experiencia del usuario.');
bullet('Implementé funcionalidades backend utilizando Node.js.');
bullet('Gestioné y almacené información mediante PostgreSQL.');
bullet('Trabajé de manera coordinada con el equipo para integrar funcionalidades y atender las necesidades del proyecto.');
bullet('Participé en la construcción de una solución tecnológica orientada a facilitar el acceso a la información.');
doc.moveDown(0.04);
doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Tecnologías: ', { continued: true });
doc.font('Helvetica').fontSize(7.6).fillColor(gray).text('React  ·  Node.js  ·  PostgreSQL  ·  Accesibilidad');
doc.moveDown(0.04);

// ================= PROYECTOS DESTACADOS =================
sectionTitle('Proyectos destacados');

subTitle('EntregaExpress_P2 — Sistema de Gestión Logística Distribuido');
doc.font('Helvetica').fontSize(7.6).fillColor(grayLight).text('2025  |  Java 21  ·  Spring Boot 4  ·  Microservicios  ·  RabbitMQ  ·  GraphQL  ·  Kubernetes  ·  PostgreSQL  ·  JWT  ·  Redis');
doc.font('Helvetica').fontSize(7.6).fillColor(grayLight).text('Repositorio: github.com/AxelHerrera4/EntregaExpress_P2', { link: 'https://github.com/AxelHerrera4/EntregaExpress_P2' });
doc.moveDown(0.06);
bodyText('Participé en el desarrollo y la documentación de una plataforma empresarial distribuida, compuesta por varios microservicios para gestionar pedidos, facturación, flota y autenticación.');
doc.moveDown(0.05);
doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Mis aportes y características del proyecto:');
doc.moveDown(0.04);
bullet('Colaboré con un equipo de cuatro integrantes en las actividades de desarrollo y documentación.');
bullet('Trabajé con los siguientes servicios: API Gateway — puerto 8080, Auth Service — puerto 8081, Billing Service — puerto 8082, Fleet Service — puerto 8083, Pedido Service — puerto 8084.');
bullet('Implementé y trabajé con una arquitectura que utiliza una base de datos independiente por servicio.');
bullet('Utilicé autenticación mediante JWT.');
bullet('Trabajé con comunicación asíncrona mediante RabbitMQ.');
bullet('Incorporé Redis Cache y los patrones de diseño Strategy y Factory.');
bullet('Participé en el despliegue y la orquestación mediante Kubernetes.');
doc.moveDown(0.04);
doc.font('Helvetica-Oblique').fontSize(7.5).fillColor(gray).text('Flujo principal: El servicio de pedidos se comunica con Billing para calcular tarifas mediante Strategy y posteriormente con Fleet para la asignación. La autenticación se gestiona mediante Auth y JWT.');
doc.moveDown(0.06);

subTitle('Microservicios E-commerce con RabbitMQ');
doc.font('Helvetica').fontSize(7.6).fillColor(grayLight).text('2025  |  Java  ·  Spring Boot 3.5  ·  Spring AMQP  ·  PostgreSQL  ·  Docker');
doc.font('Helvetica').fontSize(7.6).fillColor(grayLight).text('Repositorio: github.com/JairoBonilla2004/microservices-ecommerce-rabbitmq', { link: 'https://github.com/JairoBonilla2004/microservices-ecommerce-rabbitmq' });
doc.moveDown(0.06);
bodyText('Desarrollé y trabajé en un sistema basado en una arquitectura orientada a eventos, compuesto por un servicio de pedidos y un servicio de inventario, comunicados mediante RabbitMQ y Topic Exchanges.');
doc.moveDown(0.05);
doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Mis aportes y características del proyecto:');
doc.moveDown(0.04);
bullet('Trabajé con la comunicación entre Order Service e Inventory Service.');
bullet('Implementé el flujo de eventos: OrderCreated → StockReserved o StockRejected → Estado final CONFIRMED o CANCELLED.');
bullet('Apliqué principios SOLID y propiedades de consistencia ACID por servicio.');
bullet('Utilicé Swagger/OpenAPI para documentar las APIs.');
bullet('Implementé health checks.');
bullet('Trabajé con Docker Compose para la ejecución de los servicios.');
doc.moveDown(0.06);

subTitle('Sistema de Votaciones — Conecta Impacto');
doc.font('Helvetica').fontSize(7.6).fillColor(grayLight).text('2025  |  En producción  |  Next.js  ·  React  ·  Vercel  |  votaciones-ten.vercel.app', { link: 'https://votaciones-ten.vercel.app/' });
doc.moveDown(0.06);
bodyText('Participé en el desarrollo de una plataforma web para gestionar procesos de votación universitaria, incluyendo el registro de participantes, la validación y la votación en tiempo real.');
doc.moveDown(0.04);
doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Mis aportes:');
doc.moveDown(0.04);
bullet('Desarrollé funcionalidades utilizando Next.js y React.');
bullet('Trabajé en la gestión de participantes y procesos de votación.');
bullet('Desplegué la aplicación en Vercel.');
doc.moveDown(0.06);

subTitle('CodeDucks — Hackathon ConectaImpacto');
doc.font('Helvetica').fontSize(7.6).fillColor(grayLight).text('Octubre de 2025  |  Finalista — TOP 5 de 25 equipos  |  ConQuito — 4 y 5 de octubre  |  github.com/AxelHerrera4/Hackaton', { link: 'https://github.com/AxelHerrera4/Hackaton' });
doc.moveDown(0.06);
bodyText('Participé en el diseño y prototipado de una solución orientada a la gestión de información y validación de indicadores para organizaciones sociales.');
doc.moveDown(0.04);
doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Mis aportes:');
doc.moveDown(0.04);
bullet('Participé en la creación y el prototipado de una propuesta de innovación social.');
bullet('Trabajé en una solución orientada a facilitar la gestión de información.');
bullet('Formé parte del equipo que quedó entre los cinco finalistas de un total de 25 equipos.');
doc.moveDown(0.06);

subTitle('Capture The Flag — Club de Software ESPE');
doc.font('Helvetica').fontSize(7.6).fillColor(grayLight).text('2024  |  Finalista  |  Ciberseguridad  |  Referencia: instagram.com/p/C5CU2G5uvID/', { link: 'https://www.instagram.com/p/C5CU2G5uvID/' });
doc.moveDown(0.06);
bullet('Desarrollé mis habilidades de análisis y resolución de problemas.');
bullet('Participé en retos técnicos de ciberseguridad.');
bullet('Formé parte del grupo de finalistas de la competencia.');
doc.moveDown(0.04);

// ================= HABILIDADES TÉCNICAS =================
sectionTitle('Habilidades técnicas');

doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Lenguajes de programación y consulta');
doc.moveDown(0.04);
bodyText('C  /  C++  ·  Java  ·  PHP  ·  JavaScript  ·  Python  ·  SQL  ·  NoSQL');
doc.moveDown(0.04);

doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Frameworks y tecnologías');
doc.moveDown(0.04);
bodyText('React  ·  Node.js  ·  Spring Boot  ·  GraphQL  ·  RabbitMQ  ·  Redis  ·  Docker  ·  Kubernetes  ·  Selenium  ·  Postman  ·  JMeter  ·  Oracle  ·  PostgreSQL  ·  Cassandra  ·  Android Studio  ·  GitHub  ·  Jira');
doc.moveDown(0.04);

doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('DevOps, DevSecOps y prácticas de desarrollo');
doc.moveDown(0.04);
bodyText('CI/CD  ·  DevOps  ·  DevSecOps  ·  GitHub Actions  ·  GitLab CI  ·  Automatización de pipelines  ·  Docker  ·  Kubernetes  ·  Arquitectura de microservicios  ·  Principios SOLID  ·  Propiedades ACID');
doc.moveDown(0.04);

doc.font('Helvetica-Bold').fontSize(7.6).fillColor(dark).text('Herramientas y colaboración');
doc.moveDown(0.04);
bodyText('Git y GitHub  ·  Postman  ·  Jira  ·  Documentación técnica  ·  Trabajo colaborativo y metodologías de desarrollo');
doc.moveDown(0.04);

// ================= HABILIDADES BLANDAS =================
sectionTitle('Habilidades blandas');
bulletBoldTitle('Creatividad', 'Propongo soluciones originales y prácticas para resolver necesidades reales.');
bulletBoldTitle('Liderazgo', 'Coordino actividades y colaboro con otras personas de manera empática.');
bulletBoldTitle('Trabajo en equipo', 'Participo activamente en equipos y contribuyo al cumplimiento de objetivos comunes.');
bulletBoldTitle('Aprendizaje continuo', 'Busco adquirir nuevos conocimientos y mejorar constantemente mis habilidades.');
bulletBoldTitle('Resolución de problemas', 'Analizo situaciones, planteo alternativas y busco soluciones orientadas a resultados.');
bulletBoldTitle('Responsabilidad', 'Me comprometo con las tareas asignadas, los objetivos y la calidad del trabajo.');
doc.moveDown(0.05);

// ================= IDIOMAS =================
sectionTitle('Idiomas');
bullet('Español: Nativo.');
bullet('Inglés: Intermedio.');
doc.moveDown(0.05);

// ================= INFORMACIÓN ADICIONAL =================
sectionTitle('Información adicional');
bullet('Ubicación: Quito, Ecuador.');
bullet('Modalidad de trabajo: Presencial o remoto.');
bullet('Disponibilidad: Quito, Ecuador.');
doc.moveDown(0.05);

// ================= ENLACES =================
sectionTitle('Enlaces');
doc.font('Helvetica').fontSize(7.5).fillColor(gray);
linkLine('Correo personal', 'mailto:micaelasalcedo8vof@gmail.com');
doc.text('  micaelasalcedo8vof@gmail.com', { link: 'mailto:micaelasalcedo8vof@gmail.com' });
linkLine('Correo institucional', 'mailto:mssalcedo2@espe.edu.ec');
doc.text('  mssalcedo2@espe.edu.ec', { link: 'mailto:mssalcedo2@espe.edu.ec' });
linkLine('GitHub', 'https://github.com/SalcedoMicaela');
linkLine('LinkedIn', 'https://www.linkedin.com/in/micaela-salcedo-07a693268');
linkLine('Portafolio', 'https://portafolio-micaela-salcedo.vercel.app/');

doc.end();
console.log('PDF generado en', out);
