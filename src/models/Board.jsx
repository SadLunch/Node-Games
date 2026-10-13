import { PieceType, TeamType } from "../constants";
import { Bishop } from "./Bishop";
import { King } from "./King";
import { Knight } from "./Knight";
import { Pawn } from "./Pawn";
import { Position } from "./Position";
import { Queen } from "./Queen";
import { Rook } from "./Rook";

export class Board {
  constructor(pieces, totalTurns, winningTeam = undefined) {
    this.pieces = pieces;
    this.totalTurns = totalTurns;
    this.winningTeam = winningTeam;
    this.lastMove = undefined;
  }

  get currentTeam() {
    return this.totalTurns % 2 === 0 ? TeamType.BLACK : TeamType.WHITE;
  }

  getPieceFromPosition(x, y) {
    return this.pieces.find(p => p.position.equals(x, y));
  }

  getPieceFromPosition(pos) {
    return this.pieces.find(p => p.position.equals(pos));
  }

  calculateAllMoves() {
    // get all moves for all pieces in the board
    for (let piece of this.pieces) {
      piece.calculatePossibleMoves(this.pieces);
      if (piece instanceof Pawn) {
        piece.calculateEnPassantMoves(this.pieces, this.lastMove);
      }
    }

    // check every piece's movements to see if they endanger their team's king
    for (let piece of this.pieces.filter(piece => piece.team === this.currentTeam)) {
      if (piece.possibleMoves.length === 0) continue;

      // check if moves put the king in check, if so remove them
      for (let move of piece.possibleMoves) {
        const simulatedBoard = this.clone();

        const clonedPiece = simulatedBoard.pieces.find(p => p.position.equals(piece.position));

        if (clonedPiece instanceof King) {
          let secondClonedPiece = simulatedBoard.pieces.find(p =>
            p.position.equals(move) &&
            p.team === clonedPiece.team &&
            p instanceof Rook
          );

          if (secondClonedPiece) {
            if (secondClonedPiece.position.x > clonedPiece.position.x) {
              const newKingPos = new Position(clonedPiece.position.x + 2, clonedPiece.position.y);
              const newRookPos = new Position(secondClonedPiece.position.x - 2, secondClonedPiece.position.y)
              clonedPiece.position.setPosition(newKingPos);
              secondClonedPiece.position.setPosition(newRookPos);
            } else {
              const newKingPos = new Position(clonedPiece.position.x - 2, clonedPiece.position.y);
              const newRookPos = new Position(secondClonedPiece.position.x + 3, secondClonedPiece.position.y)
              clonedPiece.position.setPosition(newKingPos);
              secondClonedPiece.position.setPosition(newRookPos);
            }
          }
        } else {
          simulatedBoard.pieces = simulatedBoard.pieces.filter(p => !p.position.equals(move));
          
          clonedPiece.position.setPosition(move.clone());
        }

        const clonedKing = simulatedBoard.pieces.find(p => p.type === PieceType.KING && p.team === simulatedBoard.currentTeam);

        for (let enemy of simulatedBoard.pieces.filter(p => p.team !== simulatedBoard.currentTeam)) {
          enemy.calculatePossibleMoves(simulatedBoard.pieces);

          if (enemy.getPossibleMoves().some(m => m.equals(clonedKing.position))) {
            piece.possibleMoves = piece.possibleMoves.filter(m => !m.equals(move));
          }
        }
      }
    }

    // remove all moves from opponent pieces
    for (let piece of this.pieces.filter(p => p.team !== this.currentTeam)) {
      piece.possibleMoves = [];
    }

    if (this.pieces.filter(p => p.team === this.currentTeam).some(p => p.possibleMoves.length > 0)) return;

    this.winningTeam = this.currentTeam === TeamType.BLACK ? TeamType.WHITE : TeamType.BLACK;
  }

  promotePawn(pawn, pieceToBe) {
    // let pawn = this.pieces.find(p => p.position.equals(position) && p instanceof Pawn);
    let clonedPawn = pawn.clone();

    this.pieces = this.pieces.reduce((results, piece) => {
      if (piece.position.equals(clonedPawn.position)) {
        let newPiece;
        switch (pieceToBe) {
          case PieceType.BISHOP:
            newPiece = new Bishop(clonedPawn.position, clonedPawn.team);
            break;
          case PieceType.KNIGHT:
            newPiece = new Knight(clonedPawn.position, clonedPawn.team);
            break;
          case PieceType.QUEEN:
            newPiece = new Queen(clonedPawn.position, clonedPawn.team);
            break;
          case PieceType.ROOK:
            newPiece = new Rook(clonedPawn.position, clonedPawn.team, true);
            break;
        }
        results.push(newPiece);
      } else {
        results.push(piece);
      }

      return results;
    }, []);



  }

  playMove(initial, destination) {
    const piece = this.pieces.find(p => p.position.equals(initial) && p.possibleMoves.some(m => m.equals(destination)));

    if (!piece) {
      console.error("playMove: piece not found", {
        initial,
        destination,
        pieces: this.pieces.map(p => ({
          type: p.type,
          team: p.team,
          position: p.position,
          possibleMoves: p.possibleMoves
        }))
      });

      return;
    }

    if (piece.team !== this.currentTeam) return;

    if (piece instanceof King) {
      let secondPiece = this.pieces.find(p =>
        p.position.equals(destination) &&
        p.team === piece.team &&
        p instanceof Rook
      );

      if (secondPiece) {
        if (secondPiece.position.x > piece.position.x) {
          const newKingPos = new Position(piece.position.x + 2, piece.position.y);
          const newRookPos = new Position(secondPiece.position.x - 2, secondPiece.position.y)
          piece.position.setPosition(newKingPos);
          secondPiece.position.setPosition(newRookPos);
        } else {
          const newKingPos = new Position(piece.position.x - 2, piece.position.y);
          const newRookPos = new Position(secondPiece.position.x + 3, secondPiece.position.y)
          piece.position.setPosition(newKingPos);
          secondPiece.position.setPosition(newRookPos);
        }

        piece.hasMoved = true;
        secondPiece.hasMoved = true;

        this.lastMove = destination;
        this.totalTurns += 1;

        return;
      }
    }

    const enemy = this.pieces.find(p => p.team !== this.currentTeam && p.position.equals(destination));

    if (enemy) this.pieces = this.pieces.filter(p => !p.position.equals(enemy.position));

    piece.position.setPosition(destination);

    this.lastMove = destination;

    if (piece instanceof Pawn) {
      if (piece.isFirstMove === undefined) {
        piece.isFirstMove = true;
      } else if (piece.isFirstMove === true) {
        piece.isFirstMove = false;
      }

      let rank = new Position(piece.position.x, piece.position.y - (1 * piece.team))
      let enPassantEnemy = this.pieces.find(p => p.team !== this.currentTeam && p.position.equals(rank));

      if (enPassantEnemy) this.pieces = this.pieces.filter(p => !p.position.equals(enPassantEnemy.position));

    } else if (piece instanceof Rook || piece instanceof King) {
      piece.hasMoved = true;
    }

    this.totalTurns += 1;
  }

  clone() {
    return new Board(
      this.pieces.map(piece => piece.clone()),
      this.totalTurns,
      this.winningTeam
    );
  }
}