import React, { useEffect, useState, useMemo } from "react"
import { v4 as uuidv4 } from "uuid"
import "./GenericList.css"
import SearchBar from "../SearchBar/SearchBar"

function GenericList({ Component, fetch, ...args }) {
	const [originalList, setOriginalList] = useState([]) // Store the original list
	const [list, setList] = useState([]) // Use this for filtering

	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetch().then((items) => {
					console.log("fetched array")
					setOriginalList(items) // Store the original list
					setList(items) // Initialize list with the original data
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
		return list.map((item) => <Component className="generic-list-item" key={uuidv4()} itemInfo={item} />)
	}, [list])

	const handleSearch = (event) => {
		const searchTerm = event.target.value
		// Regex to avoid uppercase characters
		const reg = new RegExp(searchTerm, "ig")
		// Filter the original list and update the filtered list state
		const filteredList = originalList.filter((item) => reg.test(item.title))
		setList(filteredList)
	}

	return (
		<div className="body">
			<SearchBar handleSearch={handleSearch}></SearchBar>
			<div className="generic-list-container">{renderedList}</div>
		</div>
	)
}

export default GenericList
