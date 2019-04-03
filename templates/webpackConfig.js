const webpackConfig = {
  name: 'webpack.config.js',
  content: `const path = require('path')
module.exports = {
  entry: './index.js',
  mode: 'development',
  output: {
    filename: './build.js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3010,
    watchContentBase: true,
    progress: true,
    open: true
  },
  devtool: 'source-map',
  externals : {
    react: 'react'
    react-dom: 'react-dom'
  }
}
`
}

module.exports = webpackConfig
