import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
// import './index.css'
import {createTheme, ThemeProvider, CssBaseline} from '@mui/material';

const theme = createTheme({
    palette: {
        primary: {
            main: '#000', // black
        },
        secondary: {
            main: '#808080', // gray
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
);

