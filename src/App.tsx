import {Typography} from "@mui/material";
import ErrorBoundary from "./error_handling/ErrorBoundary.tsx";
import {fetchCosts} from "./store/costSlice.ts";
import {fetchEvents} from "./store/eventSlice.ts";
import {fetchUsers} from "./store/userSlice.ts";
import {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, persistor} from "./store/store";
import {PersistGate} from 'redux-persist/integration/react';
import {fetchToken} from "./store/authSlice.ts";
import {RootState} from "./store/reducers.ts";
import {logout} from "./store/logOutSlice.ts";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const {loading, error} = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchToken());
            await dispatch(fetchUsers());
            await dispatch(fetchEvents());
            await dispatch(fetchCosts());
            //await dispatch(logout());
        };

        fetchData();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
                <Typography variant="h4" component="h1" sx={{color: 'white'}}>
                    YO!
                </Typography>
                {/*<ErrorThrowingComponent/>*/}
            </ErrorBoundary>
        </PersistGate>
    )
}

export default App;
