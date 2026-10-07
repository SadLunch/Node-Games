import { useState } from 'react'
import './App.css'
import { blackPawnPromotionRow, cols, initialBoard, PieceType, rows, TeamType, whitePawnPromotionRow } from './constants';
import { Position } from './models/Position';
import { Piece } from './models/piece';
import { Pawn } from './models/Pawn';
import { useRef } from 'react';


function App() {

  return (
    <>
      <section className='flex flex-row gap-8 justify-self-center p-4 h-[70svh]'>
        <div id='boardSide' className='flex flex-col w-full h-full bg-blue-700 items-center justify-center gap-8'>
          <Board />
        </div>
        <div id='movesSide' className='w-[70svw] h-full bg-yellow-700'>

        </div>
      </section>
    </>
  )
}

const Tile = ({ row, col, piece = undefined, pointerdown = undefined, highlighted = false }) => {
  let classname = ["size-14", "relative",
    (row + col) % 2 !== 0 ? "bg-white" : "bg-mist-700",
    highlighted && 'before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[" "] before:size-6 before:rounded-full before:bg-black/40'
  ].filter(Boolean).join(' ');

  let position = rows[row] + cols[col];

  const onPointerDown = (ev) => {

    pointerdown(row, col);
  }

  const onPointerMove = (ev) => {

  }


  return (
    <div data-square={position} data-row={row} data-col={col} className={classname} onPointerDown={onPointerDown}>
      {(piece) && (
        <img src={piece.image} alt={`${piece.getTeam === TeamType.WHITE ? "White" : "Black"}+${piece.getType}`} />
      )}
    </div>
  )
}



const Board = () => {
  const promotionModalRef = useRef(null);
  const checkmateModalRef = useRef(null);

  const [boardState, setBoardState] = useState(initialBoard.clone());
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [promotionPawn, setPromotionPawn] = useState(null);
  const [winningTeam, setWinningTeam] = useState(null);

  let possibleMoves = [];

  const resetBoard = () => {
    setBoardState(initialBoard.clone());
    setWinningTeam(null);
    setPromotionPawn(null);
    setSelectedPiece(null);
    checkmateModalRef.current.classList.add('hidden');
  }

  const getPromotionPawnTeam = () => {
    return promotionPawn?.team === TeamType.BLACK ? "black" : "white";
  }

  const onPromotePawn = (pieceType) => {
    if (!promotionPawn) return;

    let clonedBoard = boardState.clone();
    setBoardState(() => {
      clonedBoard.promotePawn(promotionPawn, pieceType);

      return clonedBoard;
    })
    

    // at the end add the hidden classname to hide
    promotionModalRef.current.classList.add('hidden');
    setPromotionPawn(null);
  }

  const onSelectPiece = (row, col) => {
    let pos = new Position(col, row);

    if (selectedPiece) {
      if (selectedPiece.getPossibleMoves().some(m => m.equals(pos))) {
        console.log("entered here")
        let initialPos = selectedPiece.getPosition();
        boardState.playMove(initialPos, pos);
        // let clonedBoard = boardState.clone();
        // clonedBoard.playMove(initialPos, pos);
        // setBoardState(clonedBoard);
        // setBoardState(() => {
        //   let clonedBoard = boardState.clone();
        //   clonedBoard.calculateAllMoves();
        //   clonedBoard.playMove(initialPos, pos);

        //   return clonedBoard;
        // });

        if (selectedPiece instanceof Pawn) {
          if (pos.y === whitePawnPromotionRow || pos.y === blackPawnPromotionRow) {
            promotionModalRef.current.classList.remove('hidden');
            setPromotionPawn(selectedPiece);
          }
        }
      }
      setSelectedPiece(null);
    } else {

      let piece = boardState.getPieceFromPosition(pos);
      console.log(piece);
      if (piece) {
        piece.calculatePossibleMoves(boardState.pieces);
        possibleMoves = piece.getPossibleMoves();
        console.log(possibleMoves)

        setSelectedPiece(piece);
      }
    }
    
  }

  let board = [];

  for (let i = rows.length - 1; i >= 0; i--) {
    for (let j = 0; j < cols.length; j++) {
      let pos = new Position(j, i);
      let isHighlighted = selectedPiece ? selectedPiece.getPossibleMoves().some(m => m.equals(pos)) : false;
      let currentPiece = boardState.getPieceFromPosition(pos);
      board.push(<Tile key={`${i}-${j}`} row={i} col={j} piece={currentPiece} pointerdown={onSelectPiece} highlighted={isHighlighted} />)
    }
  }

  boardState.calculateAllMoves();

  if (!winningTeam && boardState.winningTeam) {
    checkmateModalRef.current.classList.remove('hidden');
    setWinningTeam(boardState.winningTeam);
  }

  const testing = () => {
    checkmateModalRef.current.classList.remove('hidden');
    // const clonedBoard = initialBoard.clone();

    // console.log(clonedBoard);
    // console.log(initialBoard);
    // console.log(clonedBoard === initialBoard); // false
    // console.log(clonedBoard.pieces === initialBoard.pieces); // should be false
    // console.log(clonedBoard.pieces[0] === initialBoard.pieces[0]); // should be false
    // console.log(
    //   clonedBoard.pieces[0].position === initialBoard.pieces[0].position
    // );
    // console.log(clonedBoard.pieces[0].possibleMoves === initialBoard.pieces[0].possibleMoves);
  }

  return (
    <>
      <div ref={checkmateModalRef} id='checkmateModal' className='fixed hidden z-50 inset-0 bg-gray-900/60 overflow-y-auto h-full w-full px-4'>
        <div className='relative px-40 py-10 top-40 mx-auto shadow-xl rounded-md bg-white size-max'>
          <h1 className='text-center text-2xl text-black font-semibold'>{winningTeam === TeamType.BLACK ? "Black" : "White"} Won!</h1>
          <button onClick={resetBoard}>Restart Game</button>
        </div>
      </div>
      <div ref={promotionModalRef} id='promotionModal' className='fixed hidden z-50 inset-0 bg-gray-900/60 overflow-y-auto h-full w-full px-4'>
        <div className='relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md'>
          <h1 className='text-center text-2xl text-black font-semibold'>Promote pawn to:</h1>
          <div id='modalBody' className='flex flex-row gap-4'>
            <img src={`/assets/images/Bishop_${getPromotionPawnTeam()}.png`}
              alt={`${getPromotionPawnTeam()} Bishop`}
              onClick={() => onPromotePawn(PieceType.BISHOP)} />
            <img src={`/assets/images/Knight_${getPromotionPawnTeam()}.png`}
              alt={`${getPromotionPawnTeam()} Knight`}
              onClick={() => onPromotePawn(PieceType.KNIGHT)} />
            <img src={`/assets/images/Queen_${getPromotionPawnTeam()}.png`}
              alt={`${getPromotionPawnTeam()} Queen`}
              onClick={() => onPromotePawn(PieceType.QUEEN)} />
            <img src={`/assets/images/Rook_${getPromotionPawnTeam()}.png`}
              alt={`${getPromotionPawnTeam()} Rook`}
              onClick={() => onPromotePawn(PieceType.ROOK)} />
          </div>
        </div>
      </div>
      <h1 className='text-2xl text-white font-semibold'>{boardState.currentTeam === TeamType.BLACK ? "Black" : "White"}'s turn</h1>
      {/* <button onClick={testing}>Test</button> */}
      <div id='board' className='grid grid-cols-8'>
        {board}
      </div>
    </>
  )
}

export default App
