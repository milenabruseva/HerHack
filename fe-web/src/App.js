import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './App.css'
import AppBar from './components/AppBar'

import Home from './components/Home/Home'
import Watchlist from './components/Watchlist/Watchlist'

function App() {
    return (
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
    )
}

export default App
