class SocialLinks extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="fixed-social-links-container">
                <h2>FOLLOW 21 EVERYWHERE</h2>
                <div class="social-link-wrapper">
                    <a href="https://discord.gg/av9bpn6Zhp" target="_blank" class="social-link"><i class="fab fa-discord"></i></a>
                    <a href="https://www.facebook.com/21xhr" target="_blank" class="social-link"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/21xhr_" target="_blank" class="social-link"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.twitch.tv/21xhr" target="_blank" class="social-link"><i class="fab fa-twitch"></i></a>
                    <a href="https://x.com/21xhr" target="_blank" class="social-link"><i class="fab fa-x-twitter"></i></a>
                    <a href="https://www.youtube.com/@21xhr" target="_blank" class="social-link"><i class="fab fa-youtube"></i></a>
                    <a href="/donation" class="social-link"><i class="fa-solid fa-mug-hot"></i></a>
                </div>
            </div>
        `;
    }
}

customElements.define('social-links', SocialLinks);