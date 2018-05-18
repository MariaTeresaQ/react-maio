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
      frases: [],
      nomeNovoo: "Manel Maria",
      frase_adicionar: "",
      estado_frase:"" //so para informar quem chega que isto existe, ou vai existir mais tarde, apesar de neste momento ainda nao existir
    }
    this.toggleTick = this.toggleTick.bind(this)
    this.handleNewPhraseClick = this.handleNewPhraseClick.bind(this)
    this.novoNome = this.novoNome.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmitForm = this.handleSubmitForm.bind(this)
  }
  componentWillMount(){
    console.log("componentWillMount");
    //this.interval = setInterval(() => this.tick(), 1000) 
    //this.interval = setInterval(this.tick.bind(this), 1000) 
    this.setupTick(this.state.ticking)
    this.getLocalFrases()//isto para que antes de fazer render, ja vai buscar e armazenar estes dados
    //this.getWeather()
  }
    setRandomPhrase(){
      const frasesAUtilizar = this.state.frases;
      let fraseIndex = Math.round(Math.random() * (frasesAUtilizar.lentgh -1 ));
      this.setState({
        frase: !!frasesAUtilizar[fraseIndex] ? frasesAUtilizar[fraseIndex].text : ""
      });
    }
  componentDidMount(){
    console.log("componentDidMount");
    this.frase_adicionar.focus()
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

  novoNome(){
    this.state.frases.push(this.state.nomeNovoo)
    this.setState({frases: this.state.frases})
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

  handleInputChange(event){
    console.log(event.target.value);
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(this.state)
  }

  handleSubmitForm(event){
    event.preventDefault()
    if (this.state.frase_adicionar !== ""){
      this.state.frases.push({
      text: this.state.frase_adicionar,
      done: this.state.estado_frase === "por_fazer" ? false : true,
      })
      this.setState({frases: this.state.frases,
      frase_adicionar: ""
     })
      this.setLocalFrases(this.state.frases)
      this.frase_adicionar.focus()
    }
    else {
      alert("A frase tem de estar preenchida!")
    }
  }

  handleRemove(fraseIndex, event){//o primeiro parâmetro é o scope(la em baixo, o this, index) fraseIndex = index (la em baixo), la em baixo, o prof escreveu so index porque ja estava no contexto logico da frase, ca em cima, como nao estava nesse contexto, para saber que este index se refere a frase, o porf escreveu fraseIndex
    console.log(fraseIndex, event)
    this.state.frases.splice(fraseIndex, 1)// o 1 é o numero de valores a serem retirados. O splice nao so corta uma porção de uma array, mas tbm retorna essa porção. contudo, a nos nao nos interessa agora o retorno
    this.setState({frases: this.state. frases})//para aactualizar o state com o frases alterado
    this.setLocalFrases(this.state.frases)
  }

  handleEdit(fraseIndex, e){
    this.setState({
      frase_editing: this.state.frase_editing === fraseIndex ? null : fraseIndex
    })
    setTimeout(() => console.log(this.state.frase_editing, this.state.frase_editing >= 0, !isNaN(this.state.frase_editing)), 10)
  }

  handleChangeFraseName(fraseIndex, e){
    console.log("handleChangeFraseName", fraseIndex, e.target.value)
    this.state.frases[fraseIndex].text =e.target.value
    this.setState({
      frases: this.state.frases
    })
    this.setLocalFrases(this.state.frases)
  }

  handleToggleDone(fraseIndex, e){
    this.state.frases[fraseIndex].done = !this.state.frases[fraseIndex].done
    this.setState({
      frases: this.state.frases
    })
    this.setLocalFrases(this.state.frases)
  }

  getLocalFrases(){
    let frases = localStorage.getItem("frases")
    console.log("frases", frases);
    if (frases === null){
      frases = [];
    } else {
      frases = JSON.parse(frases)
    }
    this.setState({frases})
  }

  setLocalFrases (frases){
    this.setState({update_state_message: "A gravar dados localmente..."})
    localStorage.setItem("frases", JSON.stringify(frases))
    setTimeout(() => {
      this.setState({update_state_message: ""})
    }, 2000)
  }

  /*getWeather(){
    let cityQuery = "lisbon"
    fetch ("" + cityQuery).
      then(response => {
        return response.json()
      })
      .then(data => {
        console.log(data)
      })
  }*/

  render() {
    //console.log('render');
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
            return <li key={"frase" + index} className={item.done ? "done" : "tbd"}>
            {
              (this.state.frase_editing === index)
              ? <input onChange={this.handleChangeFraseName.bind(this, index)} 
              value={item.text}/>
              : <span>{item.text}</span>
            }

            <button className="botoes_toggle-done"
            onClick={this.handleToggleDone.bind(this, index)}>
            Toggle done
            </button>
            <button className="botoes_remove" onClick=
            {this.handleRemove.bind(this, index)} disabled={(!isNaN
              (this.state.frase_editing) && this.state.frase_editing !== null)
              ? "disabled" : ""}>xôôô</button>
            <button className="botoes_edit" onClick=
            {this.handleEdit.bind(this, index)}>
           {(this.state.frase_editing === index) ? "stop edit" : "edit"} 
            </button>
            </li>
          })}
        </ul>
      </div>

      <div>
        <button onClick={this.novoNome}>
          Mais um nome
        </button>
      </div>

      <div>
        {this.state.update_state_message}
        <form onSubmit={this.handleSubmitForm}>
          <input type="text" name="frase_adicionar" 
          value={this.state.frase_adicionar} onChange={this.handleInputChange} ref={(el) => {this.frase_adicionar = el}}/>
          <select name="estado_frase" value={this.state.estado_frase} 
          onChange={this.handleInputChange}>
            <option value="feito">Feito</option>
            <option value="por_fazer">Por fazer</option>
          </select>
        </form>
        <p>{this.state.frase_adicionar}</p>
      </div>
      
      </div>
    );
  }
}

export default App;
