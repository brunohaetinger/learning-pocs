import {
  ASCIIFont,
  Box,
  createCliRenderer,
  Input,
  Text,
  TextAttributes,
} from "@opentui/core";

const renderer = await createCliRenderer({ exitOnCtrlC: true });

const titleInput = Input({
  placeholder: "New to-do item title",
  width: 50,
});

titleInput.focus();

renderer.root.add(
  Box(
    { alignItems: "center", justifyContent: "center", flexGrow: 1 },
    Box(
      { justifyContent: "center", alignItems: "flex-end" },
      ASCIIFont({ font: "tiny", text: "OpenTUI" }),
      Text({ content: "New item:", attributes: TextAttributes.DIM }),
      titleInput,
    ),
  ),
);
