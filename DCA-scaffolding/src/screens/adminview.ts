import SideBar from "../components/navbar/navbar";
import "../components/navbar/navbar";

import { addObserver, appState } from "../../store";
import { addProducts } from "../../utils/firebase";

class CreationScreen extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
                <h1>Creation Screen</h1>
                <nab-bar></nab-bar>
                <div class="creation-content">
                    <form>
                    <label for="event-title">Event Title</label>
                    <input type="text" id="event-title" name="event-title" required placeholder="What is the name of the event?">
                    <h3>Image</h3>
                    <label for="image">Upload an image for your new event!</label>
                    <input type="file" id="image" name="image" required>
                </div>

                <div id="location-div">
                <label for="location">Location</label>
                <input type="text" id="location" name="location" required placeholder="Where will the event take place?">
            </div>
            <label for="date">Date</label>
            <input type="date" id="date" name="date" required>
            
            <div class="time">
            <label for="time">Time</label>
            <input type="time" id="time" name="time" required>
        </div>
        <div id="participants-div">
                        <label for="participants">Max. Participants</label>
                        <input type="number" id="participants" name="participants" required placeholder="How many people can join?" min="2">
                    </div>
                    
                
                        <button type="submit">Add Product</button>
                    </form>
                </div>
            `;

      // Add event listener for the form submission
      const form = this.shadowRoot?.querySelector("form");
      form?.addEventListener("submit", (event) => {
        event.preventDefault();
        this.handleFormSubmission();
      });

      const css = this.ownerDocument.createElement("style");
      css.innerHTML = Styles;
      this.shadowRoot?.appendChild(css);
    }
  }

  private getFormValues(): VinylComponent {
    const albumNameElement = this.shadowRoot?.getElementById(
      "event-title"
    ) as HTMLInputElement | null;
    const artistNameElement = this.shadowRoot?.getElementById(
      "image"
    ) as HTMLInputElement | null;
    const priceElement = this.shadowRoot?.getElementById(
      "location-div"
    ) as HTMLInputElement | null;
    const stockElement = this.shadowRoot?.getElementById(
      "stock"
    ) as HTMLInputElement | null;
    const imageUrlElement = this.shadowRoot?.getElementById(
      "image-url"
    ) as HTMLInputElement | null;

    return {
      albumName: albumNameElement?.value || "",
      artistName: artistNameElement?.value || "",
      price: priceElement?.value ? parseFloat(priceElement.value) : 0,
      stock: stockElement?.value ? parseInt(stockElement.value) : 0,
      imageUrl: imageUrlElement?.value || "",
    };
  }

  async handleFormSubmission() {
    // Get the form data
    const formValues = this.getFormValues();

    try {
      // Save the product to the database
      await addProducts(formValues);
      console.log("Product added successfully");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  }
}

customElements.define("creation-screen", CreationScreen);
export default CreationScreen;
