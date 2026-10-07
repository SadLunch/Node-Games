import { PieceType } from "../constants";
import { Piece } from "./piece";
import { Position } from "./Position";

export class Rook extends Piece {
    constructor(position, team/*, possibleMoves = []*/, hasMoved = false) {
        super(position, PieceType.ROOK, team/*, possibleMoves*/);
        this.hasMoved = hasMoved;
    }

    calculatePossibleMoves(pieces) {
        let possibleRookMoves = [];
        // top
        for (let i = 1; i < 8; i++) {
            let rookMove = new Position(this.position.x, this.position.y - i);

            // is in bounds and not occupied
            if ((rookMove.y >= 0 && rookMove.y < 8)) {
                if (!pieces.some(piece => piece.position.equals(rookMove))) {
                    possibleRookMoves.push(rookMove);
                } else if (pieces.some(piece => piece.position.equals(rookMove) && piece.team !== this.team)) {
                    possibleRookMoves.push(rookMove);
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        // right
        for (let i = 1; i < 8; i++) {
            let rookMove = new Position(this.position.x + i, this.position.y);

            // is in bounds and not occupied
            if ((rookMove.x >= 0 && rookMove.x < 8)) {
                if (!pieces.some(piece => piece.position.equals(rookMove))) {
                    possibleRookMoves.push(rookMove);
                } else if (pieces.some(piece => piece.position.equals(rookMove) && piece.team !== this.team)) {
                    possibleRookMoves.push(rookMove);
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        // bottom
        for (let i = 1; i < 8; i++) {
            let rookMove = new Position(this.position.x, this.position.y + i);

            // is in bounds and not occupied
            if ((rookMove.y >= 0 && rookMove.y < 8)) {
                if (!pieces.some(piece => piece.position.equals(rookMove))) {
                    possibleRookMoves.push(rookMove);
                } else if (pieces.some(piece => piece.position.equals(rookMove) && piece.team !== this.team)) {
                    possibleRookMoves.push(rookMove);
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        // left
        for (let i = 1; i < 8; i++) {
            let rookMove = new Position(this.position.x - i, this.position.y);

            // is in bounds and not occupied
            if ((rookMove.x >= 0 && rookMove.x < 8)) {
                if (!pieces.some(piece => piece.position.equals(rookMove))) {
                    possibleRookMoves.push(rookMove);
                } else if (pieces.some(piece => piece.position.equals(rookMove) && piece.team !== this.team)) {
                    possibleRookMoves.push(rookMove);
                    break;
                } else {
                    break;
                }
            } else {
                break;
            }
        }

        this.possibleMoves = possibleRookMoves;
    }

    getPossibleMoves() {
        return this.possibleMoves;
    }

    clone() {
        return new Rook(
            this.position.clone(),
            this.team,
            /*this.possibleMoves.map(m => m.clone()),*/
            this.hasMoved
        );
    }
}