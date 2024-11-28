export default function placeholder() {
    return {
        placeholder: "Type something",
        renderPlaceholder: ({ children, attributes }) => (
            <div {...attributes} >
                <p style={{margin:0}}>{children}</p>
            </div>
        )
    }
}