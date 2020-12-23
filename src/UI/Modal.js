export class Modal {
  //using parameter contentId to be able to show different thing in the modal
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById("modal-template");
  }
  show() {
    //to check if the browser used by the user support HTML template
    if ("content" in document.createElement("template")) {
      //deep import of modal content
      const modalElements = document.importNode(
        this.modalTemplateEl.content,
        true
      );
      const modalElement = modalElements.querySelector(".modal");
      const backdropElement = modalElements.querySelector(".backdrop");
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );
      modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement("afterbegin", modalElement);
      document.body.insertAdjacentElement("afterbegin", backdropElement);
    } else {
      //fallback code
      alert(this.fallbackText);
    }
  }

  hide() {}
}
