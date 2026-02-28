class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
            <header class="app-header-main">
                <brand-logo></brand-logo>
                <div class="header-status-column"> 
                    <div class="status-indicator-row">
                        <button type="button" id="muteToggle" class="mute-btn">
                            <i id="muteIcon" class="fa-solid fa-volume-high"></i>
                        </button>
                        <span id="streamStatusText" class="roboto stream-status-text">OFFLINE</span>
                        <div id="streamStatusIndicator" class="stream-status-indicator offline"></div>
                    </div>
                    <identity-reminder></identity-reminder>
                </div>
            </header>
        `;
        
        requestAnimationFrame(() => {
            this.dispatchEvent(new CustomEvent('header-ready', { bubbles: true }));
        });
    }
}
customElements.define('site-header', SiteHeader);