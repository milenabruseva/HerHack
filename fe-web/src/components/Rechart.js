import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts'

const data = [
    {
        name: '11/2020',
        AMC: 4000,
        GME: 2400,
        amt: 2400,
    },
    {
        name: '12/2020',
        AMC: 3000,
        GME: 1398,
        amt: 2210,
    },
    {
        name: '01/2021',
        AMC: 2000,
        GME: 9800,
        amt: 2290,
    },
    {
        name: '02/2021',
        AMC: 2780,
        GME: 3908,
        amt: 2000,
    },
    {
        name: '02/2021',
        AMC: 1890,
        GME: 4800,
        amt: 2181,
    },
    {
        name: '03/2021',
        AMC: 2390,
        GME: 3800,
        amt: 2500,
    },
    {
        name: '04/2021',
        AMC: 3490,
        GME: 4300,
        amt: 2100,
    },
    {
        name: '05/2021',
        AMC: 3490,
        GME: 4300,
        amt: 2210,
    },
    {
        name: '06/2021',
        AMC: 3490,
        GME: 4300,
        amt: 2210,
    },
]

export default function Rechart() {
    return (
        <LineChart
            width={600}
            height={400}
            data={data}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
            <Line type="monotone" dataKey="AMC" stroke="#82ca9d" />
            <Line
                type="monotone"
                dataKey="GME"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
            />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
        </LineChart>
    )
}
