export function formatSatsNumbers(num) {
  if (!num) return "0";
  const numFormat = new Intl.NumberFormat().format(num).replaceAll(",", " ");
  return numFormat;
}

export function convertBtcToSats(num) {
  return Number(num) * 1000000000;
}
