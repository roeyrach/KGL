import React from "react"
import "./Button.css"

function Button({ spinReels, spinning }) {
	return (
		<button id="hit" className="button-82-pushable" onClick={spinReels} disabled={spinning}>
			<span className="button-82-shadow"></span>
			<span className="button-82-edge"></span>
			<span className="button-82-front text"> Spin </span>
		</button>
	)
}

export default Button
