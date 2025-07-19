# Generate MapLibre GL JS Globe Toner Site with Vite and Host via GitHub Pages

Create a MapLibre GL JS site that references [this OpenStreetMap Japan Toner style.json](https://tile.openstreetmap.jp/styles/maptiler-toner-en/style.json). The site will be built using Vite and output as a static site in the `docs` directory to be hosted via GitHub Pages.

## Tasks

1. Enable **globe mode** in MapLibre GL JS.
2. Generate `style.json` in the `generate-style` directory based on **Apple Pkl description**.
3. Complete the description to replicate the referenced `style.json`.
   - Switch fonts.
   - Use text from `name:ja` instead of `name:latin`.

## Technical Implementation

### Repository Structure
```
├── Makefile                   # All commands for build, test, and deployment
├── docs/                      # GitHub Pages static site directory
│   ├── index.html            # Main entry point for the application
│   └── style.json            # Generated MapLibre style 
├── style-generation/          # Apple Pkl style generation
│   ├── style.pkl             # Main style configuration entry point
│   ├── config/
│   │   ├── Colors.pkl        # Color palette definitions
│   │   └── Sources.pkl       # Data source configurations
│   └── layers/
└── vite.config.js            # Vite configuration for static site generation
```

### Makefile Commands
- `style`: Generate style.json from Apple Pkl configuration
- `dev`: Start Vite development server
- `build`: Build static site to docs directory
- `clean`: Clean generated files
- `help`: Display available commands
- `deploy`: Update GitHub Pages

### MapLibre Configuration
- **Globe Mode**: Configure MapLibre GL JS with proper terrain and 3D visualization settings
- **Style Generation**: Use Apple Pkl for type-safe configuration of map styles
- **Font Configuration**: Update text rendering to prioritize Japanese text
- **Sources**: Configure vector tile sources from OpenStreetMap Japan

## Dependencies
- Node.js & npm
- Apple Pkl CLI
- MapLibre GL JS
- Vite

## Expected Output
A web application that displays a globe view of OpenStreetMap data with Japanese labels, styled similar to the OpenStreetMap Japan Toner style but with customizations as specified.

## See also
This is a copy of https://github.com/UNopenGIS/7/issues/744
