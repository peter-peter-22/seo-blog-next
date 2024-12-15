import BottomPagination from "@/app/ui/components/pagination/BottomPagination";
import ProfileList from "@/app/ui/components/users/ProfileList";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

export default function DisplayAuthors({ page, pages, users, count, searchParams }) {
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5">
                        Browsing authors
                    </Typography>
                    <Divider />
                    <Typography color="text.secondary">
                        {count} authors found
                    </Typography>
                </CardContent>
            </Card>
            <Toolbar />
            {count > 0 ? (<>
                <Card>
                    <ProfileList items={users} />
                </Card>
                <BottomPagination searchParams={searchParams} count={pages} page={page} />
            </>) : (
                <Typography color="text.secondary" sx={{textAlign:"center"}}>
                    No results
                </Typography>
            )}
        </>
    )
}