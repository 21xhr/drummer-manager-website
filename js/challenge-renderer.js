// js/challenge-renderer.js
// Single canonical component to render challenge details

window.renderChallengeDetail = function (
    c,
    {
        mode = "explorer",
        isStreamLive = false
    } = {}
) {
    if (!c || typeof c !== "object") {
        console.warn("renderChallengeDetail: invalid challenge object", c);
        return "";
    }
    
    const isPublic = mode === "public";
    const isExplorer = mode === "explorer";
    const isSubmitted = mode === "submitted";
    const isAdmin = mode === "admin";


    const proposerName =
        c.proposer?.accounts?.[0]?.username ||
        c.proposer?.username ||
        c.proposerUsernameSnapshot ||
        "Unknown";

    const proposerPlatform =
        c.proposerPlatformNameSnapshot || "";

    const submittedAt = c.timestampSubmitted
        ? new Date(c.timestampSubmitted).toLocaleString()
        : "Unknown";
    
    const status = String(c.status || "UNKNOWN").toUpperCase(); // Defensive in case of unexpected status values

    const lastActivityAt = c.timestampLastActivityAt
        ? new Date(c.timestampLastActivityAt).toLocaleString()
        : "Unknown";

    const cadencePeriodStart = c.cadencePeriodStart
        ? new Date(c.cadencePeriodStart).toLocaleString()
        : "Not started";

    const challengeText =
        (c.challengeText && typeof c.challengeText === "object")
            ? c.challengeText
            : {};

    const constraints = Array.isArray(challengeText.constraints)
        ? challengeText.constraints
        : [];

    const references = Array.isArray(challengeText.references)
        ? challengeText.references
        : [];

    const lifecycleBlock = `
        ${c.isExecuting ? `
            <div class="challenge-detail-field">
                <label>Executing</label>
                <span>YES</span>
            </div>
        ` : ""}

        ${c.status === "FAILED" ? `
            <div class="challenge-detail-field challenge-failure-field">
                <label>Failure Reason</label>
                <span class="failure-reason-val">${c.failureReason || "NONE PROVIDED"}</span>
            </div>
        ` : ""}
    `;

    const recurringBlock = c.durationType === "RECURRING" ? `
        <div class="challenge-data-grid">
            <div class="challenge-detail-field"><label>Cadence</label><span>${c.sessionCadenceText || "N/A"}</span></div>
            <div class="challenge-detail-field"><label>Cadence Unit</label><span>${c.cadenceUnit || "N/A"}</span></div>
            <div class="challenge-detail-field"><label>Cadence Progress</label><span>${c.cadenceProgressCounter ?? 0} / ${c.cadenceRequiredCount ?? 0}</span></div>
            <div class="challenge-detail-field"><label>Cadence Period Start</label><span>${cadencePeriodStart}</span></div>
        </div>
    ` : "";

    const historyBlock = `
        ${(c.hasBeenAuctioned || c.numbersRaised || c.auctionCost) ? `
            <div class="challenge-data-grid">
                <div class="challenge-detail-field"><label>Has Been Auctioned</label><span>${c.hasBeenAuctioned ? "YES" : "NO"}</span></div>
                ${c.numbersRaised ? `<div class="challenge-detail-field"><label>Numbers Raised</label><span>${c.numbersRaised}</span></div>` : ""}
                ${c.auctionCost ? `<div class="challenge-detail-field"><label>Auction Cost</label><span>${c.auctionCost}</span></div>` : ""}
            </div>
        ` : ""}

        ${c.hasBeenDiggedOut ? `
            <div class="challenge-detail-field">
                <label>Has Been Dug Out</label>
                <span>YES</span>
            </div>
        ` : ""}
    `;

    const challengeTextBlock = `
        <div class="challenge-detail-text roboto">

            <strong>GOAL:</strong><br>
            ${challengeText.goal || "N/A"}
            <br><br>

            <strong>INSTRUCTIONS:</strong><br>
            ${challengeText.instructions || "N/A"}
            <br><br>

            ${constraints.length ? `
                <strong>CONSTRAINTS:</strong>
                <ul>
                    ${constraints.map(x => `<li>${x}</li>`).join("")}
                </ul>
                <br>
            ` : ""}

            ${references.length ? `
                <strong>REFERENCES:</strong>
                <ul>
                    ${references.map(ref => `
                        <li>
                            [${ref?.type || "LINK"}] ${ref?.title || "Untitled"}
                            ${ref?.url ? `<br><small>${ref.url}</small>` : ""}
                            ${ref?.note ? `<br><small>${ref.note}</small>` : ""}
                        </li>
                    `).join("")}
                </ul>
            ` : ""}

        </div>
    `;

    const shareRow = `
        <div class="share-block">

            <label class="roboto share-label">SHARE THIS CHALLENGE</label>

            <div class="share-row">
                <a id="shareChallengeXBtn" class="share-btn challenge-share-btn" target="_blank">
                    <i class="fa-brands fa-x-twitter"></i>
                </a>

                <a id="shareChallengeFacebookBtn" class="share-btn challenge-share-btn" target="_blank">
                    <i class="fa-brands fa-facebook-f"></i>
                </a>

                <button id="copyChallengeLinkBtn" class="share-btn challenge-share-btn">
                    <i class="fa-solid fa-link"></i>
                </button>
            </div>

        </div>
    `;

    const contextualCTA = `
        <a
            href="${isStreamLive ? "https://youtube.com/@21xhr/live" : "https://discord.gg/yourlink"}"
            target="_blank"
            class="primary-submit-btn challenge-share-context-btn ${isStreamLive ? "btn-stream" : "btn-discord"}"
        >
            ${isStreamLive
                ? '<i class="fa-solid fa-play"></i> WATCH STREAM'
                : '<i class="fa-brands fa-discord"></i> JOIN DISCORD'}
        </a>
    `;

    return `

        <div class="challenge-detail-header">
            <h3 class="neon-text challenge-detail-title">DETAILS</h3>
            <div class="challenge-detail-meta roboto">
                ID: ${c.challengeId} | Submitted: ${submittedAt}
            </div>
        </div>

        <div class="challenge-data-grid">

            <div class="challenge-detail-field">
                <label>Status</label>
                <div class="status-badge-wrapper">
                    <span class="status-badge status-${status.toLowerCase()}">
                        ${status}
                    </span>
                </div>
            </div>

            <div class="challenge-detail-field">
                <label>Proposer</label>
                <span>${proposerName}${proposerPlatform ? ` @ ${proposerPlatform}` : ""}</span>
            </div>

            <div class="challenge-detail-field">
                <label>Submitted</label>
                <span>${submittedAt}</span>
            </div>

            <div class="challenge-detail-field">
                <label>Last Activity</label>
                <span>${lastActivityAt}</span>
            </div>

            <div class="challenge-detail-field">
                <label>Stream Days Active</label>
                <span>${c.streamDaysSinceActivation ?? 0}</span>
            </div>

            <div class="challenge-detail-field">
                <label>Duration Type</label>
                <span>${c.durationType || "N/A"}</span>
            </div>

        </div>

        ${recurringBlock}
        ${lifecycleBlock}
        ${historyBlock}
        ${challengeTextBlock}

        ${
            (isPublic || isExplorer || isAdmin)
                ? `
                    <div class="challenge-share-section">
                        ${shareRow}
                        ${contextualCTA}
                    </div>
                `
                : ""
        }

    `;
};