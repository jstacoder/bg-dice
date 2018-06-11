import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

try{
    
  ReactDOM.render(
    <App />, 
    document.getElementById('root'),
    ()=>registerServiceWorker()
  )
}catch(err){
  console.log(JSON.stringify(err))
}
