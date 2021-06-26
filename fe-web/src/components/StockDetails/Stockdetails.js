import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

import { getSentiment } from '../../services/sentiment'
import { getDetails } from '../../services/details'

import StraightAnglePieChartBig from '../StraightAnglePieChartBig'
import Barchart from '../Barchart'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            textAlign: 'center',
            margin: theme.spacing(1),
            width: theme.spacing(55),
            height: theme.spacing(55),
        },
    },
}))

export default function StockDetails() {
    const classes = useStyles()
    let { id } = useParams()

    const [sentiment, setSentiment] = useState([])
    useEffect(() => {
        let mounted = true
        getSentiment(id).then((sentiment) => {
            if (mounted) {
                let keys = Object.keys(sentiment)
                let values = Object.values(sentiment)
                sentiment = keys.map((x, i) => {
                    return { name: x, value: parseFloat(values[i].toFixed(2)) }
                })
                setSentiment(sentiment)
            }
        })
        return () => (mounted = false)
    }, [])

    const [details, setDetails] = useState([])
    useEffect(() => {
        let mounted = true
        getDetails(id).then((details) => {
            if (mounted) {
                const stats = details.aggregations.comments_stats
                const firstStats = firstN(stats, 4)
                let keys = Object.keys(firstStats)
                let values = Object.values(firstStats)
                details = keys.map((x, i) => {
                    return { name: x, value: parseFloat(values[i].toFixed(2)) }
                })

                console.log(details)

                setDetails(details)
            }
        })
        return () => (mounted = false)
    }, [])

    return (
        <main className="stock-details">
            <Container>
                <h1>{id}</h1>
                <div className={classes.root}>
                    <Paper>
                        <Typography variant="h6" color="textSecondary">
                            Sentiment
                        </Typography>
                        <StraightAnglePieChartBig data={sentiment} />
                    </Paper>
                    <Paper>
                        <Typography variant="h6" color="textSecondary">
                            Comments Stats
                        </Typography>
                        <Barchart data={details} />
                    </Paper>
                </div>
            </Container>
        </main>
    )
}

function firstN(obj, n) {
    return Object.keys(obj) //get the keys out
        .sort() //this will ensure consistent ordering of what you will get back. If you want something in non-aphabetical order, you will need to supply a custom sorting function
        .slice(0, n) //get the first N
        .reduce(function (memo, current) {
            //generate a new object out of them
            memo[current] = obj[current]
            return memo
        }, {})
}
