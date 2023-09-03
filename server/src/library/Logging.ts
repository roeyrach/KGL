import chalk from "chalk"

export default class Logging {
	public static log = (args: any) => this.info(args)
	public static info = (args: any) =>
		console.log(chalk.white(`[${new Date().toLocaleString()}] [INFO]`), typeof args === "string" ? chalk.white(args) : args)
	public static warn = (args: any) =>
		console.log(chalk.yellow(`[${new Date().toLocaleString()}] [INFO]`), typeof args === "string" ? chalk.yellowBright(args) : args)
	public static error = (args: any) =>
		console.log(chalk.red(`[${new Date().toLocaleString()}] [INFO]`), typeof args === "string" ? chalk.redBright(args) : args)
	public static req = (args: any) =>
		console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`), typeof args === "string" ? chalk.blue(args) : args)
	public static res = (args: any) =>
		console.log(chalk.green(`[${new Date().toLocaleString()}] [INFO]`), typeof args === "string" ? chalk.green(args) : args)
}
