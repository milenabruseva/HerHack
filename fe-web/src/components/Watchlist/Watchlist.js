import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import Card from '../Card'

const useStyles = makeStyles((theme) => ({
    root: {
        marginBottom: '2rem',
    },
}))

const stocks = ['GME', 'TSLA', 'AAPL', 'AMC']

export default function Watchlist() {
    const classes = useStyles()
    return (
        <main className="watchlist">
            <Container>
                <h1>ToTheM00n Watchlist 💎 👐 💎 👐 💎 👐 💎 👐💎</h1>
                {stocks.map((stock, index) => (
                    <article className={classes.root} key={index}>
                        <Card stock={stock} />
                    </article>
                ))}
            </Container>
        </main>
    )
}
