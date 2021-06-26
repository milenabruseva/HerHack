import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { getSentiment } from '../services/sentiment'

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
})

export default function SimpleCard(props) {
    const classes = useStyles()
    const [sentiment, setSentiment] = useState([])
    useEffect(() => {
        let mounted = true
        getSentiment(props.stock).then((sentiment) => {
            if (mounted) {
                setSentiment(sentiment)
            }
        })
        return () => (mounted = false)
    }, [])

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    Stock of the Day
                </Typography>
                <Typography variant="h5" component="h2">
                    {props.stock}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.stockName}
                </Typography>
                <CardActions>
                    <Button size="small">Learn More about {props.stock}</Button>
                </CardActions>
            </CardContent>
            <CardContent>
                <Typography
                    className={classes.title}
                    color="textSecondary"
                    gutterBottom
                >
                    Sentiment
                </Typography>
                <Typography variant="h5" component="h2">
                    Compound: {sentiment.compound}
                </Typography>
                <Typography variant="h5" component="h2">
                    Negative: {sentiment.negative}
                </Typography>
                <Typography variant="h5" component="h2">
                    Neutral: {sentiment.neutral}
                </Typography>
                <Typography variant="h5" component="h2">
                    Positive: {sentiment.positive}
                </Typography>
            </CardContent>
        </Card>
    )
}
