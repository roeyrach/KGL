import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import AppBar from "../components/AppBar/AppBar"
import { Provider } from "react-redux"
import { store, persistor } from "../redux/store" // Import both the store and persistor
import SignIn from "../pages/Auth/SignIn"
import SignUp from "../pages/Auth/SignUp"
import Home from "../pages/Home"
import SlotMachine from "../pages/SlotMachine/SlotMachine"
import { PersistGate } from "redux-persist/integration/react"
import Stats from "../pages/Stats/Stats"

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<div className="App-header">
					<Router>
						<AppBar />
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/sign-up" element={<SignUp />} />
							<Route path="/sign-in" element={<SignIn />} />
							<Route path="/slot-machine" element={<SlotMachine />} />
							<Route path="/stats" element={<Stats />} />
						</Routes>
					</Router>
				</div>
			</PersistGate>
		</Provider>
	)
}

export default App
