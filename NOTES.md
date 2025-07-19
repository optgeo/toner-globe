# Technical Details and Implementation Notes

This document contains technical implementation details, troubleshooting information, and development considerations for the MapLibre GL JS Globe Toner Site project.

## Project Overview

The application displays a 3D globe view centered on **Bishkek, Kyrgyzstan** (74.5698°E, 42.8746°N), showcasing Central Asian geography with a monochromatic Toner style design.

## Recent Development History

### Map Center Update (July 2025)

- **Geographic focus**: Changed from Japan to Central Asia, centered on Bishkek, Kyrgyzstan
- **Coordinate update**: Updated both style.pkl and main.js to use [74.5698, 42.8746]
- **Regional coverage**: Provides excellent view of Central Asian countries and Silk Road regions

### UI Simplification (July 2025)

- **Removed complex control panels**: Eliminated pitch/zoom sliders and toggle buttons for cleaner interface
- **Removed loading indicators**: Direct map loading for immediate user engagement  
- **Removed keyboard shortcuts**: Simplified interaction model focusing on native MapLibre controls
- **Added GlobeControl**: Integrated MapLibre GL JS 5.6.1's built-in globe/mercator switching

### Style Improvements

- **Country name priority**: Countries now display above states/cities with `text-allow-overlap: true`
- **Alpha transparency removal**: Replaced `rgba()` with `rgb()` values to prevent road overlap artifacts
- **Boundary filtering**: Excluded maritime (`maritime: 1`) and disputed (`disputed: 1`) boundaries
- **Thicker, lighter borders**: Country borders made more visible but less intrusive

### Build System Optimization

- **Clean asset naming**: Removed hash suffixes from built files (`main.js`, `main.css`)
- **Asset cleanup**: Prevent accumulation of old build files
- **Simplified deployment**: Consistent file names for better version control

## Project Structure

```text
├── Makefile                   # Build, test, and deployment commands
├── docs/                      # GitHub Pages static site output
│   ├── index.html            # Main application entry point
│   └── style.json            # Generated MapLibre style
├── style-generation/          # Apple Pkl style configuration
│   ├── style.pkl             # Modular style configuration (WIP)
│   ├── simple-style.pkl      # Complete style configuration
│   ├── config/               # Configuration modules
│   │   ├── Colors.pkl        # Color palette definitions
│   │   └── Sources.pkl       # Data source configurations
│   └── layers/               # Layer-specific modules
│       ├── Background.pkl    # Background layer definitions
│       └── Water.pkl         # Water feature layers
└── vite.config.js            # Vite build configuration
```

## Technical Implementation

### MapLibre GL JS Configuration

- **Globe Mode**: Enable 3D globe visualization with proper projection settings
- **Style Generation**: Type-safe map style configuration using Apple Pkl
- **Font Configuration**: Prioritize Japanese text rendering (`name:ja` → `name`)
- **Data Sources**: Vector tiles from OpenStreetMap Japan infrastructure

### Apple Pkl Configuration System

Using Apple Pkl provides type-safe, modular configuration for MapLibre GL styles:

### Modular Design

- `style.pkl`: Main entry point orchestrating all components
- `config/`: Shared configurations (colors, sources, fonts)
- `layers/`: Layer-specific configurations organized by type

### Type Safety Benefits

- **Compile-time validation**: Catches configuration errors before deployment
- **IntelliSense support**: Better IDE experience with auto-completion  
- **Schema enforcement**: Ensures valid MapLibre style output
- **Refactoring safety**: Changes propagate correctly across modules

### Pkl Advantages Over JSON

- **Comments and documentation**: Self-documenting configuration
- **Variable reuse**: DRY principle for colors, fonts, sizes
- **Conditional logic**: Dynamic configuration based on context
- **Imports/modules**: Better organization than monolithic JSON

## Technical Architecture

### Build Pipeline

```bash
style-generation/style.pkl → pkl eval → docs/style.json → MapLibre GL JS
```

### Style Development Workflow

