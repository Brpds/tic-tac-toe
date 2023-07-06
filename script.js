let id;
let markedTiles = []
let tileId;
let playerTurn = 0
let circleVictory = []
let crossVictory = []

const winConditions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
]
//checks for victory by counting number of duplicates in the array
/*to explain the win condition, if an array has 3 duplicates 
of any on the win conditions, it means a line has been formed
and it matches the array on the win condition, even if there 
are more elements in the tiles played array */
victoryCheck = (tileArray, winConditions, piece) =>{
    for(let i = 0; i < winConditions.length; i++){
        const arrayCheck = winConditions[i]
        //spreads the array of plays with the win conditions
        let newArray = [...tileArray,...arrayCheck]
        let duplicateCount = 0
        newArray.sort()
        for(let j = 0; j < newArray.length -1; j++){
            if(newArray[j] === newArray[j+1]){
                duplicateCount++
                if(duplicateCount === 3){
                    document.getElementById('restart-game').style.display = ''
                    document.getElementById('winner').innerHTML = `<h2>${piece} won!</h2>`
                }else if(duplicateCount < 3 && [...circleVictory,...crossVictory].length === 9){
                    document.getElementById('restart-game').style.display = ''
                    document.getElementById('winner').innerHTML = `<h2 style="color: black">Draw!</h2>`
                    document.getElementById('winner').style.background = 'yellow'
                }
            }
        }
    }
}


playGame = (tileId, id) =>{
    if(markedTiles.includes(tileId)){
        alert('Marked')
    }else{
        if(playerTurn % 2 != 0){
            circleMark(tileId)
        }else{
            crossMark(tileId)
        }
        //console.log(playerTurn)
    }
    
}

function crossMark (id){
    //console.log(id)
    tileId = `tile-${id}`
    let cross = document.createElement('div')
    cross.style.background = "url('./close.png')"
    cross.style.backgroundRepeat = 'no-repeat'
    cross.style.backgroundPosition = 'center'
    cross.style.backgroundSize = 'contain'
    cross.style.width = '100px'
    if(markedTiles.includes(tileId)){
        alert('Tile marked, choose another')
    }else{
        document.getElementById(`tile-${id}`).appendChild(cross)
        markedTiles.push(tileId)
        crossVictory.push(parseInt(id))
        crossVictory.sort()
        if(crossVictory.length >= 3){
            tileArray = crossVictory
            victoryCheck(tileArray, winConditions, 'Cross')
        }
        //console.log(crossVictory)
        playerTurn++
    }
}
circleMark = (id) => {
    //console.log(id)
    tileId = `tile-${id}`
    let circle = document.createElement('div')
    circle.style.background = "url('./circle.png')"
    circle.style.backgroundRepeat = 'no-repeat'
    circle.style.backgroundPosition = 'center'
    circle.style.backgroundSize = 'contain'
    circle.style.marginLeft = '7.5px'
    circle.style.width = '85px'
    if(markedTiles.includes(tileId)){
        alert('Tile marked, choose another')
    }else{
        document.getElementById(`tile-${id}`).appendChild(circle)
        markedTiles.push(tileId)
        circleVictory.push(parseInt(id))
        circleVictory.sort()
        if(circleVictory.length >= 3){
            tileArray = circleVictory
            victoryCheck(tileArray, winConditions, 'Circle')
        }
        //console.log(circleVictory)
        playerTurn++
        //console.log(markedTiles)
    }
}

restartGame = () => window.location.reload()