// js/brand-logo.js

class BrandLogo extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        // We use the classes we just defined in the CSS
        this.innerHTML = `
            <div class="brand-group">
                <div class="brand-title neon-text">DRUMMER</div>
                <div class="brand-subtitle roboto">MANAGER</div>
            </div>
        `;
    }
}

customElements.define('brand-logo', BrandLogo);