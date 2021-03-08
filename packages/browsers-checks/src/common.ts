export const log = (...args) => console.log(...args)
export const logError = (...args) => console.error(...args)

export const isNumeric = data => !isNaN(data) && !isNaN(parseFloat(data)) && isFinite(data)
