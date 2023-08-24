import numeral from "numeral";

export function formatNumber(value: number | undefined): string {
  if (!value) {
    return "0";
  }

  if (value < 10000) {
    return numeral(value).format("0,0");
  }

  return numeral(value).format("0.0a");
}
