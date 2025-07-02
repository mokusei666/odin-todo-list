import "./styles.css";
import { render } from "./render"
import { events } from "./events"

render.renderSidebar();

render.renderTodo(0);

events.projectForm();