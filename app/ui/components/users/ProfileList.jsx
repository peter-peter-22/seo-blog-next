import Divider from "@mui/material/Divider";
import ListWithDiviers from "../ListWithDividers";
import ProfileListItem from "./ProfileListItem";

export default function ProfileList({ items, ...props }) {
    return (
        <ListWithDiviers
            items={items}
            ItemComponent={item => <ProfileListItem user={item} />}
            DividerElement={
                <Divider variant="inset" component="li" />
            }
            {...props}
        />
    )
}