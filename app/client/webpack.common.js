const path = require( "path" )

module.exports = {
    "entry": [
        "babel-polyfill",
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
    ]
}
