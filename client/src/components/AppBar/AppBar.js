import React, { useEffect, useState } from "react"
import "./AppBar.css"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../../redux/user/action"

function AppBar() {
	const dispatch = useDispatch()
	const user = useSelector((state) => state.auth.user)
	const [isLoggedIn, setIsLoggedIn] = useState(user?.state || false)

	useEffect(() => {
		setIsLoggedIn(user?.state)
	}, [user])

	const handleLogOut = () => {
		setIsLoggedIn(false)
		dispatch(setUser(null))
	}

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
					<>
						<li>
							<a href="/" onClick={handleLogOut}>
								Logout
							</a>
						</li>
					</>
				)}
			</ul>
		</div>
	)
}

export default AppBar
