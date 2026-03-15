// js/challenge-share.js

window.getPublicChallengeUrl = function (challengeId) {
    return `${window.location.origin}/challenges/${challengeId}`;
};

window.initializeChallengeShare = function ({
    id,
    url,
    shareText = `🥁 Check out Challenge #${id} in Drummer Manager`
}) {
    const xBtn = document.getElementById('shareChallengeXBtn');
    const facebookBtn = document.getElementById('shareChallengeFacebookBtn');
    const copyBtn = document.getElementById('copyChallengeLinkBtn');

    const encodedUrl = encodeURIComponent(url);
    const encodedText = encodeURIComponent(shareText);

    if (xBtn) {
        xBtn.href = `https://x.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

        if (xBtn.dataset.initialized !== 'true') {
            xBtn.addEventListener('click', () => {
                showShareBadge(xBtn, 'LFG...', 'var(--primary-neon)');
            });
            xBtn.dataset.initialized = 'true';
        }
    }

    if (facebookBtn) {
        facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        facebookBtn.target = '_blank';
        facebookBtn.rel = 'noopener noreferrer';

        if (facebookBtn.dataset.initialized !== 'true') {
            facebookBtn.addEventListener('click', () => {
                showShareBadge(facebookBtn, 'LFG...', 'var(--primary-neon)');
            });
            facebookBtn.dataset.initialized = 'true';
        }
    }

    if (copyBtn) {
        copyBtn.dataset.copyUrl = url;

        if (copyBtn.dataset.initialized !== 'true') {
            copyBtn.addEventListener('click', async function (e) {
                e.preventDefault();
                e.stopPropagation();

                const textToCopy = this.dataset.copyUrl || window.location.href;

                try {
                    if (navigator.clipboard && window.isSecureContext) {
                        await navigator.clipboard.writeText(textToCopy);
                    } else {
                        const textArea = document.createElement('textarea');
                        textArea.value = textToCopy;
                        textArea.style.position = 'fixed';
                        textArea.style.left = '-9999px';
                        textArea.style.top = '0';
                        document.body.appendChild(textArea);
                        textArea.focus();
                        textArea.select();
                        document.execCommand('copy');
                        document.body.removeChild(textArea);
                    }

                    this.classList.add('copied');
                    showShareBadge(this, 'Copied!');

                    setTimeout(() => {
                        this.classList.remove('copied');
                    }, 2100);

                } catch (err) {
                    console.error('Copy failed', err);
                }
            });

            copyBtn.dataset.initialized = 'true';
        }
    }
};

function showShareBadge(target, text, background = 'var(--success-green)') {
    const existingBadge = target.querySelector('.copy-badge');
    if (existingBadge) existingBadge.remove();

    const badge = document.createElement('div');
    badge.className = 'copy-badge roboto';
    badge.innerText = text;
    badge.style.background = background;

    target.appendChild(badge);

    setTimeout(() => {
        if (badge.parentNode) badge.remove();
    }, 2100);
}