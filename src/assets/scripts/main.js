/**
 * Import dependencies
 */
import '../styles/main.scss';
import '@fortawesome/fontawesome-free/css/all.min.css';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import L, { icon } from 'leaflet';
import 'leaflet-routing-machine'; // <--- IMPORTANT: Necessites aquesta importació
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

/**
 * Lògica de l'aplicació
 */
document.addEventListener('DOMContentLoaded', () => {
  console.log("Hello, UOC!");

  initMobileMenu();
  initLightbox();
  initMap();
});

/**
 * Gestió del menú hamburguesa
 */
function initMobileMenu() {
  const navToggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  const navLinks = document.querySelectorAll('.nav__link');

  if (!navToggle || !navList) return;

  // Obrir/Tancar menú en fer clic a l'hamburguesa
  navToggle.addEventListener('click', () => {
    navList.classList.toggle('nav__list--open');
    navToggle.classList.toggle('nav--active');

    // Opcional: Evitar que el fons es mogui quan el menú està obert
    document.body.style.overflow = navList.classList.contains('nav__list--open') ? 'hidden' : '';
  });

  // Tancar el menú automàticament quan es clica un enllaç
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('nav__list--open');
      navToggle.classList.remove('nav--active');
      document.body.style.overflow = ''; // Restablir el scroll
    });
  });
}

