import './App.css';
import React, { useRef } from 'react';

var characterName = "";
var playBtn;

function Block(props){
  return(
      <div className={`block ${props.qourter}`}>
      </div>
  );
}

function FieldL(props){
  return(
    <div className='field center'>
        <p className='letter'><b>{props.lt}</b></p>
    </div>
  );
}

function NameField(){
  var lettelArray = [];

  for(let i = 0; i < characterName.length; i++)
    lettelArray.push(characterName[i]);
  
  return(
    <div className='nameField'>
      {lettelArray.map(lettel => (
          <FieldL lt = {lettel.toUpperCase()}/>
      ))}
    </div>
  );
}

class Display extends React.Component{
  constructor(){
    super();

    this.state = {
      img: null,
      name: null,
      homeworld: null,
      height: null,
      gender: null,
      species: null,
      play: false
    }
  }

  getCharacter(){
    const index = Math.floor(Math.random() * 88);
    const url = `https://akabab.github.io/starwars-api/api/id/${index}.json`;
    playBtn = document.getElementById("button-87");

    fetch(url)
      .then(response => response.json())
      .then(data => {
        characterName = data.name.toLowerCase();
        characterName = characterName.split(" ").join("");
        characterName = characterName.split("-").join("");

        this.setState({
          img: data.image,
          name: data.name,
          height: data.height,
          homeworld: data.homeworld,
          gender: data.gender,
          species: data.species,
          play: true
        });
      });
  }

  render(){
    // console.log(this.state.play);
    if(!this.state.play){
      return(<button className='button-87' onClick={(e) => {this.getCharacter()}}>PLAY</button>);
    }
    return(
        <div>
          <InputField />
          {console.log(characterName)}
          <div>
            <div className='Wrapper'>
              <img src={this.state.img} className='img' alt={this.state.name} />
            </div>

            <div className='Info'>
              <p><b>HOMEWORLD:</b> {this.state.homeworld}</p>
              <p><b>HEIGHT:</b> {this.state.height} cm</p>
              <p><b>GENDER:</b> {this.state.gender}</p>
              <p><b>SPECIES:</b> {this.state.species}</p>
            </div>
          </div>
        </div>
      );
  }
}

function InputField(){
  const inputRef = useRef();

  const handleSubmit = (event) => {
    var unvser = inputRef.current.value.toLowerCase();
    unvser = unvser.split(" ").join("");
    unvser = unvser.split("-").join("");

    if(unvser === characterName){
      alert("CONGRADULATIONS ITS CORRECT !!!");
      playBtn.click();
    }else alert("incorrect try again !!!")

    event.preventDefault();
  }

  return(
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} className="input" onKeyDown={(e) => {
        if(e.key === "enter")
          document.getElementById("submit-button").click();
        }}/>
      <div className='center'>
        <input type="submit" className='submit-but' value="check" hidden/>
      </div>
    </form>
  );
}

function App() {
  return (
    <div className='center'>
      <header className="App-header">
        <Display />
      </header>
    </div>
  );
}

export default App;
