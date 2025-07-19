import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// 環境に応じたstyle.jsonパスを決定
const getStylePath = () => {
    // 開発環境の場合は絶対パス、本番環境の場合は相対パス
    return import.meta.env.DEV ? '/style.json' : './style.json';
};

// MapLibre GL JSマップの初期化
const map = new maplibregl.Map({
    container: 'map',
    style: getStylePath(),
    center: [74.5698, 42.8746], // キルギス・ビシュケクの中心
    zoom: 4, // 中央アジア全体が見える適切なズーム
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
