const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const esLintPlugin = (isDev) => isDev ? [] : [ new ESLintPlugin({ extensions: ['ts', 'js'] }) ];

const devServer = (isDev) => !isDev ? {} : {
  devServer: {
    open: true,
    hot: true,
    port: 8080
   },
  };
  module.exports = (env) => ({
   mode: env.development ? 'development' : 'production',
   entry: './src/index.ts',
   output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
      assetModuleFilename: 'assets/[name][ext]',
   },
  module: {
    rules: [
      {
        test: /\.[tj]s$/i,
        use: 'ts-loader',
        exclude: /node_modules/,
       },
       {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
       },
       {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
       },
       {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
       },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html',
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    ...esLintPlugin(env.development),

 ],
 ...devServer(env.development)
});