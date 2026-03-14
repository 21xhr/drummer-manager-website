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
    const config = window.APP_CONFIG || {};
    const isFast = config.FAST_VERIFICATION === true;
    const isDebug = config.TYPEWRITER_DEBUG === true;

    if (!container) {
        if (isDebug) console.warn('[typewriter] missing container');
        return;
    }

    if (isDebug) {
        console.log('[typewriter] start', {
            text,
            typo,
            isFast,
            container
        });
    }

    if (isFast) {
        container.innerHTML = `<div class="typewriter-container"><div class="typewriter-target"></div></div>`;
        const target = container.querySelector('.typewriter-target');

        if (!target) {
            if (isDebug) console.warn('[typewriter] target creation failed in fast mode');
            return;
        }

        target.textContent = text;

        if (isDebug) console.log('[typewriter] fast mode complete');

        if (onComplete) onComplete();
        return;
    }

    container.innerHTML = `<div class="typewriter-container"><div class="typewriter-target"></div></div>`;
    const target = container.querySelector('.typewriter-target');

    if (!target) {
        if (isDebug) console.warn('[typewriter] target creation failed');
        return;
    }

    const type = (n = 0) => {
        if (n < text.length) {
            const typoIndex = text.indexOf('@') - 1;
            const hasTypoOccurred = target.getAttribute('data-typo') === 'true';

            let delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
            if (text.charAt(n) === ' ' || text.charAt(n) === ':') delay += pauseDelay;

            if (typo && n === typoIndex && !hasTypoOccurred) {
                if (isDebug) console.log('[typewriter] typo injected at index', n);

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
        } else {
            if (isDebug) console.log('[typewriter] complete');

            if (onComplete) {
                setTimeout(onComplete, endPause);
            }
        }
    };

    type();
};