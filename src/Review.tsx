import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { Button, Paper } from '@mui/material';
import './styles.css'
import { useState } from 'react';
import putUserLikedMovies from './api/putUserLikedMovies';

interface ReviewProps {
    userLikedMovies: any
}

const Review = ({ userLikedMovies }: ReviewProps) => {

    const [selectedMovieReview, setSelectedMovieReview] = useState(1)
    const changeMovieReview = (newSelected: number) => {
        setSelectedMovieReview(newSelected)
    }
    const getMovieTitles = () => {
        const output = [] as Array<String>
        console.log(userLikedMovies)
        for (let i = 0; i < userLikedMovies.length; i++) {
            output.push(`"` + userLikedMovies[i].original_title + `"`)
        }
        return output
    }

    return (
        <Box sx={{ display: 'flex' }}>
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
                    <Grid item xs={3} sx={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        {userLikedMovies[selectedMovieReview - 1] ? <div onClick={() => changeMovieReview(selectedMovieReview - 1)}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${userLikedMovies[selectedMovieReview - 1].poster_path}`}
                                alt="new"
                                width="50%"
                                height="50%"
                                style={{ marginLeft: "125px" }}
                                onClick={() => changeMovieReview(selectedMovieReview - 1)}
                            />
                        </div> : null}
                    </Grid>
                    <Grid item xs={6}>
                        <div style={{ left: 1150, top: 90, borderBottom: "5px solid black", position: "absolute", width: "120px", height: "120px", rotate: "45deg", transformOrigin: "100% 0", zIndex: 200 }}></div>
                        <div style={{ left: 1050, top: 10, borderBottom: "5px solid black", position: "absolute", width: "120px", height: "120px", rotate: "-45deg", transformOrigin: "100% 0", zIndex: 200 }}></div>
                        <Box sx={{ border: 15 }}>
                            <Paper sx={{ paddingTop: "50px", paddingBottom: "50px" }}>
                                <Grid container height="100%" gap={0}>
                                    <Grid item xs={6} height="100%">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${userLikedMovies[selectedMovieReview].poster_path}`}
                                            alt="new"
                                            width="70%"
                                            height="70%"
                                            style={{ marginLeft: "125px" }}
                                        />

                                    </Grid>
                                    <Grid item xs={6}>
                                        <div style={{ textAlign: "center" }}>
                                            <h1>{userLikedMovies[selectedMovieReview].original_title}</h1>
                                        </div>
                                        <div style={{ marginRight: "30px", fontSize: 23 }}>
                                            <p>{userLikedMovies[selectedMovieReview].overview}</p>
                                        </div>
                                        <div>
                                            <h2>Rating {userLikedMovies[selectedMovieReview].vote_average}</h2>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Box>
                    </Grid>
                    <Grid item xs={3}>
                        {userLikedMovies[selectedMovieReview + 1] ? <div onClick={() => changeMovieReview(selectedMovieReview + 1)}>
                            <img
                                src={`https://image.tmdb.org/t/p/w500${userLikedMovies[selectedMovieReview + 1].poster_path}`}
                                alt="new"
                                width="50%"
                                height="50%"
                                style={{ marginLeft: "125px" }}
                            />
                        </div> : null}
                    </Grid>
                    <Button onClick={() => putUserLikedMovies('9ddb09ab-877a-4c4a-8a51-6b381935e52d', getMovieTitles())}>
                        Save
                    </Button>
                </Grid>
            </Box>
        </Box>
    )
}

export default Review
