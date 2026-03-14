// js/identity-reminder.js

class IdentityReminder extends HTMLElement {
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
            <div id="identityReminder" class="u-hidden">
                <div class="identity-flex">
                    <span id="reminderUsername" class="roboto reminder-username"></span>
                    <div id="platformContainer" class="roboto reminder-platform-label">
                        on <span id="reminderPlatform"></span>
                    </div>
                </div>
            </div>
        `;
    }
}
customElements.define('identity-reminder', IdentityReminder);