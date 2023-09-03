const ADD_TO_QUOTES = "ADD_TO_QUOTES"
const REMOVE_FROM_QUOTES = "REMOVE_FROM_QUOTES"

export const addToQuotes = (quote) => (dispacth) => {
	dispacth({ type: ADD_TO_QUOTES, payload: quote })
}

export const removeFromQuotes = (quote) => (dispacth) => {
	dispacth({ type: REMOVE_FROM_QUOTES, payload: quote })
}
