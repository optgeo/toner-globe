import { defineConfig } from 'vite';

export default defineConfig({
    root: '.',
    build: {
        outDir: 'docs',
        emptyOutDir: false, // style.jsonを保持するため
        rollupOptions: {
            input: {
                main: 'index.html'
            },
            output: {
                // シンプルなファイル名で出力、ハッシュなし
                entryFileNames: 'assets/main.js',
                chunkFileNames: 'assets/[name].js',
                assetFileNames: 'assets/[name].[ext]'
            }
        }
    },
    server: {
        host: '0.0.0.0',
        open: true,
        port: 3000
    },
    
    // ベースパス設定（GitHub Pagesの場合）
    base: process.env.NODE_ENV === 'production' ? '/toner-globe/' : '/',
    
    // アセット処理設定
    assetsInclude: ['**/*.json'],
    
    // 最適化設定
    esbuild: {
        target: 'es2020',
        minifyIdentifiers: true,
        minifySyntax: true
    }
});
