import React from "react";
function Page({ children }) {
  return (
    <section className="content  position-relative" >
      <div className="container-fluid">{children}</div>
    </section>
  );
}
export default React.memo(Page);