import React, { useState, useEffect } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts"
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
				const filteredGambles = arr
				//.filter((entry) => entry.amount !== 0)

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

	const gradientOffset = () => {
		const dataMax = Math.max(...gambles.map((i) => i.amount))
		const dataMin = Math.min(...gambles.map((i) => i.amount))

		if (dataMax <= 0) {
			return 0
		}
		if (dataMin >= 0) {
			return 1
		}

		return dataMax / (dataMax - dataMin)
	}

	const off = gradientOffset()

	return (
		<ResponsiveContainer width="90%" height={500}>
			<AreaChart
				width={500}
				height={400}
				data={gambles}
				margin={{
					top: 50,
					right: 3,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="day" />
				<YAxis />
				<Tooltip />
				<defs>
					<linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
						<stop offset={off} stopColor="green" stopOpacity={1} />
						<stop offset={off} stopColor="red" stopOpacity={1} />
					</linearGradient>
				</defs>
				<Area type="monotone" dataKey="amount" stroke="#000" fill="url(#splitColor)" />
			</AreaChart>
		</ResponsiveContainer>
	)
}

export default Stats
