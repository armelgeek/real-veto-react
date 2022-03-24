import React from "react";
function Page({ children }) {
  return (
    <section class="content" >
      <div class="container-fluid">{children}</div>
    </section>
  );
}
export default React.memo(Page);