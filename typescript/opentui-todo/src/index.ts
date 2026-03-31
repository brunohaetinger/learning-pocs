import {
  ASCIIFont,
  Box,
  createCliRenderer,
  Input,
  InputRenderableEvents,
  Text,
  TextAttributes,
  instantiate,
} from "@opentui/core";
import { appendFileSync } from "fs";


function log(...args: any[]) {
  appendFileSync("debug.log", args.join(" ") + "\n");
}

const renderer = await createCliRenderer({ exitOnCtrlC: true });
const todos: string[] = [];
const titleInput = instantiate(renderer.root.ctx, Input({
  placeholder: "New to-do item title",
  width: 50,
})) as any;

const todosContainer = instantiate(renderer.root.ctx, Box({ flexDirection: "column", alignItems: "flex-start" }));

titleInput.focus();

todosContainer.add(
  Text({ content: "STATIC TEST", attributes: TextAttributes.BOLD })
);


titleInput.on(InputRenderableEvents.ENTER, (value: string) => {
  log('ENTER - value:', JSON.stringify(value), 'children before:', todosContainer.getChildrenCount());
  
  const newText = Text({ content: value || "STATIC TEST", attributes: TextAttributes.BOLD });
  todosContainer.add(newText);
  
  log('children after:', todosContainer.getChildrenCount());
  
  titleInput.value = "";
})




renderer.root.add(
  Box(
    { alignItems: "center", justifyContent: "center", flexGrow: 1 },
    Box(
      { flexDirection: "column" },
      [
        ASCIIFont({ font: "tiny", text: "OpenTUI" }),
        Text({ content: "Items:", attributes: TextAttributes.BOLD }),
        todosContainer,
        Text({ content: "New item:", attributes: TextAttributes.BOLD }),
        titleInput,
      ]
    )
  ),
);
