module.exports = {
  entry: './src/index',
  devtool: 'source-map',
  output: {
    path: __dirname + '/../bundles',
    filename: 'conversation.umd.js',
    libraryTarget: 'umd',
    library: 'conversation'
  },
  externals: [
    /^\@angular\//,
    /^rxjs\//
  ],
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      }
    ]
  }
};