1. **Edit Pkl files**: Modify style configuration with type safety
2. **Generate style**: `make style` compiles to JSON
3. **Preview changes**: `make dev` starts development server  
4. **Deploy**: `make build` creates production files in docs/

### Globe Performance Considerations

- **Vector tiles**: OpenStreetMap Japan provides efficient data delivery
- **Style optimization**: Pkl generates minimal, optimized JSON
- **Static hosting**: GitHub Pages serves pre-built assets efficiently
- **Globe rendering**: MapLibre GL JS handles 3D calculations natively

#### Expression Syntax Migration

**Problem**: MapLibre GL JS deprecated the `stops` syntax in favor of modern expression syntax.

**Solution**: Migrated from old syntax:

```pkl
// Old (deprecated)
["interpolate"] = new { "linear" }
["zoom"] = new { "zoom" }
["stops"] = new {
  new { 8; "rgba(0, 0, 0, 0.19)" }
  new { 10; "rgba(0, 0, 0, 0.6)" }
}
```

To new syntax:

```pkl
// New (current)
"interpolate"
new { "linear" }
new { "zoom" }
8; "rgba(0, 0, 0, 0.19)"
10; "rgba(0, 0, 0, 0.6)"
```

#### Step Expression Validation

**Problem**: Step expressions require an even number of arguments (input + stop/value pairs).

**Solution**: Ensure all `step` expressions have complete argument pairs:

```pkl
// Correct step expression
"step"
new { "zoom" }
0.7        // default value
5; 0.6     // zoom 5: value 0.6
14; 0.4    // zoom 14: value 0.4
```

### Makefile Commands

- `make style`: Generate `style.json` from Apple Pkl configuration
- `make dev`: Start Vite development server with hot reload
- `make build`: Build static site to `docs/` directory for GitHub Pages
- `make clean`: Remove generated files and build artifacts
- `make help`: Display all available commands
- `make deploy`: Update GitHub Pages deployment

### Data Sources

#### OpenStreetMap Japan Vector Tiles

- **Primary Source**: `https://tile.openstreetmap.jp/data/planet.json`
- **Takeshima**: `https://tile.openstreetmap.jp/data/takeshima.json`
- **Northern Territories**: `https://tile.openstreetmap.jp/data/hoppo.json`

#### Font and Sprite Resources

- **Glyphs**: `https://tile.openstreetmap.jp/fonts/{fontstack}/{range}.pbf`
- **Sprites**: `https://tile.openstreetmap.jp/styles/maptiler-toner-en/sprite`

## Common Issues and Solutions

### MapLibre Expression Errors

**Error**: `Expected an even number of arguments` in layer expressions

**Cause**: Incomplete `step` expressions missing final values

**Solution**: Ensure all `step` expressions have complete argument pairs

**Error**: Invalid `interpolate` syntax with `stops` property

**Cause**: Using deprecated MapLibre syntax

**Solution**: Migrate to modern expression syntax without `stops`

### Style Generation Issues

**Problem**: Pkl compilation errors with invalid syntax

**Solution**:

1. Validate Pkl syntax with `pkl eval`
2. Check for proper bracket matching
3. Ensure all expressions follow MapLibre specification

### Development Workflow

1. **Style Modification**: Edit `.pkl` files in `style-generation/`
2. **Generate Style**: Run `make style` to create `style.json`
3. **Development Server**: Run `make dev` for live testing
4. **Production Build**: Run `make build` for GitHub Pages deployment

## Performance Considerations

- **Vector Tiles**: Optimized for web delivery with appropriate zoom levels
- **Globe Rendering**: 3D rendering requires WebGL support
- **Style Complexity**: Balance visual quality with rendering performance

## Browser Compatibility

- **WebGL Support**: Required for MapLibre GL JS and globe mode
- **Modern Browsers**: Chrome 57+, Firefox 52+, Safari 10.1+
- **Mobile Support**: iOS 10.3+, Android 4.4+

## Dependencies

- **Node.js**: v14+ required for development
- **Apple Pkl CLI**: Required for style generation
- **MapLibre GL JS**: Core mapping library
- **Vite**: Build tool and development server

## See README.md for basic usage

[README.md](./README.md)
