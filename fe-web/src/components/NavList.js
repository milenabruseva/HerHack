import React from 'react'

import Link from '@material-ui/core/Link'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(5),
        },
        marginLeft: '5rem',
    },
}))

export default function NavList() {
    const classes = useStyles()
    const preventDefault = (event) => event.preventDefault()

    return (
        <Typography className={classes.root} variant="h5" color="inherit">
            <Link href="/watchlist" onClick={preventDefault} color="inherit">
                {'Watchlist'}
            </Link>
        </Typography>
    )
}
