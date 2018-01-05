module.exports = {
  entry : './src/ToDoApp.jsx',
  output: {
    path: __dirname+ '/static',
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      }
    ]
  }
};
