 var webpack = require('webpack');
 module.exports = {
     plugins: [new webpack.optimize.CommonsChunkPlugin({
             name: "common",
             filename: 'common.js'
         }),
         new webpack.optimize.UglifyJsPlugin({
             compress: {
                 warnings: false
             }
         })
     ],
     entry: {
         index: ['./src/view/index.tsx'],
     },
     output: {
         filename: '[name].js',
         path: require('path').join(__dirname, 'build'),
     },
     resolve: {
         extensions: ['*', '.ts', '.tsx', '.js', '.jsx']
     },
     module: {
         loaders: [{
             test: /\.css$/,
             loader: 'style-loader!css-loader'
         }, {
             test: /\.less$/,
             loader: 'style-loader!css-loader?modules!less-loader'
         }, {
             test: /\.(png|jpg|gif|ico)$/,
             loader: "url-loader?limit=4096&name=[hash:16].[ext]"
         }, {
             test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
             loader: "url-loader?limit=4096&mimetype=application/font-woff"
         }, {
             test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
             loader: "url-loader?limit=4096&mimetype=application/font-woff2"
         }, {
             test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
             loader: "url-loader?limit=4096&mimetype=application/octet-stream"
         }, {
             test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
             loader: "file-loader"
         }, {
             test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
             loader: "url-loader?limit=4096&mimetype=image/svg+xml"
         }, {
             test: /\.tsx?$/,
             loader: "ts-loader"
         }]
     },
     externals: {
         "react": "React",
         "react-dom": "ReactDOM"
     }
 };