import {Button} from "@mui/material";
import ErrorBoundary from "./error_handling/ErrorBoundary.tsx";
import {fetchUsers} from "./store/userSlice.ts";
import {useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, persistor} from "./store/store";
import {PersistGate} from 'redux-persist/integration/react';
import {RootState} from "./store/rootReducer.ts";
import {ErrorMessage} from "./enums/ErrorMessage";
import {fetchToken} from "./store/authSlice";
import {logout} from "./store/logOutSlice";
import {fetchCosts} from "./store/costSlice";
import {fetchEvents} from "./store/eventSlice";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const {token, authLoading, authError} = useSelector((state: RootState) => state.auth);

    const handleLogout = async () => {
        localStorage.clear();
        await dispatch(logout());
    };


    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchToken());
            await dispatch(fetchUsers());
            await dispatch(fetchEvents());
            await dispatch(fetchCosts());
        };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (authError || !token) {
            console.log(ErrorMessage.AN_ERROR_OCCURRED, authError);
            navigate('/login');
        } else navigate('/');
    }, [authError, token, navigate]);

    if (authLoading) {
        return <div>Checking user authorization...</div>;
    }

    if (authError) {
        return <div>Authorization failed, please sign up or log in</div>;
    }

    return (
        <PersistGate loading={null} persistor={persistor}>
            <ErrorBoundary>
                <Button variant="outlined" onClick={handleLogout}>Logout</Button>
                {/*<ErrorThrowingComponent/>*/}
            </ErrorBoundary>
        </PersistGate>
    )
}

export default App;
