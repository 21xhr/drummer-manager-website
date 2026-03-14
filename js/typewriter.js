// js/typewriter.js

window.runTypewriter = function ({
    container,
    text,
    onComplete,
    typo = true,
    minDelay = 42,
    maxDelay = 105,
    pauseDelay = 120,
    endPause = 420
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
                    setTimeout(() => type(n), endPause);
                }, 210);
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