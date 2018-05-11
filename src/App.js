import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const grandeTextoDeWelcome = "E aqui está um grande texto de welcome";
const grandetextoDeWelcome = <srtong>E aqui está um grande texto de welcome</srtong>;
const outraCena = talvez => {
  return <i>Cena outra</i>
}
const maisCoisas = outraCena("coisas");

const H1 = ({className, children, prefixoDeTexto}) => {
  return <div className={className}>{prefixoDeTexto}o nosso h1 {children}</div>
}

const Ul = () => {
  return (
    <ul>
      <ToDo titulo="Ir à pesca" data={new Date(2018, 4,3)} estado="false"/>
      <ToDo titulo="Lavar o cão" data={new Date(2018, 4, 1)} estado="true"/>
      <ToDo titulo="Cancelar a viagem a Marte" data={new Date(2068, 7, 16)} estado="false"/>
    </ul>
  );
}

const ToDo = ({titulo, data, estado}) => {
  return (
    <li>
      <span>{titulo}</span>
      <span>{data.toLocaleString()}</span>
      <span>{estado ? "Sim" : "Não"}</span>
    </li>
  );
}



class App extends Component {
  constructor(props){
    super(props); // estamos a passar os props para o super, que é a class que está a ser extendida pela app. estamos a invocar o construtor da class da componente
    this.state = {
      newDate: new Date(),
      greeting: "Bom dia",
      ticking: true,
      frase: "ainda nao esta aleatoria",//podia estar vazio, porque vai ser alterado antes do render
      frases: [
        "Roman Todd",
        "Bernard Curry",
        "Kenny Zimmerman",
        "Doris Lowe"
      ]
    }
    this.toggleTick = this.toggleTick.bind(this)
    this.handleNewPhraseClick = this.handleNewPhraseClick.bind(this)
  }
  componentWillMount(){
    console.log("componentWillMount");
    //this.interval = setInterval(() => this.tick(), 1000) 
    //this.interval = setInterval(this.tick.bind(this), 1000) 
    this.setupTick(this.state.ticking)
    this.setRandomPhrase()
  }
  componentDidMount(){
    console.log("componentDidMount");
  }
  componentWillReceiveProps(){
    console.log("componentWillReceiveProps");
  }
  shouldComponentUpdate(){
    console.log("shouldComponentUpdate");
    return true //this.state.newDate.getSeconds() % 2 === 0 ? true : false;
  }
  componentWillUpdate(){
    console.log("componentWillUpdate");
  }
  componentDidUpdate(){
    console.log("componentDidUpdate");
  }
  componentWillUnmount(){
    console.log("componentWillUnmount");
  }
  setRandomPhrase(){
    const frasesAUtilizar = this.state.frases;
    let fraseIndex = Math.round(Math.random() * (frasesAUtilizar.length -1));
    this.setState({frase: frasesAUtilizar[fraseIndex]});
  }

  handleNewPhraseClick(){
    this.setRandomPhrase()
  }
  
  componentDidUnmount(){
    console.log("componentDidUnmount");
  }
  setupTick (doTick){
    if (doTick){
      this.interval = setInterval(this.tick.bind(this), 1000)
      this.tick()
    } else {
      clearInterval(this.interval)
    }
  }
  toggleTick(){
    console.log(this.interval, "ToggleTick");
    //let nextTickState = !this.state.ticking // ! é uma negação
    this.setState(prevState => {
      let nextTickState = !this.state.ticking
      this.setupTick(nextTickState)
      console.log(nextTickState)
      return { //setState para mudar o estado, ou manipula lo
      ticking: nextTickState
    }
    this.setupTick(nextTickState)
  })};
  tick (){
    this.setState({newDate: new Date()} )
  }
  render() {
    console.log('render');
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <H1 className="App-title" prefixoDeTexto="prefixo de texto do header">Welcome to react</H1>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

      <div>
        <Ul></Ul>
      </div> 

      <div>
        { !!this.state.newDate ? this.state.newDate.toLocaleString() : ""} {/* !! significa dupla negação */}
      </div>

      <div>
        <button onClick={this.toggleTick}>
        { this.state.ticking ? "Parar o relógio" : "Ligar relógio" }
        </button>
      </div>

      <div>
        <p>{ this.state.ticking ? "está ticking" : "não está ticking" }
        </p>
      </div>

      <div>
        <p>
          Frase aleatória é: {this.state.frase}
        </p>
        <button onClick={this.handleNewPhraseClick}>Muda aí o nome
        </button>
      </div>

      <div>
        <ul>
          {this.state.frases.map((item, index) => {
            return <li key={"frase" + index}>
            {item}
            </li>
          })}
        </ul>
      </div>
      
      </div>
    );
  }
}

export default App;
