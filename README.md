# 🌍 Toner Globe

A modern web application that displays OpenStreetMap data in an interactive 3D globe view using MapLibre GL JS, styled with a customizable monochromatic Toner theme featuring Japanese labels.

🔗 **Live Demo**: [https://optgeo.github.io/toner-globe/](https://optgeo.github.io/toner-globe/)

![Toner Globe Preview](https://img.shields.io/badge/MapLibre-GL%20JS-blue) ![Pkl](https://img.shields.io/badge/Apple-Pkl-orange) ![Vite](https://img.shields.io/badge/Vite-Build-purple) ![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green)

## ✨ Features

- 🌍 **3D Globe Mode**: Interactive globe visualization with atmosphere effects
- 🗺️ **Toner Style**: Elegant monochromatic design based on OpenStreetMap Japan Toner
- 🇯🇵 **Japanese Labels**: Prioritizes Japanese text rendering (`name:ja`) with English fallback
- 📐 **Type-Safe Configuration**: Uses Apple Pkl for maintainable style generation
- ⚡ **Fast Development**: Vite-powered development server with hot reload
- 📱 **Responsive UI**: Interactive controls for pitch, zoom, and projection modes
- 🚀 **Easy Deployment**: One-command deployment to GitHub Pages
- 🎯 **Modular Architecture**: Clean separation of styles, layers, and configuration

## 🎮 Interactive Controls

- **Globe/Mercator Toggle**: Switch between 3D globe and flat map projections
- **Pitch Control**: Adjust viewing angle from 0° to 60°
- **Zoom Control**: Fine-tune zoom levels with slider
- **Reset to Japan**: Quick navigation to Japan with smooth animation
- **Keyboard Shortcuts**:
  - `G` - Toggle globe mode
  - `R` - Reset view to Japan
  - `F` - Enter fullscreen mode

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Apple Pkl CLI ([Installation guide](https://pkl-lang.org/main/current/pkl-cli/index.html))

### Installation

```bash
# Clone the repository
git clone https://github.com/optgeo/toner-globe.git
cd toner-globe

# Install dependencies
npm install
```

### Development

```bash
# Generate style.json from modular Pkl configuration
make style
# or
npm run style:generate

# Start the development server
make dev
# or  
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

```bash
# Build the application for production
make build
# or
npm run build
```

Built files will be output to the `docs/` directory for GitHub Pages deployment.

## 🏗️ Project Structure

```plaintext
├── Makefile                   # Build commands and workflows
├── package.json              # Dependencies and npm scripts
├── vite.config.js            # Vite configuration
├── index.html                # Development entry point
├── main.js                   # Main application JavaScript
├── docs/                     # GitHub Pages deployment directory
│   ├── index.html           # Production HTML
│   └── style.json           # Generated MapLibre style
└── style-generation/         # Apple Pkl style configuration
    ├── style.pkl            # 🎯 Main modular style configuration
    ├── simple-style.pkl     # Simplified reference implementation
    ├── config/
    │   ├── Colors.pkl       # Color palette definitions
    │   └── Sources.pkl      # Vector tile source configurations
    └── layers/
        └── Basic.pkl        # Layer definitions and styling
```

## 📝 Style Configuration

This project uses **Apple Pkl** for type-safe, modular style configuration:

### Main Configuration Files

- **`style.pkl`**: Main modular style configuration with full layer support
- **`simple-style.pkl`**: Reference implementation with inline definitions
- **`config/Colors.pkl`**: Centralized color palette (monochromatic tones)
- **`config/Sources.pkl`**: OpenStreetMap Japan vector tile sources
- **`layers/Basic.pkl`**: Complete layer definitions for all map elements

### Generate Styles

```bash
# Generate from modular configuration (recommended)
make style

# Generate from simple configuration
npm run style:simple

# Validate generated style
npm run lint:style
```

### Style Features

- **Monochromatic Design**: Subtle grayscale tones for elegant appearance
- **Japanese Labels**: Automatic `name:ja` field usage with fallback
- **Performance Optimized**: Efficient layer definitions for smooth globe rendering
- **Globe-Friendly**: Designed specifically for 3D globe projection

## 📦 Available Commands

| Command | Description |
|---------|-------------|
| `make style` | Generate style.json from modular Pkl configuration |
| `make dev` | Start development server |
| `make build` | Build for production |
| `make deploy` | Deploy to GitHub Pages |
| `make clean` | Clean generated files |
| `make help` | Show available commands |

## 🛠️ Technologies

- **[MapLibre GL JS](https://maplibre.org/)**: Open-source map rendering engine
- **[Apple Pkl](https://pkl-lang.org/)**: Type-safe configuration language
- **[Vite](https://vitejs.dev/)**: Next-generation build tooling
- **[OpenStreetMap Japan](https://tile.openstreetmap.jp/)**: Vector tile data source
- **GitHub Pages**: Static site hosting

## 🎨 Design Philosophy

The Toner Globe design emphasizes:

- **Minimalism**: Clean, distraction-free cartographic representation
- **Accessibility**: High contrast and readable typography
- **Performance**: Optimized for smooth 3D globe interactions
- **Internationalization**: Japanese-first labeling with international fallbacks

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes to the Pkl configuration files
4. Test your changes with `make style && make dev`
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- OpenStreetMap Japan for providing excellent vector tile services
- MapLibre GL JS community for the powerful rendering engine
- Apple for creating the Pkl configuration language
- OpenStreetMap contributors worldwide

---

**Related**: This project is a reference implementation for [UNopenGIS/7#744](https://github.com/UNopenGIS/7/issues/744)
