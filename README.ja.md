# 🌍 Toner Globe

MapLibre GL JSを使用してOpenStreetMapデータをインタラクティブな3D地球儀ビューで表示する現代的なWebアプリケーションです。日本語ラベルを特徴とするMSXカラーパレットにインスパイアされたTonerテーマでスタイリングされており、キルギスタンのビシュケクを中心とした中央アジアを表示します。

🔗 **ライブデモ**: [https://optgeo.github.io/toner-globe/](https://optgeo.github.io/toner-globe/)
📂 **リポジトリ**: [https://github.com/optgeo/toner-globe](https://github.com/optgeo/toner-globe/)

![Toner Globe Preview](https://img.shields.io/badge/MapLibre-GL%20JS-blue) ![Pkl](https://img.shields.io/badge/Apple-Pkl-orange) ![Vite](https://img.shields.io/badge/Vite-Build-purple) ![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-green)

## ✨ 機能

- 🌍 **3D地球儀モード**: 大気効果を持つインタラクティブな地球儀視覚化
- 🎮 **MSXカラーパレット**: クラシックなMSXコンピュータの色を基にしたレトロ風カラースキーム
- 🗺️ **洗練されたTonerスタイル**: 選択的な色彩アクセントを持つエレガントなモノクロマティックデザイン
- 🇰🇬 **中央アジアビュー**: キルギスタンのビシュケクを中心とした中央アジア地理の表示
- 🇯🇵 **日本語ラベル**: 日本語テキストレンダリング（`name:ja`）を優先し、英語フォールバック
- 📐 **型安全設定**: 保守可能なモジュラースタイル生成にApple Pklを使用
- ⚡ **高速開発**: ホットリロード機能付きVite開発サーバー
- 📱 **クリーンインターフェース**: マップコンテンツに焦点を当てたミニマリストデザイン
- 🌐 **地球儀コントロール**: 地球儀とメルカトルモード間のプロジェクション切り替え
- 🚀 **簡単デプロイ**: GitHub Pagesへのワンコマンドデプロイ
- 🎯 **モジュラーアーキテクチャ**: スタイル、レイヤー、設定の明確な分離
- 🗾 **スマート境界表示**: 階層的重要度を持つ色分け境界

## 🎮 インタラクティブコントロール

- **地球儀/メルカトル切り替え**: MapLibre GlobeControlを使用して3D地球儀とフラットマップ投影を切り替え
- **ナビゲーションコントロール**: 標準MapLibreコントロールでズーム、回転、ピッチ調整
- **スケール表示**: メートル法距離スケールインジケーター
- **クリーンUI**: 複雑なコントロールパネルなし - マップ自体に集中

## 🚀 クイックスタート

### 前提条件

- Node.js 18+ および npm
- Apple Pkl CLI（[インストールガイド](https://pkl-lang.org/main/current/pkl-cli/index.html)）

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/optgeo/toner-globe.git
cd toner-globe

# 依存関係をインストール
npm install
```

### 開発

```bash
# モジュラーPkl設定からstyle.jsonを生成
make style
# または
npm run style:generate

# 開発サーバーを開始
make dev
# または  
npm run dev
```

アプリケーションは `http://localhost:3000` で利用可能になります

### プロダクションビルド

```bash
# プロダクション用アプリケーションをビルド
make build
# または
npm run build
```

ビルドファイルはGitHub Pagesデプロイ用に `docs/` ディレクトリに出力されます。

## 🏗️ アーキテクチャ

プロジェクトは型安全な設定管理を持つモジュラーアーキテクチャに従います：

### コアファイル

- **`index.html`** - MapLibreコンテナを持つメインHTMLエントリーポイント
- **`main.js`** - MapLibre初期化を含むJavaScriptアプリケーションロジック
- **`style.json`** - 生成されたMapLibre GLスタイル（Pklから自動生成）
- **`vite.config.js`** - 開発およびプロダクション用Viteビルド設定

### 設定システム

- **`style.pkl`** - レイヤーと視覚的プロパティを定義するメインスタイル設定（567行）
- **`constants.pkl`** - MSXカラーパレット定義（110行）と色抽象化
- **`classes.pkl`** - DRYアーキテクチャ用再利用可能レイヤークラス定義（31行）
- **`Makefile`** - Pklコンパイルとデプロイの自動化ビルド

### MSXカラーパレット

アプリケーションは慎重にキュレーションされたMSXインスパイアのカラースキームを使用します（[MSX標準16色パレット参照](https://paulwratt.github.io/programmers-palettes/HW-MSX/HW-MSX-palettes.html)）：

#### プライマリカラー

- **水域**: `darkBlue` (#3C5EB8) - 深い海洋青
- **陸地**: `white` (#FFFFFF) - クリーンなモノクロマティックベース
- **境界**: 赤階層 - 国境（#FC7753）から州境（#B75E51）
- **ラベル**: モノクロマティック階層 - 黒からライトグレー（#999999）

#### 技術実装

MSX標準16色パレットをベースとした実装（[参照](https://paulwratt.github.io/programmers-palettes/HW-MSX/HW-MSX-palettes.html)）：

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

## 📝 スタイル設定

このプロジェクトは型安全でモジュラーなスタイル設定に **Apple Pkl** を使用します：

### メイン設定ファイル

- **`style.pkl`**: 包括的なレイヤーサポートを持つメインスタイル設定

### スタイル生成

```bash
# style.pklからstyle.jsonを生成
make style

# 生成されたスタイルを検証
npm run lint:style
```

### スタイル機能

- **モノクロマティックデザイン**: エレガントな外観のための微妙なグレースケールトーン
- **日本語ラベル**: フォールバック付き自動 `name:ja` フィールド使用
- **パフォーマンス最適化**: スムーズな地球儀レンダリングのための効率的なレイヤー定義
- **地球儀フレンドリー**: 3D地球儀投影専用設計
- **スマート境界**: よりクリーンな視覚化のための海上および係争境界の除外
- **階層ラベル**: 明確な識別のための国境の州/都市より優先
- **最適化された道路**: 重複アーティファクトを防ぐアルファ透明度なしのソリッドカラー
- **クリーンビルド**: より良いバージョン管理のためのハッシュサフィックスなしのシンプルアセット名

## 📦 利用可能なコマンド

| コマンド | 説明 |
|---------|-----|
| `make style` | モジュラーPkl設定からstyle.jsonを生成 |
| `make dev` | 開発サーバーを開始 |
| `make build` | プロダクション用ビルド |
| `make deploy` | GitHub Pagesにデプロイ |
| `make clean` | 生成ファイルをクリーン |
| `make help` | 利用可能なコマンドを表示 |

## 🛠️ 技術

- **[MapLibre GL JS](https://maplibre.org/)**: オープンソースマップレンダリングエンジン
- **[Apple Pkl](https://pkl-lang.org/)**: 型安全設定言語
- **[Vite](https://vitejs.dev/)**: 次世代ビルドツール
- **[OpenStreetMap Japan](https://tile.openstreetmap.jp/)**: ベクタータイルデータソース
- **GitHub Pages**: 静的サイトホスティング

## 🤖 開発プロセス

このプロジェクトは **Claude Sonnet 4** モデルを使用したVisual Studio Codeでの **GitHub Copilot Agent Mode** を使用して開発されました。AIアシスタントは以下について包括的なサポートを提供しました：

- **設定アーキテクチャ**: モジュラーPklベーススタイルシステムの設計
- **MSXカラーパレット統合**: レトロ風カラースキームの実装
- **コード最適化**: 624行から707行への設定複雑性削減と保守性向上
- **ドキュメント**: 包括的な技術ドキュメントの生成
- **ビルドシステム**: 効率的な開発およびデプロイワークフローの設定

GitHub Copilotの文脈理解とClaude Sonnet 4の高度な推論能力の組み合わせにより、地図設計システムの迅速なプロトタイピングと反復改善が可能になりました。

## 🎨 設計理念

Toner Globeデザインは以下を重視します：

- **ミニマリズム**: クリーンで注意散漫のない地図表現
- **アクセシビリティ**: 高コントラストと読みやすいタイポグラフィ
- **パフォーマンス**: スムーズな3D地球儀インタラクションに最適化
- **国際化**: 国際フォールバック付き日本語ファーストラベル
- **地理的明瞭性**: 政治的複雑さを避けるスマート境界フィルタリング
- **ラベル階層**: 常に表示される国境、州と都市は二次情報
- **視覚的一貫性**: 透明度アーティファクトのないソリッドカラーとクリーンライン

## 🤝 コントリビューティング

1. リポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. Pkl設定ファイルに変更を加える
4. 変更をテスト (`make style && make dev`)
5. 変更をコミット (`git commit -m 'Add amazing feature'`)
6. ブランチにプッシュ (`git push origin feature/amazing-feature`)
7. プルリクエストを開く

## 📄 ライセンス

このプロジェクトはMITライセンスの下でライセンスされています - 詳細は [LICENSE](LICENSE) ファイルをご覧ください。

## 🙏 謝辞

- 優れたベクタータイルサービスを提供するOpenStreetMap Japan
- 強力なレンダリングエンジンを提供するMapLibre GL JSコミュニティ
- Pkl設定言語を作成したApple
- 世界中のOpenStreetMapコントリビューター

---

**関連**: このプロジェクトは [UNopenGIS/7#744](https://github.com/UNopenGIS/7/issues/744) の参考実装です
