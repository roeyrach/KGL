import React, { useEffect, useState, useMemo } from "react"
import { v4 as uuidv4 } from "uuid"

function GenericList({ Component, fetch, ...args }) {
	const [list, setList] = useState([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetch().then((items) => {
					console.log("fetched array")
					setList(items)
				})
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchData()

		return () => {
			console.log("Component destroyed")
		}
	}, [fetch])

	const renderedList = useMemo(() => {
		return list.map((item) => <Component key={uuidv4()} itemInfo={item} />)
	}, [list])

	return <>{renderedList}</>
}

export default GenericList
