import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { IndexPage } from "./pages";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<IndexPage title="Starbase 80" />
	</React.StrictMode>
);
