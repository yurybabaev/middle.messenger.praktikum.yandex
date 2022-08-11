const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './static/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    alias: {
      'handlebars/runtime': 'handlebars/dist/cjs/handlebars.runtime',
      'handlebars': 'handlebars/dist/cjs/handlebars.runtime',
    }
  },
  devServer: {
    compress: true,
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          precompileOptions: {
            knownHelpersOnly: false,
          },
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,            
          },
          {
            loader: 'css-loader',
            // options: {
            //   modules: true,
            // },
          },          
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg)/,
        type: 'asset/inline'
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: '**/*',
    //       context: path.resolve(__dirname, 'src', 'assets'),
    //       to: './assets',
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      template: 'static/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
  ],
};
