import { Board } from "./models/Board";
import { Rook } from "./models/Rook";
import { Knight } from "./models/Knight";
import { Bishop } from "./models/Bishop";
import { Queen } from "./models/Queen";
import { King } from "./models/King";
import { Pawn } from "./models/Pawn";
import { Position } from "./models/Position";


export const boardWidth = 8;

export const boardHeight = 8;

export const initialWhitePawnRank = 1;
export const initialBlackPawnRank = 6;

export const whitePawnPromotionRow = 7;
export const blackPawnPromotionRow = 0;

export const rows = ['1', '2', '3', '4', '5', '6', '7', '8'];
export const cols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

export const PieceType = {
  PAWN: "Pawn",
  BISHOP: "Bishop",
  KNIGHT: "Knight",
  ROOK: "Rook",
  QUEEN: "Queen",
  KING: "King"
};

export const TeamType = {
  WHITE: 1,
  BLACK: -1
};

export const initialBoard = new Board([
    new Rook(new Position(0, 7), TeamType.BLACK),
    new Knight(new Position(1, 7), TeamType.BLACK),
    new Bishop(new Position(2, 7), TeamType.BLACK),
    new Queen(new Position(3, 7), TeamType.BLACK),
    new King(new Position(4, 7), TeamType.BLACK),
    new Bishop(new Position(5, 7), TeamType.BLACK),
    new Knight(new Position(6, 7), TeamType.BLACK),
    new Rook(new Position(7, 7), TeamType.BLACK),
    new Pawn(new Position(0, 6), TeamType.BLACK),
    new Pawn(new Position(1, 6), TeamType.BLACK),
    new Pawn(new Position(2, 6), TeamType.BLACK),
    new Pawn(new Position(3, 6), TeamType.BLACK),
    new Pawn(new Position(4, 6), TeamType.BLACK),
    new Pawn(new Position(5, 6), TeamType.BLACK),
    new Pawn(new Position(6, 6), TeamType.BLACK),
    new Pawn(new Position(7, 6), TeamType.BLACK),
    new Rook(new Position(0, 0), TeamType.WHITE),
    new Knight(new Position(1, 0), TeamType.WHITE),
    new Bishop(new Position(2, 0), TeamType.WHITE),
    new Queen(new Position(3, 0), TeamType.WHITE),
    new King(new Position(4, 0), TeamType.WHITE),
    new Bishop(new Position(5, 0), TeamType.WHITE),
    new Knight(new Position(6, 0), TeamType.WHITE),
    new Rook(new Position(7, 0), TeamType.WHITE),
    new Pawn(new Position(0, 1), TeamType.WHITE),
    new Pawn(new Position(1, 1), TeamType.WHITE),
    new Pawn(new Position(2, 1), TeamType.WHITE),
    new Pawn(new Position(3, 1), TeamType.WHITE),
    new Pawn(new Position(4, 1), TeamType.WHITE),
    new Pawn(new Position(5, 1), TeamType.WHITE),
    new Pawn(new Position(6, 1), TeamType.WHITE),
    new Pawn(new Position(7, 1), TeamType.WHITE),
], 1);