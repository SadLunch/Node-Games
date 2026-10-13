<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project. -->

Handle drag logic here: https://javascript.plainenglish.io/how-to-make-a-simple-custom-usedrag-react-hook-6b606d45d353

# React Chess

This is a prototype of a Chess game written in React.js.

## TODO List

- Display:
    - [x] Display board
    - [x] Display pieces
    - [x] Display possible moves
- Possible moves:
    - [x] Calculate moves within boundaries
    - [x] Calculate overtake moves (eat moves)
    - [x] Calculate castling moves
    - [x] Calculate "en passant" moves (in passing)
    - [x] Don't allow moves over other pieces (except Knight)
    - [x] Don't allow moves that place the playing team's King in check
    - [x] Don't allow moves that will lead to checkmate when the King is in check
- Piece Movement:
    - [x] If overtake move remove opponent piece
    - [x] Do castling moves correctly
    - [x] Do "en passant" moves correctly
    - [ ] Play sound when playing a piece
    - [x] Add grab and drop action to pieces
    - [ ] Convert moves to chess notation
- Checkmate:
    - [x] Check if playing team doesn't have any possible moves
    - [ ] Play sound on checkmate (depends on win or loss, maybe)
- Backend:
    - [ ] Create game in database on game start
    - [ ] Send moves in chess notation to backend database
    - [ ] Add multiplayer to chess game (Websockets)
- UI:
    - [ ] Make UI more visually appealing