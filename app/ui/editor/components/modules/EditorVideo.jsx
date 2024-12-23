import ClearIcon from '@mui/icons-material/Clear';
import Fab from '@mui/material/Fab';
import { styled } from '@mui/material/styles';
import Zoom from '@mui/material/Zoom';
import isUrl from 'is-url';
import { Transforms } from 'slate';
import {
  ReactEditor,
  useFocused,
  useReadOnly,
  useSelected,
  useSlateStatic
} from 'slate-react';
import { MenuButton } from '../../EditorUI';
import { videoUrlFormatters } from './VideoTypes';
import { z } from 'zod';
import TextDialog from '@/app/ui/dialogs/TextDialog'
import { useCallback, useMemo, useState } from 'react'

const insertVideo = (editor, url) => {
  const parsedUrl = formatUrl(url);
  const text = { text: '' }
  const image = { type: 'video', url: parsedUrl, children: [text] }
  Transforms.insertNodes(editor, image)
  Transforms.insertNodes(editor, {
    type: 'paragraph',
    children: [{ text: '' }],
  })
}

const isVideoUrl = (url) => {
  if (!url) return false
  if (!isUrl(url)) return false
  for (const videoType of videoUrlFormatters) {
    if (videoType.isCorrect(url))
      return true;
  }
  return false;
}

export const InsertVideoButton = ({ Icon }) => {
  const editor = useSlateStatic()
  const [dialogOpen, setDialogOpen] = useState(false);
  const closeDialog = useCallback(() => {
    setDialogOpen(false)
  }, [])
  const validation = useMemo(() => z.string().url(), [])

  const processUrl = useCallback((url) => {
    if (!url)
      return;
    insertVideo(editor, url);
    closeDialog();
  }, [closeDialog, editor])

  return (
    <>
      <MenuButton
        onMouseDown={event => {
          event.preventDefault()
          setDialogOpen(true);
        }}
      >
        {Icon}
      </MenuButton>
      <TextDialog
        open={dialogOpen}
        title="Enter the URL of the video"
        textFieldProps={{
          label: "Url",
          placeholder: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
          id: "videoUrl"
        }}
        confirmText="Add"
        callback={processUrl}
        onClose={closeDialog}
        validation={validation}
      />
    </>
  )
}

const formatUrl = (url) => {
  if (!url)
    return;
  for (const videoType of videoUrlFormatters) {
    if (videoType.isCorrect(url))
      return videoType.formatter(url);
  }
  return url;
}

export const withEmbeds = editor => {
  const { isVoid, insertData } = editor
  editor.isVoid = element => (element.type === 'video' ? true : isVoid(element))
  editor.insertData = data => {
    const text = data.getData('text/plain');
    if (isVideoUrl(text)) {
      insertVideo(editor, text)
    }
    else {
      insertData(data)//pass the insert to the next plugin
    }
  }
  return editor
}

export const VideoElement = (props) => {
  const isReadonly = useReadOnly();
  return isReadonly ? <VideoElementView {...props} /> : <VideoElementEdit {...props} />;
}

const IFrameContainer = styled("div")({
  padding: '75% 0 0 0',
  position: 'relative',
})

function VideoElementView({ attributes, children, element }) {
  const { url } = element
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <IFrameContainer>
          <iframe
            src={url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
          />
        </IFrameContainer>
      </div>
      {children}
    </div>
  )
}

function VideoElementEdit({ attributes, children, element }) {
  const editor = useSlateStatic()
  const { url } = element;
  const selected = useSelected()
  const focused = useFocused()
  const showMenu = selected && focused;
  const path = ReactEditor.findPath(editor, element)

  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <IFrameContainer
          sx={theme => ({
            transition: theme.transitions.create(['all'], {
              duration: theme.transitions.duration.shorter,
            }),
            boxShadow: showMenu && `0 0 0 3px ${theme.palette.primary.main}`
          })}
        >
          <iframe
            src={url}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              width: '100%',
              height: '100%',
            }}
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
        </IFrameContainer>
      </div>
      {children}
    </div>
  )
}