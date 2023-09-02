import React from "react"
import "./Game.css"

function Game({ itemInfo }) {
	const { title, providerName, thumb } = itemInfo

	return (
		<div className="card">
			<img src={thumb} alt=""></img>
			<h1>{title}</h1>
			<h1>{providerName}</h1>
		</div>
	)
}

export default Game
