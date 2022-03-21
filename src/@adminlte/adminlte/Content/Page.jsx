import React from "react";
import reactFastCompare from 'react-fast-compare';
function Page({ children }) {
  return (
    <section class="content" >
      <div class="container-fluid">{children}</div>
    </section>
  );
}
export default React.memo(Page,reactFastCompare);