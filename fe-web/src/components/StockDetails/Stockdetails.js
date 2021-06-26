import React from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@material-ui/core'

export default function StockDetails() {
    let { id } = useParams()
    console.log(id)
    return (
        <main className="stock-details">
            <Container>
                <h1>{id} 💎 👐 💎 👐 💎 👐 💎 👐💎</h1>
                <h3>Id: {id}</h3>
            </Container>
        </main>
    )
}
