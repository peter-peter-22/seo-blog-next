import List from "@mui/material/List";
import { Fragment } from "react";

export default function ListWithDiviers({ items, ItemComponent, DividerElement, ...props }) {
    return (
        <List {...props}>
            {items.map((item, index, array) => (
                <Fragment key={index}>
                    {ItemComponent(item)}
                    {index < array.length - 1 && DividerElement}
                </Fragment>
            ))}
        </List>
    )
}