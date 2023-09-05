import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "./style.css"
import { createUser } from "../../API/axios"

const SignUp = () => {
	const navigate = useNavigate()
	const [formData, setFormData] = useState({
		username: "",
		email: "",
		password: "",
	})

	const ref = useRef()

	useEffect(() => {
		ref.current.focus()
	}, [])

	const handleChange = (e) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const res = await createUser(formData)
			if (res.status === 201) {
				alert("You have Signed up successfully!")
				navigate("/sign-in")
			} else {
				console.log(res.success)
				alert(res.error)
			}
		} catch (err) {
			// Handle network or other errors here
			console.error("An error occurred:", err)
		}
	}

	return (
		<div className="signup-container">
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="username">Username</label>
					<input ref={ref} type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
				</div>
				<button type="submit">Sign Up</button>
			</form>
		</div>
	)
}

export default SignUp
