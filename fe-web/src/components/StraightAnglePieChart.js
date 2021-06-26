import React, { PureComponent } from 'react'
import { PieChart, Pie } from 'recharts'

const data = [
    { name: 'compound', value: 400 },
    { name: 'negative', value: 300 },
    { name: 'neutral', value: 300 },
    { name: 'positive', value: 200 },
]

export default class StraightAnglePieChart extends PureComponent {
    render() {
        return (
            <PieChart width={200} height={200}>
                <Pie
                    dataKey="name"
                    startAngle={180}
                    endAngle={0}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={40}
                    fill="#8884d8"
                    label
                />
            </PieChart>
        )
    }
}
