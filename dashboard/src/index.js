import React from "react"
import ReactDOM from "react-dom"
import App from "./containers/App.jsx"

import "./styles/index.scss"

ReactDOM.render(
    React.createElement( App, {}, null ),
    document.getElementById( "app" )
)

module.hot.accept()
