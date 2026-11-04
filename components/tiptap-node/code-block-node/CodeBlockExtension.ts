import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { common, createLowlight } from "lowlight";

import CodeBlockNode from "./CodeBlockNode";

const lowlight = createLowlight(common);

const CodeBlockExtension = CodeBlockLowlight.extend({
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNode);
  },
}).configure({
  lowlight,
  defaultLanguage: null,
});

export default CodeBlockExtension;