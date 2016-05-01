import React from 'react'
import ReactDOM from 'react-dom'
import Tournament from './brackets'
import tournament from './stubs'

ReactDOM.render(
  <Tournament title={tournament.title} rounds={tournament.rounds} />,
  document.getElementById('app'))
