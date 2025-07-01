export function createElement(name, className, textContent) {
  const element = document.createElement(name);
  if (className) {
    element.classList.add(className);
  };
  if (textContent) {
    element.textContent = textContent;
  };
  return element;
};