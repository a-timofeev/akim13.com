# Plan #
## General overview ##
  - Snake consists of separate squares.
  - First square is the head.
  - When the game starts snake consists of the head and 1 square.
  - Each time snake eats an apple the new square, adjacent to the last one, is added .
  - There're also bombs which decrease snake's size.
  - If snake moves out of the game area edge, then it appears on the opposite side of it.

## Realisation ##
  - Squares are stored in dynamic array.
  - Every update coords of tail = coords of previous body part 1 frame earlier +/- 30 (to connect).

## Things to keep in mind ##
  - Snake can't instantly turn in the opposite direction.
