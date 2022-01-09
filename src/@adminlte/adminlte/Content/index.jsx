import React from "react";
import Footer from "./Footer";

export default function Content({ children }) {
  return (
    <>
      <div
        class="content-wrapper"
        style={{ height: "100vh", maxHeight: "100vh", overflowY: "auto" }}
      >
        {children}
      </div>
    </>
  );
}
