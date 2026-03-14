// js/typewriter.js

const FAST_MODE = window.APP_CONFIG?.FAST_VERIFICATION === true;

window.runTypewriter = function ({
    container,
    text,
    onComplete,
    typo = true,
    minDelay = FAST_MODE ? 1 : 42,
    maxDelay = FAST_MODE ? 6 : 105,
    pauseDelay = FAST_MODE ? 5 : 120,
    endPause = FAST_MODE ? 10 : 420
}) {
    if (!container) return;

    container.innerHTML = `<div class="typewriter-container"><div class="typewriter-target"></div></div>`;
    const target = container.querySelector('.typewriter-target');
    if (!target) return;

    const type = (n = 0) => {
        if (n < text.length) {
            const typoIndex = text.indexOf('@') - 1;
            const hasTypoOccurred = target.getAttribute('data-typo') === 'true';

            let delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
            if (text.charAt(n) === ' ' || text.charAt(n) === ':') delay += pauseDelay;

            if (typo && n === typoIndex && !hasTypoOccurred) {
                target.innerHTML = text.substring(0, n) + 'q';
                target.setAttribute('data-typo', 'true');

                setTimeout(() => {
                    target.innerHTML = text.substring(0, n);
                    setTimeout(() => type(n), FAST_MODE ? 10 : endPause);
                }, FAST_MODE ? 10 : 210);
                return;
            }

            target.innerHTML = text.substring(0, n + 1);
            setTimeout(() => type(n + 1), delay);
        } else if (onComplete) {
            setTimeout(onComplete, endPause);
        }
    };

    type();
};