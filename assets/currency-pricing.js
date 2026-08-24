(function () {
    "use strict";

    const STORAGE_KEY = "kyntloBillingPlan";

    /* Monthly list price per package. Quarterly is billed as 3 x monthly,
       with a 50% launch promotion applied to the first quarter. */
    const packages = {
        starter: { name: "Starter", monthly: 90, description: "Launch CRM, booking, and lead capture." },
        growth: { name: "Growth", monthly: 270, description: "Automate follow-up and convert more bookings." },
        pro: { name: "Pro", monthly: 490, description: "AI, reviews, analytics, and reactivation in one growth system." }
    };

    const QUARTER_DISCOUNT = 0.5;

    const billingPlans = {
        monthly: { label: "Monthly", note: "Full flexibility" },
        quarterly: { label: "Quarterly", note: "Save 50%", limited: true }
    };

    function money(amount) {
        return "$" + Math.round(amount).toLocaleString("en-US");
    }

    function activeBilling() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved && billingPlans[saved]) return saved;
        } catch (error) {
            return "quarterly";
        }
        return "quarterly";
    }

    function checkoutHref(packageKey, billingKey) {
        return "checkout.html?package=" + encodeURIComponent(packageKey) + "&billing=" + encodeURIComponent(billingKey);
    }

    function getPackageKey(card) {
        if (card.dataset.package === "custom") return "";
        if (card.dataset.package) return card.dataset.package;
        const planName = card.querySelector(".plan-name");
        const key = planName ? planName.textContent.trim().toLowerCase() : "";
        if (packages[key]) {
            card.dataset.package = key;
            return key;
        }
        return "";
    }

    function priceMarkup(plan, billingKey) {
        if (billingKey === "quarterly") {
            const perMonth = plan.monthly * (1 - QUARTER_DISCOUNT);
            return '' +
                '<span class="price-lockup">' +
                    '<span class="price-was" aria-label="Original price">' + money(plan.monthly) + '</span>' +
                    '<span class="price-now">' + money(perMonth) + '</span>' +
                    '<span class="price-per">/mo</span>' +
                '</span>' +
                '<span class="price-meta">' +
                    '<span class="price-save">Save 50%</span>' +
                    '<span class="price-tax">Plus taxes</span>' +
                '</span>';
        }
        return '' +
            '<span class="price-lockup">' +
                '<span class="price-now">' + money(plan.monthly) + '</span>' +
                '<span class="price-per">/mo</span>' +
            '</span>' +
            '<span class="price-meta">' +
                '<span class="price-tax">Plus taxes</span>' +
            '</span>';
    }

    function renderCardPrices(billingKey) {
        document.querySelectorAll(".pricing-card").forEach((card) => {
            const key = getPackageKey(card);
            const plan = packages[key];
            if (!plan) return;

            const price = card.querySelector(".pricing-price");
            const description = card.querySelector(".plan-desc");
            const button = card.querySelector(".package-button");
            const legacyTax = card.querySelector(".tax-label");

            if (legacyTax) legacyTax.remove();
            if (price) price.innerHTML = priceMarkup(plan, billingKey);

            if (description) {
                description.textContent = billingKey === "quarterly"
                    ? "50% off your first 3 months (" + money(plan.monthly * 3 * (1 - QUARTER_DISCOUNT)) + " billed once), then " + money(plan.monthly) + "/mo."
                    : plan.description;
            }
            if (button) {
                button.href = checkoutHref(key, billingKey);
                button.setAttribute("aria-label", "Start your 14-day trial - " + plan.name + " " + billingPlans[billingKey].label);
            }
        });
    }

    function renderBillingTabs() {
        const grids = document.querySelectorAll(".pricing-section-container .pricing-grid, #pricing .pricing-grid");
        const seen = new Set();
        grids.forEach((grid) => {
            if (seen.has(grid)) return;
            seen.add(grid);
            if (grid.previousElementSibling && grid.previousElementSibling.classList.contains("billing-switch-shell")) return;

            const shell = document.createElement("div");
            shell.className = "billing-switch-shell";
            shell.innerHTML =
                '<p class="billing-offer">' +
                    '<span class="billing-offer__dot" aria-hidden="true"></span>' +
                    '<span class="billing-offer__label">Limited-time launch offer</span>' +
                    '<span class="billing-offer__sep" aria-hidden="true"></span>' +
                    '<span class="billing-offer__value">50% off your first 3 months</span>' +
                '</p>' +
                '<div class="billing-switch" role="tablist" aria-label="Choose billing plan">' +
                    '<span class="billing-switch__thumb" aria-hidden="true"></span>' +
                    Object.entries(billingPlans).map(([key, plan]) =>
                        '<button type="button" class="billing-tab" data-billing="' + key + '" role="tab">' +
                            "<span>" + plan.label + "</span>" +
                            '<small class="' + (key === "quarterly" ? "is-deal" : "") + '">' + plan.note + "</small>" +
                        "</button>"
                    ).join("") +
                "</div>" +
                '<p class="billing-switch__hint" aria-live="polite"></p>';
            grid.parentNode.insertBefore(shell, grid);
        });
    }

    function updateBillingTabs(billingKey) {
        document.querySelectorAll(".billing-tab").forEach((tab) => {
            const active = tab.dataset.billing === billingKey;
            tab.classList.toggle("is-active", active);
            tab.setAttribute("aria-selected", String(active));
        });
        document.querySelectorAll(".billing-switch").forEach((sw) => {
            sw.classList.toggle("is-quarterly", billingKey === "quarterly");
        });
        document.querySelectorAll(".billing-switch__hint").forEach((hint) => {
            hint.innerHTML = billingKey === "quarterly"
                ? 'Billed once per quarter. After the first 3 months, plans renew at the original monthly price plus taxes.'
                : 'Standard month-to-month billing, plus taxes. Switch to <b>Quarterly</b> to save 50% on your first 3 months.';
        });
    }

    function setBilling(billingKey) {
        const key = billingPlans[billingKey] ? billingKey : "quarterly";
        try {
            localStorage.setItem(STORAGE_KEY, key);
        } catch (error) {
            // preference is optional
        }
        renderCardPrices(key);
        updateBillingTabs(key);
    }

    function bindBillingTabs() {
        document.addEventListener("click", function (event) {
            const tab = event.target.closest(".billing-tab");
            if (!tab) return;
            setBilling(tab.dataset.billing);
        });
    }

    function injectStyles() {
        if (document.getElementById("currency-pricing-styles")) return;
        const style = document.createElement("style");
        style.id = "currency-pricing-styles";
        style.textContent = [
            ".billing-switch-shell{display:flex;flex-direction:column;align-items:center;gap:14px;margin:0 auto 38px;padding:0 20px;}",
            ".billing-switch{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:6px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.04);backdrop-filter:blur(12px);box-shadow:0 18px 50px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.05);}",
            ".billing-switch__thumb{position:absolute;top:6px;bottom:6px;left:6px;width:calc(50% - 9px);border-radius:999px;background:linear-gradient(135deg,#f20089,#6d00c1);box-shadow:0 10px 26px rgba(242,0,137,.4);transition:transform .34s cubic-bezier(.34,1.3,.5,1);}",
            ".billing-switch.is-quarterly .billing-switch__thumb{transform:translateX(calc(100% + 6px));}",
            ".billing-tab{position:relative;z-index:1;min-width:170px;min-height:58px;padding:8px 26px;border:0;border-radius:999px;background:transparent;color:#a49fb8;font:inherit;cursor:pointer;transition:color .25s ease;}",
            ".billing-tab span{display:block;font-weight:850;font-size:1rem;line-height:1.2;}",
            ".billing-tab small{display:block;margin-top:2px;font-size:.68rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;opacity:.85;}",
            ".billing-tab small.is-deal{color:#35e0a1;}",
            ".billing-offer{display:inline-flex;align-items:center;gap:11px;margin:0;padding:8px 18px;border-radius:999px;border:1px solid rgba(255,255,255,.12);background:linear-gradient(135deg,rgba(242,0,137,.12),rgba(109,0,193,.1));backdrop-filter:blur(10px);font-size:.78rem;line-height:1;white-space:nowrap;}",
            ".billing-offer__dot{position:relative;width:7px;height:7px;border-radius:50%;background:#35e0a1;flex-shrink:0;}",
            ".billing-offer__dot::after{content:'';position:absolute;inset:0;border-radius:50%;background:inherit;animation:offerPulse 2.4s ease-out infinite;}",
            "@keyframes offerPulse{0%{opacity:.7;transform:scale(1);}70%{opacity:0;transform:scale(3.2);}100%{opacity:0;transform:scale(3.2);}}",
            ".billing-offer__label{font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#fff;font-size:.68rem;}",
            ".billing-offer__sep{width:1px;height:12px;background:rgba(255,255,255,.2);}",
            ".billing-offer__value{font-weight:650;color:#e9c9f5;}",
            "@media (max-width:520px){.billing-offer{flex-wrap:wrap;justify-content:center;white-space:normal;text-align:center;gap:8px;padding:10px 16px;}.billing-offer__sep{display:none;}}",
            "@media (prefers-reduced-motion: reduce){.billing-offer__dot::after{animation:none;}}",
            ".billing-tab.is-active{color:#fff;}",
            ".billing-tab.is-active small.is-deal{color:#b7ffe3;}",
            ".billing-switch__hint{max-width:600px;margin:0;text-align:center;font-size:.9rem;line-height:1.65;color:#a49fb8;}",
            ".billing-switch__hint b{color:#ff1aa3;font-weight:750;}",
            /* ---- price lockup: big number, subtle meta ---- */
            ".pricing-price{display:flex;flex-direction:column;align-items:center;gap:8px;}",
            ".pricing-price .price-lockup{display:flex;align-items:baseline;justify-content:center;gap:10px;flex-wrap:nowrap;}",
            ".pricing-price .price-now{font-size:clamp(2.9rem,3.6vw,3.7rem);font-weight:800;letter-spacing:-.05em;line-height:1;color:#14141c;}",
            ".pricing-price .price-per{font-size:1.05rem;font-weight:700;color:#8b8698;letter-spacing:0;}",
            ".pricing-price .price-was{position:relative;font-size:1.35rem;font-weight:700;color:#a8a3b5;opacity:.85;}",
            ".pricing-price .price-was::after{content:'';position:absolute;left:-6%;top:52%;width:112%;height:2.5px;border-radius:2px;background:linear-gradient(90deg,#f20089,#ff1aa3);transform:rotate(-9deg);}",
            ".pricing-price .price-meta{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;}",
            ".pricing-price .price-save{padding:4px 11px;border-radius:999px;background:rgba(16,163,110,.12);border:1px solid rgba(16,163,110,.42);color:#0d8f60;font-size:.66rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase;}",
            ".pricing-price .price-tax{font-size:.66rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#9a95a8;}",
            /* dark (Customized) card variant */
            ".pricing-card.custom .pricing-price .price-now{color:#fff;}",
            ".pricing-card.custom .pricing-price .price-tax{color:#a49fb8;}",
            "@media (max-width:720px){.billing-tab{min-width:0;}.billing-switch{width:100%;max-width:420px;}.pricing-price .price-now{font-size:2.9rem;}}"
        ].join("\n");
        document.head.appendChild(style);
    }

    function init() {
        if (!document.querySelector(".pricing-grid")) return;
        injectStyles();
        renderBillingTabs();
        bindBillingTabs();
        setBilling(activeBilling());
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
