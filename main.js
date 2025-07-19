import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// MapLibre GL JSマップの初期化
const map = new maplibregl.Map({
    container: 'map',
    style: './docs/style.json', // モジュラー生成されたスタイル
    center: [138.7274, 35.3606], // 日本の中心
    zoom: 4, // 日本全体が見える適切なズーム
    pitch: 0, // 正面から見る角度
    bearing: 0,
    projection: 'globe', // 地球儀モード
    antialias: true,
    maxZoom: 18,
    minZoom: 0.5,
    hash: true // URL同期
});

// マップ読み込み完了時の処理
map.on('load', () => {
});

// ナビゲーションコントロールを追加
map.addControl(new maplibregl.NavigationControl());

// GlobeControlを追加
map.addControl(new maplibregl.GlobeControl());

// スケールコントロールを追加
map.addControl(new maplibregl.ScaleControl({maxWidth: 100,unit: 'metric'}));
