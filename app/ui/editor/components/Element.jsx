'use client';

import { DisplayedImage } from './modules/EditorImages';
import { LinkComponent } from './modules/EditorUrls';
import { VideoElement } from './modules/EditorVideo';
import { CodeElement } from './modules/codeblock/CodeBlock';

const Element = ({ attributes, children, element }) => {
    const style = { textAlign: element.align }
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        case 'image':
            return <DisplayedImage
                attributes={attributes}
                element={element}
            >
                {children}
            </DisplayedImage>
        case 'link':
            return <LinkComponent
                attributes={attributes}
                element={element}
                style={style}
            >
                {children}
            </LinkComponent>
        case 'video':
            return <VideoElement
                attributes={attributes}
                element={element}
            >
                {children}
            </VideoElement>
        case "code":
            return <CodeElement
                attributes={attributes}
                element={element}
            >
                {children}
            </CodeElement>
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}

export default Element;