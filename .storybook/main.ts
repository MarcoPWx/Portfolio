import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import type { StorybookConfig } from '@storybook/react-webpack5';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],

  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-webpack5-compiler-swc"),
    getAbsolutePath("@storybook/addon-docs")
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },

  staticDirs: ['../public'],

  experimental_indexers: [
    {
      test: /\.mdx$/,
      createIndex: async (fileName: string, options: any) => {
        const fs = require('fs');
        const path = require('path');
        let src = '';
        try {
          src = fs.readFileSync(fileName, 'utf8');
        } catch (e) {
          // ignore read errors, fallback to default title
        }
        let title: string | undefined;
        if (src) {
          const m1 = src.match(/<Meta[^>]*title\s*=\s*\"([^\"]+)\"/);
          const m2 = src.match(/<Meta[^>]*title\s*=\s*'([^']+)'/);
          const m3 = src.match(/<Meta[^>]*title\s*=\s*`([^`]+)`/);
          title = (m1 && m1[1]) || (m2 && m2[1]) || (m3 && m3[1]);
        }
        const computedTitle = options.makeTitle(title);
        return [
          {
            type: 'docs',
            importPath: fileName,
            exportName: 'default',
            title: computedTitle,
          },
        ];
      },
    },
  ],

  webpackFinal: async (config) => {
    // Alias @storybook/blocks to addon-docs blocks for MDX components
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      ['@storybook/blocks']: require.resolve('@storybook/addon-docs/blocks'),
    } as any;
    // Node core fallbacks for Storybook packages in Webpack 5
    (config.resolve as any).fallback = {
      ...((config.resolve as any).fallback || {}),
      tty: require.resolve('tty-browserify'),
      buffer: require.resolve('buffer'),
    };

    // Provide browser polyfills for Node globals used by some Storybook packages
    const webpack = require('webpack');
    (config.plugins || (config.plugins = [])).push(
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      })
    );

    // Remove the existing CSS rule that's causing conflicts
    config.module?.rules?.forEach((rule, index) => {
      if (rule && typeof rule === 'object' && rule.test && rule.test.toString().includes('\\.css')) {
        config.module!.rules!.splice(index, 1);
      }
    });

    // Add proper CSS support with PostCSS for Tailwind
    config.module?.rules?.push({
      test: /\.css$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              config: require.resolve('../postcss.config.js'),
            },
          },
        },
      ],
    });

    // Ensure MDX support using addon-docs mdx-loader
    config.module?.rules?.push({
      test: /\.mdx$/,
      use: [
        {
          loader: require.resolve('@storybook/addon-docs/mdx-loader'),
          options: {},
        },
      ],
    });

    // Bundle analyzer (enabled when STORYBOOK_ANALYZE is truthy)
    if (process.env.STORYBOOK_ANALYZE) {
      const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
      (config.plugins || (config.plugins = [])).push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
          openAnalyzer: false,
          reportFilename: 'storybook-bundle-report.html',
          generateStatsFile: false,
        })
      );
    }

    // Bundle size tuning: split vendor code and reduce entrypoint size
    (config as any).optimization = {
      ...((config as any).optimization || {}),
      splitChunks: {
        ...(((config as any).optimization && (config as any).optimization.splitChunks) || {}),
        chunks: 'all',
        cacheGroups: {
          ...(((config as any).optimization && (config as any).optimization.splitChunks && (config as any).optimization.splitChunks.cacheGroups) || {}),
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            enforce: false,
          },
        },
      },
    };

    return config;
  }
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
