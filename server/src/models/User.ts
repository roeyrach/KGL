export default interface User {
	username: string
	password: string
	email: string
	token: string
	amount: number
	gambles: Array<string>
}
