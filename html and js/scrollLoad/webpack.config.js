var webpack = require('webpack');
var path = require('path');
/*var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js', ['index']);*/
module.exports = {
    //插件项
   /* plugins: [commonsPlugin],*/
    //页面入口文件配置
    entry: {
        index : './src/js/page/index.js'
    },
    //入口文件输出配置
    output: {
        path: path.join(__dirname, '/src/js'),
        filename: '[name].js',
        publicPath: '/src/js/'
    },
    module: {
        //加载器配置
        loaders: [
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'babel', query: { presets: ['es2015'] } },
            { test: /\.jsx$/, loader: 'jsx-loader?harmony' },
            { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
            { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },
    //其它解决方案配置
    resolve: {
        extensions: ['', '.js', '.json', '.scss'],
        alias: {
            AppStore : 'js/stores/AppStores.js',
            ActionType : 'js/actions/ActionType.js',
            AppAction : 'js/actions/AppAction.js'
        }
    }
    /*devServer: {
        proxy: {
            /!*'/api/!*': {
                target: 'https://cs138.g-jia.net/wap/HZJZ15070116150h2BY1/celebrity',
                secure: false
            }*!/
            '/list': {
                target: 'https://cs138.g-jia.net/wap/HZJZ15070116150h2BY1/celebrity/shareURL.json',
                pathRewrite: {'^/column' : '/column'},
                changeOrigin: true
            }
        }
    },*/
};