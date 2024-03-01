import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Box, Container, createTheme, CssBaseline, ThemeProvider, Button } from '@mui/material';
import { store } from "./store/store.ts";
import Login from "./Login.tsx";
import App from "./App";

const theme = createTheme({
    palette: {
        primary: {
            main: '#151315',
        },
        secondary: {
            main: '#1e1d1e',
        },
        background: {
            default: '#000000',
            paper: '#000000',
        },
        success: {
            main: '#4caf50',
        },
        text: {
            primary: '#ffffff',
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#000000',
                },
            },
        },
    },
});

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
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
                            border: '1px solid gray',
                            // background: 'linear-gradient(#6e6e6e, #6e6e6e, #6e6e6e, #6e6e6e)',
                            background: 'gray',
                            padding: '20px',
                            borderRadius: '10px',
                            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
                        }}>
                            <Routes>
                                <Route path="/" element={<App />} />
                                <Route path="login" element={<Login />} />
                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                            {/*<Button variant="contained" sx={{ mt: 2, color: 'text.primary', bgcolor: 'success.main' }}>*/}
                            {/*    Success Button*/}
                            {/*</Button>*/}
                        </Box>
                    </Container>
                </ThemeProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
);
