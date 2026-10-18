import Slot from "./Slot";

const slot = new Slot();
const numberOfSpins = 100000;
const betPerSpin = 5;

let totalWins = 0;
let totalBets = 0;
let winningSpins = 0;

const startTime = performance.now();
for (let i = 0; i < numberOfSpins; i++) {
  const result = slot.spin();

  totalWins += result.totalPayout;
  totalBets += betPerSpin;

  if (result.totalPayout > 0) {
    winningSpins++;
  }
}

const elapsedMs = performance.now() - startTime;

console.log(`Number of spins: ${numberOfSpins}`);
console.log(`Total wins: ${totalWins}`);
console.log(`Total bets: ${totalBets}`);
console.log(`Winning spins: ${winningSpins}`);
console.log(`Time elapsed: ${elapsedMs}ms`);
