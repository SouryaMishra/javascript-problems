class Solution {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        for(let i = 0; i < board.length; i++) {
            const set = new Set();
            for(let j = 0; j < board[0].length; j++) {
                const num = board[i][j];
                if(num === ".") continue;
                if(set.has(num)) return false;
                set.add(num); 
            }
        }
        
        for(let i = 0; i < board.length; i++) {
            const set = new Set();
            for(let j = 0; j < board[0].length; j++) {
                const num = board[j][i];
                if(num === ".") continue;
                if(set.has(num)) return false;
                set.add(num); 
            }
        }

          for (let square = 0; square < 9; square++) {
            let set = new Set();
            for (let i = 0; i < 3; i++) {
                let row = Math.floor(square / 3) * 3 + i;
                for (let j = 0; j < 3; j++) {
                    let col = (square % 3) * 3 + j;
                    const num = board[row][col];
                    if (num === '.') continue;
                    if (set.has(num)) return false;
                    set.add(num);
                }
            }
        }

        return true;
    }
}

class SolutionWithMapAndSet {
    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    isValidSudoku(board) {
        const rowMap = new Map();
        const colMap = new Map();
        const squareMap = new Map();

        for(let i = 0; i < board.length; i++) {
            for(let j = 0; j < board[0].length; j++) {
                const num = board[i][j];

                if(num === ".") continue;
                
                const squareKey = `${Math.floor(i / 3)}${Math.floor(j / 3)}`;

                if(rowMap.has(i) && rowMap.get(i).has(num) 
                  || colMap.has(j) && colMap.get(j).has(num) 
                  || squareMap.has(squareKey) && squareMap.get(squareKey).has(num)) return false;
                
                if(!rowMap.has(i)) rowMap.set(i, new Set());
                if(!colMap.has(j)) colMap.set(j, new Set());
                if(!squareMap.has(squareKey)) squareMap.set(squareKey, new Set());

                rowMap.get(i).add(num);
                colMap.get(j).add(num);
                squareMap.get(squareKey).add(num);
            }
        }
        return true;
    }
}
