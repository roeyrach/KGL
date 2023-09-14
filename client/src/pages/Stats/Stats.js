import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
	{
		month: "January",
		amount: 4000,
	},
	{
		month: "February",
		amount: 3000,
	},
	{
		month: "March",
		amount: 2000,
	},
	{
		month: "April",
		amount: 2780,
	},
	{
		month: "May",
		amount: 1890,
	},
	{
		month: "June",
		amount: 2390,
	},
	{
		month: "July",
		amount: 3490,
	},
	{
		month: "August",
		amount: 3490,
	},
	{
		month: "September",
		amount: 3490,
	},
	{
		month: "October",
		amount: 3490,
	},
	{
		month: "November",
		amount: 3490,
	},
	{
		month: "December",
		amount: -3490,
	},
]

const Stats = () => {
	return (
		<ResponsiveContainer width="100%" height={500}>
			<BarChart
				width={500}
				height={300}
				data={data}
				margin={{
					top: 50,
					right: 3,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="month" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="amount" fill="#8884d8" name="Amount" />
			</BarChart>
		</ResponsiveContainer>
	)
}

export default Stats
