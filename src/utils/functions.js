export const getParameterByName = (name, url) => {
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};
export function omit(key, obj) {
  const { [key]: omitted, ...rest } = obj;
  return rest;
}

/* eslint-disable no-nested-ternary */
export const displayDate = (timestamp) => {
  const date = new Date(timestamp);

  const monthNames = [
    "Janvier",
    "Fevrier",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Decembre",
  ];

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  // return day + ' ' + monthNames[monthIndex] + ' ' + year;
  return ` ${day} ${monthNames[monthIndex]} ${year}`;
};

export const displayMoney = (n) => {
  const format = new Intl.NumberFormat("fr-MG", {
    style: "currency",
    currency: "MGA",
  });

  // or use toLocaleString()
  return format.format(n);
};

export const calculateTotal = (arr) => {
  if (!arr || arr?.length === 0) return 0;

  const total = arr.reduce((acc, val) => acc + val, 0);

  return total;
};

export const displayActionMessage = (msg, status = "info") => {
  const div = document.createElement("div");
  const span = document.createElement("span");

  div.className = `toast ${
    status === "info"
      ? "toast-info"
      : status === "success"
      ? "toast-success"
      : "toast-error"
    // eslint-disable-next-line indent
  }`;
  span.className = "toast-msg";
  span.textContent = msg;
  div.appendChild(span);

  if (document.querySelector(".toast")) {
    document.body.removeChild(document.querySelector(".toast"));
    document.body.appendChild(div);
  } else {
    document.body.appendChild(div);
  }

  setTimeout(() => {
    try {
      document.body.removeChild(div);
    } catch (e) {
      console.log(e);
    }
  }, 3000);
};

function strOp(str) {
  return str.toString().replace(/\s/g, "").toLowerCase();
}

export const checkHasExistText = (text, textCheck) => {
  if (strOp(text).includes(strOp(textCheck))) {
    return true;
  }
};
export const displayShortMonth = (timestamp) => {
  const date = new Date(timestamp);

  const monthNames = [
    "Jan.",
    "Févr.",
    "Mars",
    "Avr.",
    "Mai",
    "Juin.",
    "Juill.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov",
    "Déc.",
  ];

  const monthIndex = date.getMonth();
  return `${monthNames[monthIndex]}`;
};
