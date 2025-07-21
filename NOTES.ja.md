# MapLibre GL JS Toner Globe - アーキテクチャノート

## 概要

このプロジェクトは、中央アジア地理に重点を置いた地球儀特化Tonerカートグラフィスタイル用のMapLibre GL JSスタイルを生成します。

## 開発プロセス

このプロジェクトは **Claude Sonnet 4** モデルを使用した **GitHub Copilot Agent Mode** の大幅な支援を受けて開発されました。AIは以下について包括的なサポートを提供しました：

- Apple Pkl設定アーキテクチャと型安全カラーシステム設計
- MSX 16色パレット実装と階層カラー組織
- MapLibre GL JS式最適化とレイヤー設定の改良
- GitHub Pagesデプロイ自動化とのビルドシステム統合

## 現在のアーキテクチャ（簡略版）

### プロジェクト構造

```text
toner-globe/
├── style-generation/           # スタイル設定
│   └── style.pkl              # メインスタイル定義（アクティブ）
├── docs/                      # GitHub Pagesデプロイ
│   └── style.json            # 生成されたスタイルファイル
├── public/                    # ビルド出力
│   └── style.json            # 生成されたスタイルファイル
├── main.js                   # MapLibre GL JSアプリケーション
├── Makefile                  # ビルドコマンド
└── package.json              # 依存関係とスクリプト
```

### ファイル説明

#### `style-generation/style.pkl`（プライマリファイル）

- **目的**: アクティブな `style.json` を生成するメインスタイル設定ファイル
- **フォーマット**: Apple Pkl設定言語
- **機能**:
  - 包括的なTonerスタイルレイヤー
  - 日本語ローカライゼーション優先（`name:ja` → `name` フォールバック）
  - 階層ラベル透明度（国: 100%, 都市: 50%, 州: 40%）
  - 補間サイズ調整によるズーム応答タイポグラフィ
  - 中央アジア地理焦点（ビシュケク中心: 74.5698°E, 42.8746°N）

### ファイル処理フロー

#### プロセスフロー

1. `style.pkl` → `public/style.json`（Pkl評価）
2. `public/style.json` → GitHub Pages デプロイ
3. MapLibre GL JS アプリケーションによるスタイル読み込み

#### データソース

- **プライマリ**: OpenStreetMap Japan ベクタータイル
- **URL**: `https://tile.openstreetmap.jp/data/planet.json`
- **カバレッジ**: 竹島、北方領土データセット

#### レイヤー階層（下から上）

1. **Background**: 白（#fff）
2. **Water**: MSX ダークブルー（#3C5EB8）で海洋と湖沼
3. **Land**: 白ベース陸地
4. **Landuse**: 住宅/商業エリアの微妙な区分
5. **Buildings**: ズーム依存建物フットプリント
6. **Boundaries**: 赤階層境界（国境 → 州境）
7. **Transportation**: 道路とレール線
8. **Labels**: モノクロ階層テキスト

#### ラベルタイポグラフィシステム

```pkl
// 階層ラベル透明度
"text-opacity": ["case",
    ["==", ["get", "class"], "country"], 1.0,
    ["==", ["get", "class"], "city"], 0.5,
    ["==", ["get", "class"], "state"], 0.4,
    0.3  // その他
]

// 日本語優先
"text-field": ["coalesce", ["get", "name:ja"], ["get", "name"]]
```

### 地球儀設定

- **投影**: `'globe'` 自動GlobeControl有効化付き
- **中心**: ビシュケク（74.5698°E, 42.8746°N）
- **ズーム**: レベル4で最適地域コンテクスト

### デプロイ

- **プラットフォーム**: GitHub Pages
- **ソースディレクトリ**: `docs/`
- **自動デプロイ**: プッシュ時
- **URL**: [https://optgeo.github.io/toner-globe/](https://optgeo.github.io/toner-globe/)

### MSXカラーパレット統合

#### コアカラー定義

MSX標準16色パレットをベースとした実装（[参照](https://paulwratt.github.io/programmers-palettes/HW-MSX/HW-MSX-palettes.html)）：

```pkl
msxColors = new Mapping {
  ["black"] = "#000000"           // テキスト、アウトライン
  ["darkBlue"] = "#3C5EB8"       // 水域、海洋
  ["lightRed"] = "#FC7753"       // 国境
  ["darkRed"] = "#B75E51"        // 州境
  ["white"] = "#FFFFFF"          // 陸地ベース
  ["gray"] = "#999999"           // セカンダリテキスト
  ["lightGray"] = "#CCCCCC"      // 建物フィル
}
```

#### カラー階層

- **Water Hierarchy**: darkBlue (primary) → lightBlue (secondary)
- **Boundary Hierarchy**: lightRed (country) → darkRed (state) → gray (local)
- **Text Hierarchy**: black (primary) → gray (secondary) → lightGray (tertiary)

### パフォーマンス考慮事項

#### 最適化戦略

- 透明度なしソリッドカラー使用
- ズーム依存レイヤーフィルタリング
- 効率的ベクタータイルクエリ
- 最小限テキストコリジョン

#### メトリクス

- **スタイルサイズ**: 16.9KB JSON
- **レイヤー数**: 18レイヤー
- **設定行数**: 707行（style.pkl + constants.pkl + classes.pkl）
- **色数**: 16色MSXパレット

### 開発ワークフロー

#### ローカル開発

```bash
# 設定編集
vim style-generation/style.pkl

# スタイル生成
make style

# 開発サーバー
make dev
```

#### プロダクション

```bash
# ビルドとデプロイ
make build
make deploy
```

### 既知の制限事項

#### 現在の制約

- 16.9KB JSON サイズ（最適化可能）
- MSX色制限による詳細カテゴリ不足
- 高ズームでのベクタータイル読み込みパフォーマンス

#### 将来の改善点

- レイヤー最適化による JSON サイズ削減
- 高度なPOIカテゴリ追加
- ラベルコリジョン検出改善

### デバッグとメンテナンス

#### 一般的な問題

1. **重複レイヤーID**: 解決済み - 一意識別子使用
2. **パス解決**: 環境認識 `getStylePath()` 関数
3. **MapLibreエラー**: 式検証問題のブラウザコンソール確認

#### トラブルシューティング

```bash
# Pkl構文検証
pkl eval style-generation/style.pkl

# 重複レイヤーIDチェック
jq '.layers[] | .id' docs/style.json | sort | uniq -d

# スタイル妥当性確認
npm run lint:style
```

### 技術仕様

#### 依存関係

- Node.js 18+
- Apple Pkl CLI 0.25+
- MapLibre GL JS 5.6.1+
- Vite 4+

#### 対応ブラウザ

- WebGLサポート必須
- Modern JavaScript対応
- モバイルタッチコントロール対応

このプロジェクトは、中央アジア地理データのための型安全設定管理と高度な3D視覚化機能を組み合わせた、現代的Webカートグラフィの洗練された実装を表しています。
