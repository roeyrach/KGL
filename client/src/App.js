import "./App.css"
import { getAllGames } from "./API/axios"
import GenericList from "./components/GenericList/GenericList"
import Game from "./components/Games/Game"

function App() {
	return (
		<div className="App-header">
			<GenericList Component={Game} fetch={getAllGames}></GenericList>
		</div>
	)
}

export default App
