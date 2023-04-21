import React from "react";
import ReactDOM from "react-dom/client";
import { IndexPage } from "./pages";
import "./tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<IndexPage title="HTMLTITLE" icon="LOGO" />
	</React.StrictMode>
);
