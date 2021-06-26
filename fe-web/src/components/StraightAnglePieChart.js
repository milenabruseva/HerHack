import React, { PureComponent } from 'react'
import { PieChart, Pie } from 'recharts'

export default class StraightAnglePieChart extends PureComponent {
    render() {
        return (
            <PieChart width={200} height={200}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={this.props.data}
                    cx="50%"
                    cy="50%"
                    outerRadius={40}
                    fill="#8884d8"
                    label="name"
                />
            </PieChart>
        )
    }
}
