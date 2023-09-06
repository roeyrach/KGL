import React from "react"
import Cherry from "../../images/cherry.png"
import Banana from "../../images/banana.png"
import Apple from "../../images/apple.png"
import Lemon from "../../images/lemon.png"

const images = new Map()

images.set("cherry", Cherry)
images.set("banana", Banana)
images.set("apple", Apple)
images.set("lemon", Lemon)

function Reel({ item }) {
	return <img style={{ width: "5rem", height: "auto" }} src={images.get(item)} alt=""></img>
}

export default Reel
