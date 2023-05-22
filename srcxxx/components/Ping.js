import React, { useEffect, useState } from "react";
import { useNavigatorOnline } from '@oieduardorabelo/use-navigator-online';
import axios from "axios";
import api, { defaults } from "../utils/api";
const date = new Date();

function Ping() {
  let { isOnline, isOffline } = useNavigatorOnline();
  return (
     <div>
      {isOnline && <span>We are online!</span>}
      {isOffline && <span>We are offline!</span>}
    </div>
  );
}
export default Ping;
