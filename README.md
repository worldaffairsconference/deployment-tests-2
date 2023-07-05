firebase emulators:start --import ./firebase/emulator-data --export-on-exit
pnpm dev
pnpm test:unit
pnpm test:unit:watch
pnpm test:e2e

commitizen
