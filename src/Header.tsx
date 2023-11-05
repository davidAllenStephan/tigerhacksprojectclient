import { AppBar, Toolbar, Button } from "@mui/material"
import { Box, Container } from "@mui/system"
import { useState } from "react"


interface HeaderProps {
    selectedList: any
    setSelectedList: any
    setImageSelected: any
}

const Header = ({ selectedList, setSelectedList, setImageSelected }: HeaderProps) => {
    const [headerColor, setHeaderColor] = useState("#B10F2E")
    const changeList = (list: string) => {
        switch (list) {
            case "Popular":
                setSelectedList('popular')
                setHeaderColor("#B10F2E")
                setImageSelected(0)
                break;
            case "Upcoming":
                setSelectedList('upcoming')
                setHeaderColor("#8D6A9F")
                setImageSelected(0)
                break;
            case "Now Playing":
                setSelectedList('nowplaying')
                setHeaderColor("#71B48D")
                setImageSelected(0)
                break;
            case "Top Rated":
                setSelectedList('toprated')
                setHeaderColor("#227C9D")

                setImageSelected(0)
                break;
        }
    }
    return (
        <AppBar position="absolute" sx={{ backgroundColor: headerColor }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', gap: '100px', justifyContent: 'center', alignItems: 'center' } }}>
                        {['Popular', 'Upcoming', 'Now Playing', 'Top Rated'].map((page) => (
                            <Button
                                key={page}
                                sx={{ color: "white", fontSize: 20 }}
                                onClick={() => { changeList(page) }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar >
    )

}

export default Header
