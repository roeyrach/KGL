import React from "react"
import "./AppBar.css"

function AppBar() {
	return (
		<div className="app-bar">
			<div className="app-name">My App</div>
			<ul className="nav-links">
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
				<li>
					<a href="/contact">Contact</a>
				</li>
			</ul>
		</div>
	)
}

export default AppBar
