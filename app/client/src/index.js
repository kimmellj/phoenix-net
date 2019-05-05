import React from "react"
import ReactDOM from "react-dom"
import App from "./containers/App.jsx"

require("babel-core/register");
require("babel-polyfill");

import "./styles/index.scss"

ReactDOM.render(
    React.createElement( App, {}, null ),
    document.getElementById( "app" )
)
