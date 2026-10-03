import docx
from docx.shared import Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = docx.Document()

# Styles
styles = doc.styles
style = styles['Normal']
font = style.font
font.name = 'Arial'
font.size = Pt(11)

# Portada
portada = doc.add_paragraph("UNIVERSIDAD ABIERTA PARA ADULTOS (UAPA)\n")
portada.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = portada.runs[0]
run.bold = True
run.font.size = Pt(16)

doc.add_paragraph("ESCUELA DE INGENIERÍA Y TECNOLOGÍA\n", style='Normal').alignment = WD_ALIGN_PARAGRAPH.CENTER
doc.add_paragraph("PROGRAMACIÓN DE DISPOSITIVOS MÓVILES - ISW-307\n\n\n\n", style='Normal').alignment = WD_ALIGN_PARAGRAPH.CENTER

titulo = doc.add_paragraph("Proyecto Práctico Final\nApp: Fit by JP\n\n\n")
titulo.alignment = WD_ALIGN_PARAGRAPH.CENTER
run2 = titulo.runs[0]
run2.bold = True
run2.font.size = Pt(20)

doc.add_paragraph("Presentado por:\nJosé Ramón Pérez Fermín (100016540)\n\n", style='Normal').alignment = WD_ALIGN_PARAGRAPH.CENTER
doc.add_paragraph("Facilitador:\nJoan Manuel Gregorio Pérez\n\n", style='Normal').alignment = WD_ALIGN_PARAGRAPH.CENTER
doc.add_paragraph("Fecha de Entrega: Octubre 2026\n", style='Normal').alignment = WD_ALIGN_PARAGRAPH.CENTER
doc.add_page_break()

# Introduccion
doc.add_heading("1. Introducción y Objetivos", level=1)
doc.add_paragraph("El presente documento describe el diseño, arquitectura y desarrollo de la aplicación móvil 'Fit by JP'. El problema principal que resuelve es la falta de una herramienta integral, rápida y multiplataforma que permita a los usuarios organizar sus entrenamientos físicos, visualizar métricas de progreso, realizar monitoreo en tiempo real vía hardware y consumir contenido de motivación deportiva en una sola interfaz.")
doc.add_heading("Objetivo General", level=2)
doc.add_paragraph("Desarrollar una aplicación móvil multiplataforma que permita a los usuarios gestionar su vida deportiva mediante rutinas, progreso analítico y sincronización de hardware.")
doc.add_heading("Objetivos Específicos", level=2)
doc.add_paragraph("1. Implementar un módulo de tareas (rutinas) con persistencia local usando SQLite/Ionic Storage.\n2. Diseñar un mapa interactivo para tracking de caminatas usando geolocalización.\n3. Integrar conectividad Bluetooth Low Energy (BLE) para búsqueda de smartwatches.\n4. Consumir APIs externas para obtener frases de motivación diarias.")
doc.add_heading("Alcance", level=2)
doc.add_paragraph("El proyecto incluye la gestión de rutinas, mapas interactivos, captura de fotos para el perfil, consumo de APIs y almacenamiento persistente. No incluye sincronización en la nube ni pagos.")

# Canvas
doc.add_heading("2. Modelo de Negocio (Canvas)", level=1)
doc.add_paragraph("Segmento de clientes: Atletas aficionados, estudiantes y personas enfocadas en el fitness.\nPropuesta de valor: Ofrecer una suite deportiva integral que no requiera conexión constante a internet, utilizando hardware nativo del teléfono y de Wearables.\nCanales: Google Play Store y Apple App Store.\nRelación con el cliente: Autoservicio, actualizaciones automatizadas y notificaciones push locales.\nFuentes de ingreso: Modelo Freemium (gratis con anuncios opcionales o versión pro).\nRecursos clave: Sensores GPS, Bluetooth del dispositivo y almacenamiento nativo.\nActividades clave: Mantenimiento del código, diseño de nuevas rutinas.\nSocios clave: Proveedores de mapas (Carto), APIs de motivación.\nEstructura de costos: Tiempo de desarrollo, cuenta de desarrollador en tiendas.")

# Arquitectura
doc.add_heading("3. Arquitectura Técnica", level=1)
doc.add_paragraph("La aplicación emplea un patrón de arquitectura basada en componentes usando el framework Angular 18+, embebida sobre Ionic 8 para la capa de UI. El middleware Capacitor gestiona las llamadas al hardware nativo de Android e iOS.")
doc.add_heading("Stack Tecnológico", level=2)
doc.add_paragraph("Frontend: Ionic Framework, Angular, TypeScript, HTML5, SCSS.\nBackend / Middleware: Capacitor.\nBase de datos: Ionic Storage (SQLite).")
doc.add_heading("Tabla de Plugins de Capacitor", level=2)
table = doc.add_table(rows=1, cols=3)
table.style = 'Table Grid'
hdr_cells = table.rows[0].cells
hdr_cells[0].text = 'Plugin'
hdr_cells[1].text = 'Versión'
hdr_cells[2].text = 'Uso en el Proyecto'
data = [
    ("@capacitor/geolocation", "6.0", "Obtener ubicación GPS del atleta."),
    ("@capacitor/camera", "6.0", "Capturar fotos para el perfil."),
    ("@capacitor-community/bluetooth-le", "6.0", "Escanear smartwatches."),
    ("@capacitor/network", "6.0", "Detectar caídas de conexión a internet."),
    ("@ionic/storage-angular", "4.0", "Persistencia de rutinas.")
]
for p, v, u in data:
    row_cells = table.add_row().cells
    row_cells[0].text = p
    row_cells[1].text = v
    row_cells[2].text = u

