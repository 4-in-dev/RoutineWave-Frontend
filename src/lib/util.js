export const getHHmmFormat = (time) => {
  return `${time.slice(0,2)}:${time.slice(-2)}`
}