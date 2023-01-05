export function parseUnit(source: string | number, unit?: "k" | "m"): string {
  let result = "";
  let digit: number;
  if (typeof source === "string") {
    digit = parseInt(source);
  } else {
    digit = source;
  }
  if (!unit) {
    let position = String(digit).split("");
    if (position.length < 5) {
      result = (digit / 1000).toFixed(2);
    } else if (position.length >= 5 && position.length <= 7) {
      result = (digit / 10000).toFixed(2) + "万";
    }
  }
  return result;
}
