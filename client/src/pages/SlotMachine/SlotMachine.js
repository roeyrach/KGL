import React, { useEffect, useState } from "react"
import "./SlotMachine.css"
import Reel from "./Reel"
import reelSound from "../../assets/sounds/start_play.wav"
//import coinSound from "../../assets/sounds/coin_win.wav"
import stopSound from "../../assets/sounds/stop.wav"
import Button from "./ButtonSpin/Button"
import { rewardHandler } from "../../API/axios"
import { useSelector } from "react-redux"

function SlotMachine() {
	const user = useSelector((state) => state.auth.user)
	const reel1 = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"]
	const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"]
	const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]

	const [result, setResult] = useState([null, null, null])
	const [spinning, setSpinning] = useState(false)
	const [coins, setCoins] = useState(20)

	useEffect(() => {
		const rewardHandle = async () => {
			if (!spinning) {
				//let sound = new Audio(coinSound)
				const reward = await rewardHandler(result, user.email)
				console.log(reward)
				// Check for rewards
				// if (result[0] === "cherry" && result[1] === "cherry" && result[2] === "cherry") {
				// 	setCoins((prevCoins) => prevCoins + 50)
				// 	sound.play()
				// 	return
				// }
				// if ((result[0] === "cherry" && result[1] === "cherry") || (result[1] === "cherry" && result[2] === "cherry")) {
				// 	setCoins((prevCoins) => prevCoins + 40)
				// 	return
				// }
				// if (result[0] === "apple" && result[1] === "apple" && result[2] === "apple") {
				// 	setCoins((prevCoins) => prevCoins + 20)
				// 	sound.play()
				// 	return
				// }
				// if ((result[0] === "apple" && result[1] === "apple") || (result[1] === "apple" && result[2] === "apple")) {
				// 	setCoins((prevCoins) => prevCoins + 10)
				// 	sound.play()
				// 	return
				// }
				// if (result[0] === "banana" && result[1] === "banana" && result[2] === "banana") {
				// 	setCoins((prevCoins) => prevCoins + 15)
				// 	sound.play()
				// 	return
				// }
				// if ((result[0] === "banana" && result[1] === "banana") || (result[1] === "banana" && result[2] === "banana")) {
				// 	setCoins((prevCoins) => prevCoins + 5)
				// 	sound.play()
				// 	return
				// }
				// if (result[0] === "lemon" && result[1] === "lemon" && result[2] === "lemon") {
				// 	setCoins((prevCoins) => prevCoins + 3)
				// 	sound.play()
				// 	return
				// }
			}
		}
		rewardHandle()
	}, [result, spinning, user.email])

	const opts = ["cherry", "lemon", "apple", "banana"]
	const [index1, setIndex1] = useState(0)
	const [index2, setIndex2] = useState(0)
	const [index3, setIndex3] = useState(0)

	const spinReels = () => {
		new Audio(reelSound).play()
		const stopOn = new Audio(stopSound)
		if (coins === 0) return
		if (!spinning) {
			setCoins((current) => current - 1)

			const getRandomItem = (reel) => reel[Math.floor(Math.random() * reel.length)]

			setSpinning(true)

			const intervalDuration = 100
			const spinDuration = 2500

			let currentIndex1 = index1
			let currentIndex2 = index2
			let currentIndex3 = index3

			const intervalId1 = setInterval(() => {
				currentIndex1 = (currentIndex1 + 1) % opts.length // Cycle through the array
				setResult((prevState) => [opts[currentIndex1], prevState[1], prevState[2]])
				setIndex1(currentIndex1)
			}, intervalDuration)

			const intervalId2 = setInterval(() => {
				currentIndex2 = (currentIndex2 + 1) % opts.length // Cycle through the array
				setResult((prevState) => [prevState[0], opts[currentIndex2], prevState[2]])
				setIndex2(currentIndex2)
			}, intervalDuration)

			const intervalId3 = setInterval(() => {
				currentIndex3 = (currentIndex3 + 1) % opts.length // Cycle through the array
				setResult((prevState) => [prevState[0], prevState[1], opts[currentIndex3]])
				setIndex3(currentIndex3)
			}, intervalDuration)

			setTimeout(() => {
				clearInterval(intervalId1)
				const result1 = getRandomItem(reel1)
				setResult((prevState) => [result1, prevState[1], prevState[2]])
				stopOn.play()
			}, spinDuration)

			setTimeout(() => {
				clearInterval(intervalId2)
				const result2 = getRandomItem(reel2)
				setResult((prevState) => [prevState[0], result2, prevState[2]])
				stopOn.play()
			}, spinDuration * 2)

			setTimeout(() => {
				clearInterval(intervalId3)
				const result3 = getRandomItem(reel3)
				setResult((prevState) => [prevState[0], prevState[1], result3])
				stopOn.play()
				setSpinning(false)
			}, spinDuration * 3)
		}
	}

	return (
		<div className="slot-machine">
			<h1>Slot Machine</h1>
			<div className="reels">
				<div>
					{result.map((item, index) => (
						<Reel key={index} className="result-item" item={item} />
					))}
				</div>
			</div>
			<Button spinReels={spinReels} spinning={spinning}></Button>
			<h1 className="coin-count">{coins}</h1>
		</div>
	)
}

export default SlotMachine
