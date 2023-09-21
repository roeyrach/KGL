import React from "react"
import { getAllGames } from "../../API/axios"
import GenericList from "../../components/GenericList/GenericList"
import Card from "../../components/Card/Card"

function Home() {
	return <GenericList Component={Card} fetch={getAllGames}></GenericList>
}

export default Home
