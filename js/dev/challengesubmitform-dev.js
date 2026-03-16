// js/dev/challengesubmitform-dev.js

console.log("DEV tools loaded: challengesubmitform-dev.js");

window.mockChallenge = {
    challengeId: 999,
    status: "ACTIVE",
    proposerUsernameSnapshot: "MockUser",
    proposerPlatformNameSnapshot: "DISCORD",
    timestampSubmitted: new Date().toISOString(),
    timestampLastActivityAt: new Date().toISOString(),
    streamDaysSinceActivation: 3,
    durationType: "RECURRING",
    sessionCadenceText: "2 sessions per week for 3 weeks",
    cadenceUnit: "WEEKLY",
    cadenceProgressCounter: 1,
    cadenceRequiredCount: 6,
    cadencePeriodStart: new Date().toISOString(),
    challengeText: {
        goal: "Learn a new groove and make it performance-ready.",
        instructions: "Practice slowly first, then record a clean take.",
        constraints: ["Use a metronome", "No tempo drift"],
        references: [
            {
                type: "VIDEO",
                title: "Practice reference",
                url: "https://youtube.com/watch?v=demo",
                note: "Focus on sticking"
            }
        ]
    }
};

window.devOpenSubmitSuccess = function () {
    const step1 = document.getElementById("step1");
    const step2 = document.getElementById("step2");
    const step3 = document.getElementById("step3");
    const summaryDetailsWrapper = document.getElementById("summaryDetailsWrapper");

    if (step1) step1.classList.add("u-hidden");
    if (step2) step2.classList.add("u-hidden");
    if (step3) step3.classList.remove("u-hidden");

    if (summaryDetailsWrapper && window.renderChallengeDetail) {
        summaryDetailsWrapper.innerHTML = window.renderChallengeDetail(window.mockChallenge, {
            mode: "submitted"
        });
    }
};