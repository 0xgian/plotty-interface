import clsx from "clsx";
import { useSearch } from "hooks/useSearch";
import React, {
  useMemo,
  useCallback,
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import {
  Editor,
  Transforms,
  Range,
  createEditor,
  Text,
  Node,
  Descendant,
} from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, ReactEditor, withReact } from "slate-react";
import textProcessor from "lib/textProcessor";
import { toast } from "react-hot-toast";
import { selectFiles } from "lib/selectFiles";
import Picker from "@emoji-mart/react";
import MediaRenderer from "components/MediaRenderer";
import AvatarCard from "components/AvatarCard";
import _ from "lodash";

export default function RichTextEditor({
  parentRef,
  onChangeText,
  onChangeImages,
  placeholder = "What is happening on-chain?!",
}: {
  parentRef?: any;
  onChangeText: (s: string) => void;
  onChangeImages: (images: string[]) => void;
  placeholder?: string;
}) {
  const ref = useRef<HTMLDivElement | null>();
  const [target, setTarget] = useState<Range | undefined | null>();
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState(["", ""]);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const editor = useMemo(
    () => withImages(withReact(withHistory(createEditor()))),
    []
  );

  const { searchResults, searchWords } = useSearch(query);
  const filteredProfiles = useMemo(
    () =>
      query === "" ? [] : searchResults?.filter((p: any) => p?.handle) ?? [],
    [query, searchResults]
  );
  const filteredWords = useMemo(
    () => (query === "" ? [] : searchWords?.filter((w: string) => w) ?? []),
    [query, searchWords]
  );

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setQuery(search[0].concat(search[1]));
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  useEffect(() => {
    if (!target) {
      setQuery("");
    }
  }, [target]);

  useImperativeHandle(parentRef, () => ({
    clearData() {
      clearData();
    },

    insertImages() {
      insertImages();
    },

    toggleEmojiPicker() {
      toggleEmojiPicker();
    },
  }));

  const clearData = useCallback(() => {
    Transforms.delete(editor, {
      at: {
        anchor: Editor.start(editor, []),
        focus: Editor.end(editor, []),
      },
    });
  }, [editor]);

  const insertImages = useCallback(() => {
    selectFiles((files) => editor.insertData({ files }));
  }, [editor]);

  const toggleEmojiPicker = useCallback(
    () => setShowEmojiPicker(!showEmojiPicker),
    [showEmojiPicker]
  );

  const decorate = useCallback(([node, path]: any) => {
    const ranges: any = [];

    if (Text.isText(node)) {
      const { text } = node;
      const entities: any = textProcessor.extractEntitiesWithIndices(text);

      entities.forEach((entity: any) =>
        ranges.push({
          anchor: { path, offset: entity.indices[0] },
          focus: {
            path,
            offset: entity.indices[1],
          },
          highlight: true,
        })
      );
    }

    return ranges;
  }, []);

  const onKeyDown = useCallback(
    (event: any) => {
      // Handle select on dropdown only mention case for this version
      if (target) {
        if (!_.isEmpty(filteredProfiles) || !_.isEmpty(filteredWords)) {
          const list = !_.isEmpty(filteredProfiles)
            ? filteredProfiles
            : filteredWords;
          switch (event.key) {
            case "ArrowDown":
              event.preventDefault();
              const prevIndex = index >= list.length - 1 ? 0 : index + 1;
              setIndex(prevIndex);
              break;
            case "ArrowUp":
              event.preventDefault();
              const nextIndex = index <= 0 ? list.length - 1 : index - 1;
              setIndex(nextIndex);
              break;
            case "Tab":
            case "Enter":
              event.preventDefault();
              Transforms.select(editor, target);
              Transforms.insertText(
                editor,
                search[0] +
                  (list[index]?.handle || list[index].substring(1)) +
                  " "
              );
              setTarget(null);
              break;
            case "Escape":
              event.preventDefault();
              setTarget(null);
              break;
          }
        }
      }
    },
    [filteredProfiles, filteredWords, editor, index, target, search]
  );

  useEffect(() => {
    if (target && (filteredProfiles.length > 0 || filteredWords.length > 0)) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      if (el) {
        el.style.top = `${rect.top + window.pageYOffset + 24}px`;
        el.style.left = `${rect.left + window.pageXOffset}px`;
      }
    }
  }, [
    filteredProfiles.length,
    filteredWords.length,
    editor,
    index,
    search,
    target,
  ]);

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={() => {
        const { selection } = editor;
        if (selection && Range.isCollapsed(selection)) {
          const [start] = Range.edges(selection);
          const wordBefore = Editor.before(editor, start, { unit: "word" });
          const before = wordBefore && Editor.before(editor, wordBefore);
          const beforeRange = before && Editor.range(editor, before, start);
          const beforeText = beforeRange && Editor.string(editor, beforeRange);
          const beforeMatch = beforeText && beforeText.match(/^[@#$](\w+)$/);
          const after = Editor.after(editor, start);
          const afterRange = Editor.range(editor, start, after);
          const afterText = Editor.string(editor, afterRange);
          const afterMatch = afterText.match(/^(\s|$)/);

          if (beforeMatch && afterMatch) {
            setTarget(beforeRange);
            setSearch([beforeMatch[0][0], beforeMatch[1]]);
            setIndex(0);
            return;
          }
        }
        onChangeImages(serializeImages(editor.children));
        onChangeText(serialize(editor.children));
        setTarget(null);
      }}
    >
      <Editable
        decorate={decorate}
        renderLeaf={renderLeaf}
        renderElement={renderElement}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
      <MediaRenderer editor={editor} />
      {target &&
        (!_.isEmpty(filteredProfiles) || !_.isEmpty(filteredWords)) && (
          <Portal>
            <div
              // @ts-ignore
              ref={ref}
              className={clsx(
                "absolute z-[2] w-full max-w-[180px] md:max-w-[348px] mt-1 overflow-x-hidden text-base rounded-lg shadow-lg max-h-60",
                "ring-1 ring-secondary-text ring-opacity-5 focus:outline-none sm:text-sm bg-primary-white"
              )}
              data-cy="mentions-portal"
            >
              {!_.isEmpty(filteredProfiles)
                ? filteredProfiles.map((profile: any, i: number) => (
                    <div
                      key={profile.uid}
                      onClick={() => {
                        Transforms.select(editor, target);
                        Transforms.insertText(
                          editor,
                          search[0] + profile.handle + " "
                        );
                        setTarget(null);
                      }}
                      className={clsx(
                        "relative select-none py-3 px-4",
                        i === index
                          ? "bg-secondary-text bg-opacity-5"
                          : "text-secondary-text"
                      )}
                    >
                      <AvatarCard profile={profile} />
                    </div>
                  ))
                : filteredWords.map((word: string, i: number) => (
                    <div
                      key={i}
                      onClick={() => {
                        Transforms.select(editor, target);
                        Transforms.insertText(editor, word + " ");
                        setTarget(null);
                      }}
                      className={clsx(
                        "relative select-none py-3 px-4",
                        i === index
                          ? "bg-secondary-text bg-opacity-5"
                          : "text-secondary-text"
                      )}
                    >
                      <div className="flex items-center gap-3 cursor-pointer">
                        {word}
                      </div>
                    </div>
                  ))}
            </div>
          </Portal>
        )}
      {showEmojiPicker && (
        <EmojiPickerPortal>
          <div
            className="fixed inset-0"
            onClick={() => setShowEmojiPicker(false)}
          />
          <div className="absolute top-[100%] -left-[100%] z-[2] w-full mt-[6px]">
            <Picker
              theme="light"
              onEmojiSelect={(emoji: any) => editor.insertText(emoji.native)}
            />
          </div>
        </EmojiPickerPortal>
      )}
    </Slate>
  );
}

