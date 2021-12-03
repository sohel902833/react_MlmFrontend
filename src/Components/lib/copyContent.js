export const copy = (text) => {
  const body = document.querySelector("body");
  const area = document.createElement("textarea");
  body.appendChild(area);

  area.value = text;
  area.select();
  document.execCommand("copy");
  body.removeChild(area);
  alert("Text Copied");
};
