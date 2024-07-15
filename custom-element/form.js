// Define the custom element
class BookForm extends HTMLElement {
    constructor() {
      super();
  
      // Create a shadow root
      const shadow = this.attachShadow({ mode: 'open' });
  
      // Create a container element
      const container = document.createElement('div');
      container.setAttribute('class', 'book-form-container');
  
      // Define the HTML template
      container.innerHTML = `
      <style>
      section {
  margin-bottom: 2rem;
}

section > div {
  background-color: #f4f2f2;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  border-radius: 0.375rem;
  padding: 1.5rem;
}

section h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}
  
      form {
  display: grid;
  gap: 1rem;
}

form label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
}

form input[type="text"],
form textarea {
  margin-top: 0.25rem;
  width: 100%;
  border: 1px solid #d2d6dc;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 0.5rem;
}

form input[type="checkbox"] {
  height: 1rem;
  width: 1rem;
  color: #3182ce;
  border: 1px solid #d2d6dc;
  border-radius: 0.25rem;
}

form input[type="checkbox"]:focus {
  border-color: #3182ce;
}

form button {
  background-color: #3182ce;
  color: #ffffff;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

form button:hover {
  background-color: #2c5282;
}

#bookFormCancel {
  background-color: #ce3131;
  color: #ffffff;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  border-radius: 0.375rem;
  transition: background-color 0.3s ease;
}

#bookFormCancel:hover {
  background-color: #8e1515;
}

.form-container {
  display: grid;
  gap: 1rem;
}
        </style>
      <section>
        <div>
          <form id="bookForm" data-testid="bookForm">
            <div>
              <label for="bookFormTitle">Judul</label>
              <input id="bookFormTitle" type="text" required data-testid="bookFormTitleInput" />
            </div>
            <div>
              <label for="bookFormAuthor">Penulis</label>
              <textarea name="" id="bookFormAuthor" required rows="5"></textarea>
            </div>
            <div class="button-container">
              <button id="bookFormSubmit" type="submit" data-testid="bookFormSubmitButton">
                Simpan
              </button>
              <button id="bookFormCancel" type="button" data-testid="bookFormCancelButton">
                Batal
              </button>
            </div>
          </form>
        </div>
      </section>
      `;
  
      // Append the container to the shadow DOM
      shadow.appendChild(container);
    }
  }
  
  // Define the custom element tag
  customElements.define('book-form', BookForm);