import "./App.css"
import { getAllGames } from "./API/axios"
import GenericList from "./components/GenericList/GenericList"
import Card from "./components/Card/Card"

function App() {
	return (
		<div className="App-header">
			<GenericList Component={Card} fetch={getAllGames}></GenericList>
		</div>
	)
}

export default App
