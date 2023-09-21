import React, { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { getGambles } from "../../API/axios"
import { useSelector } from "react-redux"

const Stats = () => {
	const user = useSelector((state) => state.auth.user)
	const [gambles, setGambles] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getGambles(user?.email)
				const gmbls = response.data

				// Create a map to accumulate betAmount for each day
				const dayToAmountMap = new Map()

				// Initialize map with zeros for each day
				const currentDate = new Date()
				const daysInMonth = getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())
				for (let i = 1; i <= daysInMonth; i++) {
					dayToAmountMap.set(i, 0)
				}

				// Populate the map with actual betAmount values
				for (let i = 0; i < gmbls.length; i++) {
					const day = proccesingDate(gmbls[i].timestamp).day
					dayToAmountMap.set(day, dayToAmountMap.get(day) + gmbls[i].betAmount)
				}

				// Convert the map back to an array
				const arr = Array.from(dayToAmountMap, ([day, amount]) => ({ day, amount }))

				// Filter out entries with zero amount
				const filteredGambles = arr.filter((entry) => entry.amount !== 0)

				setGambles(filteredGambles)
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchData()
	}, [user?.email])

	const getDaysInMonth = (year, month) => {
		const lastDayOfMonth = new Date(year, month + 1, 0)
		return lastDayOfMonth.getDate()
	}

	const proccesingDate = (dataString) => {
		// Example: 2023-09-21T13:15:33.576Z
		const date = new Date(dataString)

		return {
			year: date.getFullYear(),
			month: date.getMonth() + 1,
			day: date.getDate(),
			hours: date.getHours(),
			minutes: date.getMinutes(),
			seconds: date.getSeconds(),
			milliseconds: date.getMilliseconds(),
		}
	}

	return (
		<ResponsiveContainer width="90%" height={500}>
			<BarChart
				width={500}
				height={300}
				data={gambles}
				margin={{
					top: 50,
					right: 3,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid />
				<XAxis dataKey="day" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="amount" fill={"green"} />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default Stats
