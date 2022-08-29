export const formatCurrency = (
  price: number,
  currency = 'USD',
  localCode = 'en-US'
): string =>
  new Intl.NumberFormat(localCode, {
    style: 'currency',
    currency,
  }).format(price / 100)
