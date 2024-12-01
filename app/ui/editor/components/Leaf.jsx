const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }
    if (leaf.italic) {
        children = <em>{children}</em>
    }
    if (leaf.underline) {
        children = <u>{children}</u>
    }
    //make the text after a link at the end of a row normal text
    //otherwise it would not be possible to continue writing in the row without removing the link first
    return <span
        {...attributes}
        // The following is a workaround for a Chromium bug where,
        // if you have an inline at the end of a block,
        // clicking the end of a block puts the cursor inside the inline
        // instead of inside the final {text: ''} node
        style={{//do not use sx here
            paddingLeft: leaf.text === '' && 0.1
        }}
    >
        {children}
    </span>
}

export default Leaf;