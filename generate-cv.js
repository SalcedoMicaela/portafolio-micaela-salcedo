const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'public');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, 'HojaDeVida.pdf');

const doc = new PDFDocument({ size: 'A4', margins: { top: 40, bottom: 40, left: 50, right: 50 } });
doc.pipe(fs.createWriteStream(out));

// Colors Harvard style - clean, professional
const violet = '#7C3AED';
const dark = '#18181B';
const gray = '#71717A';

// Header
doc.fontSize(22).font('Helvetica-Bold').fillColor(dark).text('MICAELA STEFANIA SALCEDO CHICHANDE', { align: 'center' });
doc.moveDown(0.3);
doc.fontSize(9).font('Helvetica').fillColor(gray).text('Ingeniería de Software • Universidad de las Fuerzas Armadas ESPE  |  Quito, Ecuador', { align: 'center' });
doc.fontSize(8).fillColor(violet).text('micaelasalcedo8vof@gmail.com  •  mssalcedo2@espe.edu.ec  •  0962846565  •  github.com/SalcedoMicaela  •  linkedin.com/in/micaela-salcedo-07a693268', { align: 'center' });
doc.moveDown(0.5);
doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor('#E4E4E7').lineWidth(1).stroke();
doc.moveDown(0.8);

function section(title) {
  doc.fontSize(10).font('Helvetica-Bold').fillColor(violet).text(title.toUpperCase(), { characterSpacing: 1 });
  doc.moveTo(50, doc.y).lineTo(545, doc.y).strokeColor(violet).lineWidth(0.5).stroke();
  doc.moveDown(0.5);
}

function item(title, subtitle, date, desc, bullets) {
  doc.fontSize(9).font('Helvetica-Bold').fillColor(dark).text(title, { continued: false });
  if (subtitle) {
    doc.fontSize(8).font('Helvetica-Oblique').fillColor(gray).text(subtitle);
  }
  if (date) {
    doc.fontSize(7).font('Helvetica').fillColor(gray).text(date, { align: 'right' });
    doc.moveDown(0.2);
  }
  if (desc) {
    doc.fontSize(8).font('Helvetica').fillColor('#27272A').text(desc, { align: 'justify' });
    doc.moveDown(0.2);
  }
  if (bullets) {
    bullets.forEach(b => {
      doc.fontSize(7.5).font('Helvetica').fillColor('#27272A').text('• ' + b, { indent: 10 });
      doc.moveDown(0.15);
    });
  }
  doc.moveDown(0.6);
}

// Perfil
section('Perfil');
doc.fontSize(8).font('Helvetica').fillColor('#27272A').text('Estudiante de Ingeniería de Software (ESPE, 2022–en curso), creativa y resolutiva con fuerte liderazgo y aprendizaje continuo. Experiencia en sistemas distribuidos con microservicios, colas, GraphQL y Kubernetes bajo metodologías DevSecOps y CI/CD. Busco aportar impacto desde el día uno en entornos que valoren calidad y mejora continua.', { align: 'justify' });
doc.moveDown(0.8);

// Educación
section('Educación');
item('Universidad de las Fuerzas Armadas ESPE', 'Ingeniería de Software — Dpto. Ciencias de la Computación • Club de Software', '2022 — En curso', null, ['Enfoque en desarrollo full stack, arquitectura y sistemas distribuidos.']);
item('Colegio 24 de Mayo', 'Educación Secundaria', 'Egresada 2021', null, null);

// Experiencia
section('Experiencia');
item('Pasante — Área de Arquitectura y Soluciones', 'IESS — Instituto Ecuatoriano de Seguridad Social | Quito', 'Abr 2026 — Jun 2026  •  3 meses', 'Pasantía en laboratorios de arquitectura empresarial.', ['Pruebas de implementación de arquitectura basada en Kubernetes','Metodología DevSecOps desde fases iniciales de desarrollo','Implementación y validación de pipelines CI/CD']);

// Proyectos destacados Harvard
section('Proyectos Destacados');
item('EntregaExpress_P2 — Sistema de Gestión Logística Distribuido', 'Java 21 • Spring Boot 4 • Microservicios • RabbitMQ • GraphQL • Kubernetes • PostgreSQL | github.com/AxelHerrera4/EntregaExpress_P2', '2025', 'Plataforma empresarial con API Gateway (8080), Auth (8081), Billing (8082), Fleet (8083) y Pedido Service (8084). Base de datos por servicio, JWT, Redis Cache, RabbitMQ, Strategy/Factory patterns y despliegue en Kubernetes.', ['Colaboración 4 personas — rol desarrollo y documentación','Orquestación de pedidos: Pedido → Billing (tarifa Strategy) → Fleet (asignación) → Auth (JWT)']);
item('Microservicios E-commerce — RabbitMQ', 'Java • Spring Boot 3.5 • Spring AMQP • PostgreSQL • Docker | github.com/JairoBonilla2004/microservices-ecommerce-rabbitmq', '2025', 'Sistema event-driven: Order Service (8080) ↔ Inventory Service (8081) mediante Topic Exchanges.', ['Flujo: OrderCreated → StockReserved/Rejected → CONFIRMED/CANCELLED','Swagger/OpenAPI, health checks y Docker Compose']);
item('Sistema de Votaciones — Conecta Impacto', 'Next.js • React • Vercel | votaciones-ten.vercel.app', '2025', 'Plataforma para registro de participantes y votación en tiempo real para la universidad.', null);
item('FEFAST — Plataforma Síndrome de Turner', 'React • Node.js • PostgreSQL', 'Sep 2025 — Feb 2026  •  6 meses', 'Colaboración en plataforma de apoyo e información con enfoque accesible y empático.', null);
item('CodeDucks — Hackathon ConectaImpacto 2025', 'Finalista TOP 5 / 25 equipos — ConQuito', 'Oct 2025', 'Prototipo para gestión de información y validación de indicadores en organizaciones sociales.', null);
item('Capture The Flag — Club de Software ESPE', 'Finalista', '2024', 'Competencia de ciberseguridad.', null);

// Habilidades
section('Habilidades Técnicas');
doc.fontSize(8).font('Helvetica-Bold').fillColor(dark).text('Lenguajes: ', { continued: true }).font('Helvetica').fillColor('#27272A').text('C / C++  •  Java  •  PHP  •  JavaScript  •  Python  •  SQL  •  NoSQL');
doc.moveDown(0.3);
doc.fontSize(8).font('Helvetica-Bold').fillColor(dark).text('Tecnologías: ', { continued: true }).font('Helvetica').fillColor('#27272A').text('React  •  Node.js  •  Docker  •  Selenium  •  Postman  •  JMeter  •  Oracle  •  PostgreSQL  •  Jira  •  Cassandra  •  Android Studio  •  GitHub');
doc.moveDown(0.3);
doc.fontSize(8).font('Helvetica-Bold').fillColor(dark).text('Prácticas Modernas: ', { continued: true }).font('Helvetica').fillColor('#27272A').text('CI/CD  •  DevOps  •  DevSecOps  •  GitHub Actions  •  GitLab CI  •  Pipelines  •  Kubernetes  •  RabbitMQ  •  GraphQL  •  Redis');
doc.moveDown(0.8);

// Idiomas
section('Idiomas & Fortalezas');
doc.fontSize(8).font('Helvetica').fillColor('#27272A').text('Español nativo  •  Inglés intermedio  |  Creatividad • Liderazgo • Aprendizaje continuo • Trabajo en equipo • Responsabilidad', { align: 'left' });

doc.end();
console.log('PDF generado en', out);
