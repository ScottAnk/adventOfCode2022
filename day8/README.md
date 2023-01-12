# Implementation Note

The solutions to these puzzles is the extremely naive solution. Every tree gets compared to every other tree in it's row and column, so the time complexity is O(R^2 + C^2). Because I'm doing these challenges for inspiration, I'm going to push on to other problems instead of optimizing this. That said, here's some pseudo code for making linear time solutions:

## part 1

- create an array of booleans with the same dimensions as the puzzle input (initialized to false) - this is the visibility table
- scan each row of the puzzle input left-to-right and 
    - track the highest number seen on this scan
    - if this cell of the array is higher than the largest number 
        - this cell is visible
        - update the tracker of highest number
        - set the corresponding cell of the visibility table to true
    - otherwise this tree isn't visible, so no actions are required
- repeat that scan process right-to-left, top-to-bottom, and bottom-to-top
- add up all the true cells on the visibility table and return the sum

## part 2

- initialize a 1x10 array of ints initialized to 0 - this is the pointer array
    - each cell of this array corresponds to a tree height 0-9, and the cell will store farthest point that a tree of that height can see to
- initalize an array of ints matching size of array, initialize to 1 - this is the view table
- scan each row of puzzle input left-to-right and do
    - calculate a view distance by checking the pointer array for the current height and subtracting from the current column
        - if the current cell is the highest seen on this scan, the pointer array value for this height will be 0 which works fine in the math
    - multiply that distance with the corresponding cell on the view table - store the result in the view table
    - update the pointer array with the current column
        - store that value in every array cell of this tree's height or less
- repeat that scan process right-to-left, top-to-bottom, and bottom-to-top
- return the highest value from the view table