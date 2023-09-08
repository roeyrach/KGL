import React from "react"
import Cherry from "../../images/cherry.png"
import Banana from "../../images/banana.png"
import Apple from "../../images/apple.png"
import Lemon from "../../images/lemon.png"
import "./Reel.css" // Import your CSS file

const images = new Map()

images.set("cherry", Cherry)
images.set("banana", Banana)
images.set("apple", Apple)
images.set("lemon", Lemon)

function Reel({ item }) {
	return (
		<div className="reel-container">
			<img className="reel-image" src={images.get(item)} alt="" />
		</div>
	)
}

export default Reel
