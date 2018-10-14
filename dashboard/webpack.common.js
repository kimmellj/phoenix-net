const path = require( "path" ),
    HtmlWebpackPlugin = require( "html-webpack-plugin" ),
    htmlWebpackTemplate = require( "html-webpack-template" )

module.exports = {
    "entry": [
        "react-hot-loader/patch",
        "./src/index.js"
    ],
    "module": {
        "rules": [ {
            "test": /\.(js|jsx)$/,
            "exclude": /node_modules/,
            "use": [ "babel-loader" ]
        },
        {
            "test": /\.css$/,
            "use": [ {
                "loader": "style-loader" // creates style nodes from JS strings
            }, {
                "loader": "css-loader" // translates CSS into CommonJS
            } ]
        },
        {
            "test": /\.svg$/,
            "loader": "babel-loader!svg-react-loader"
        },

        {
            "test": /\.(ttf|eot|woff|woff2|svg)$/,
            "loader": "file-loader",
            "options": {
                "name": "fonts/[name].[ext]"
            }
        },
        {
            "test": /\.scss$/,
            "use": [ {
                "loader": "style-loader" // creates style nodes from JS strings
            }, {
                "loader": "css-loader" // translates CSS into CommonJS
            }, {
                "loader": "sass-loader" // compiles Sass to CSS
            } ]
        }
        ]
    },
    "resolve": {
        "extensions": [ "*", ".js", ".jsx" ]
    },
    "output": {
        "path": path.resolve( __dirname, "dist" ),
        "publicPath": "/",
        "filename": "bundle.js"
    },
    "plugins": [
        new HtmlWebpackPlugin( {
            "inject": false,
            "template": htmlWebpackTemplate,
            "appMountId": "app",
            "appMountHtmlSnippet": '<div class="app-spinner"><i class="fa fa-spinner fa-spin fa-5x" aria-hidden="true"></i></div>',
            "inlineManifestWebpackName": "webpackManifest",
            "title": "Dashboard"
        } )
    ]
}
