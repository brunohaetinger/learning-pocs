type EventName = "click" | "hover";

type Handler = `on${Capitalize<EventName>}`;

// "onClick" | "onHover"
