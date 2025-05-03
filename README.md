# Cinema Finder

Interactive React app with Leaflet & MapLibre maps to locate cinemas by franchise and area, featuring click-to-zoom markers and pop-up details.

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/) (>=14.x)
* [Yarn](https://yarnpkg.com/getting-started/install)

### Installation

```bash
git clone https://github.com/your-username/cinema-finder.git
cd cinema-finder
yarn install
```

### Running Locally

```bash
yarn start
```

Runs the app in development mode at `http://localhost:3000`. The page will reload on code changes.

### Building for Production

```bash
yarn build
```

Generates optimized static files in the `build/` directory.

## Features

* **Interactive Map**
  Toggle between Leaflet and MapLibre renderers.
* **Click-to-Zoom Markers**
  Click a cinema marker to fly to its location and open a detail popup.
* **Franchise & Country Filter**
  Browse by major cinema chains (e.g. BCC, Event) and country (AU, NZ).
* **Nearby Cinemas**
  View cinemas around your current location.
* **Responsive Layout**
  Two-column design: map on the left, cinema list on the right (full-height).

## Key Dependencies

* **React**
* **react-leaflet** / **leaflet**
* **react-map-gl** / **maplibre-gl**
* **@mui/material** (Material-UI)
* **react-router-dom**
* **notistack** (snackbars)

## License

This project is licensed under the MIT License.
