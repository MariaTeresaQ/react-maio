import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

//import registerServiceWorker from './registerServiceWorker

/*
let evens = [0, 2, 4, 6];
let odds = evens.map (v => v + 1);
let nums = evens.map((v, i) => v + i);

odds = [1, 3, 5, 7]
console.log (odds, nums);
*/ 

/*
// TICKING CLOCKS ATRAVES DE PROPS NA APP

function tick () {
    //console.log(new Date());
    ReactDOM.render(<App newDate={new Date()}/>, document.getElementById('root'));
};

let interval1 = setInterval(tick, 1000);
tick();

setInterval(function (){
    clearInterval(interval1);
    ReactDOM.render(<div>Acabou</div>, document.getElementById('root'));
}, 5000);*/

ReactDOM.render(<App newDate={new Date()}/>, document.getElementById('root'));

//registerServiceWorker();