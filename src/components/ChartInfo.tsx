import React from 'react';
import { useCurrency } from '../context/currencyProvider';
import { getHistoricalChart } from '../config/api';
import { Line } from 'react-chartjs-2';
import { Box, Button, CircularProgress, Container } from '@mui/material';

export const chartDays = [
    {
        label: "24h",
        value: 1,
    },
    {
        label: "7d",
        value: 7,
    },
    {
        label: "14d",
        value: 14,
    },
    {
        label: "1m",
        value: 30,
    },
    {
        label: "3m",
        value: 90,
    },
    {
        label: "6m",
        value: 180,
    },
    {
        label: "1y",
        value: 365,
    },
];

const ChartInfo = ({ coin }: any) => {


    const { currency } = useCurrency()
    const [days, setDays] = React.useState(1);
    const [chartData, setChartData] = React.useState<any>();
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        const getHistoricalChartData = async () => {
            setIsLoading(true)
            try {
                const data = await getHistoricalChart(coin.id, days, currency)
                setChartData(data.prices)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getHistoricalChartData()
    }, [days, currency, coin.id])


    if (!chartData) return


    return (
        <Container sx={{ mb: 3 }}>
            <Box
                sx={{
                    display: "flex",
                    my: 3,
                    justifyContent: "flex-end",
                    width: "100%",
                    gap: 1
                }}
            >
                {chartDays.map((day) => (
                    <Button
                        key={day.value}
                        onClick={() => setDays(day.value)}
                        sx={{
                            border: "1px solid gold",
                            borderRadius: '5px',
                            fontFamily: "Montserrat",
                            cursor: "pointer",
                            minWidth: '50px',
                            backgroundColor: day.value === days ? "gold" : "",
                            color: day.value === days ? "black" : "",
                            fontWeight: day.value === days ? 700 : 500,
                            "&:hover": {
                                backgroundColor: "gold",
                                color: "black",
                            },
                        }}
                    >
                        {day.label}
                    </Button>
                ))}
            </Box >
            {isLoading ? (
                <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Container>
            ) : (
                <Line
                    data={{
                        labels: chartData.map((coin: [number, number]) => {
                            let date = new Date(coin[0]);
                            let time =
                                date.getHours() > 12
                                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                    : `${date.getHours()}:${date.getMinutes()} AM`;
                            return days === 1 ? time : date.toLocaleDateString();
                        }),

                        datasets: [
                            {
                                data: chartData.map((coin: [number, number]) => coin[1]),
                                label: `Price ( Past ${days} Days ) in ${currency}`,
                                borderColor: "#EEBC1D",
                            },
                        ],
                    }}
                    options={{
                        elements: {
                            point: {
                                radius: 1,
                            },
                        },
                    }}
                />
            )}

        </Container>
    )
}

export default ChartInfo