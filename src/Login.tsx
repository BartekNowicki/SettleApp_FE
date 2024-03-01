import React, {useEffect} from 'react';
import {Box, Button, Container, TextField} from '@mui/material';
import {fetchToken} from "./store/authSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "./store/store.ts";
import {useNavigate} from "react-router-dom";
import {RootState} from "./store/rootReducer.ts";

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {token, authError} = useSelector((state: RootState) => state.auth);

    const handleClick = () => dispatch(fetchToken());

    useEffect(() => {
        if (!authError && token) {
            navigate('/');
        }
    }, [authError, token, navigate]);

    return (
        <Container maxWidth="sm">
            <Box sx={{mt: 8, textAlign: 'center'}}>
                {/*<Typography variant="h4" gutterBottom></Typography>*/}
                <Box sx={{mt: 3}}>
                    <TextField
                        fullWidth
                        id="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                    />
                </Box>
                <Box sx={{mt: 2}}>
                    <TextField
                        fullWidth
                        id="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        margin="normal"
                    />
                </Box>
                <Box sx={{mt: 2}}>
                    <Button variant="contained" color="primary" onClick={() => handleClick()}>
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
