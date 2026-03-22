# PAC 1: Eines HTML i CSS II - Ruta de les Garrigues

Aquest projecte consisteix en el disseny i desenvolupament d'una web "one-page" responsive sobre una ruta turística per la comarca de les Garrigues, centrada en la cultura de l'oli i el patrimoni de la pedra seca.

Realitzat per a l'assignatura d'**Eines HTML i CSS II** del Grau de Disseny i Desenvolupament de la UOC.

---

## 🔗 Enllaços del Projecte
- **URL de producció (Netlify):** [https://ruta-garrigues-albert.netlify.app](https://ruta-garrigues-albert.netlify.app)
- **Repositori a GitHub:** [https://github.com/atrullolsr/pac1-eines-html-css-2](https://github.com/atrullolsr/pac1-eines-html-css-2)

---

## 🛠️ Especificacions Tècniques

### 🎨 Arquitectura i Metodologia CSS
S'ha utilitzat la metodologia **BEM (Block Element Modifier)** per a l'organització de les classes CSS. Aquesta tria permet:
- Evitar conflictes de especificitat.
- Crear components modulars i reutilitzables.
- Mantenir un codi SCSS llegible i fàcil d'escalar.

### 🚀 Preprocessat i Eines
- **Sass (SCSS):** Ús intensiu de variables per a la paleta de colors i tipografies, nesting, mixins per a media queries i arquitectura de fitxers parcials.
- **Stylelint:** Configuració de linter segons els estàndards de la UOC per garantir la qualitat del codi i el compliment de les bones pràctiques.
- **Parcel:** Bundler utilitzat per a la compilació de recursos, optimització d'imatges i gestió del servidor de desenvolupament.

### 📦 Llibreries i Recursos
- **Leaflet & Leaflet-routing-machine:** Implementació del mapa interactiu amb càlcul de ruta i marcadors personalitzats de punts d'interès (POIs).
- **GLightbox:** Galeria d'imatges responsive per a la visualització del patrimoni de la pedra seca.
- **FontAwesome:** Iconografia detallada per a la navegació i els elements del mapa.

---

## 📂 Estructura del Projecte

/
├── src/
│   ├── assets/
│   │   ├── images/     # Imatges optimitzades de la ruta
│   │   ├── scripts/    # Lògica de Leaflet i GLightbox (main.js)
│   │   └── styles/     # Arquitectura SCSS (main.scss + parcials)
│   ├── views/          # Inclusions de header i footer
│   └── index.html      # Estructura principal del lloc
├── .stylelintrc.json   # Configuració del linter
├── package.json        # Dependències i scripts de build
└── README.md           # Documentació del projecte
⚙️ Instruccions de Desenvolupament
Per posar en marxa el projecte localment, cal tenir instal·lat Node.js i seguir aquests passos:

Instal·lar dependències:

Bash
npm install
Executar en mode desenvolupament:

Bash
npm run dev
La web estarà disponible a http://localhost:8123

Generar el paquet de producció:

Bash
npm run build
El codi optimitzat es generarà a la carpeta /dist.

Autor: Albert Trullols

Curs: 2025-2026

Assignatura: Eines HTML i CSS II (UOC)
