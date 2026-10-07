import { PieceType } from "../constants";
import { Piece } from "./piece";
import { Position } from "./Position";

export class Queen extends Piece {
    constructor(position, team/*, possibleMoves = []*/) {
        super(position, PieceType.QUEEN, team/*, possibleMoves*/);
    }

    calculatePossibleMoves(pieces) {
        let possibleQueenMoves = [];

        possibleQueenMoves = possibleQueenMoves.concat(this.#getPossibleBishopMoves(pieces));
        possibleQueenMoves = possibleQueenMoves.concat(this.#getPossibleRookMoves(pieces));

        this.possibleMoves = possibleQueenMoves;
    }

    getPossibleMoves() {
        return this.possibleMoves;
    }

    clone() {
        return new Queen(
            this.position.clone(),
            this.team/*,
            this.possibleMoves.map(m => m.clone())*/
        );
    }

    #getPossibleBishopMoves(pieces) {
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

        return possibleBishopMoves;
    }

    #getPossibleRookMoves(pieces) {
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

        return possibleRookMoves;
    }
}