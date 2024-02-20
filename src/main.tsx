import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import {Box, Container, createTheme, CssBaseline, ThemeProvider} from '@mui/material';
import {store} from "./store/store.ts";

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#0c0c0c',
        },
        background: {
            default: '#171717',
            paper: '#1c1c1c',
        }
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#0a0a0a',
                },
            },
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <Container maxWidth="lg" sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'background.paper'
                }}>
                    <Box sx={{
                        height: '720px',
                        width: '80%',
                        border: '1px solid red'
                    }}>
                        <App/>
                    </Box>
                </Container>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);
