import React, { useState, useRef, useEffect } from "react"
import "./style.css"
import { createUser } from "../../API/axios"

const SignUp = () => {
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

		await createUser(formData)
			.then((res) => {
				if (res === 201) alert("You have Signed up successfully!")
				if (res.includes("400")) alert("The email address is already in use.")
			})
			.catch(() => {
				alert("Somthing wrong with the registration")
			})
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
