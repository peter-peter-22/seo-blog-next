import Avatar from "@mui/material/Avatar";
import StringAvatar from "@/app/ui/layout/header/user/StringAvatar";

export default function HybridAvatar({ user: { image, name }, ...props }) {
    return (
        image ? (
            <Avatar src={image} alt={`the profile of ${name}`} {...props} />
        ) : (
            <StringAvatar name={name} {...props} />
        )
    )
}