# Diseño UI
doc.add_heading("4. Diseño de Interfaces", level=1)
doc.add_paragraph("La aplicación utiliza una guía de estilo moderna ('Dark Mode' nativo).")
doc.add_paragraph("Paleta de colores:\n- Primario: Verde Neón (#00ff73) - Acciones principales y confirmaciones.\n- Secundario: Naranja (#ff6b35) - Alertas y acentos visuales.\n- Fondo: Oscuro puro (#121212) - Para ahorrar batería en pantallas OLED.\nTipografía: Inter / Roboto, bordes redondeados (16px) en las tarjetas de rutinas.")

# Módulos
doc.add_heading("5. Desarrollo por Módulos", level=1)
doc.add_heading("Módulo 1: Dashboard y Conectividad - José Pérez", level=2)
doc.add_paragraph("Problema a resolver: El usuario necesita un panel inicial con estadísticas y motivación que además le permita enlazar sus dispositivos.\nSolución: Se implementó un Dashboard que consume una API de frases mediante 'fetch', un botón maestro para restablecer rutinas y un escáner BLE real para buscar dispositivos.\nCódigo principal: Se inyectó BleClient en app.component.ts y se gestiona el estado asíncrono con RxJS.")

doc.add_heading("Módulo 2: Rutinas y Multimedia - José Pérez", level=2)
doc.add_paragraph("Problema a resolver: Los atletas deben guardar sus entrenamientos de forma persistente y escuchar música sin salir de la app.\nSolución: Se utilizó ion-list con ion-item-sliding para el CRUD (deslizar para eliminar). Para el audio, se usó HTML5 Audio API integrando un file input oculto que permite cargar mp3 locales.")

doc.add_heading("Módulo 3: Mapa GPS - José Pérez", level=2)
doc.add_paragraph("Problema a resolver: Necesidad de trackear entrenamientos al aire libre.\nSolución: Integración de LeafletJS sobre un mapa base oscuro. El plugin @capacitor/geolocation obtiene las coordenadas y renderiza un marcador.")

doc.add_heading("Módulo 4: Perfil y Cámara - José Pérez", level=2)
doc.add_paragraph("Problema a resolver: Personalización del usuario con persistencia de foto y cálculo de peso.\nSolución: Se utilizó @capacitor/camera para tomar fotos directamente desde el hardware y almacenarlas en Base64 en Ionic Storage.")

# Pruebas
doc.add_heading("6. Pruebas y Despliegue", level=1)
table2 = doc.add_table(rows=1, cols=4)
table2.style = 'Table Grid'
hdr_cells2 = table2.rows[0].cells
hdr_cells2[0].text = '#'
hdr_cells2[1].text = 'Prueba realizada'
hdr_cells2[2].text = 'Resultado'
hdr_cells2[3].text = 'Observaciones'
tests = [
    ("1", "Consumo API frases y traducción", "Pasó", "La API responde rápido en el Dashboard."),
    ("2", "Deslizar para eliminar rutina", "Pasó", "El gesto nativo elimina el registro de Storage."),
    ("3", "Tomar foto de perfil", "Pasó", "La cámara nativa guarda la foto en Base64."),
    ("4", "Escaneo Bluetooth", "Pasó", "Abre el selector de dispositivos cercanos en Android."),
    ("5", "Reproducir MP3 local", "Pasó", "Controles play/pause funcionan sin interrupción.")
]
for n, pr, re, ob in tests:
    row_cells = table2.add_row().cells
    row_cells[0].text = n
    row_cells[1].text = pr
    row_cells[2].text = re
    row_cells[3].text = ob

# Conclusiones
doc.add_heading("7. Conclusiones", level=1)
doc.add_paragraph("Logros: Se alcanzó el desarrollo del 100% de los requerimientos exigidos (GPS, Cámara, Bluetooth, Storage, Multimedia, APIs, Componentes y Gestos), creando una aplicación sólida, fluida y escalable.\nLecciones aprendidas: La integración con hardware nativo usando Capacitor simplifica el flujo comparado a viejas herramientas como Cordova.\nTrabajo futuro: Implementar notificaciones push y un backend centralizado para crear una red social de atletas.")

# Referencias
doc.add_heading("8. Referencias APA", level=1)
doc.add_paragraph("Angular. (2025). Angular Documentation. Recuperado de https://angular.dev")
doc.add_paragraph("Ionic Framework. (2025). Ionic UI Components. Recuperado de https://ionicframework.com/docs")
doc.add_paragraph("Capacitor. (2025). Capacitor Native Plugins. Recuperado de https://capacitorjs.com/docs")
doc.add_paragraph("LeafletJS. (2025). Leaflet Documentation. Recuperado de https://leafletjs.com")
doc.add_paragraph("MDN Web Docs. (2025). HTMLAudioElement. Recuperado de https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement")

doc.save('C:\\Users\\jperez\\Desktop\\UnivAI\\Programacion Dispositivos Moviles\\ProyectoFinal\\Documento_Tecnico_Fit_by_JP.docx')
