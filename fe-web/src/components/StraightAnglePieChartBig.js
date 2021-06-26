import React, { PureComponent } from 'react'
import { PieChart, Pie, Tooltip, Legend } from 'recharts'

export default class StraightAnglePieChartBig extends PureComponent {
    render() {
        return (
            <PieChart width={400} height={400}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={this.props.data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                />
                <Tooltip />
                <Legend />
            </PieChart>
        )
    }
}
