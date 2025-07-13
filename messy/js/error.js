const errorHtml = `<div class="error">
                        <p>
                        sorry for the inconvenience, We´re working with the issue, please try again later. 
                        </p>
                     </div>`;

export function error() {
  const errorContainer = document.createElement("div");
  errorContainer.innerHTML = errorHtml;

  const main = document.querySelector("main");
  main.appendChild(errorContainer);
}