function initLightbox() {
  GLightbox({
    selector: '.glightbox',
    width: '500px',    // Amplada forçada
    height: 'auto',    // Alçada automàtica per no deformar
    zoomable: true,
    draggable: true
  });
}
function initMap() {
  const mapContainer = document.getElementById('map');
  if (!mapContainer) return;

  const map = L.map('map').setView([41.530, 0.895], 12);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Configuració de la ruta ajustada als centres dels pobles
  L.Routing.control({
    waypoints: [
      L.latLng(41.5187, 0.8681),  // 1. Les Borges Blanques
      L.latLng(41.4235, 0.9373),  // 2. L'Albi
      L.latLng(41.4691, 0.9754),  // 3. Vinaixa
      L.latLng(41.5113, 0.9208),  // 4. La Floresta
      L.latLng(41.5411, 0.9234),  // 5. Arbeca
      L.latLng(41.5688, 0.9542)   // 6. Els Vilars (Final)
    ],
    lineOptions: {
      styles: [
        { color: 'var(--white-color)', weight: 8, opacity: 0.8 },
        { color: 'var(--map-route-color)', weight: 6, opacity: 0.6 }
      ]
    },
    createMarker: () => null,
    addWaypoints: false,
    show: false
  }).addTo(map);

  const createCustomIcon = (iconClass, color) => {
    return L.divIcon({
      // Fem servir el paràmetre 'color' directament a l'estil inline
      html: `
      <div style="display: flex; justify-content: center; align-items: center; width: 30px; height: 30px;">
        <i class="${iconClass}" style="font-size: 25px; color: ${color}; filter: drop-shadow(0 2px 2px rgba(0,0,0,0.3));"></i>
      </div>`,
      className: 'custom-leaflet-icon',
      iconSize: [30, 30],
      iconAnchor: [15, 30],
      popupAnchor: [0, -30]
    });
  };

  // 1. MARCADORS DELS POBLES (Dades reals de les Garrigues)
  const pobles = [
    { nom: "Les Borges Blanques", coords: [41.5187, 0.8681], desc: "Capital de la comarca i centre mundial de l'Oli d'Oliva Verge Extra." },
    { nom: "L'Albi", coords: [41.4235, 0.9373], desc: "Vila amb un nucli antic d'origen medieval i les restes d'un castell del s. XII." },
    { nom: "Vinaixa", coords: [41.4291, 0.9754], desc: "Famosa per la seva pedra de qualitat i l'església de Sant Joan Baptista." },
    { nom: "La Floresta", coords: [41.5113, 0.9208], desc: "Destaca pel seu castell gòtic-renaixentista i l'antiga destil·leria." },
    { nom: "Arbeca", coords: [41.5411, 0.9234], desc: "Bressol de l'oliva arbequina i seu del potentat castell dels Ducs de Cardona." }
  ].forEach(c => {
    L.marker(c.coords, { icon: createCustomIcon('fa-solid fa-location-dot', 'var(--primary-color)') })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif;">
          <strong style="color: var(--primary-color);">${c.nom}</strong><br>
          <hr style="margin: 5px 0">
          ${c.desc}
        </div>`);
  });

  // 2. MARCADORS DELS POIs (Punts d'interès específics)
  const pois = [
    { nom: 'El Terrall', coords: [41.5193, 0.8672], poble: "Les Borges Blanques", icon: 'fa-solid fa-tree', desc: "Pulmó verd amb basses històriques i premses d'oli monumentals." },
    { nom: "Església de l'Assumpta", coords: [41.5218, 0.8676], poble: "Les Borges Blanques", icon: 'fa-solid fa-church', desc: "Majestuosa construcció neoclàssica amb el seu emblemàtic campanar vuitavat." },
    { nom: 'Castell de la Floresta', coords: [41.5105, 0.9213], poble: "La Floresta", icon: 'fa-solid fa-chess-rook', desc: "Antic castell-palau que conserva uns excepcionals sostres de fusta policromada." },
    { nom: "Castell d'Arbeca", coords: [41.5418, 0.9248], poble: "Arbeca", icon: 'fa-solid fa-building-columns', desc: "Antiga residència dels Ducs de Cardona, lligada a l'origen de l'oliva arbequina." },
    { nom: 'Vilars d’Arbeca', coords: [41.5688, 0.9542], poble: "Arbeca", icon: 'fa-solid fa-monument', desc: "Fortalesa de l'Edat del Ferro única a Europa pel seu sistema defensiu i fossat." }
  ].forEach(c => {
    L.marker(c.coords, { icon: createCustomIcon(c.icon, 'var(--accent-color)') })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif;">
          <strong style="color: var(--accent-color);">${c.nom}</strong><br>
          <small>${c.poble}</small>
          <hr style="margin: 5px 0;">
          ${c.desc}
        </div>`);
  });

  // 3. MARCADORS DE LES CABANES (Pedra Seca)
  const cabanes = [
    { nom: "Cabana de Cal Quintillà", coords: [41.5123, 0.8879], poble: "Les Borges Blanques", desc: "Dues plantes i arc de descàrrega sobre la llinda." },
    { nom: "Cabana de Cal Cintet", coords: [41.4266, 0.9442], poble: "L'Albi", desc: "Data de 1898. Coberta amb 4 grans lloses." },
    { nom: "Cabana de Cal Jaume Càndio", coords: [41.4239, 0.9439], poble: "L'Albi", desc: "Falsa cúpula amb habitacle i estable separats." },
    { nom: "Cabana de Joan Miró", coords: [41.4542, 0.9658], poble: "Vinaixa", desc: "Volta apuntada de 35 filades i lliris al sostre." },
    { nom: "Cabana d'Isidre Mas", coords: [41.4568, 0.9654], poble: "Vinaixa", desc: "Volta de canó amb llar de foc i 4 armaris integrats." },
    { nom: "Aljub d'Isidre Mas", coords: [41.4561, 0.9652], poble: "Vinaixa", desc: "Aljub cavat a la roca per recollir aigua de pluja." },
    { nom: "Cabana de Víctor Guasch", coords: [41.4571, 0.9668], poble: "Vinaixa", desc: "Utilitzada per picapedrers, amb taula i pica de pedra." },
  ].forEach(c => {
    // Hem canviat 'fas fa-house-chimney' per una icona que recordi més a pedra/construcció si vols,
    // però 'fa-house-chimney' és la que millor representa una cabana petita.
    L.marker(c.coords, { icon: createCustomIcon('fa-solid fa-house-chimney', 'var(--secondary-color)') })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif;">
          <strong style="color: var(--secondary-color);">${c.nom}</strong><br>
          <small>${c.poble}</small>
          <hr style="margin: 5px 0;">
          ${c.desc}
        </div>`);
  });

  // 4. MARCADORS D'ALTRES POBLES (Visites recomanades)
  const altresPobles = [
    { nom: "El Cogul", coords: [41.4669, 0.6889], icon: 'fa-solid fa-palette', desc: "Pintures rupestres de la Roca dels Moros, Patrimoni Mundial per la UNESCO." },
    { nom: "La Granadella", coords: [41.3562, 0.6657], icon: 'fa-solid fa-droplet', desc: "Conegut com el mirador de les Garrigues i la Catedral de l'Oli." },
    { nom: "L'Espluga Calba", coords: [41.4950, 1.0035], icon: 'fa-solid fa-chess-rook', desc: "Destaca el seu castell que va pertànyer a l'Orde de Malta." }
  ].forEach(c => {
    // Fem servir un color lila o blau per diferenciar-los de la ruta principal
    L.marker(c.coords, {
      icon: createCustomIcon(c.icon, 'var(--map-poi-color)') // Un color lila elegant
    })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: sans-serif;">
          <strong style="color: var(--map-poi-color);">${c.nom}</strong><br>
          <small>Visita recomanada</small>
          <hr style="margin: 5px 0;">
          ${c.desc}
        </div>`);
  });

  setTimeout(() => { map.invalidateSize(); }, 200);
}