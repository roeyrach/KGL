import React, { useEffect, useState, useMemo } from "react"
import { v4 as uuidv4 } from "uuid"
import "./GenericList.css"
import SearchBar from "../SearchBar/SearchBar"

function GenericList({ Component, fetch, ...args }) {
	const [originalList, setOriginalList] = useState([]) // Store the original list
	const [list, setList] = useState([]) // Use this for filtering
	const [currentPage, setCurrentPage] = useState(1)
	const itemsPerPage = 5 // Number of items to display per page

	useEffect(() => {
		const fetchData = async () => {
			try {
				await fetch().then((items) => {
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
		const startIndex = (currentPage - 1) * itemsPerPage
		const endIndex = startIndex + itemsPerPage
		const itemToDisplay = list.slice(startIndex, endIndex)

		return itemToDisplay.map((item) => <Component className="generic-list-item" key={uuidv4()} itemInfo={item} />)
	}, [list, currentPage])

	const goToPage = (page) => {
		setCurrentPage(page)
	}

	const goToPreviousPage = () => {
		if (currentPage > 1) goToPage(currentPage - 1)
	}

	const goToNextPage = () => {
		const totalPages = Math.ceil(list.length / itemsPerPage)
		if (currentPage < totalPages) goToPage(currentPage + 1)
	}

	const handleSearch = (event) => {
		const searchTerm = event.target.value
		// Regex to avoid uppercase characters
		const reg = new RegExp(searchTerm, "ig")
		// Filter the original list and update the filtered list state
		const filteredList = originalList.filter((item) => reg.test(item.title))
		setList(filteredList)
	}

	const totalPages = Math.ceil(list.length / itemsPerPage)

	return (
		<div className="body">
			<SearchBar handleSearch={handleSearch}></SearchBar>
			<div className="pagination">
				<button className="previes-button" onClick={goToPreviousPage} disabled={currentPage === 1}>
					Previes
				</button>
				<span>
					Page {currentPage} of {totalPages}
				</span>
				<button className="next-button" onClick={goToNextPage} disabled={currentPage === totalPages}>
					Next
				</button>
			</div>
			<div className="generic-list-container">{renderedList}</div>
		</div>
	)
}

export default GenericList
