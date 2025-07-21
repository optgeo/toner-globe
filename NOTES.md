# MapLibre GL JS Toner Globe - Architecture Notes

## Overview
This project generates a MapLibre GL JS style for a globe-focused Toner cartographic style with emphasis on Central Asian geography.

## Development Process

This project was developed with significant assistance from **GitHub Copilot Agent Mode** using the **Claude Sonnet 4** model. The AI provided comprehensive support for:

- Apple Pkl configuration architecture and type-safe color system design
- MSX 16-color palette implementation and hierarchical color organization  
- MapLibre GL JS expression optimization and layer configuration refinement
- Build system integration with GitHub Pages deployment automation

## Current Architecture (Simplified)

### Project Structure
```
### Project Structure
```text
toner-globe/
├── style-generation/           # Style configuration
│   └── style.pkl              # Main style definition (ACTIVE)
├── docs/                      # GitHub Pages deployment
│   └── style.json            # Generated style file
├── public/                    # Build output
│   └── style.json            # Generated style file
├── main.js                   # MapLibre GL JS application
├── Makefile                  # Build commands
└── package.json              # Dependencies and scripts
```

### File Descriptions

#### `style-generation/style.pkl` (Primary File)
- **Purpose**: Main style configuration file that generates the active `style.json`
- **Format**: Apple Pkl configuration language
- **Features**:
  - Comprehensive Toner-style layers
  - Japanese localization priority (`name:ja` → `name` fallback)
  - Hierarchical label transparency (Country: 100%, City: 50%, State: 40%)
  - Zoom-responsive typography with interpolated sizing
  - Central Asia geographic focus (Bishkek center: 74.5698°E, 42.8746°N)
```

### File Descriptions

#### `style-generation/style.pkl` (Primary File)
- **Purpose**: Main style configuration file that generates the active `style.json`
- **Format**: Apple Pkl configuration language
- **Features**:
  - Comprehensive Toner-style layers
  - Japanese localization priority (`name:ja` → `name` fallback)
  - Hierarchical label transparency (Country: 100%, City: 50%, State: 40%)
  - Zoom-responsive typography with interpolated sizing
  - Central Asia geographic focus (Bishkek center: 74.5698°E, 42.8746°N)

### Build System

#### Commands
```bash
make style      # Generate style.json from style.pkl
make dev        # Start development server
make build      # Build for production deployment
```

#### Process Flow
1. `style.pkl` → `public/style.json` (Pkl evaluation)
2. `public/style.json` → `docs/style.json` (GitHub Pages copy)
3. MapLibre GL JS loads `./style.json` or `/style.json` (environment-aware)

### Style Configuration Details

#### Data Sources
- **Primary**: OpenStreetMap Japan vector tiles
- **Territorial**: Takeshima and Hoppo datasets
- **Fonts**: Noto Sans JP + Open Sans (Japanese priority)
- **Sprites**: MapTiler Toner sprite set

