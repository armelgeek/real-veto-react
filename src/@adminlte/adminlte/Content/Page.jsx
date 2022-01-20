import React from "react";

export default function Page({ children }) {
  return (
    <section class="content" >
      <div class="container-fluid">{children}</div>
    </section>
  );
}
