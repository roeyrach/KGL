import React from "react"
import "./SearchBar.css"

function SearchBar({ handleSearch }) {
	return (
		<form className="search" action="">
			<input placeholder="Search here..." type="search" className="input" onChange={(e) => handleSearch(e)}></input>
		</form>
	)
}

export default SearchBar
