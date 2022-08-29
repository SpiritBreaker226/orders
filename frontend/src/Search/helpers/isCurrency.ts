export const isCurrency = (searchString: string): boolean =>
  /^\d+(?:\.\d{0,2})$/.test(searchString) ||
  Number.isInteger(Number(searchString))
