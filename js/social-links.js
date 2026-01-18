class SocialLinks extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        // By NOT using attachShadow, this component stays in the "Light DOM"
        // and can see all your Tailwind classes and global.css styles.
        this.innerHTML = `
            <div class="fixed-social-links-container py-4 z-50 text-center bg-[#0c0c0c]/90 backdrop-blur-sm flex-shrink-0">
                <h2 class="dm-sans text-xs md:text-sm text-white font-bold mb-2 uppercase tracking-widest">Follow 21 Everywhere</h2>
                <div class="flex justify-center space-x-6 text-xl md:text-2xl">
                    <a href="https://discord.gg/av9bpn6Zhp" target="_blank" aria-label="Discord" class="social-link"><i class="fab fa-discord"></i></a>
                    <a href="https://www.facebook.com/21xhr" target="_blank" aria-label="Facebook" class="social-link"><i class="fab fa-facebook-f"></i></a>
                    <a href="https://www.instagram.com/21xhr_" target="_blank" aria-label="Instagram" class="social-link"><i class="fab fa-instagram"></i></a>
                    <a href="https://www.twitch.tv/21xhr" target="_blank" aria-label="Twitch" class="social-link"><i class="fab fa-twitch"></i></a>
                    <a href="https://x.com/21xhr" target="_blank" aria-label="X" class="social-link"><i class="fab fa-x-twitter"></i></a>
                    <a href="https://www.youtube.com/@21xhr" target="_blank" aria-label="YouTube" class="social-link"><i class="fab fa-youtube"></i></a>
                    <a href="/donation" aria-label="Make a Donation" class="social-link"><i class="fa-solid fa-mug-hot"></i></a>
                </div>
            </div>
        `;
    }
}

customElements.define('social-links', SocialLinks);