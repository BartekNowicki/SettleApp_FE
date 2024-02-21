import {Typography} from "@mui/material";
import ErrorBoundary from "./error_handling/ErrorBoundary.tsx";
import {fetchCosts} from "./store/costSlice.ts";
import {fetchEvents} from "./store/eventSlice.ts";
import {fetchUsers} from "./store/userSlice.ts";
import {useEffect} from "react";
import {useDispatch} from 'react-redux';
import {AppDispatch} from "./store/store.ts";


function App() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchUsers());
            await dispatch(fetchEvents());
            await dispatch(fetchCosts());
        };

        fetchData();
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
