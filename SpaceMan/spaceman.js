document.addEventListener('DOMContentLoaded',() => {
    let score = 0
    const scoreDisplay = document.getElementById('score')
    const width = 21;
    const grid = document.querySelector('.grid')
    const layout = [
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
        0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,
        0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,
        0,5,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,5,0,
        0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,
        0,5,0,1,1,1,0,1,1,1,1,1,1,1,0,1,1,1,0,5,0,
        0,1,0,1,0,1,0,1,0,0,2,0,0,1,0,1,0,1,0,1,0,
        0,1,1,1,0,1,1,1,0,2,2,2,0,1,1,1,0,1,1,1,0,
        0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,
        0,5,0,1,1,1,0,1,1,1,2,1,1,1,0,1,1,1,0,5,0,
        0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0,1,0,0,0,
        0,5,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,5,0,
        0,1,0,1,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,
        0,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,0,
        0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
    ]
    
    //0 - Walls
    //1- Oxygen
    //2- Empty Space
    //5- Teleport
    const squares = []

    function createBoard() {
        for (let i = 0; i < layout.length; i++) {
          const square = document.createElement('div')
          grid.appendChild(square)
          squares.push(square)
    
          //add layout to the board
          if(layout[i] === 0) {
            squares[i].classList.add('wall')
          } else if (layout[i] === 1) {
            squares[i].classList.add('oxygen')
          } else if (layout[i] === 3) {
            squares[i].classList.add('alien')
          } else if (layout[i] === 5) {
            squares[i].classList.add('teleport')
          }
        }
      }
      createBoard()

      let spaceman = 199;
      squares[spaceman].classList.add("spaceman")

      function moveSpaceMan(e){
        squares[spaceman].classList.remove('spaceman')
        switch(e.keyCode){
            case 37:
                if(spaceman % width !==0 && !squares[spaceman-1].classList.contains('wall')) {
                    spaceman -=1
                }
                break;   
            case 38:
                if(spaceman - width >=0 && !squares[spaceman - width].classList.contains('wall')){
                    spaceman -= width
                }
                if(squares[spaceman] === squares[64] || squares[spaceman] === squares[82] || squares[spaceman] === squares[106] || squares[spaceman] === squares[124] || squares[spaceman] === squares[190] || squares[spaceman] === squares[208] || squares[spaceman] === squares[232] || squares[spaceman] === squares[250]){
                    teleport()
                }
                break
                
            case 39:
                if(spaceman % width !==0 && !squares[spaceman + 1].classList.contains('wall')){
                    spaceman += 1
                }
                break
            case 40:
                if(spaceman + width < width * width && !squares[spaceman + width].classList.contains('wall')){
                    spaceman += width
                }
                if(squares[spaceman] === squares[64] || squares[spaceman] === squares[82] || squares[spaceman] === squares[106] || squares[spaceman] === squares[124] || squares[spaceman] === squares[190] || squares[spaceman] === squares[208] || squares[spaceman] === squares[232] || squares[spaceman] === squares[250]){
                    teleport()
                }
                break
        } 
        squares[spaceman].classList.add('spaceman')
        collectOxygen()
        caught()
        win()
      }
      document.addEventListener('keyup',moveSpaceMan)

      function collectOxygen(){
        if(squares[spaceman].classList.contains('oxygen')){
            score++
            scoreDisplay.innerHTML = score
            squares[spaceman].classList.remove('oxygen')
        }
      }

      function teleport(){
        const tpLocations = [64,82,106,124,190,208,232,250]
        if(squares[spaceman].classList.contains('teleport')){
            let num = Math.floor(Math.random()*7);
            if(tpLocations[num] != spaceman){
                squares[spaceman].classList.remove('spaceman')
                spaceman = tpLocations[num];
            }
        }  
      } 

      function win(){
        if(score == 135){
            document.removeEventListener('keyup',moveSpaceMan)
            alert("You have WON!")
            location.reload()
            return true
        }  
      }
      
      let alien = 157
      squares[alien].classList.add("alien")
      function moveAlien(alien){
        const locations = [-1 , +1, width,-width]
        let num = Math.floor(Math.random()*4)
        let direction = locations[num]
            if  (!squares[ghost.currentIndex + direction].classList.contains('wall') ) {
                squares[alien.currentIndex].classList.remove('alien')
                alien.currentIndex += direction
                squares[alien.currentIndex].classList.add('alien')
            } else direction = locations[Math.floor(Math.random() * 4)]
          caught()
      }

      moveAlien(alien);

      function caught(){
        if(squares[spaceman].classList.contains('alien')){
            document.removeEventListener('keyup',moveSpaceMan)
            alert("Game Over. You Got Caught :(") 
            location.reload()   
        }
      }
    }
)