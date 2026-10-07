import { TeamType } from "../constants";

export class Piece {
  constructor(position, type, team/*, possibleMoves = []*/) {
    this.position = position;
    this.type = type;
    this.team = team;
    this.image = team === TeamType.BLACK ? `/assets/images/${this.type}_black.png` : `/assets/images/${this.type}_white.png`
    // this.hasMoved = false;
    this.possibleMoves = [];
  }

  getPosition() {
    return this.position;
  }

  setPosition(pos) {
    this.position = pos;
  }

  get getType() {
    return this.type;
  }

  set setType(t) {
    this.type = t;
  }

  get getTeam() {
    return this.team;
  }

  getPossibleMoves() {
    throw new Error("getPossibleMoves() must be implemented by a subclass!");
  }

  calculatePossibleMoves(pieces) {
    throw new Error("calculatePossibleMoves() must be implemented by a subclass!");
  }

  clone() {
    return new this.constructor(
      this.position.clone(),
      this.team/*,
      this.possibleMoves.map(move => move.clone())*/
    );
  }
}
// set possibleMoves(pm) {
//   this.possibleMoves = pm;
// }
// setHasMoved() {
//   this.hasMoved = true;
// }

//   getPossibleMoves(board) {
//     // switch (this.type) {
//     //   case PieceType.BISHOP:
//     //     let possibleBishopMoves = this.#getPossibleBishopMoves(board);

//     //     this.possibleMoves.concat(possibleBishopMoves);
//     //     break;
//     //   case PieceType.KNIGHT: 
//     //     let knightMoves = [
//     //       new Position(this.position.x - 1, this.position.y - 2),
//     //       new Position(this.position.x + 1, this.position.y - 2),
//     //       new Position(this.position.x + 2, this.position.y - 1),
//     //       new Position(this.position.x + 2, this.position.y + 1),
//     //       new Position(this.position.x + 1, this.position.y + 2),
//     //       new Position(this.position.x - 1, this.position.y + 2),
//     //       new Position(this.position.x - 2, this.position.y + 1),
//     //       new Position(this.position.x - 2, this.position.y - 1),
//     //     ];

//     //     // Get only moves within the board bounds, and 
//     //     let possibleKnightMoves = knightMoves.filter(move => 
//     //       (move.x >= 0 && move.x < 8) &&    // vvvvvv
//     //       (move.y >= 0 && move.y < 8) &&    // Moves within boundaries
//     //       !board.some(piece => 
//     //         piece.position.equals(move) &&  // Moves that take over
//     //         piece.team === this.team        // opponents pieces
//     //       )
//     //     );

//     //     this.possibleMoves.concat(possibleKnightMoves);

//     //     break;
//     //   case PieceType.ROOK:
//     //     let possibleRookMoves = this.#getPossibleRookMoves(board);

//     //     this.possibleMoves.concat(possibleRookMoves);
//     //     break;
//     //   case PieceType.PAWN:
//     //     let pawnMoves = this.hasMoved ? [
//     //       new Position(this.position.x, this.position.y + (1 * this.team))
//     //     ] : [
//     //       new Position(this.position.x, this.position.y + (1 * this.team)),
//     //       new Position(this.position.x, this.position.y + (2 * this.team))
//     //     ]

//     //     let possiblePawnFrontMoves = pawnMoves.filter(move =>
//     //       (move.x >= 0 && move.x < 8) &&
//     //       (move.y >= 0 && move.y < 8) &&
//     //       !board.some(piece =>
//     //         piece.position.equals(move)
//     //       )
//     //     );

//     //     this.possibleMoves.concat(possiblePawnFrontMoves);

//     //     // or it could also be 1 space diagonally if there is an opponent piece
//     //     let possiblePawnEatMoves = [
//     //       new Position(this.position.x - 1, this.position.y + (1 * this.team)),
//     //       new Position(this.position.x + 1, this.position.y + (1 * this.team))
//     //     ];
//     //     let inBoundsPossiblePawnEatMoves = possiblePawnEatMoves.filter(pos => 
//     //       (pos.x >= 0 && pos.x < 8) && 
//     //       (pos.y >= 0 && pos.y < 8) && 
//     //       board.some(piece => 
//     //         piece.position.equals(pos) && 
//     //         piece.team !== this.team
//     //       )
//     //     );

//     //     // There is also "en passant" moves TODO

