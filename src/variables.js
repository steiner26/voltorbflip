import Chance from "chance"
const chance = new Chance()

const levels = {
  "1": [[5, 0, 6], [4, 1, 6], [3, 1, 6], [2, 2, 6], [0, 3, 6]],

  "2": [[6, 0, 7], [5, 1, 7], [3, 2, 7], [1, 3, 7], [0, 4, 7]],

  "3": [[7, 0, 8], [6, 1, 8], [4, 2, 8], [2, 3, 8], [1, 4, 8]],

  "4": [[8, 0, 10], [5, 2, 10], [3, 3, 8], [2, 4, 10], [0, 5, 8]],

  "5": [[9, 0, 10], [7, 1, 10], [6, 2, 10], [4, 3, 10], [1, 5, 10]],

  "6": [[8, 1, 10], [5, 3, 10], [3, 4, 10], [2, 5, 10], [0, 6, 10]],

  "7": [[9, 1, 13], [7, 2, 10], [6, 3, 10], [4, 4, 10], [1, 6, 13]],
}

export function createBoard(level) {
  var board = createGrid((row, col) => ({ row, col, value: 1, flipped: false }))
  var data = levels[level][chance.natural({ min: 0, max: 4 })]
  var spots = chance.unique(
    function() {
      var result = {}
      result.x = chance.natural({ min: 0, max: 4 })
      result.y = chance.natural({ min: 0, max: 4 })
      return result
    },
    data[0] + data[1] + data[2],
    {
      comparator: function(arr, val) {
        return arr.reduce(function(acc, item) {
          return acc || (item.x === val.x && item.y === val.y)
        }, false)
      },
    }
  )

  var i
  for (i = 0; i < data[0]; i++) {
    board[spots[i].x][spots[i].y].value = 2
  }
  for (; i < data[0] + data[1]; i++) {
    board[spots[i].x][spots[i].y].value = 3
  }
  for (; i < data[0] + data[1] + data[2]; i++) {
    board[spots[i].x][spots[i].y].value = 0
  }

  var maxCoins = Math.pow(2, data[0]) * Math.pow(3, data[1])

  return { board, maxCoins }
}

export const states = {
  LOADING: 0,
  GAME: 1,
  GAMEWON: 2,
  GAMELOST: 3,
  FLIPWON: 4,
  FLIPLOST: 5,
  MEMO: 6,
}

export function createGrid(fn) {
  return Array.from({ length: 5 }, (_, row) =>
    Array.from({ length: 5 }, (_, col) => fn(row, col))
  )
}
