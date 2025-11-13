# Electron-Next-test
A simple repository to try Electron + Next.js

---

## General stuff to know

> This is NOT a vite-electron project. If you want, there's this vercel official template for electron with next: [here :o](https://github.com/vercel/next.js/tree/canary/examples%2Fwith-electron)

As you open the folder `test-next-electron`, you'll find a ***glorious*** `package.json` file.

As for any node project, just install dependencies:
```bash
cd test-next-electron && npm i
```

As for now, since electron is starting a Node.js server, you'll have two processes: one listening on port 3000 and one listening on port 3001. You can bypass this port setting by installing
```bash
npm install get-port
```

And adding this stuff in file `test-next-electron/electron/main.js`:
```js
import getPort from "get-port";
const PORT = await getPort({ port: 3000 });
```

## Build
To build the project in an executable, just use the command specified in `package.json`:
```bash
npm run build:electron
```
This will generate a `release` folder in which you'll find executables.
I suggest you to test them in this way:
- Launch the executable you want to try (for me it was the MacOS)
- If it doesn't start, launch it from CLI:
  ```bash
  ./release/mac-arm64/TestNextElectron.app/Contents/MacOS/TestNextElectron
  ```
  In this way you'll be able to see console logs from `test-next-electron/electron/main.js`
- If you need to run the project with electron while you work on it, I suggest to use the command `npx electron . --trace-warnings`

## Bye.