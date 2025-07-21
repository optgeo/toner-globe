# 🌍 Toner Globe

A modern web application that displays OpenStreetMap data in an interactive 3D globe view using MapLibre GL JS, styled with an MSX Color Palette-inspired Toner theme featuring Japanese labels. The application showcases Central Asia, centered on Bishkek, Kyrgyzstan.

🔗 **Live Demo**: [https://optgeo.github.io/toner-globe/](https://optgeo.github.io/toner-globe/)
📂 **Repository**: [https://github.com/optgeo/toner-globe](https://github.com/optgeo/toner-globe/)

![Toner Globe Preview](https://img.shields.io/badge/MapLibre-GL%20JS-blue) ![Pkl](https://img.shields.io/badge/Apple-Pkl-orange) ![Vite](https://img.shields.io/badge/Vite-Build-purple) ![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green)

## ✨ Features

- 🌍 **3D Globe Mode**: Interactive globe visualization with atmosphere effects
- 🎮 **MSX Color Palette**: Retro-inspired color scheme based on classic MSX computer colors
- 🗺️ **Refined Toner Style**: Elegant monochromatic design with selective color accents
- 🇰🇬 **Central Asia View**: Centered on Bishkek, Kyrgyzstan, showcasing Central Asian geography
- 🇯🇵 **Japanese Labels**: Prioritizes Japanese text rendering (`name:ja`) with English fallback
- 📐 **Type-Safe Configuration**: Uses Apple Pkl for maintainable modular style generation
- ⚡ **Fast Development**: Vite-powered development server with hot reload
- 📱 **Clean Interface**: Minimalist design focusing on the map content
- 🌐 **Globe Controls**: Built-in projection switching between Globe and Mercator modes
- 🚀 **Easy Deployment**: One-command deployment to GitHub Pages
- 🎯 **Modular Architecture**: Clean separation of styles, layers, and configuration
- 🗾 **Smart Boundary Display**: Color-coded boundaries with hierarchical emphasis

## 🎮 Interactive Controls

- **Globe/Mercator Toggle**: Switch between 3D globe and flat map projections using built-in MapLibre GlobeControl
- **Navigation Controls**: Zoom, rotation, and pitch adjustment with standard MapLibre controls
- **Scale Display**: Metric distance scale indicator
- **Clean UI**: No complex control panels - focus on the map itself

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

## 🏗️ Architecture

The project follows a modular architecture with type-safe configuration management:

### Core Files

- **`index.html`** - Main HTML entry point with MapLibre container
- **`main.js`** - JavaScript application logic with MapLibre initialization
- **`style.json`** - Generated MapLibre GL style (auto-generated from Pkl)
- **`vite.config.js`** - Vite build configuration for development and production

### Configuration System

- **`style.pkl`** - Main style configuration (567 lines) defining layers and visual properties
- **`constants.pkl`** - MSX Color Palette definitions (110 lines) and color abstractions
- **`classes.pkl`** - Reusable layer class definitions (31 lines) for DRY architecture
- **`Makefile`** - Build automation for Pkl compilation and deployment

### MSX Color Palette

The application uses a carefully curated MSX-inspired color scheme:

#### Primary Colors

- **Water**: `darkBlue` (#3C5EB8) - Deep ocean blue
- **Land**: `white` (#FFFFFF) - Clean monochromatic base
- **Boundaries**: Red hierarchy - Country (#FC7753) to State (#B75E51)
- **Labels**: Monochromatic hierarchy - Black to light gray (#999999)

#### Technical Implementation

Based on the standard MSX 16-color palette ([reference](https://paulwratt.github.io/programmers-palettes/HW-MSX/HW-MSX-palettes.html)):

```pkl
msxColors = new Mapping {
  ["black"] = "#000000"
  ["darkBlue"] = "#3C5EB8" 
  ["green"] = "#3EBF3E"
  ["lightBlue"] = "#7FC8FF"
  ["darkRed"] = "#B75E51"
  ["magenta"] = "#D85295"
  ["brown"] = "#A68C5B"
  ["lightGray"] = "#CCCCCC"
  ["darkGray"] = "#666666"
  ["lightGreen"] = "#3EFF3E"
  ["lightYellow"] = "#FFFF85"
  ["lightRed"] = "#FC7753"
  ["pink"] = "#FF8ECC"
  ["yellow"] = "#D9D852"
  ["white"] = "#FFFFFF"
  ["gray"] = "#999999"
}
```

## 📝 Style Configuration

This project uses **Apple Pkl** for type-safe, modular style configuration:

### Main Configuration Files

- **`style.pkl`**: Main style configuration with comprehensive layer support

### Generate Styles

```bash
# Generate style.json from style.pkl
make style

# Validate generated style
npm run lint:style
```

### Style Features

- **Monochromatic Design**: Subtle grayscale tones for elegant appearance
- **Japanese Labels**: Automatic `name:ja` field usage with fallback
- **Performance Optimized**: Efficient layer definitions for smooth globe rendering
- **Globe-Friendly**: Designed specifically for 3D globe projection
- **Smart Boundaries**: Maritime and disputed boundaries excluded for cleaner visualization
- **Hierarchy Labels**: Countries prioritized over states/cities for clear identification
- **Optimized Roads**: Solid colors without alpha transparency to prevent overlapping artifacts
- **Clean Build**: Simple asset names without hash suffixes for better version control

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

## 🤖 Development Process

This project was developed using **GitHub Copilot Agent Mode** in Visual Studio Code with the **Claude Sonnet 4** model. The AI assistant provided comprehensive support for:

- **Configuration Architecture**: Designing the modular Pkl-based style system
- **MSX Color Palette Integration**: Implementing retro-inspired color schemes
- **Code Optimization**: Reducing configuration complexity from 624 to 707 lines with improved maintainability
- **Documentation**: Generating comprehensive technical documentation
- **Build System**: Setting up efficient development and deployment workflows

The combination of GitHub Copilot's contextual understanding and Claude Sonnet 4's advanced reasoning capabilities enabled rapid prototyping and iterative refinement of the cartographic design system.

## 🎨 Design Philosophy

The Toner Globe design emphasizes:

- **Minimalism**: Clean, distraction-free cartographic representation
- **Accessibility**: High contrast and readable typography
- **Performance**: Optimized for smooth 3D globe interactions
- **Internationalization**: Japanese-first labeling with international fallbacks
- **Geographic Clarity**: Smart boundary filtering to avoid political complexity
- **Label Hierarchy**: Countries always visible, with states and cities as secondary information
- **Visual Consistency**: Solid colors and clean lines without transparency artifacts

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
