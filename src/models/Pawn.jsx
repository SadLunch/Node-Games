import { PieceType } from "../constants";
import { Position } from "./Position";
import { Piece } from "./piece";

export class Pawn extends Piece {
    constructor(position, team/*, possibleMoves = []*/) {
        super(position, PieceType.PAWN, team/*, possibleMoves*/)
        this.isFirstMove = undefined;
    }

    calculatePossibleMoves(pieces) {
        let possiblePawnMoves = [];

        let pawnMoves = this.isFirstMove === true || this.isFirstMove === false ? [
            new Position(this.position.x, this.position.y + (1 * this.team))
        ] : [
            new Position(this.position.x, this.position.y + (1 * this.team)),
            new Position(this.position.x, this.position.y + (2 * this.team))
        ]

        let possiblePawnFrontMovesAux = pawnMoves.filter(pos =>
            (pos.x >= 0 && pos.x < 8) &&
            (pos.y >= 0 && pos.y < 8)
        );
        let possiblePawnFrontMoves = [];
        for (const possibleMove of possiblePawnFrontMovesAux) {
            if (!pieces.some(piece => piece.position.equals(possibleMove))) {
                possiblePawnFrontMoves.push(possibleMove);
            } else {
                break;
            }
        }
            
        // .reduce((results, pos) => {
        //         if (!pieces.some(piece => piece.position.equals(pos))) {
        //             results.push(pos);
        //         } else {
        //             return results;
        //         }
        //         return results;
        //     }, []);

        possiblePawnMoves = possiblePawnMoves.concat(possiblePawnFrontMoves);

        // or it could also be 1 space diagonally if there is an opponent piece
        let possiblePawnEatMoves = [
            new Position(this.position.x - 1, this.position.y + (1 * this.team)),
            new Position(this.position.x + 1, this.position.y + (1 * this.team))
        ];
        let inBoundsPossiblePawnEatMoves = possiblePawnEatMoves.filter(pos =>
            (pos.x >= 0 && pos.x < 8) &&
            (pos.y >= 0 && pos.y < 8) &&
            pieces.some(piece =>
                piece.position.equals(pos) &&
                piece.team !== this.team
            )
        );

        // There is also "en passant" moves TODO

        possiblePawnMoves = possiblePawnMoves.concat(inBoundsPossiblePawnEatMoves);

        this.possibleMoves = possiblePawnMoves;
    }

    getPossibleMoves() {
        return this.possibleMoves;
    }

    clone() {
        return new Pawn(
            this.position.clone(),
            this.team/*,
            this.possibleMoves.map(m => m.clone())*/
        );
    }
}