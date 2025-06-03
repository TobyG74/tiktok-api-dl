import chalk from "chalk"

export class Logger {
  static success(message: string): void {
    console.log(chalk.green("✓  " + message))
  }

  static error(message: string): void {
    console.error(chalk.red("✗  " + message))
  }

  static info(message: string): void {
    console.log(chalk.blue("ℹ  " + message))
  }

  static warning(message: string): void {
    console.log(chalk.yellow("⚠  " + message))
  }

  static result(message: string, color = chalk.cyan): void {
    console.log(color(message))
  }
}
