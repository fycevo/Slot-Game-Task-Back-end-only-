# Slot Game

## Requirements

- node.js
- npm

## Setup

- npm install

## Game rules and assumptions

- Each reel stops at a random index in its configured symbol strip.
- The visible grid shows three consecutive symbols from each reel, wrapping at the end of the strip.
- Paylines read one symbol from each reel, following the configured row indexes.
- A win requires at least three matching symbols starting from the leftmost reel.
- The payout table values are used directly; the bet does not scale payouts.
- The simulation assumes a bet of 1 credit per active line, for 5 credits per spin.

## Project files

- configuration.ts — reel strips, paylines, dimensions, and payouts
- Slot.ts — spin generation and payline evaluation
- main.ts — runs and prints one spin
- simulationScript.ts — runs and summarizes many spins

## Run one spin

- npx tsx main.ts

## Run simulation script

- npx tsx simulationScript.ts
