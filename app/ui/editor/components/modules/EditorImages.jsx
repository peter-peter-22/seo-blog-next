import ClearIcon from '@mui/icons-material/Clear'
import { styled } from '@mui/material/styles'
import Fab from '@mui/material/Fab'
import {
    Transforms
} from 'slate'
import { ReactEditor, useFocused, useReadOnly, useSelected, useSlateStatic } from 'slate-react'
import Zoom from '@mui/material/Zoom';
import isUrl from 'is-url'
import imageExtensions from 'image-extensions'
import { MenuButton } from '../../EditorUI'

const withImages = editor => {
    const { isVoid, insertData } = editor
    editor.isVoid = element => {
        return element.type === 'image' ? true : isVoid(element)
    }
    editor.insertData = data => {
        const text = data.getData('text/plain')
        //const { files } = data
        //if (files && files.length > 0) {
        //    for (const file of files) {
        //        const reader = new FileReader()
        //        const [mime] = file.type.split('/')
        //        if (mime === 'image') {
        //            reader.addEventListener('load', () => {
        //                const url = reader.result
        //                insertImage(editor, url)
        //            })
        //            reader.readAsDataURL(file)
        //        }
        //    }
        //} else 
        if (isImageUrl(text)) {
            insertImage(editor, text)
        }
        else {
            insertData(data)//pass the insert to the next plugin
        }
    }
    return editor
}
const insertImage = (editor, url) => {
    const text = { text: '' }
    const image = { type: 'image', url, children: [text] }
    Transforms.insertNodes(editor, image)
    Transforms.insertNodes(editor, {
        type: 'paragraph',
        children: [{ text: '' }],
    })
}
const isImageUrl = (url, checkExtension = true) => {
    if (!url) return false
    if (!isUrl(url)) return false
    if (!checkExtension)
        return true;
    const ext = new URL(url).pathname.split('.').pop()
    return imageExtensions.includes(ext)
}
const InsertImageButton = ({ Icon }) => {
    const editor = useSlateStatic()
    return (
        <MenuButton
            onMouseDown={event => {
                event.preventDefault()
                const url = window.prompt('Enter the URL of the image:')
                if (url && !isImageUrl(url, false)) {
                    alert('URL is not an image')
                    return
                }
                url && insertImage(editor, url)
            }}
        >
            {Icon}
        </MenuButton>
    )
}

const StyledImage = styled("img")({
    display: "block",
    maxWidth: "100%",
    height: 300,
    width: "auto",
    objectFit: "cover",
})

const DisplayedImage = (props) => {
    const isReadonly = useReadOnly();
    return isReadonly ? <ViewImage {...props} /> : <EditorImage {...props} />;
}

function EditorImage({ attributes, children, element }) {
    const editor = useSlateStatic()
    const path = ReactEditor.findPath(editor, element)
    const selected = useSelected()
    const focused = useFocused()
    const showMenu = selected && focused;

    return (
        <div {...attributes}>
            {children}
            <div
                contentEditable={false}
                style={{ position: "relative" }}
            >
                <StyledImage
                    src={element.url}
                    alt={element.url}
                    sx={theme => ({
                        transition: theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.shorter,
                        }),
                        boxShadow: showMenu && `0 0 0 3px ${theme.palette.primary.main}`
                    })}
                />
                <Zoom in={showMenu}>
                    <Fab
                        onClick={(e) => {
                            e.preventDefault();
                            Transforms.removeNodes(editor, { at: path })
                        }}
                        onPointerDown={e => e.preventDefault()}
                        sx={{
                            position: "absolute",
                            top: "0.5em",
                            left: "0.5em",
                        }}
                        size="small"
                    >
                        <ClearIcon />
                    </Fab>
                </Zoom>
            </div>
        </div>
    )
}
function ViewImage({ attributes, children, element }) {
    return (
        <div {...attributes}>
            {children}
            <StyledImage
                src={element.url}
                alt={element.url}
            />
        </div>
    )

}

export { DisplayedImage, InsertImageButton, withImages }
