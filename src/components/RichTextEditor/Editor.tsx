import { useCallback, useState } from "react";
import { BaseEditor, createEditor, Transforms, Element, Editor } from "slate";
import {
    Editable,
    ReactEditor,
    Slate,
    withReact,
    RenderElementProps,
} from "slate-react";

type CustomElement = { type: "paragraph" | "code"; children: CustomText[] };
type CustomText = { text: string };

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor;
        Element: CustomElement;
        Text: CustomText;
    }
}

const initialValue: CustomElement[] = [
    {
        type: "paragraph",
        children: [{ text: "A line of text in a paragraph." }],
    },
];

export default function RichEditor() {
    const [editor] = useState(() => withReact(createEditor()));

    const renderElement = useCallback((props: RenderElementProps) => {
        switch (props.element.type) {
            case "code":
                return <CodeElement {...props} />;
            default:
                return <DefaultElement {...props} />;
        }
    }, []);

    // Render the Slate context.
    return (
        <Slate editor={editor} initialValue={initialValue}>
            <Editable
                renderElement={renderElement}
                onKeyDown={event => {
                    if (event.key === 'c' && event.ctrlKey) {
                        event.preventDefault()
                        // Determine whether any of the currently selected blocks are code blocks.
                        const [match] = Editor.nodes(editor, {
                            match: n => Element.isElement(n) && n.type === "code",
                        })
                        // Toggle the block type depending on whether there's already a match.
                        Transforms.setNodes(
                            editor,
                            { type: match ? 'paragraph' : 'code' },
                            { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
                        )
                    }
                }}
            />
        </Slate>
    );
}

const DefaultElement = (props: RenderElementProps) => {
    return <p {...props.attributes}>{props.children}</p>;
};

const CodeElement = (props: RenderElementProps) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    );
};
