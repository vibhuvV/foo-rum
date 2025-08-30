import {
  BoldIcon,
  CodeIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  MessageSquareQuoteIcon,
  Mic,
  Plus,
  SendHorizontal,
  Smile,
  Trash2Icon,
  UnderlineIcon,
  Video,
} from "lucide-react";
import Button from "@/components/Button";
import { useRef, useState, type FC } from "react";
import Card from "@/components/Card";
import Select from "@/components/Select";
import { notImplemented } from "@/lib/utils";

type RichTextEditorProps = {
  onSubmit: (content: string) => void;
  placeholder?: string;
};

const headingOptions = [
  { label: "Paragraph", value: "paragraph" },
  { label: "Heading 1", value: "h1" },
  { label: "Heading 2", value: "h2" },
  { label: "Heading 3", value: "h3" },
];

const RichTextEditor: FC<RichTextEditorProps> = ({ placeholder, onSubmit }) => {
  const [hasContent, setHasContent] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  const [heading, setHeading] = useState("paragraph");

  const executeCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.metaKey) {
      handleSend();
    }
  };

  const handleInput = () => {
    const hasText = editorRef.current?.textContent?.trim() !== "";
    setHasContent(hasText);
  };

  const handleSend = () => {
    if (editorRef.current?.textContent?.trim()) {
      onSubmit(editorRef.current.innerHTML);
      // Clear editor
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
        setHasContent(false);
      }
    }
  };

  const handleClear = () => {
    if (editorRef.current) {
      editorRef.current.innerHTML = "";
      editorRef.current.focus();
      setHasContent(false);
    }
  };

  return (
    <Card
      cardContainerClassName="flex-1 w-full max-w-2xl"
      cardInnerClassName="p-0"
    >
      <div>
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center bg-neutral-100 rounded-lg px-2 py-1">
            <Select
              options={headingOptions}
              value={heading}
              onChange={setHeading}
              placeholder="Choose heading"
            />
            <div className="pl-4 sm:px-4 flex items-center gap-1 sm:border-r">
              <Button
                variant="icon"
                color="transparent"
                onClick={() => executeCommand("bold")}
              >
                <BoldIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="icon"
                color="transparent"
                onClick={() => executeCommand("italic")}
              >
                <ItalicIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="icon"
                color="transparent"
                onClick={() => executeCommand("underline")}
              >
                <UnderlineIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="hidden px-4 sm:flex items-center gap-1 border-r">
              <Button
                variant="icon"
                color="transparent"
                onClick={() => executeCommand("insertUnorderedList")}
              >
                <ListIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="icon"
                color="transparent"
                onClick={() => executeCommand("insertOrderedList")}
              >
                <ListOrderedIcon className="w-4 h-4" />
              </Button>
            </div>
            <div className="hidden pl-4 sm:flex items-center gap-1">
              <Button variant="icon" color="transparent">
                <MessageSquareQuoteIcon className="w-4 h-4" />
              </Button>
              <Button
                variant="icon"
                color="transparent"
                onClick={() => executeCommand("formatBlock", "pre")}
              >
                <CodeIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button
            variant="icon"
            color="danger"
            className="p-3"
            onClick={handleClear}
          >
            <Trash2Icon className="w-4 h-4" />
          </Button>
        </div>
        <div className="relative">
          <div
            ref={editorRef}
            contentEditable
            className="min-h-[130px] p-4 text-sm text-foreground focus:outline-none"
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            data-placeholder="How are you feeling today?"
            style={{
              wordWrap: "break-word",
              whiteSpace: "pre-wrap",
            }}
          />

          {/* Placeholder with emoji */}
          {!hasContent && placeholder && (
            <div className="absolute top-4 left-4 flex items-center gap-2 text-editor-placeholder pointer-events-none">
              {/*TODO: Update props to take the whole placeholder with icon*/}
              <Smile className="h-4 w-4 text-neutral-600" />
              <span className="text-neutral-400 text-sm">{placeholder}</span>
            </div>
          )}
        </div>
        <div className="border-t-1 border-t-neutral-200 p-2 flex justify-between items-center">
          <div className="flex gap-1">
            <Button variant="icon" color="transparent" onClick={notImplemented}>
              <Plus className="w-4 h-4" />
            </Button>
            <Button variant="icon" color="transparent" onClick={notImplemented}>
              <Mic className="w-4 h-4" />
            </Button>
            <Button variant="icon" color="transparent" onClick={notImplemented}>
              <Video className="w-4 h-4" />
            </Button>
          </div>
          <Button variant="icon" color="transparent" onClick={handleSend}>
            <SendHorizontal className="text-indigo-500 w-5 h-5" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default RichTextEditor;
