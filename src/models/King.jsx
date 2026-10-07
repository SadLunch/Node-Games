import { PieceType } from "../constants";
import { Piece } from "./piece";
import { Position } from "./Position";

export class King extends Piece {
    constructor(position, team/*, possibleMoves = []*/) {
        super(position, PieceType.KING, team/*, possibleMoves*/);
        this.hasMoved = false;
    }

    calculatePossibleMoves(pieces) {
        let kingMoves = [
            new Position(this.position.x, this.position.y - 1),
            new Position(this.position.x + 1, this.position.y - 1),
            new Position(this.position.x + 1, this.position.y),
            new Position(this.position.x + 1, this.position.y + 1),
            new Position(this.position.x, this.position.y + 1),
            new Position(this.position.x - 1, this.position.y + 1),
            new Position(this.position.x - 1, this.position.y),
            new Position(this.position.x - 1, this.position.y - 1),
        ];

        //can only move 1 space in all directions if not obstructed by team's pieces

        let possibleKingMoves = kingMoves.filter(move =>
            (move.x >= 0 && move.x < 8) &&
            (move.y >= 0 && move.y < 8) &&
            !pieces.some(piece =>
                piece.position.equals(move) &&
                piece.team === this.team
            )
        );
        // can move 2 spaces when castling if, and only if, king and rook haven't been played, path between them is clear
        let possibleCastlingMoves = []

        if (!this.hasMoved) {
            let unmovedRooks = pieces.filter(piece =>
                piece.type === PieceType.ROOK &&
                piece.team === this.team &&
                !piece.hasMoved
            );

            if (unmovedRooks.length > 0) {
                unmovedRooks.forEach(rook => {
                    //       let isPossible = false;
                    let posQ = new Position(this.position.x - 1, this.position.y);
                    let posK = new Position(this.position.x + 1, this.position.y);

                    if (rook.possibleMoves.some(move => move.equals(posQ)) || rook.possibleMoves.some(move => move.equals(posK))) {
                        possibleCastlingMoves.push(rook.position)
                    }

                    //       // check if queenside castling
                    //       if (rook.position.x < this.position.x) {
                    //         pos = new Position(rook.position.x + 3, rook.position.y);
                    //         isPossible = rook.possibleMoves.some(move => move.equals(pos))
                    //       }
                    //       // check if kingside castling
                    //       if (rook.position.x > this.position.x) {
                    //         pos = new Position(rook.position.x - 2, rook.position.y);
                    //         isPossible = rook.possibleMoves.some(move => move.equals(pos))
                    //       }

                    //       if (isPossible) {
                    //         let kingMove
                    //         possibleCastlingMoves.push()
                    //       }
                });
            }
        }

        possibleKingMoves = possibleKingMoves.concat(possibleCastlingMoves);

        // in the end ALWAYS check if the move puts the king in check
        possibleKingMoves.filter(move =>
            !pieces.some(piece =>
                piece.team !== this.team &&
                piece.possibleMoves.some(pMove => pMove.equals(move))
            )
        );

        this.possibleMoves = possibleKingMoves;
    }

    getPossibleMoves() {
        return this.possibleMoves;
    }

    clone() {
        return new King(
            this.position.clone(),
            this.team/*,
            this.possibleMoves.map(m => m.clone())*/
        );
    }
}