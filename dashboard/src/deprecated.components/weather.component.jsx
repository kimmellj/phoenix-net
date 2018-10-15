// based on react-open-weather-map
import React from "react"
import PropTypes from "prop-types"

import "../styles/weather-icons.css"

import weatherIcons from "../schema/icons.json"

class Weather extends React.Component {
    render() {
        if ( this.props.data === Weather.defaultProps.data ) {
            return (
                <div className={this.props.config.containerClassName} />
            )
        }

        const prefix = "wi wi-",
            code = this.props.data.weather[ 0 ].id

        let icon = weatherIcons[ code ].icon

        // If we are not in the ranges mentioned above, add a day/night prefix.
        if ( !( code > 699 && code < 800 ) && !( code > 899 && code < 1000 ) ) {
            icon = `day-${ icon}`
        }

        // Finally tack on the prefix.
        icon = prefix + icon
        return (
            <div className={this.props.config.containerClassName}>
                <i className={icon}></i>
                <div className="stats">
                    <div className="main-heading">{this.props.data.name}, {this.props.data.sys.country}</div>
                    <div className="description">{this.props.data.weather[ 0 ].description}</div>
                    <div className="temperature">{this.props.data.main.temp} &deg;F</div>
                    <div className="pressure">{this.props.data.main.pressure} in</div>
                    <div className="humidity">{this.props.data.main.humidity} &#37;</div>
                </div>
            </div>
        )
    }
}

Weather.propTypes = {
    "data": PropTypes.object,
    "config": PropTypes.object
}

Weather.defaultProps = {
    "data": { "weather": [ {} ], "sys": {}, "main": {} },
    "config": { "containerClassName": "react-open-weather-map" }
}

export default Weather
