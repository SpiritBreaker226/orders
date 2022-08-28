// TypeScript does not currently do spread arguments and the developer
// can add any number of argumrnets they want
type returnFunction = (...arg: any) => void

export function debounce(
  callback: returnFunction,
  delay: number
): returnFunction {
  let timer: NodeJS.Timeout

  return (...args) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
