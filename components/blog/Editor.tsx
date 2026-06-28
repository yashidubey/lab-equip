"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export default function Editor({
  value,
  onChange,
}: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
      }),
      Placeholder.configure({
        placeholder: "Write your blog...",
      }),
    ],

    content: value,

    immediatelyRender: false,

    editorProps: {
      attributes: {
        class:
          "min-h-[450px] p-6 focus:outline-none bg-white text-black font-semibold prose prose-lg max-w-none",
      },
    },

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    if (editor.getHTML() !== value) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) return null;

  return (
    <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-slate-100">

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("bold")
              ? "bg-blue-600 text-white"
              : "bg-white border text-black"
          }`}
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("italic")
              ? "bg-blue-600 text-white"
              : "bg-white border text-black"
          }`}
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-blue-600 text-white"
              : "bg-white border text-black"
          }`}
        >
          H2
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("heading", { level: 3 })
              ? "bg-blue-600 text-white"
              : "bg-white border text-black"
          }`}
        >
          H3
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
          className={`px-3 py-1 rounded ${
            editor.isActive("bulletList")
              ? "bg-blue-600 text-white"
              : "bg-white border text-black"
          }`}
        >
          List
        </button>

        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter URL");
            if (!url) return;

            editor
              .chain()
              .focus()
              .setLink({ href: url })
              .run();
          }}
          className="px-3 py-1 rounded bg-white border text-black"
        >
          Link
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().unsetLink().run()
          }
          className="px-3 py-1 rounded bg-white border text-black"
        >
          Remove Link
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().undo().run()
          }
          className="px-3 py-1 rounded bg-white border text-black"
        >
          Undo
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().redo().run()
          }
          className="px-3 py-1 rounded bg-white border text-black"
        >
          Redo
        </button>

      </div>

      <EditorContent editor={editor} />

      <style jsx global>{`
        .ProseMirror {
          color: #000;
          font-weight: 600;
          min-height: 450px;
          outline: none;
          caret-color: #000;
        }

        .ProseMirror p,
        .ProseMirror li,
        .ProseMirror h1,
        .ProseMirror h2,
        .ProseMirror h3,
        .ProseMirror h4,
        .ProseMirror strong,
        .ProseMirror em,
        .ProseMirror a {
          color: #000;
        }

        .ProseMirror::placeholder {
          color: #888;
        }

        .ProseMirror p.is-editor-empty:first-child::before {
          color: #999;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
      `}</style>

    </div>
  );
}