const EmojiPickerPortal = ({ children }: any) => {
  const pickerEl =
    typeof document === "object"
      ? document.getElementById("toggle-emoji-picker")
      : null;
  return pickerEl ? createPortal(children, pickerEl) : null;
};

const Portal = ({ children }: any) => {
  return typeof document === "object"
    ? createPortal(children, document.body)
    : null;
};

const serialize = (nodes: Descendant[]) => {
  return nodes
    .filter((n: any) => n?.type !== "image")
    .map((n) => Node.string(n))
    .join("\n");
};

const serializeImages = (nodes: Descendant[]) => {
  return imageNodes(nodes).map((n: any) => n?.url);
};

const imageNodes = (nodes: Descendant[]) =>
  nodes.filter((n: any) => n?.type === "image");

// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.highlight) {
    children = <span className="text-primary">{children}</span>;
  }

  return <span {...attributes}>{children}</span>;
};

const withImages = (editor: any) => {
  const { insertData, isVoid } = editor;

  editor.isVoid = (element: any) => {
    return element.type === "image" ? true : isVoid(element);
  };

  editor.insertData = (data: any) => {
    const { files } = data;

    if (files && files.length > 0) {
      const validGif =
        imageNodes(editor.children).length <= 0 &&
        files.length == 1 &&
        ["gif"].includes(files[0].type.split("/")[1]);

      const validPhotos =
        Object.values(files).every((file: any) =>
          ["png", "jpeg"].includes(file.type.split("/")[1])
        ) && imageNodes(editor.children).length + files.length <= 4;

      if (validGif || validPhotos) {
        for (const file of files) {
          const reader = new FileReader();
          const [mime] = file.type.split("/");

          if (mime === "image") {
            reader.addEventListener("load", () => {
              const url = reader.result;
              insertImage(editor, url);
            });

            reader.readAsDataURL(file);
          }
        }
      } else {
        toast("Please choose either 1 GIF or up to 4 photos.", {
          id: "error-add-photos",
        });
      }
    } else {
      insertData(data);
    }
  };

  return editor;
};

type EmptyText = {
  text: string;
};

type ImageElement = {
  type: "image";
  url: string;
  children: EmptyText[];
};

const insertImage = (editor: any, url: any) => {
  const text = { text: "" };
  const image: ImageElement = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const Element = (props: any) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case "image":
      return <EmptyComponent {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const EmptyComponent = ({ attributes, children, element }: any) => {
  return (
    <div {...attributes} className="hidden">
      {children}
    </div>
  );
};

const initialValue = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];
