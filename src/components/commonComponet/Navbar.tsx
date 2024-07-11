import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import LoginIcon from '@mui/icons-material/Login';
import localforage from "localforage";
import { logout } from "../../redux/uersAuth/authSlice";
import SearchBar from '../SearchBar';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state: RootState) => state.auth.currentUser);

    const handleLogout = () => {
        dispatch(logout());
        localforage.removeItem('currentUser');
        navigate('/login');
    };

    const handleFavorite = () => {
        navigate('/favorite');
    }

    return (
       <>
            <AppBar position="sticky" sx={{ backgroundColor: "black", top: 0 }}>
                <Toolbar>
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Movies4U
                        </Typography>
                    </Link>

                    <div style={{ flex: 1, textAlign: 'center', marginLeft: 4 }}>
                        <SearchBar />
                    </div>
                    <div>
                        {currentUser ? (
                            <>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    aria-label="favorites"
                                    onClick={handleFavorite}
                                >
                                    <FavoriteBorderIcon />
                                </IconButton>
                                <IconButton
                                    size="large"
                                    edge="end"
                                    color="inherit"
                                    aria-label="logout"
                                    onClick={handleLogout}
                                >
                                    <ExitToAppIcon />
                                </IconButton>
                            </>
                        ) : (
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                aria-label="login"
                                onClick={() => navigate('/login')}
                            >
                                <LoginIcon />
                            </IconButton>
                        )}
                    </div>
                </Toolbar>
            </AppBar>
       </>
    );
}

export default Navbar;
