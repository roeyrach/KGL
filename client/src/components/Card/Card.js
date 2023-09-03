import React, { useState, useRef, useEffect } from "react"
import "./Card.scss"

function Card({ itemInfo }) {
	const { title, providerName, thumb } = itemInfo
	const cardRef = useRef(null)
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)
	const [mouseX, setMouseX] = useState(0)
	const [mouseY, setMouseY] = useState(0)
	const [mouseLeaveDelay, setMouseLeaveDelay] = useState(null)

	useEffect(() => {
		if (cardRef.current) {
			setWidth(cardRef.current.offsetWidth)
			setHeight(cardRef.current.offsetHeight)
		}
	}, [])

	const handleMouseMove = (e) => {
		if (cardRef.current) {
			setMouseX(e.pageX - cardRef.current.offsetLeft - width / 2)
			setMouseY(e.pageY - cardRef.current.offsetTop - height / 2)
		}
	}

	const handleMouseEnter = () => {
		clearTimeout(mouseLeaveDelay)
	}

	const handleMouseLeave = () => {
		const delay = setTimeout(() => {
			setMouseX(0)
			setMouseY(0)
		}, 1000)
		setMouseLeaveDelay(delay)
	}

	const mousePX = mouseX / width
	const mousePY = mouseY / height

	const cardStyle = {
		transform: `rotateY(${mousePX * 30}deg) rotateX(${mousePY * -30}deg)`,
	}

	const cardBgTransform = {
		transform: `translateX(${mousePX * -40}px) translateY(${mousePY * -40}px)`,
	}

	const cardBgImage = {
		backgroundImage: `url(${thumb})`,
	}

	return (
		<div className="card-wrap" onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} ref={cardRef}>
			<div className="card" style={cardStyle}>
				<div className="card-bg" style={{ ...cardBgTransform, ...cardBgImage }}></div>
				<div className="card-info">
					<h4 slot="header">{title}</h4>
					<p slot="content">{providerName}</p>
				</div>
			</div>
		</div>
	)
}

export default Card