#### Layer Hierarchy (Bottom to Top)
1. **Background**: White (#fff)
2. **Water Features**: Semi-transparent fills and waterways
3. **Land Use**: Subtle patterns for parks, residential areas
4. **Transportation**: Roads, railways with zoom-dependent visibility
5. **Boundaries**: Administrative borders (state/country levels)
6. **Buildings**: Footprint visualization at high zoom
7. **Labels**: Hierarchical text with Japanese localization

#### Label Typography System
```pkl
// Country labels (highest priority)
text-color: "rgba(0, 0, 0, 1.0)"    // 100% opacity
text-size: [
  2: 9.6,   // 20% larger than original 8
  5: 13.2,  // 20% larger than original 11
  7: 20.4   // 20% larger than original 17
]

// State/Province labels
text-color: "rgba(0, 0, 0, 0.4)"    // 40% opacity

// City labels  
text-color: "rgba(0, 0, 0, 0.5)"    // 50% opacity
```

### Globe Configuration
- **Projection**: `'globe'` with automatic GlobeControl activation
- **Default State**: Globe mode enabled on map load
- **Fallback**: Mercator projection for compatibility

### Deployment
- **Platform**: GitHub Pages
- **URL**: Served from `docs/` directory
- **CDN**: Static asset delivery
- **HTTPS**: Secure content delivery

## Decision History

### Modularization Abandonment (2025-07-20)
- **Reason**: Multiple attempts at Pkl module system resulted in syntax errors and import issues
- **Solution**: Simplified to monolithic `.pkl` files with inline definitions
- **Benefit**: Reduced complexity, guaranteed build reliability
- **Trade-off**: Some code duplication accepted for stability

### File Cleanup (2025-07-20)
- **Removed**: `layers/`, `config/`, `simple-style.pkl`, experimental modular files
- **Kept**: Working `style.pkl` as single source of truth
- **Result**: Simplified single-file style generation system

### Label Hierarchy Implementation (2025-07-20)
- **Country Labels**: Enhanced to 20% larger font size, 100% opacity
- **Other Labels**: Reduced opacity for visual hierarchy (State: 40%, City: 50%)
- **Result**: Clear geographic information prioritization

## Development Guidelines

### Making Style Changes
1. Edit `style-generation/style.pkl`
2. Run `make style` to regenerate
3. Test with `make dev`
4. Deploy with `make build`

### Color Adjustments
- Use `rgba()` values for transparency control
- Maintain label hierarchy (Country > City > State)
- Test across zoom levels 2-18

### Performance Considerations
- Monitor style.json size (~20KB currently)
- Vector tile efficiency at high zoom levels
- Globe rendering WebGL requirements

## Technical Notes

### Environment Path Resolution
```javascript
const getStylePath = () => {
    return import.meta.env.DEV ? '/style.json' : './style.json';
};
```

### Known Limitations
- Globe mode requires modern WebGL support
- Japanese font loading depends on external CDN
- Some Toner features simplified for performance

This architecture prioritizes reliability and maintainability over modular complexity, ensuring consistent style generation and deployment.

## Style.pkl Complexity Analysis and Reduction Strategy

### Current File Statistics
- **Total lines**: 691 lines
- **Layer definitions**: ~20 major layer groups
- **Complexity indicators**: 212 `new {}` object instantiations

### Complexity Reduction Strategies

#### 1. Layer Consolidation (Immediate Impact)
**Target**: Merge similar layer definitions
```pkl
// BEFORE: Separate layers for each road type
// road-secondary, road-primary, highway-casing, highway-center

// AFTER: Single parameterized road layer with expressions
new {
  ["id"] = "roads"
  ["type"] = "line"
  ["filter"] = new { "in"; "class"; "trunk"; "primary"; "secondary"; "tertiary" }
  ["paint"] = new {
    ["line-width"] = new {
      "interpolate"
      new { "linear" }
      new { "zoom" }
      5; new { "case"; new { "=="; new { "get"; "class" }; "trunk" }; 3; 1 }
      18; new { "case"; new { "=="; new { "get"; "class" }; "trunk" }; 24; 8 }
    }
  }
}
```

#### 2. Filter Expression Simplification
**Target**: Reduce complex nested filter conditions
```pkl
// BEFORE: Multiple condition checks
["filter"] = new {
  "all"
  new { "!="; "brunnel"; "tunnel" }
  new { "=="; "$type"; "Polygon" }
  new { "!="; "intermittent"; 1 }
}

// AFTER: Single expression-based filter
["filter"] = new { "!"; new { "in"; "brunnel"; "tunnel" } }
```

#### 3. Paint Property Optimization
**Target**: Reduce repetitive style definitions
```pkl
// Define common style constants at file top
local commonColors = new {
  water = "#E8F4F8"
  land = "#FEFEFE"  
  boundary = "#B3B3B3"
  text = "#333333"
}

// Use throughout layers
["background-color"] = commonColors.land
```

#### 4. Interpolation Function Reuse
**Target**: Create reusable zoom-based functions
```pkl
// Define at top level
local zoomWidthInterpolation = (minWidth: Number, maxWidth: Number) -> new {
  "interpolate"
  new { "linear" }
  new { "zoom" }
  5; minWidth
  18; maxWidth
}

// Use in layers
["line-width"] = zoomWidthInterpolation(1, 8)
```

### Estimated Complexity Reduction
- **Lines**: 691 → ~400 lines (-42%)  
- **Layer objects**: 20 → ~12 layers (-40%)
- **Maintainability**: Significantly improved through constants and functions
- **Build performance**: Faster Pkl evaluation

### Implementation Priority
1. **Phase 1**: Consolidate road layers (immediate 20% reduction)
2. **Phase 2**: Extract common style constants (improved maintainability)  
3. **Phase 3**: Optimize filter expressions (performance improvement)
4. **Phase 4**: Create reusable interpolation functions (code reuse)

### Risk Assessment
- **Low Risk**: Layer consolidation and constant extraction
- **Medium Risk**: Filter expression changes (requires thorough testing)
- **Testing Required**: Visual comparison before/after each phase

This reduction strategy maintains full visual fidelity while significantly improving code maintainability and reducing complexity.  
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
│   ├── style.pkl             # Main style configuration
│   ├── constants.pkl         # MSX color palette and constants
│   └── classes.pkl           # Reusable layer class definitions
├── public/                    # Build output
│   └── style.json            # Generated style file
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
