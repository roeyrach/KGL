const initialState = []

const quotesReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_TO_QUOTES":
			return [...state, action.payload]
		case "REMOVE_FROM_QUOTES":
			return state.filter((quote) => quote !== action.payload)
		default:
			return state
	}
}

export default quotesReducer
