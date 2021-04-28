import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Normalize } from 'styled-normalize'
import { createGlobalStyle, Theme } from './styles'
import { store } from './app/store'
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker'

const GlobalStyle = createGlobalStyle`
  body, html {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', 'Roboto', 'Open Sans', sans-serif; /* using system fonts */
    font-weight: 300;
    color: white;
    font-size: 16px;
    background: #1e1f31;
    a {
    color: white;
    text-decoration: none;
    }
  }
`

ReactDOM.render(
  <React.StrictMode>
    <Theme>
      <Provider store={store}>
        <Normalize />
        <GlobalStyle />
        <App />
      </Provider>
    </Theme>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
