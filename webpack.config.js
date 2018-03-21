//概念
//webpack是一个现代javascript应用程序的模拟打包器（model bundle）,它是高度可配置的
//四个核心概念： 入口(entry)、输出(output)、loader、插件(plugins)
//入口： 入口起点(entry point)只是webpack应该使用哪个模块，来作为构建其内部依赖图的开始
//出口： output属性告诉webpack在哪里输出它所创建的bundle，以及如何命名这些文件
//loader 让webpack能够处理那些非javascript文件(webpack自身只理解javascript).loader可以将所有类型的文件转换为webpack能够处理的有效模块，然后就可以利用webpack大打包能力，对它们进行处理
//本质上： webpack loader将所有类型的文件，转化为应用程序的依赖图可以直接引用的模块
//在更高层面，在webpack的配置中loader有两个目标：1.识别出应该被对应的loader进行转化的那些文件(使用 test  属性) 2. 转换这些文件，从而使其能够被添加到依赖图中(并且最终添加到bundle中)（use 属性
var path = require('path');
var webpack = require('webpack');
//引入glob
var glob = require('glob');

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;
  glob.sync(globPath).forEach(function(entry) {
    if(/common/.test(entry) ||  /css/.test(entry)) {
      return;
    }
    basename = path.basename(entry, path.extname(entry));   // 文件名
      tmp = entry.split('/').splice(3);
      if (tmp.length === 1) {
        pathname = basename;
      } else {
        pathname = tmp.splice(0, tmp.length - 1).join('/') + '/' + basename; 
      }
      entries[pathname] = entry;
  });
  return entries;
}

var entries = getEntry('./src/js/**/*.js');
// console.log(entries);
// process.exit(); //阻止加载下面的逻辑
module.exports = {
  entry: entries,//入口
  output: { //出口
    path: path.resolve(__dirname, './dist/js/'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            'less': 'vue-style-loader!css-loader!less-loader'
          }
        }
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
      }
    ]
  }
}
