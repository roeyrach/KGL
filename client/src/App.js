import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import { getAllGames } from "./API/axios"
import GenericList from "./components/GenericList/GenericList"
import Card from "./components/Card/Card"
import AppBar from "./components/AppBar/AppBar"
import { Provider } from "react-redux"
import store from "./redux/store"

function App() {
	return (
		<Provider store={store}>
			<div className="App-header">
				<Router>
					<AppBar />
					<Routes>
						<Route path="/" element={<GenericList Component={Card} fetch={getAllGames}></GenericList>} />
					</Routes>
				</Router>
			</div>
		</Provider>
	)
}

export default App
