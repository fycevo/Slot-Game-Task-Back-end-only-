import Slot from "./Slot";

const slot = new Slot();
const result = slot.spin();

console.log("Reel stop positions: ", result.positions);
console.log("Visible grid");
console.table(result.grid);

console.log("Pay lines:");
console.table(
  result.lines.map((line) => ({
    line: line.lineIndex + 1,
    symbols: line.symbols.join(" - "),
    matchedSymbol: line.matchedSymbol ?? "-",
    matchedCount: line.matchedCount,
    payout: line.payout,
  })),
);

console.log("Total payout:", result.totalPayout);
