import React from "react"
import ReactDOM from "react-dom"
import Dashboard from "./containers/dashboard.component.jsx"

import "./styles/index.scss"

ReactDOM.render(
    React.createElement( Dashboard, {}, null ),
    document.getElementById( "app" )
)

module.hot.accept()
