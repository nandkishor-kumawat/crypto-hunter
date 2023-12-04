import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { MenuItem, Select } from '@mui/material';
import { currencyData, useCurrency } from '../context/currencyProvider';
import { Link } from 'react-router-dom';

export default function ButtonAppBar() {

  const { currency, updateCurrency } = useCurrency()

  return (

    <AppBar position="sticky"
      sx={{
        flexGrow: 1,
        backgroundColor: '#141824',
      }}
    >
      <Toolbar>


        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            color: 'gold',
            fontWeight: 'bold'
          }}
        >      <Link to="/">
            Crypto Hunter
          </Link>
        </Typography>

        <Select
          value={currency}
          onChange={(e) => updateCurrency(e.target.value)}
          sx={{
            color: 'white',
            border: '1px solid gray',
            width: 100,
            height: 45,
            mr: 2,
            '& .MuiSelect-icon': {
              color: 'white',
            },

          }}
        >
          {currencyData.map((item) => (
            <MenuItem key={item.currency} value={item.currency}>
              {item.currency}
            </MenuItem>
          ))}
        </Select>

        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>

  );
}
