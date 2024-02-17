// import { useState } from 'react'
// import './App.css'

import {Typography} from "@mui/material";
import ErrorBoundary from "./error_handling/ErrorBoundary.tsx";

function App() {
    // const [count, setCount] = useState(0);


    return (
        <ErrorBoundary>
            <Typography variant="h4" component="h1" sx={{color: 'white'}}>
                YO!
            </Typography>
            {/*<ErrorThrowingComponent/>*/}
        </ErrorBoundary>

    )
}

export default App