//     //     this.possibleMoves.concat(inBoundsPossiblePawnEatMoves);

//     //     break;
//     //   case PieceType.QUEEN:
//     //     let possibleQueenMoves = [];
//     //     possibleQueenMoves.concat(this.#getPossibleBishopMoves);
//     //     possibleQueenMoves.concat(this.#getPossibleRookMoves);

//     //     this.possibleMoves.concat(possibleQueenMoves);
//     //     break;
//     //   case PieceType.KING:
//     //     let kingMoves = [
//     //       new Position(this.position.x    , this.position.y - 1),
//     //       new Position(this.position.x + 1, this.position.y - 1),
//     //       new Position(this.position.x + 1, this.position.y    ),
//     //       new Position(this.position.x + 1, this.position.y + 1),
//     //       new Position(this.position.x    , this.position.y + 1),
//     //       new Position(this.position.x - 1, this.position.y + 1),
//     //       new Position(this.position.x - 1, this.position.y    ),
//     //       new Position(this.position.x - 1, this.position.y - 1),
//     //     ];

//     //     //can only move 1 space in all directions if not obstructed by team's pieces

//     //     let possibleKingMoves = kingMoves.filter(move =>
//     //       (move.x >= 0 && move.x < 8) &&
//     //       (move.y >= 0 && move.y < 8) &&
//     //       !board.some(piece => 
//     //         piece.position.equals(move) &&
//     //         piece.team === this.team
//     //       )
//     //     );
//     //     // can move 2 spaces when castling if, and only if, king and rook haven't been played, path between them is clear

//     //     // if (!this.hasMoved) {
//     //     //   let possibleCastlingMoves = []

//     //     //   let unmovedRooks = board.filter(piece =>
//     //     //     piece.type === PieceType.ROOK &&
//     //     //     piece.team === this.team &&
//     //     //     !piece.hasMoved
//     //     //   );

//     //     //   if (unmovedRooks.length > 0) {
//     //     //     unmovedRooks.forEach(rook => {
//     //     //       let isPossible = false;
//     //     //       let pos;
//     //     //       // check if queenside castling
//     //     //       if (rook.position.x < this.position.x) {
//     //     //         pos = new Position(rook.position.x + 3, rook.position.y);
//     //     //         isPossible = rook.possibleMoves.some(move => move.equals(pos))
//     //     //       }
//     //     //       // check if kingside castling
//     //     //       if (rook.position.x > this.position.x) {
//     //     //         pos = new Position(rook.position.x - 2, rook.position.y);
//     //     //         isPossible = rook.possibleMoves.some(move => move.equals(pos))
//     //     //       }

//     //     //       if (isPossible) {
//     //     //         let kingMove
//     //     //         possibleCastlingMoves.push()
//     //     //       }
//     //     //     });
//     //     //   }
//     //     // }

//     //     // in the end ALWAYS check if the move puts the king in check
//     //     possibleKingMoves.filter(move => 
//     //       !board.some(piece => 
//     //         piece.possibleMoves.some(pMove => pMove.equals(move))
//     //       )
//     //     );

//     //     this.possibleMoves.concat(possibleKingMoves);

//     //     break;
//     //   default:
//     //     break;
//     // }
//   }

//   #getPossibleBishopMoves(board) {
//     let possibleBishopMoves = [];
//     // top-left
//     for (let i = 1; i < 8; i++) {
//       let bishopMove = new Position(this.position.x - i, this.position.y - i);

//       // is in bounds and not occupied
//       if ((bishopMove.x >= 0 && bishopMove.x < 8) && (bishopMove.y >= 0 && bishopMove.y < 8)) {
//         if (!board.some(piece => piece.position.equals(bishopMove))) {
//           possibleBishopMoves.push(bishopMove);
//         } else if (board.some(piece => piece.position.equals(bishopMove) && piece.team !== this.team)) {
//           possibleBishopMoves.push(bishopMove);
//           break;
//         } else {
//           break;
//         }
//       } else {
//         break;
//       }
//     }

//     // top-right
//     for (let i = 1; i < 8; i++) {
//       let bishopMove = new Position(this.position.x + i, this.position.y - i);

