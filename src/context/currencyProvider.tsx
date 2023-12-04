import React, { createContext, useEffect } from 'react';

interface CurrencyContextProps {
    currency: string;
    updateCurrency: (currency: string) => void;
    symbol: string;
}

const CurrencyContext = createContext<CurrencyContextProps>({
    currency: 'USD',
    updateCurrency: () => { },
    symbol: '$'
});

export const useCurrency = () => React.useContext(CurrencyContext);

export const currencyData = [
    {
        currency: 'USD',
        symbol: '$'
    },
    {
        currency: 'INR',
        symbol: '₹'
    }
]

const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {

    const [currency, setCurrency] = React.useState('USD');
    const [symbol, setSymbol] = React.useState('$');

    useEffect(() => {
        const data = currencyData.find(item => item.currency === currency)
        if (data) {
            setSymbol(data.symbol)
        }
    }, [currency])

    const updateCurrency = (currency: string) => {
        setCurrency(currency)
    }


    return (
        <CurrencyContext.Provider value={{ currency, updateCurrency, symbol }}>
            {children}
        </CurrencyContext.Provider>
    );
};


export default CurrencyProvider