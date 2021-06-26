import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import AppBar from './components/AppBar'
import { CssBaseline } from '@material-ui/core'
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
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <div className="App">
                    <header className="header">
                        <AppBar />
                    </header>
                    <Switch>
                        <Route path="/watchlist" component={AppBar}>
                            <Watchlist />
                        </Route>
                        <Route path="/" component={AppBar}>
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </MuiThemeProvider>
        </BrowserRouter>
    )
}

export default App
