import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// ローディング表示を非表示にする関数
function hideLoading() {
    const loadingEl = document.getElementById('loading');
    if (loadingEl) {
        loadingEl.style.display = 'none';
    }
}

// MapLibre GL JSマップの初期化
const map = new maplibregl.Map({
    container: 'map',
    style: './docs/style.json', // モジュラー生成されたスタイル
    center: [138.7274, 35.3606], // 日本の中心
    zoom: 4, // 日本全体が見える適切なズーム
    pitch: 45, // 立体的な視点
    bearing: 0,
    projection: 'globe', // 地球儀モード
    antialias: true,
    maxZoom: 18,
    minZoom: 0.5,
    hash: true // URL同期
});

// 地球儀モードの状態管理
let isGlobeMode = true;

// コントロール要素の取得
const pitchControl = document.getElementById('pitchControl');
const pitchValue = document.getElementById('pitchValue');
const zoomControl = document.getElementById('zoomControl');
const zoomValue = document.getElementById('zoomValue');
const globeToggle = document.getElementById('globeToggle');
const resetView = document.getElementById('resetView');

// マップ読み込み完了時の処理
map.on('load', () => {
    console.log('🌍 Toner Globe loaded successfully');
    hideLoading();
    
    // 地球儀の大気圏効果を追加
    map.setFog({
        'range': [0.5, 10],
        'color': 'rgba(255, 255, 255, 0.9)',
        'high-color': 'rgba(200, 200, 200, 0.9)',
        'horizon-blend': 0.1
    });
    
    // 初期コントロール値の設定
    updateControlValues();
});

// エラーハンドリング
map.on('error', (e) => {
    console.error('MapLibre GL JS Error:', e);
    hideLoading();
});

// スタイル読み込み完了時の処理
map.on('style.load', () => {
    console.log('Style loaded successfully');
});

// コントロール値更新関数
function updateControlValues() {
    if (pitchControl && zoomControl) {
        const pitch = Math.round(map.getPitch());
        const zoom = Math.round(map.getZoom() * 10) / 10;
        
        pitchControl.value = pitch;
        pitchValue.textContent = pitch + '°';
        zoomControl.value = zoom;
        zoomValue.textContent = zoom.toFixed(1);
    }
}

// 視点の高さ制御
if (pitchControl) {
    pitchControl.addEventListener('input', (e) => {
        const pitch = parseInt(e.target.value);
        map.setPitch(pitch);
        pitchValue.textContent = pitch + '°';
    });
}

// ズームレベル制御
if (zoomControl) {
    zoomControl.addEventListener('input', (e) => {
        const zoom = parseFloat(e.target.value);
        map.setZoom(zoom);
        zoomValue.textContent = zoom.toFixed(1);
    });
}

// 地球儀モード切替
if (globeToggle) {
    globeToggle.addEventListener('click', () => {
        if (isGlobeMode) {
            map.setProjection('mercator');
            globeToggle.textContent = '地球儀モードON';
            map.setFog(null); // フォグ効果を無効化
            isGlobeMode = false;
        } else {
            map.setProjection('globe');
            globeToggle.textContent = '地球儀モードOFF';
            // フォグ効果を再度有効化
            map.setFog({
                'range': [0.5, 10],
                'color': 'rgba(255, 255, 255, 0.9)',
                'high-color': 'rgba(200, 200, 200, 0.9)',
                'horizon-blend': 0.1
            });
            isGlobeMode = true;
        }
    });
}

// 日本表示
if (resetView) {
    resetView.addEventListener('click', () => {
        map.flyTo({
            center: [138.7274, 35.3606], // 日本の中心
            zoom: 4,
            pitch: 45,
            bearing: 0,
            duration: 2000
        });
    });
}

// マップ変更時のコントロール値更新
map.on('move', updateControlValues);
map.on('zoom', updateControlValues);
map.on('pitch', updateControlValues);

// ナビゲーションコントロールを追加
map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

// スケールコントロールを追加
map.addControl(new maplibregl.ScaleControl({
    maxWidth: 100,
    unit: 'metric'
}), 'bottom-left');

// フルスクリーンコントロールを追加
map.addControl(new maplibregl.FullscreenControl(), 'bottom-right');

// 地理位置情報コントロールを追加
map.addControl(new maplibregl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserHeading: true
}), 'bottom-right');

// キーボードショートカット
document.addEventListener('keydown', (e) => {
    switch(e.key.toLowerCase()) {
        case 'g':
            if (globeToggle) globeToggle.click();
            break;
        case 'r':
            if (resetView) resetView.click();
            break;
        case 'f':
            if (map.getContainer().requestFullscreen) {
                map.getContainer().requestFullscreen();
            }
            break;
    }
});

console.log('🌍 Toner Globe initialized successfully');
console.log('Keyboard shortcuts: G = Toggle globe, R = Reset view, F = Fullscreen');