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
      this.modalElement = modalElements.querySelector(".modal");
      this.backdropElement = modalElements.querySelector(".backdrop");
      const contentElement = document.importNode(
        this.contentTemplateEl.content,
        true
      );
      this.modalElement.appendChild(contentElement);

      document.body.insertAdjacentElement("afterbegin", this.modalElement);
      document.body.insertAdjacentElement("afterbegin", this.backdropElement);
    } else {
      //fallback code
      alert(this.fallbackText);
    }
  }

  hide() {
    if (this.modalElement) {
      document.body.removeChild(this.modalElement);
      document.body.removeChild(this.backdropElement);
      //set to null so garbage collector will clean-up the memory
      this.modalElement = null;
      this.backdropElement = null;
    }
  }
}
