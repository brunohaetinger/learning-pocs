import {
  ASCIIFont,
  Box,
  createCliRenderer,
  Input,
  InputRenderableEvents,
  Text,
  TextAttributes,
} from "@opentui/core";

const renderer = await createCliRenderer({ exitOnCtrlC: true });
const todos: string[] = [];
const titleInput = Input({
  placeholder: "New to-do item title",
  width: 50,
});

const todosContainer = Box({ flexDirection: "column" });

titleInput.focus();

const renderTodos = () => {
  todosContainer.forEach(node => {
    todosContainer.remove(node.id);
  });

  const todoNodes = todos.map(t => (Text({ content: t, attributes: TextAttributes.DIM })))

  todoNodes.forEach(node => todosContainer.add(node));
}

titleInput.on(InputRenderableEvents.ENTER, (value: string) => {
  todos.push(value);
  titleInput.value = "";
  renderTodos();
})




renderer.root.add(
  Box(
    { alignItems: "center", justifyContent: "center", flexGrow: 1 },
    Box(
      { justifyContent: "center", alignItems: "flex-end" },
      ASCIIFont({ font: "tiny", text: "OpenTUI" }),
      Text({ content: "Items:", attributes: TextAttributes.BOLD }),
      todosContainer,
      Text({ content: "New item:", attributes: TextAttributes.BOLD }),
      titleInput,
    ),
  ),
);
