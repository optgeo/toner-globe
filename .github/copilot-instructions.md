````instructions
# MapLibre GL JS Globe Toner Site - Central Asia Focus

A sophisticated 3D globe application showcasing Central Asian geography with comprehensive Toner-style cartographic layers. Built with MapLibre GL JS 5.6.1, Apple Pkl configuration system, and deployed via GitHub Pages.

## Current Project Status ✅

### 🌍 **Geographic Positioning**
- **Primary Focus**: Bishkek, Kyrgyzstan (74.5698°E, 42.8746°N)
- **Regional Coverage**: Central Asia, Silk Road regions
- **Optimal View**: Zoom level 4 provides excellent regional context

### 🗺️ **Implemented Features**
- **Globe Mode**: Full 3D globe visualization with MapLibre GL JS 5.6.1
- **Toner Style**: Comprehensive monochromatic design (~80% feature parity)
- **Advanced Layers**: Administrative boundaries, railways, waterways, buildings, land use
- **Japanese Labels**: Priority text rendering with `name:ja` → `name` fallback
- **Environment Compatibility**: Development/production path resolution
- **No Duplicate Layer IDs**: All conflicts resolved (landuse_detail, rail_line, building_fill)

### 🛠️ **Technical Architecture**

#### **Repository Structure**
```
├── Makefile                   # Build, test, deployment commands
├── docs/                      # GitHub Pages deployment target
│   ├── index.html            # Application entry point  
│   ├── style.json            # Generated MapLibre style (19KB)
│   └── assets/               # Built application assets
├── style-generation/          # Apple Pkl configuration system
│   ├── style.pkl             # Main comprehensive style (WIP: modular architecture)
│   ├── simple-style.pkl      # Complete working style configuration
│   ├── config/               # Shared configuration modules
│   │   ├── Colors.pkl        # Toner color palette definitions
│   │   └── Sources.pkl       # OpenStreetMap Japan data sources
│   └── layers/               # Layer-specific configurations
│       ├── Background.pkl    # Background layer definitions
│       ├── Base.pkl          # Base map layers
│       ├── Basic.pkl         # Basic geographic features
│       ├── Boundaries.pkl    # Administrative boundaries
│       ├── Buildings.pkl     # Building footprints
│       ├── Labels.pkl        # Text label configurations
│       ├── Transportation.pkl # Roads, railways, transit
│       └── Water.pkl         # Waterways, water bodies
├── main.js                   # MapLibre GL JS application logic
├── vite.config.js            # Vite build configuration
└── package.json              # Dependencies and scripts
```

#### **Build System**
- **Apple Pkl**: Type-safe, modular style configuration with compile-time validation
- **Vite**: Modern build tool with HMR for development
- **GitHub Pages**: Static site deployment from `docs/` directory
- **Environment Detection**: Automatic path resolution for dev/production

#### **Data Sources**
- **Primary Vector Tiles**: OpenStreetMap Japan (`https://tile.openstreetmap.jp/data/planet.json`)
- **Territory Coverage**: Takeshima, Northern Territories datasets
- **Fonts**: Japanese-prioritized glyph rendering
- **Sprites**: Optimized icon resources

### 🎯 **Enhanced Toner Style Features**

#### **Administrative Boundaries**
```pkl
// State/province level boundaries with filtering
"source": "planet"
"source-layer": "boundary"
"filter": ["all",
    ["==", "admin_level", 4],
    ["!=", "maritime", 1],
    ["!=", "disputed", 1]
]
"paint": {
    "line-color": "#999999"
    "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.8, 10, 2]
}
```

#### **Transportation Networks**
```pkl
// Railway lines with hatching pattern
"paint": {
    "line-color": "#333333" 
    "line-width": ["step", ["zoom"], 0.7, 5, 0.6, 14, 0.4]
    "line-dasharray": [3, 3] // Hatching effect
}
```

#### **Building Footprints**
```pkl
// Zoom-dependent building visualization
"paint": {
    "fill-color": "#dddddd"
    "fill-opacity": ["interpolate", ["linear"], ["zoom"], 
        13, 0.3,    // Subtle at medium zoom
        16, 0.8     // Prominent at high zoom
    ]
}
```

#### **Land Use Classifications**
```pkl
// Detailed land use with transparency
"paint": {
    "fill-color": ["case",
        ["==", ["get", "class"], "residential"], "#f0f0f0",
        ["==", ["get", "class"], "commercial"], "#e8e8e8", 
        ["==", ["get", "class"], "industrial"], "#e0e0e0",
        "#f5f5f5" // default
    ]
    "fill-opacity": 0.6
}
```

### 🔧 **Available Commands**

#### **Development**
```bash
make dev          # Start development server with HMR
make style        # Generate style.json from Pkl configuration  
npm run style:simple  # Use simple-style.pkl for testing
```

#### **Production**
```bash
make build        # Build static site to docs/
make deploy       # Deploy to GitHub Pages
make clean        # Clean generated files
```

#### **Validation**
```bash
npm run lint:style    # Validate generated style.json
jq '.' docs/style.json   # Pretty-print style for inspection
```

### ⚠️ **Known Limitations & Future Work**

#### **Modular Architecture (In Progress)**
- `style.pkl` modular system under development
- `simple-style.pkl` serves as working reference implementation
- Layer module organization needs completion

#### **Performance Considerations**
- Large style.json size (19KB) - consider layer optimization
- Globe rendering requires WebGL support
- Vector tile loading performance at high zoom levels

#### **Missing Toner Features (~20%)**
- Advanced label collision detection
- Detailed POI (Points of Interest) categories  
- Fine-tuned typography scaling
- Advanced road classification styling

### 🔍 **Debugging & Maintenance**

#### **Common Issues**
1. **Duplicate Layer IDs**: Resolved - use unique identifiers (landuse_detail, rail_line, building_fill)
2. **Path Resolution**: Environment-aware `getStylePath()` function handles dev/prod
3. **MapLibre Errors**: Check browser console for expression validation issues

#### **Style Development Workflow**
1. Edit `.pkl` files in `style-generation/`
2. Run `make style` to generate JSON
3. Test with `make dev`
4. Deploy with `make build && make deploy`

#### **Troubleshooting**
```bash
# Validate Pkl syntax
pkl eval style-generation/style.pkl

# Check for duplicate layer IDs  
jq '.layers[] | .id' docs/style.json | sort | uniq -d

# Monitor development server
tail -f /tmp/vite-dev.log
```

### 📊 **Project Metrics**
- **Style Complexity**: 19KB JSON, ~80% Toner feature parity
- **Layer Count**: Administrative, transportation, water, buildings, land use
- **Geographic Scope**: Central Asia with Bishkek focus
- **Build Performance**: Sub-second Pkl compilation
- **Browser Support**: Modern browsers with WebGL

### 🚀 **Deployment Status**
- **GitHub Pages**: Active deployment from `docs/` directory
- **CDN**: Optimized asset delivery
- **HTTPS**: Secure content delivery
- **Mobile**: Responsive design with touch controls

This project represents a sophisticated implementation of modern web cartography, combining type-safe configuration management with advanced 3D visualization capabilities for Central Asian geographic data.

````
