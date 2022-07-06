// node的path包
const path = require('path');

// 引入html插件   作用：打包自动生成一个html文件，并且引入打包好的js文件
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 清除上一次打包后dist里面的文件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
  mode: 'production', // 打包环境   production  development

  entry: "./src/index.ts",

  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js',
    environment: {
      arrowFunction: false
    }
  },

  // 指定webpack打包时要使用的模块
  module: {
    // 指定要加载的规则
    rules: [
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        use: 'ts-loader',
        // 要排除的文件
        exclude: /node-modules/
      },

      {
        // test指定的是规则生效的文件
        test: /\.less$/,
        // 要使用的loader
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions' // 兼容最近浏览器的最近两个版本
                    }
                  ],
                ],
              }
            }
          },
          'less-loader'
        ],
        // 要排除的文件
        exclude: /node-modules/
      }
    ]

  },

  plugins: [
    new HtmlWebpackPlugin({
      // title: '自定义title',
      template: './src/index.html' // 指定模板文件，如果没有指定就会自动生成一个
    }),
    new CleanWebpackPlugin()
  ],

  // 设置引用模块支持的类型
  resolve: {
    extensions: ['.ts', '.js']
  }


}