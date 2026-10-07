import { PieceType } from "../constants";
import { Piece } from "./piece";
import { Position } from "./Position";

export class Bishop extends Piece {
    constructor(position, team/*, possibleMoves = []*/) {
        super(position, PieceType.BISHOP, team/*, possibleMoves*/);
    }

    calculatePossibleMoves(pieces) {
        let possibleBishopMoves = [];
        // top-left
        for (let i = 1; i < 8; i++) {
            let bishopMove = new Position(this.position.x - i, this.position.y - i);

            // is in bounds and not occupied
            if ((bishopMove.x >= 0 && bishopMove.x < 8) && (bishopMove.y >= 0 && bishopMove.y < 8)) {
                if (!pieces.some(piece => piece.position.equals(bishopMove))) {
                    possibleBishopMoves.push(bishopMove);
                } else if (pieces.some(piece => piece.position.equals(bishopMove) && piece.team !== this.team)) {
                    possibleBishopMoves.push(bishopMove);
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        // top-right
        for (let i = 1; i < 8; i++) {
            let bishopMove = new Position(this.position.x + i, this.position.y - i);

            // is in bounds and not occupied
            if ((bishopMove.x >= 0 && bishopMove.x < 8) && (bishopMove.y >= 0 && bishopMove.y < 8)) {
                if (!pieces.some(piece => piece.position.equals(bishopMove))) {
                    possibleBishopMoves.push(bishopMove);
                } else if (pieces.some(piece => piece.position.equals(bishopMove) && piece.team !== this.team)) {
                    possibleBishopMoves.push(bishopMove);
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        // bottom-left
        for (let i = 1; i < 8; i++) {
            let bishopMove = new Position(this.position.x - i, this.position.y + i);

            // is in bounds and not occupied
            if ((bishopMove.x >= 0 && bishopMove.x < 8) && (bishopMove.y >= 0 && bishopMove.y < 8)) {
                if (!pieces.some(piece => piece.position.equals(bishopMove))) {
                    possibleBishopMoves.push(bishopMove);
                } else if (pieces.some(piece => piece.position.equals(bishopMove) && piece.team !== this.team)) {
                    possibleBishopMoves.push(bishopMove);
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        // bottom-right
        for (let i = 1; i < 8; i++) {
            let bishopMove = new Position(this.position.x + i, this.position.y + i);

            // is in bounds and not occupied
            if ((bishopMove.x >= 0 && bishopMove.x < 8) && (bishopMove.y >= 0 && bishopMove.y < 8)) {
                if (!pieces.some(piece => piece.position.equals(bishopMove))) {
                    possibleBishopMoves.push(bishopMove);
                } else if (pieces.some(piece => piece.position.equals(bishopMove) && piece.team !== this.team)) {
                    possibleBishopMoves.push(bishopMove);
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        this.possibleMoves = possibleBishopMoves;
    }

    getPossibleMoves() {
        return this.possibleMoves;
    }
    
    clone() {
        return new Bishop(
            this.position.clone(),
            this.team/*,
            this.possibleMoves.map(m => m.clone())*/
        );
    }
}