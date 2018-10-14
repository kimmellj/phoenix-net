const merge = require( "webpack-merge" ),
    common = require( "./webpack.common.js" ),
    webpack = require( "webpack" )

module.exports = merge( common, {
    "devtool": "inline-source-map",
    "devServer": {
        "contentBase": "./dist",
        "hot": true
    },
    "plugins": [
        new webpack.HotModuleReplacementPlugin()
    ]
} )
