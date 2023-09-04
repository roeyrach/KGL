import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css"
import AppBar from "./components/AppBar/AppBar"
import { Provider } from "react-redux"
import store from "./redux/store"
import SignIn from "./pages/Auth/SignIn"
import SignUp from "./pages/Auth/SignUp"
import Home from "./pages/Home"

function App() {
	return (
		<Provider store={store}>
			<div className="App-header">
				<Router>
					<AppBar />
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/sign-up" element={<SignUp />} />
						<Route path="/sign-in" element={<SignIn />} />
					</Routes>
				</Router>
			</div>
		</Provider>
	)
}

export default App
