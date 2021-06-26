import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import AppBar from './components/AppBar'
import { Box, CssBaseline } from '@material-ui/core'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'

import Home from './components/Home/Home'
import Watchlist from './components/Watchlist/Watchlist'

function App() {
    const theme = createMuiTheme({
        palette: {
            background: {
                default: '#f5f5f5',
            },
        },
    })
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <header className="header">
                    <AppBar />
                </header>
                <BrowserRouter>
                    <Switch>
                        <Route path="/watchlist">
                            <Watchlist />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        </MuiThemeProvider>
    )
}

export default App
