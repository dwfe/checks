export const log = (...params) => console.log(...params)
export const logError = (...params) => console.error(...params)

export const isNumeric = data => !isNaN(data) && !isNaN(parseFloat(data)) && isFinite(data)
