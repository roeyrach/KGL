import React, { useState, useRef, useEffect } from "react"
import "./SlotMachine.css"
import pngegg from "../../assets/images/pngegg.png"
import Reel from "./Reel"
import reelSound from "../../assets/sounds/start_play.wav"
import coinSound from "../../assets/sounds/coin_win.wav"
import stopSound from "../../assets/sounds/stop.wav"
import Button from "./ButtonSpin/Button"
import { rewardHandler } from "../../API/axios"
import { useSelector, useDispatch } from "react-redux"
import { setUser } from "../../redux/user/action"
import coinsSVG from "../../assets/images/coins-solid.svg"

function SlotMachine() {
	const user = useSelector((state) => state.auth.user)
	const dispatchRef = useRef(useDispatch())
	const dispatch = dispatchRef.current // Access dispatch from the useRef
	let userAmount = user?.amount // Access user outside of the useEffect

	const reel1 = ["cherry", "lemon", "apple", "lemon", "banana", "banana", "lemon", "lemon"]
	const reel2 = ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"]
	const reel3 = ["lemon", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]

	const [result, setResult] = useState([null, null, null])
	const [spinning, setSpinning] = useState(false)
	const [coins, setCoins] = useState(userAmount)
	const [last, setLast] = useState(false)

	useEffect(() => {
		console.log(last)
		rewardHandle()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [last])

	const rewardHandle = async () => {
		let sound = new Audio(coinSound)
		if (result[0] !== null && result[1] !== null && result[2] !== null) {
			console.log(result)
			const reward = await rewardHandler(result, user.email)
			console.log(reward.data)
			const rewardAmount = parseInt(reward?.data?.amount)
			console.log(userAmount, rewardAmount) // Logging rewardAmount for debugging
			if (!isNaN(userAmount) && !isNaN(rewardAmount)) {
				const total = userAmount + rewardAmount
				setCoins(total)
				const updatedUser = {
					...user,
					amount: total,
				}
				dispatch(setUser(updatedUser))
				sound.play()
			}
		}
	}

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
			const spinDuration = 500

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
				setLast(!last)
			}, spinDuration * 3)
		}
	}

	return (
		<div className="slot-machine">
			<img src={pngegg} alt="" className="pngegg"></img>
			<div className="reels">
				<div className="reels-container">
					{result.map((item, index) => (
						<Reel key={index} className="result-item" item={item} />
					))}
				</div>
				<div className="coins">
					<h1 className="coin-count">{coins}</h1>
					<img className="coinsSVG" src={coinsSVG} alt=""></img>
				</div>
			</div>
			<Button spinReels={spinReels} spinning={spinning}></Button>
		</div>
	)
}

export default SlotMachine
