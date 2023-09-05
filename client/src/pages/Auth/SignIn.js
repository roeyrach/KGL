import React, { useState, useRef, useEffect } from "react"
import "./style.css"
import { login } from "../../API/axios"
import { useDispatch } from "react-redux"
import { setUser } from "../../redux/user/action"
import { useNavigate } from "react-router-dom"

function SignIn() {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const [formData, setFormData] = useState({
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
			const res = await login(formData)
			if (res.status === 200) {
				dispatch(setUser(res.data.user))
				navigate("/")
				alert("You are successfully logged in.")
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
			<h2>Sign In</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input ref={ref} type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
				</div>
				<div className="form-group">
					<label htmlFor="password">Password</label>
					<input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
				</div>
				<button type="submit">Sign In</button>
			</form>
		</div>
	)
}

export default SignIn
