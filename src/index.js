import React from 'react'
import ReactDOM from 'react-dom'
import { SpeechProvider } from '@speechly/react-client'
import App from './App'
import Provider from './context/context'
import './index.css'
ReactDOM.render(
  <SpeechProvider appId="3defd912-f065-49c2-8a06-c68824fff194" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root'),
)
