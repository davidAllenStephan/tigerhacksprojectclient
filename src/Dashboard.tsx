import * as React from 'react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Button, Paper } from '@mui/material';
import './styles.css'

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export interface MovieResults {
    poster_path: string
    overview: string
    original_title: string
    popularity: number
    vote_average: number
    vote_count: number
    genre_ids: Array<number>
}

interface DashboardProps {
    selectedMovieResults: MovieResults
    imageSelected: any
    setImageSelcted: any
}

export default function Dashboard({ selectedMovieResults, imageSelected, setImageSelcted }: DashboardProps) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="absolute" sx={{ backgroundColor: "#FE6D73" }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '100px', justifyContent: 'center', alignItems: 'center' } }}>
                            {['Popular', 'Up and Coming', 'Hot', 'New'].map((page) => (
                                <Button
                                    key={page}
                                    sx={{ color: "white", fontSize: 20 }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box
                component="main"
                sx={{
                    backgroundColor: "#FEF9EF",
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Grid container alignItems="center" justifyContent="center" sx={{ marginTop: "100px" }}>
                    <Grid item xs={2} sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <IconButton onClick={() => setImageSelcted(imageSelected + 1)} sx={{ marginLeft: "130px" }}>
                            <SentimentVeryDissatisfiedIcon sx={{ height: "100px", width: "100px", color: "red" }} />
                        </IconButton>
                    </Grid>
                    <Grid item xs={8}>
                        <div className='colorTransition' style={{ zIndex: 100, backgroundColor: "green", position: "absolute", width: "1600px", height: "950px" }}>
                        </div>
                        <Paper sx={{ paddingTop: "50px", paddingBottom: "50px" }}>
                            <Grid container height="100%" gap={0}>
                                <Grid item xs={6} height="100%">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${selectedMovieResults.poster_path}`}
                                        alt="new"
                                        width="70%"
                                        height="70%"
                                        style={{ marginLeft: "125px" }}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ textAlign: "center" }}>
                                        <h1>{selectedMovieResults.original_title}</h1>
                                    </div>
                                    <div style={{ marginRight: "30px", fontSize: 23 }}>
                                        <p>{selectedMovieResults.overview}</p>
                                    </div>
                                    <div>
                                        <h2>Rating {selectedMovieResults.vote_average}</h2>
                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton onClick={() => setImageSelcted(imageSelected + 1)} sx={{ marginLeft: "130px" }}>
                            <SentimentSatisfiedAltIcon sx={{ height: "100px", width: "100px", color: "green" }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}