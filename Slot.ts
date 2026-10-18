import config from "./configuration";

export interface LineResult {
  lineIndex: number;
  symbols: number[];
  matchedSymbol: number | null;
  matchedCount: number;
  payout: number;
}

export interface SpinResult {
  // One stop index for each reel strip.
  positions: number[];
  // Visible screen, arranged as rows first: grid[row][reel].
  grid: number[][];
  // The result for each configured payline.
  lines: LineResult[];
  // Sum of all payline payouts for this spin.
  totalPayout: number;
}

export default class Slot {
  public spin(): SpinResult {
    const positions: number[] = [];
    const grid: number[][] = Array.from({ length: config.rowsCount }, () =>
      Array<number>(config.reelsCount).fill(0),
    );

    for (let reelIndex = 0; reelIndex < config.reelsCount; reelIndex++) {
      const reel = config.reels[reelIndex];

      if (!reel || reel.length === 0) {
        throw new Error(`Reel ${reelIndex} is missing or empty.`);
      }

      const stopPosition = Math.floor(Math.random() * reel.length);
      positions.push(stopPosition);

      for (let rowIndex = 0; rowIndex < config.rowsCount; rowIndex++) {
        const stripIndex = (stopPosition + rowIndex) % reel.length;
        const symbolId = reel[stripIndex];

        if (symbolId === undefined) {
          throw new Error(
            `No symbol at reel ${reelIndex}, index ${stripIndex}.`,
          );
        }

        grid[rowIndex]![reelIndex] = symbolId;
      }
    }

    const lines = config.lines.map((line, lineIndex) =>
      this.evaluateLine(grid, line, lineIndex),
    );
    const totalPayout = lines.reduce((total, line) => total + line.payout, 0);

    return {
      positions,
      grid,
      lines,
      totalPayout,
    };
  }

  private evaluateLine(
    grid: number[][],
    line: number[],
    lineIndex: number,
  ): LineResult {
    const symbols = line.map((rowIndex, reelIndex) => {
      const symbolId = grid[rowIndex]?.[reelIndex];

      if (symbolId === undefined) {
        throw new Error(`Invalid row ${rowIndex} in payline ${lineIndex}.`);
      }

      return symbolId;
    });

    // A win is a run of matching symbols starting from the leftmost reel.
    const firstSymbol = symbols[0];
    let matchedCount = 0;

    if (firstSymbol !== undefined) {
      for (const symbolId of symbols) {
        if (symbolId !== firstSymbol) {
          break;
        }

        matchedCount++;
      }
    }

    // Payout arrays use index 2 for 3 matches, index 3 for 4, and index 4 for 5.
    const paytable =
      firstSymbol === undefined
        ? undefined
        : config.symbols[firstSymbol as keyof typeof config.symbols];
    const payout = matchedCount >= 3 ? (paytable?.[matchedCount - 1] ?? 0) : 0;

    return {
      lineIndex,
      symbols,
      matchedSymbol: matchedCount >= 3 ? (firstSymbol ?? null) : null,
      matchedCount,
      payout,
    };
  }
}
