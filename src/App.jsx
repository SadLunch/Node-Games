import { useState } from 'react'
import './App.css'
import { blackPawnPromotionRow, cols, initialBoard, PieceType, rows, TeamType, whitePawnPromotionRow } from './constants';
import { Position } from './models/Position';
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

const Draggable = ({children, onDragMove, onPointerDown = () => {}, onPointerUp = () => {}, onPointerMove = () => {}}) => {
  const [isDragging, setIsDragging] = useState(false);
  const divRef = useRef(null);

  const handleMove = (ev) => {
    if (isDragging) onDragMove(ev);

    onPointerMove(ev);
  }

  const handleUp = (ev) => {
    setIsDragging(false);

    onPointerUp(ev);
  }

  const handleDown = (ev) => {
    ev.currentTarget.setPointerCapture(ev.pointerId);
    setIsDragging(true);

    onPointerDown(ev);
  }

  return (
    <div ref={divRef} onPointerDown={handleDown} onPointerMove={handleMove} onPointerUp={handleUp} style={{pointerEvents: isDragging ? "none": "auto"}}>
      {children}
    </div>
  )
}

const Tile = ({ row, col, piece = undefined, pointerdown = undefined, pointerup = undefined, pointermove = undefined, highlighted = false, newHighlighted = false }) => {
  const [translate, setTranslate] = useState({x: 0, y: 0});
  const [idDragging, setIsDragging] = useState(false);
  
  let classname = ["size-14", "relative",
    (row + col) % 2 !== 0 ? "bg-white" : "bg-mist-700",
    idDragging ? 'z-50' : 'z-0',
    highlighted && 'before:absolute before:left-1/2 before:top-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:content-[" "] before:size-6 before:rounded-full before:bg-black/40',
    newHighlighted && 'bg-amber-300/70'
  ].filter(Boolean).join(' ');

  let position = rows[row] + cols[col];

  const onPointerDown = (ev) => {
    ev.preventDefault();
    setIsDragging(true);
    pointerdown(row, col);
  }

  const onDragMove = (ev) => {
    setTranslate(prev => ({
      x: prev.x + ev.movementX,
      y: prev.y + ev.movementY
    }));
  }

  const onPointerUp = (ev) => {
    setIsDragging(false);
    // Get the Tile component under the user mouse
    const newTile = document.elementFromPoint(
      ev.clientX,
      ev.clientY
    )?.closest("[data-square]");

    if (!newTile) {
      // set translation to 0 so it is centered in the new square
      setTranslate({
        x: 0,
        y: 0
      });
      return;
    } 

    let row = newTile.dataset.row - 0;
    let col = newTile.dataset.col - 0;

    // define piece position through passed method
    pointerup(row, col)

    // set translation to 0 so it is centered in the new square
    setTranslate({
      x: 0,
      y: 0
    });
  }


  return (
    <div data-square={position} data-row={row} data-col={col} className={classname} /*onPointerDown={onPointerDown}*/ >
      {(piece) && (
        <Draggable onDragMove={onDragMove} onPointerDown={onPointerDown} onPointerUp={onPointerUp} >
          <img src={piece.image}
            alt={`${piece.getTeam === TeamType.WHITE ? "White" : "Black"}+${piece.getType}`}
            style={{
              transform: `translateX(${translate.x}px) translateY(${translate.y}px)`,
              pointerEvents: 'none'
            }}
          />
        </Draggable>
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

  const onPutDownPiece = (row, col) => {
    if (!selectedPiece) return;

    console.log("I have a piece: ", selectedPiece);

    // Set the position of the new tile
    let pos = new Position(col, row);
    
    if (selectedPiece.getPossibleMoves().some(m => m.equals(pos))) {
      // Get the selected piece's position
      let initialPos = selectedPiece.getPosition();

      // Play the piece
      setBoardState(() => {
        let clonedBoard = boardState.clone();
        clonedBoard.calculateAllMoves();
        clonedBoard.playMove(initialPos, pos);
        return clonedBoard;
      });

      // If the piece played is Pawn, check if need promotion
      if (selectedPiece instanceof Pawn) {
        if (pos.y === whitePawnPromotionRow || pos.y === blackPawnPromotionRow) {
          promotionModalRef.current.classList.remove('hidden');
          setPromotionPawn(selectedPiece);
        }
      }
    }

    // Deselect piece
    setSelectedPiece(null);
  }

  const onPickUpPiece = (row, col) => {
    let pos = new Position(col, row);

    setBoardState(() => {
      const clonedBoard = boardState.clone();

      clonedBoard.calculateAllMoves();

      let piece = clonedBoard.getPieceFromPosition(pos);

      if (piece) {
        
        possibleMoves = piece.getPossibleMoves();
        console.log(possibleMoves)

        setSelectedPiece(piece);
      }
      return clonedBoard;
    })
  }

  let board = [];

  for (let i = rows.length - 1; i >= 0; i--) {
    for (let j = 0; j < cols.length; j++) {
      let pos = new Position(j, i);
      let isHighlighted = selectedPiece ? selectedPiece.getPossibleMoves().some(m => m.equals(pos)) : false;
      let currentPiece = boardState.getPieceFromPosition(pos);
      board.push(<Tile key={`${i}-${j}`} row={i} col={j} piece={currentPiece} pointerdown={onPickUpPiece} pointerup={onPutDownPiece} highlighted={isHighlighted} />)
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
