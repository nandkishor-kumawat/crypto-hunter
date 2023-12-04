import React, { useEffect } from 'react'
import { getCoinList } from '../config/api'
import { useCurrency } from '../context/currencyProvider';
import { Container, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Typography, Box, Pagination, CircularProgress } from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

const CoinTable = () => {
    const { currency, symbol } = useCurrency();
    const [coins, setCoins] = React.useState<any[]>([]);
    const [isLoading, setIsLoading] = React.useState(false);
    const [page, setPage] = React.useState(1);

    useEffect(() => {
        const getCoins = async () => {
            setIsLoading(true)
            try {
                const data = await getCoinList(currency);
                if(data.status) return
                setCoins(data)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoading(false)
            }
        }
        getCoins()
    }, [currency])


    const styles = {
        row: {
            backgroundColor: "#16171a",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "#131111",
            },
            fontFamily: "Montserrat",
        },
        pagination: {
            "& .MuiPaginationItem-root": {
                color: "gold",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#ffd9104d",
            },
        },
    }

    const navigate = useNavigate();

    if (isLoading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Container>
        )
    }

    if(!coins.length) return <div className='text-center'>Too Many Requests, please try again later</div>

    return (

        <Container>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {['#', 'coin', 'price', '24h change', 'market_cap'].map((head) => (
                                <TableCell sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    fontSize: 18
                                }} key={head}>{head}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coins.slice((page - 1) * 10, (page - 1) * 10 + 10).map((coin) => (
                            <TableRow
                                key={coin.id}
                                sx={styles.row}
                                onClick={() => navigate(`/coin/${coin.id}`)}
                            >
                                <TableCell sx={{ color: 'white' }}>{coin.market_cap_rank}</TableCell>
                                <TableCell sx={{ color: 'white' }}>
                                    <Box sx={{ display: 'flex', gap: 3 }}>
                                        <img src={coin.image} alt={coin.name} style={{ width: 45 }} />
                                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                            <Typography>{coin.name}</Typography>
                                            <Typography sx={{ color: '#736b6b' }}>{coin.symbol.toUpperCase()}</Typography>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell sx={{ color: 'white' }}>
                                    {symbol} {Number(coin.current_price.toFixed(2)).toLocaleString()}
                                </TableCell>
                                <TableCell sx={{ color: coin.price_change_percentage_24h > 0 ? 'green' : 'red' }}>
                                    {coin.price_change_percentage_24h > 0 ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />} {coin.price_change_percentage_24h.toFixed(2).replace('-', '')}%
                                </TableCell>
                                <TableCell sx={{ color: 'white' }}>
                                    {symbol} {coin.market_cap.toLocaleString()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>

            <Pagination
                count={Number((coins.length / 10).toFixed(0))}
                sx={{
                    py: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    ...styles.pagination
                }}

                onChange={(_, value) => {
                    setPage(value)
                }}
                showFirstButton
                showLastButton
            />

        </Container>
    )
}

export default CoinTable