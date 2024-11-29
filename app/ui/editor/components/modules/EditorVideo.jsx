import React, { useMemo } from 'react'
import { Transforms, createEditor } from 'slate'
import {
  Slate,
  Editable,
  withReact,
  useSlateStatic,
  ReactEditor,
} from 'slate-react';
import { MenuButton } from '../../EditorUI';
import { videoUrlFormatters } from './VideoTypes';
import isUrl from 'is-url'

const insertVideo = (editor, url) => {
  const parsedUrl = processUrl(url);
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
  return (
    <MenuButton
      onMouseDown={event => {
        event.preventDefault()
        const url = window.prompt('Enter the URL of the video:')
        if (!url) {
          alert('no URL provided');
          return;
        }
        insertVideo(editor, url)
      }}
    >
      {Icon}
    </MenuButton>
  )
}

const processUrl = (url) => {
  if (!url)
    return;
  for (const videoType of videoUrlFormatters) {
    if (videoType.isCorrect(url))
      return videoType.formatter(url);
  }
  return url;
}

export const withEmbeds = editor => {
  const { isVoid } = editor
  editor.isVoid = element => (element.type === 'video' ? true : isVoid(element))
  editor.insertData = data => {
    const text = data.getData('text/plain');
    if (isVideoUrl(text)) {
      insertVideo(editor, text)
    }
  }
  return editor
}

export const VideoElement = ({ attributes, children, element }) => {
  const editor = useSlateStatic()
  const { url } = element
  return (
    <div {...attributes}>
      <div contentEditable={false}>
        <div
          style={{
            padding: '75% 0 0 0',
            position: 'relative',
          }}
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
        </div>
      </div>
      {children}
    </div>
  )
}