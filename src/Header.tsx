import { AppBar, Toolbar, Button, Typography } from "@mui/material"
import { Box, Container } from "@mui/system"
import { useState } from "react"
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import MovieIcon from '@mui/icons-material/Movie';

interface HeaderProps {
    selectedList: any
    setSelectedList: any
    setImageSelected: any
}

const Header = ({ selectedList, setSelectedList, setImageSelected }: HeaderProps) => {
    const [headerColor, setHeaderColor] = useState("#B10F2E")
    const [currentTab, setCurrentTab] = useState(0)
    const changeList = (list: string) => {
        switch (list) {
            case "Popular":
                setSelectedList('popular')
                setHeaderColor("#B10F2E")
                setImageSelected(0)
                setCurrentTab(0)
                break;
            case "Upcoming":
                setSelectedList('upcoming')
                setHeaderColor("#8D6A9F")
                setImageSelected(0)
                setCurrentTab(1)
                break;
            case "Now Playing":
                setSelectedList('nowplaying')
                setHeaderColor("#71B48D")
                setImageSelected(0)
                setCurrentTab(2)
                break;
            case "Top Rated":
                setSelectedList('toprated')
                setHeaderColor("#227C9D")
                setImageSelected(0)
                setCurrentTab(3)
                break;
        }
    }
    return (
        <div>
            <AppBar sx={{ backgroundColor: headerColor }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <MovieFilterIcon fontSize="large" />
                        <Typography variant="h4">Flick Findr</Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '100px', justifyContent: 'center', alignItems: 'center' } }}>
                            {['Popular', 'Upcoming', 'Now Playing', 'Top Rated'].map((page, i) => (
                                <div>
                                    {i === currentTab ? <MovieIcon /> : null}
                                    <Button
                                        key={page}
                                        sx={{ color: "white", fontSize: 20 }}
                                        onClick={() => { changeList(page) }}
                                    >
                                        {page}
                                    </Button>
                                </div>
                            ))}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar >
        </div>
    )

}

export default Header
