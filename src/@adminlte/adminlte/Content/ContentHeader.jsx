import React from "react";
import { Link,history } from "react-router-dom";
function ContentHeader({ children, title }) {
  return (
    <div>
      <div class="content-header p-2 shadow-sm bg-white mb-3">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-6">
              <h4 class="mt-2 text-uppercase">{title}</h4>
            </div>
            <div class="col-sm-6">
              <ol class="breadcrumb float-sm-right">
                <li class="breadcrumb-item">
                  <Link to={"/"}>Accueil</Link>
                </li>
                {children}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ContentHeader;
