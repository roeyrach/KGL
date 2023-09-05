import React, { useEffect, useState } from "react"
import "./AppBar.css"
import { useSelector } from "react-redux"

function AppBar() {
	const user = useSelector((state) => state.auth.user)
	const [isLoggedIn, setIsLoggedIn] = useState(user?.state || false)

	useEffect(() => {
		setIsLoggedIn(user?.state)
		console.log(user?.state)
	}, [user])

	return (
		<div className="app-bar">
			<div className="app-name">My App {isLoggedIn ? user.username : ""}</div>
			<ul className="nav-links">
				<li>
					<a href="/">Home</a>
				</li>
				{!isLoggedIn && (
					<>
						<li>
							<a href="/sign-up">Sign Up</a>
						</li>
						<li>
							<a href="/sign-in">Sign In</a>
						</li>
					</>
				)}
				{isLoggedIn && (
					<li>
						<a href="/slot-machine">Go to Game!</a>
					</li>
				)}
			</ul>
		</div>
	)
}

export default AppBar
