import React, { useEffect, useState } from "react"
import "./SlotMachine.css"
import Reel from "./Reel"

function SlotMachine() {
	const reel1 = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"]
	const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"]
	const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]

	const [result, setResult] = useState([null, null, null])
	const [spinning, setSpinning] = useState(false)
	const [coins, setCoins] = useState(20)

	useEffect(() => {
		const rewardHandle = () => {
			// Check for rewards
			if (result[0] === "cherry" && result[1] === "cherry" && result[2] === "cherry") setCoins((prevCoins) => prevCoins + 50)
			if ((result[0] === "cherry" && result[1] === "cherry") || (result[1] === "cherry" && result[2] === "cherry"))
				setCoins((prevCoins) => prevCoins + 40)
			if (result[0] === "apple" && result[1] === "apple" && result[2] === "apple") setCoins((prevCoins) => prevCoins + 20)
			if ((result[0] === "apple" && result[1] === "apple") || (result[1] === "apple" && result[2] === "apple"))
				setCoins((prevCoins) => prevCoins + 10)
			if (result[0] === "banana" && result[1] === "banana" && result[2] === "banana") setCoins((prevCoins) => prevCoins + 15)
			if ((result[0] === "banana" && result[1] === "banana") || (result[1] === "banana" && result[2] === "banana"))
				setCoins((prevCoins) => prevCoins + 5)
			if (result[0] === "lemon" && result[1] === "lemon" && result[2] === "lemon") setCoins((prevCoins) => prevCoins + 3)
		}
		rewardHandle()
	}, [result]) // Correct the dependency array

	const spinReels = () => {
		if (coins === 0) return
		if (!spinning) {
			setCoins(coins - 1)

			const getRandomItem = (reel) => reel[Math.floor(Math.random() * reel.length)]

			setSpinning(true)

			setTimeout(() => {
				const result1 = getRandomItem(reel1)
				setResult((prevState) => [result1, prevState[1], prevState[2]])
			}, 500)

			setTimeout(() => {
				const result2 = getRandomItem(reel2)
				setResult((prevState) => [prevState[0], result2, prevState[2]])
			}, 1000)

			setTimeout(() => {
				const result3 = getRandomItem(reel3)
				setResult((prevState) => [prevState[0], prevState[1], result3])
				setSpinning(false)
			}, 1500)
		}
	}

	return (
		<div>
			<h1>Slot Machine</h1>
			<div className="reels">
				<div>
					{result.map((item, index) => (
						<Reel key={index} className="result-item" item={item} />
					))}
				</div>
			</div>
			<button onClick={spinReels} disabled={spinning}>
				{spinning ? "Spinning..." : "Spin"}
			</button>
			<h1>{coins}</h1>
		</div>
	)
}

export default SlotMachine
