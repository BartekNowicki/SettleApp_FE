import React from 'react';
import {Box, Button, Container, TextField} from '@mui/material';

const Login = () => {

    const handleClick = () => console.log("CLICK");

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
