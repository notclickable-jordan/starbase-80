import React from "react";
import ReactDOM from "react-dom/client";
import { IndexPage } from "./pages";
import "./tailwind.css";
import { PAGEICON, PAGETITLE } from "./variables";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<IndexPage title={PAGETITLE} icon={PAGEICON} />
	</React.StrictMode>
);
