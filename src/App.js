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
      newDate: new Date()
    }
  }
  componentWillMount(){
    console.log("componentWillMount");
    this.interval = setInterval(() => {
      this.setState ({newDate: new Date()})
    }, 1000)
  }
  componentDidMount(){
    console.log("componentDidMount");
  }
  componentWillReceiveProps(){
    console.log("componentWillReceiveProps");
  }
  shouldComponentUpdate(){
    console.log("shouldComponentUpdate");
    return this.state.newDate.getSeconds() % 2 === 0 ? true : false;
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
  componentDidUnmount(){
    console.log("componentDidUnmount");
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
      
      </div>
    );
  }
}

export default App;
