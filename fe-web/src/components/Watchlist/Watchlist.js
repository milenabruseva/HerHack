import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'

import Card from '../Card'

const stocks = ['GME', 'TSLA', 'AAPL', 'AMC']

export default function Watchlist() {
    return (
        <main className="watchlist">
            <Container>
                <h1>ToTheM00n Watchlist 💎 👐 💎 👐 💎 👐 💎 👐💎</h1>
                {stocks.map((stock, index) => (
                    <article className="list-item" key={index}>
                        <Card stock={stock} />
                    </article>
                ))}
            </Container>
        </main>
    )
}
