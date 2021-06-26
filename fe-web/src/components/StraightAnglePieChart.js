import React, { PureComponent } from 'react'
import { PieChart, Pie, Tooltip, Legend } from 'recharts'

export default class StraightAnglePieChart extends PureComponent {
    render() {
        return (
            <PieChart width={150} height={150}>
                <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={this.props.data}
                    cx="50%"
                    cy="50%"
                    outerRadius={30}
                    fill="#8884d8"
                    label="name"
                />
                <Tooltip />
            </PieChart>
        )
    }
}
