export class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  setPosition(newPosition) {
    this.x = newPosition.x;
    this.y = newPosition.y;
  }

  equals(x, y) {
    return this.x === x && this.y === y;
  }

  equals(otherPosition) {
    return this.x === otherPosition.x && this.y === otherPosition.y;
  }

  clone() {
    return new Position(this.x, this.y);
  }
}