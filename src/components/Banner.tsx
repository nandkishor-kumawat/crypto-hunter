import React from 'react'
import { useCurrency } from '../context/currencyProvider'
import { getTrendingCoins } from '../config/api'
import AliceCarousel from 'react-alice-carousel'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import "react-alice-carousel/lib/alice-carousel.css";
import "react-alice-carousel/lib/scss/alice-carousel.scss";

export const Banner = () => {
    const { currency, symbol } = useCurrency()
    const [isLoading, setIsLoading] = React.useState(false);
    const [trending, setTrending] = React.useState([]);

    const navigate = useNavigate();

    React.useEffect(() => {
        const getData = async () => {
            setIsLoading(true)
            try {
                const data = await getTrendingCoins(currency)
                if (data.status) throw new Error(data.status.error_message)
                setTrending(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getData()
    }, [currency])

    const items = trending.map((coin: any) => {
        return (
            <Box key={coin.id} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2, userSelect: 'none' }}>
                <img src={coin.image} alt={coin.name} className='user-select-none' width={100} onClick={() => navigate(`/coin/${coin.id}`)} />
                <Typography sx={{ mt: 2, color: '#d3d3d3' }}>#{coin.market_cap_rank}</Typography>
                <Box sx={{ display: 'flex' }}>
                    <Typography>{coin.symbol.toUpperCase()} </Typography>
                    <Typography sx={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red', display: 'flex', alignItems: 'center' }}>
                        {coin.price_change_percentage_24h > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}{coin.price_change_percentage_24h.toFixed(2).replace('-', '')}%
                    </Typography>
                </Box>
                <Typography>{symbol} {Number(coin.current_price.toFixed(2)).toLocaleString()}</Typography>
            </Box>
        )
    })


    if (isLoading) return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
        </Container>
    )

    return (
        <Container sx={{ mt: 2, mb: 5 }}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography variant='h2' sx={{ my: 3 }}>Crypto Hunter</Typography>
            </Box>
            <Box
                sx={{
                    height: "50%",
                    display: "flex",
                    alignItems: "center"
                }}>

                <AliceCarousel
                    mouseTracking
                    infinite
                    autoPlay
                    autoPlayInterval={1000}
                    animationDuration={500}
                    disableDotsControls
                    disableButtonsControls
                    items={items}
                    swipeDelta={100}
                    responsive={{
                        0: {
                            items: 2
                        },
                        512: {
                            items: 4
                        }
                    }}
                />
            </Box>
        </Container>
    )
}
