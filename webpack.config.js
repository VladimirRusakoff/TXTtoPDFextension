module.exports = {
    // ... другие настройки ...
    
    optimization: {
      minimize: true,
      sideEffects: true,
      usedExports: true,
    },
    
    module: {
      rules: [
        {
          test: /\.js$/,
          include: /node_modules\/jspdf/,
          sideEffects: false
        }
      ]
    }
  };