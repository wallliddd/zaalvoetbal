import React,{useState} from 'react'

function Shekila() {
    const [showDiv, setShowDiv] = useState('none')
    const movieA = 'Jab We Met'
    const movieB = 'Raees'

    const randomNumber =  Math.floor((Math.random() * 2) + 1)

    function randomMovie(){

        if(randomNumber === 1){
            return(movieA)
        }
        if(randomNumber === 2){
            return(movieB )
        }
            
    }




  return (
    <div  >
        <div>Optie 1 {movieA}</div>
        <div>Optie 2 {movieB}</div>

        <button onClick={()=> setShowDiv('flex')}>generate movie</button>

        <div style={{display:showDiv}} >het is {randomMovie()} geworden</div>

    </div>
  )
}

export default Shekila