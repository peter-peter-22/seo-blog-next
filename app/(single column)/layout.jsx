import { SingleColumn } from "../ui/layout/Layouts";
export default function Layout({ children }) {
    return (
        <SingleColumn>
            {children}
        </SingleColumn>
    )
}