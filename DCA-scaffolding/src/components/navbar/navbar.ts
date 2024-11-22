import styles from './navBar.css';
import { navigate } from '../../store/actions';
import { dispatch } from '../../store';
import { Screens } from '../../types/store';

export enum Attribute {
    
}

class NavBar extends HTMLElement {
    

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return Object.values(Attribute);
    }

    attributeChangedCallback(propName: Attribute, oldValue: string | undefined, newValue: string | undefined) {
        
    }

    connectedCallback() {
        this.render();
    
       
    }

    render() {
        if (this.shadowRoot) {
            this.shadowRoot.innerHTML = `
            <section class="container-top">
                <h1>views </h1>
            </section>
            <section class="container-text">
                <label class="nav-label-home">AMINVIEW</label>
                <label class="nav-label-add">USERVIEW</label>
            
            </section>
            `;
    
            // Event listeners
            const homeLabel = this.shadowRoot?.querySelector('.nav-label-home');
            homeLabel?.addEventListener('click', () => {
                
                dispatch(navigate(Screens.ADMINVIEW));
            });
    
            const addProductLabel = this.shadowRoot?.querySelector('.nav-label-add');
            addProductLabel?.addEventListener('click', () => {
               
                dispatch(navigate(Screens.USERVIEW));
            });
    
    
            const cssCard = this.ownerDocument.createElement('style');
            cssCard.innerHTML = styles;
            this.shadowRoot?.appendChild(cssCard);
        }
    }
}    

customElements.define('nab-bar', NavBar);
export default NavBar;