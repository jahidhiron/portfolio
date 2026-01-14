"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { convertToHTML } from "draft-convert";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  {
    ssr: false,
    loading: () => (
      <div className='p-3 min-h-[200px] text-gray-400 dark:text-gray-600'>
        Loading editor...
      </div>
    ),
  }
);

const toolbarOptions = [
  "fontFamily",
  "fontSize",
  "inline",
  "list",
  "textAlign",
  "link",
];

type Props = {
  setValue?: (value: string) => void;
  value?: string;
};

const TextEditor = ({ setValue, value = "" }: Props) => {
  const [editorState, setEditorState] = useState<EditorState>(() => {
    if (typeof window !== "undefined" && value) {
      try {
        const blocksFromHTML = convertFromHTML(value);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks || [],
          blocksFromHTML.entityMap || {}
        );
        return EditorState.createWithContent(contentState);
      } catch (error) {
        console.warn("Failed to parse value as HTML:", error);
        return EditorState.createEmpty();
      }
    }
    return EditorState.createEmpty();
  });

  // Update parent when editor content changes
  useEffect(() => {
    if (typeof setValue === "function") {
      try {
        const html = convertToHTML(editorState.getCurrentContent());
        setValue(html);
      } catch (error) {
        console.warn("Failed to convert editor content to HTML:", error);
      }
    }
  }, [editorState, setValue]);

  // Update editor when value prop changes (from external source)
  useEffect(() => {
    if (value !== undefined) {
      try {
        const currentHtml = convertToHTML(editorState.getCurrentContent());
        if (currentHtml !== value) {
          const blocksFromHTML = convertFromHTML(value);
          const contentState = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks || [],
            blocksFromHTML.entityMap || {}
          );
          const newEditorState = EditorState.createWithContent(contentState);
          setEditorState(newEditorState);
        }
      } catch (error) {
        console.warn("Failed to parse value as HTML:", error);
      }
    }
  }, [value]);

  return (
    <div className='bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600'>
      <div className='border-gray-300 dark:border-gray-600 rounded-md overflow-hidden'>
        <Editor
          wrapperClassName='w-full'
          editorClassName='p-3 min-h-[200px] focus:outline-none text-gray-800 dark:text-gray-100 bg-transparent'
          editorState={editorState}
          onEditorStateChange={setEditorState}
          toolbar={{
            options: toolbarOptions,
            inline: { inDropdown: false },
            list: { inDropdown: false },
            textAlign: { inDropdown: false },
            link: { inDropdown: true },
          }}
          placeholder='Write your message...'
        />
      </div>
    </div>
  );
};

export default TextEditor;
