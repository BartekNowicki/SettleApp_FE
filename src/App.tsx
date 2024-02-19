import {Typography} from "@mui/material";
import ErrorBoundary from "./error_handling/ErrorBoundary.tsx";
import {fetchCosts} from "./store/costSlice.ts";
import {fetchEvents} from "./store/eventSlice.ts";
import {fetchUsers} from "./store/userSlice.ts";
import {useEffect} from "react";
import {useDispatch} from 'react-redux';


function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
        dispatch(fetchEvents());
        dispatch(fetchCosts());
    }, [dispatch]);


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