//       // is in bounds and not occupied
//       if ((bishopMove.x >= 0 && bishopMove.x < 8) && (bishopMove.y >= 0 && bishopMove.y < 8)) {
//         if (!board.some(piece => piece.position.equals(bishopMove))) {
//           possibleBishopMoves.push(bishopMove);
//         } else if (board.some(piece => piece.position.equals(bishopMove) && piece.team !== this.team)) {
//           possibleBishopMoves.push(bishopMove);
//           break;
//         } else {
//           break;
//         }
//       } else {
//         break;
//       }
//     }

//     // bottom-left
//     for (let i = 1; i < 8; i++) {
//       let bishopMove = new Position(this.position.x - i, this.position.y + i);

//       // is in bounds and not occupied
//       if ((bishopMove.x >= 0 && bishopMove.x < 8) && (bishopMove.y >= 0 && bishopMove.y < 8)) {
//         if (!board.some(piece => piece.position.equals(bishopMove))) {
//           possibleBishopMoves.push(bishopMove);
//         } else if (board.some(piece => piece.position.equals(bishopMove) && piece.team !== this.team)) {
//           possibleBishopMoves.push(bishopMove);
//           break;
//         } else {
//           break;
//         }
//       } else {
//         break;
//       }
//     }

//     // bottom-right
//     for (let i = 1; i < 8; i++) {
//       let bishopMove = new Position(this.position.x + i, this.position.y + i);

//       // is in bounds and not occupied
//       if ((bishopMove.x >= 0 && bishopMove.x < 8) && (bishopMove.y >= 0 && bishopMove.y < 8)) {
//         if (!board.some(piece => piece.position.equals(bishopMove))) {
//           possibleBishopMoves.push(bishopMove);
//         } else if (board.some(piece => piece.position.equals(bishopMove) && piece.team !== this.team)) {
//           possibleBishopMoves.push(bishopMove);
//           break;
//         } else {
//           break;
//         }
//       } else {
//         break;
//       }
//     }

//     return possibleBishopMoves;
//   }

//   #getPossibleRookMoves(board) {
//     let possibleRookMoves = [];
//         // top
//         for (let i = 1; i < 8; i++) {
//           let rookMove = new Position(this.position.x, this.position.y - i);
        
//           // is in bounds and not occupied
//           if ((rookMove.y >= 0 && rookMove.y < 8)) {
//             if (!board.some(piece => piece.position.equals(rookMove))) {
//               possibleRookMoves.push(rookMove);
//             } else if (board.some(piece => piece.position.equals(rookMove) && piece.team !== this.team)) {
//               possibleRookMoves.push(rookMove);
//               break;
//             } else {
//               break;
//             }
//           } else {
//             break;
//           }
//         }

//         // right
//         for (let i = 1; i < 8; i++) {
//           let rookMove = new Position(this.position.x + i, this.position.y);
        
//           // is in bounds and not occupied
//           if ((rookMove.x >= 0 && rookMove.x < 8)) {
//             if (!board.some(piece => piece.position.equals(rookMove))) {
//               possibleRookMoves.push(rookMove);
//             } else if (board.some(piece => piece.position.equals(rookMove) && piece.team !== this.team)) {
//               possibleRookMoves.push(rookMove);
//               break;
//             } else {
//               break;
//             }
//           } else {
//             break;
//           }
//         }

//         // bottom
//         for (let i = 1; i < 8; i++) {
//           let rookMove = new Position(this.position.x, this.position.y + i);
        
//           // is in bounds and not occupied
//           if ((rookMove.y >= 0 && rookMove.y < 8)) {
//             if (!board.some(piece => piece.position.equals(rookMove))) {
//               possibleRookMoves.push(rookMove);
//             } else if (board.some(piece => piece.position.equals(rookMove) && piece.team !== this.team)) {
//               possibleRookMoves.push(rookMove);
//               break;
//             } else {
//               break;
//             }
//           } else {
//             break;
//           }
//         }

//         // left
//         for (let i = 1; i < 8; i++) {
//           let rookMove = new Position(this.position.x - i, this.position.y);
        
//           // is in bounds and not occupied
//           if ((rookMove.x >= 0 && rookMove.x < 8)) {
//             if (!board.some(piece => piece.position.equals(rookMove))) {
//               possibleRookMoves.push(rookMove);
//             } else if (board.some(piece => piece.position.equals(rookMove) && piece.team !== this.team)) {
//               possibleRookMoves.push(rookMove);
//               break;
//             } else {
//               break;
//             }
//           } else {
//             break;
//           }
//         }

//         return possibleRookMoves;
//   }