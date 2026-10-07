import { PieceType } from "../constants";
import { Piece } from "./piece";
import { Position } from "./Position";

export class Knight extends Piece {
    constructor(position, team/*, possibleMoves = []*/) {
        super(position, PieceType.KNIGHT, team/*, possibleMoves*/);
    }

    calculatePossibleMoves(pieces) {
        let knightMoves = [
            new Position(this.position.x - 1, this.position.y - 2),
            new Position(this.position.x + 1, this.position.y - 2),
            new Position(this.position.x + 2, this.position.y - 1),
            new Position(this.position.x + 2, this.position.y + 1),
            new Position(this.position.x + 1, this.position.y + 2),
            new Position(this.position.x - 1, this.position.y + 2),
            new Position(this.position.x - 2, this.position.y + 1),
            new Position(this.position.x - 2, this.position.y - 1),
        ];

        // Get only moves within the board bounds, and 
        let possibleKnightMoves = knightMoves.filter(move =>
            (move.x >= 0 && move.x < 8) &&    // vvvvvv
            (move.y >= 0 && move.y < 8) &&    // Moves within boundaries
            !pieces.some(piece =>
                piece.position.equals(move) &&  // Moves that take over
                piece.team === this.team        // opponents pieces
            )
        );

        this.possibleMoves = possibleKnightMoves;
    }

    getPossibleMoves() {
        return this.possibleMoves;
    }

    clone() {
        return new Knight(
            this.position.clone(),
            this.team/*,
            this.possibleMoves.map(m => m.clone())*/
        );
    }
}