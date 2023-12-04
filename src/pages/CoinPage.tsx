import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleCoin } from '../config/api';
import ChartInfo from '../components/ChartInfo';
import { Box, CircularProgress, Container, Typography } from '@mui/material';
import { useCurrency } from '../context/currencyProvider';

const CoinPage = () => {
  const { id } = useParams();
  const { currency, symbol } = useCurrency();
  const [coin, setCoin] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!id) return
    const getCoin = async () => {
      setIsLoading(true)
      try {
        const data = await getSingleCoin(id);
        if (data.error) throw new Error(data.error)
        setCoin(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getCoin()
  }, [id])

  if (isLoading) return (
    <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CircularProgress />
    </Container>
  )

  if (!coin) return <div className='text-center m-2'>Not Found</div>

  return (
    <Container>
      <Box sx={{ p: 1 }}>
        <Typography sx={{
          fontSize: '.75rem',
          width: 'fit-content',
          backgroundColor: '#ffffff36',
          padding: '5px 10px',
          my: '10px',
          borderRadius: '5px',
          color: '#ccc'
        }}>
          Rank #{coin.market_cap_rank}
        </Typography>

        <div className="flex items-center gap-2">
          <img src={coin.image.large} alt={coin.name} width={50} />
          <Typography
            sx={{
              fontSize: '1.5rem',
            }}
          >{coin.name}</Typography>
        </div>
        <Typography sx={{ fontSize: '2.5rem' }}>{symbol} {coin.market_data.current_price[currency.toLowerCase()].toLocaleString()}</Typography>
        <Typography>{coin.description.en.split(". ")[0]}</Typography>

      </Box>
      <ChartInfo coin={coin} />
    </Container>
  )
}

export default CoinPage