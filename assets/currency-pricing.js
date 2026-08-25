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
                '<div class="billing-offer" data-offer-state="applied">' +
                    '<span class="billing-offer__shine" aria-hidden="true"></span>' +
                    '<span class="billing-offer__seal"><b>50%</b><em>off</em></span>' +
                    '<span class="billing-offer__copy">' +
                        '<span class="billing-offer__eyebrow">' +
                            '<span class="billing-offer__dot" aria-hidden="true"></span>Limited-time launch offer' +
                        '</span>' +
                        '<span class="billing-offer__line">Your first <b>3 months</b> on the <b>Quarterly</b> plan</span>' +
                    '</span>' +
                    '<button type="button" class="billing-offer__action" data-apply-billing="quarterly"></button>' +
                '</div>' +
                '<div class="billing-switch" role="radiogroup" aria-label="Choose billing plan">' +
                    '<span class="billing-switch__thumb" aria-hidden="true"></span>' +
                    Object.entries(billingPlans).map(([key, plan]) =>
                        '<button type="button" class="billing-tab" data-billing="' + key + '" role="radio">' +
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
            tab.setAttribute("aria-checked", String(active));
        });
        document.querySelectorAll(".billing-switch").forEach((sw) => {
            sw.classList.toggle("is-quarterly", billingKey === "quarterly");
        });
        const applied = billingKey === "quarterly";
        document.querySelectorAll(".billing-offer").forEach((offer) => {
            offer.dataset.offerState = applied ? "applied" : "available";
            const action = offer.querySelector(".billing-offer__action");
            if (!action) return;
            action.innerHTML = applied
                ? '<span class="billing-offer__tick" aria-hidden="true"></span>Applied'
                : "Apply offer";
            action.disabled = applied;
            action.setAttribute("aria-label", applied
                ? "Launch offer applied to your quarterly plan"
                : "Apply the launch offer by switching to quarterly billing");
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
            const tab = event.target.closest(".billing-tab, [data-apply-billing]");
            if (!tab) return;
            setBilling(tab.dataset.billing || tab.dataset.applyBilling);
        });
    }

    function injectStyles() {
        if (document.getElementById("currency-pricing-styles")) return;
        const style = document.createElement("style");
        style.id = "currency-pricing-styles";
        style.textContent = [
            ".billing-switch-shell{display:flex;flex-direction:column;align-items:center;gap:16px;margin:0 auto 38px;padding:0 20px;}",
            ".billing-switch{position:relative;display:grid;grid-template-columns:1fr 1fr;gap:6px;padding:6px;border:1px solid rgba(255,255,255,.1);border-radius:999px;background:rgba(255,255,255,.04);backdrop-filter:blur(12px);box-shadow:0 18px 50px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.05);}",
            ".billing-switch__thumb{position:absolute;top:6px;bottom:6px;left:6px;width:calc(50% - 9px);border-radius:999px;background:linear-gradient(135deg,#f20089,#6d00c1);box-shadow:0 10px 26px rgba(242,0,137,.4);transition:transform .34s cubic-bezier(.34,1.3,.5,1);}",
            ".billing-switch.is-quarterly .billing-switch__thumb{transform:translateX(calc(100% + 6px));}",
            /* connector: points from the offer ticket down at the Quarterly tab */
            ".billing-switch::before{content:'';position:absolute;left:75%;top:-16px;transform:translateX(-50%);border-left:7px solid transparent;border-right:7px solid transparent;border-top:10px solid rgba(44,24,64,.98);pointer-events:none;}",
            ".billing-tab{position:relative;z-index:1;min-width:170px;min-height:58px;padding:8px 26px;border:0;border-radius:999px;background:transparent;color:#a49fb8;font:inherit;cursor:pointer;transition:color .25s ease;}",
            ".billing-tab span{display:block;font-weight:850;font-size:1rem;line-height:1.2;}",
            ".billing-tab small{display:block;margin-top:2px;font-size:.68rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase;opacity:.85;}",
            ".billing-tab small.is-deal{color:#35e0a1;}",
            /* ---- launch-offer ticket sitting above the billing switch ---- */
            ".billing-offer{position:relative;display:inline-flex;align-items:stretch;margin:0;border-radius:18px;border:1px solid rgba(255,255,255,.11);background:rgba(18,11,30,.94);box-shadow:0 22px 48px rgba(0,0,0,.5),inset 0 1px 0 rgba(255,255,255,.06);text-align:left;transition:border-color .3s ease,box-shadow .3s ease,opacity .3s ease;}",
            ".billing-offer[data-offer-state='applied']{border-color:rgba(242,0,137,.4);box-shadow:0 22px 48px rgba(0,0,0,.5),0 0 0 1px rgba(242,0,137,.16),0 0 34px rgba(242,0,137,.14),inset 0 1px 0 rgba(255,255,255,.07);}",
            ".billing-offer[data-offer-state='available']{opacity:.94;}",
            ".billing-offer[data-offer-state='available'] .billing-offer__seal{filter:saturate(.62) brightness(.9);}",
            /* the 50% off stub, split from the copy by a perforation */
            ".billing-offer__seal{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;min-width:86px;padding:13px 16px;border-radius:17px 0 0 17px;background:linear-gradient(150deg,#ff1aa3,#f20089 40%,#7a06c9);color:#fff;transition:filter .3s ease;}",
            ".billing-offer__seal b{font-size:1.34rem;font-weight:850;line-height:1;letter-spacing:-.03em;}",
            ".billing-offer__seal em{font-style:normal;font-size:.6rem;font-weight:800;letter-spacing:.24em;text-transform:uppercase;opacity:.94;}",
            ".billing-offer__seal::after{content:'';position:absolute;top:8px;right:0;bottom:8px;width:1px;background:repeating-linear-gradient(to bottom,rgba(255,255,255,.6) 0 4px,transparent 4px 9px);}",
            ".billing-offer__copy{display:flex;flex-direction:column;justify-content:center;gap:4px;padding:11px 18px;}",
            ".billing-offer__eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'JetBrains Mono',ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#ffb0dd;}",
            ".billing-offer__line{font-size:.88rem;font-weight:600;line-height:1.35;color:#ded6ec;}",
            ".billing-offer__line b{font-weight:800;color:#fff;}",
            ".billing-offer__dot{position:relative;width:7px;height:7px;border-radius:50%;background:#35e0a1;flex-shrink:0;}",
            ".billing-offer__dot::after{content:'';position:absolute;inset:0;border-radius:50%;background:inherit;animation:offerPulse 2.4s ease-out infinite;}",
            "@keyframes offerPulse{0%{opacity:.7;transform:scale(1);}70%{opacity:0;transform:scale(3.2);}100%{opacity:0;transform:scale(3.2);}}",
            /* applied / apply control */
            ".billing-offer__action{display:inline-flex;align-items:center;justify-content:center;gap:7px;align-self:center;margin:0 14px 0 2px;padding:0 15px;height:34px;border-radius:999px;border:1px solid rgba(255,255,255,.26);background:rgba(255,255,255,.06);color:#fff;font:inherit;font-size:.68rem;font-weight:800;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap;cursor:pointer;transition:background .25s ease,border-color .25s ease,color .25s ease,transform .25s ease;}",
            ".billing-offer__action:hover{border-color:rgba(242,0,137,.65);background:rgba(242,0,137,.18);transform:translateY(-1px);}",
            ".billing-offer__action:disabled{cursor:default;border-color:rgba(53,224,161,.42);background:rgba(53,224,161,.13);color:#7cefc3;transform:none;}",
            ".billing-offer__tick{width:13px;height:13px;border-radius:50%;background:#35e0a1;position:relative;flex-shrink:0;}",
            ".billing-offer__tick::after{content:'';position:absolute;left:4px;top:1.5px;width:3.5px;height:7px;border:solid #08210f;border-width:0 2px 2px 0;transform:rotate(42deg);}",
            /* sheen sweep */
            ".billing-offer__shine{position:absolute;inset:0;border-radius:inherit;overflow:hidden;pointer-events:none;}",
            ".billing-offer__shine::before{content:'';position:absolute;top:-40%;left:-32%;width:24%;height:180%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.14),transparent);transform:rotate(9deg);animation:offerSheen 7s ease-in-out infinite;}",
            "@keyframes offerSheen{0%,74%{transform:rotate(9deg) translateX(0);}100%{transform:rotate(9deg) translateX(560%);}}",
            "@media (max-width:600px){.billing-offer{flex-wrap:wrap;width:100%;max-width:400px;}.billing-offer__seal{min-width:76px;padding:12px 14px;}.billing-offer__copy{flex:1 1 0;min-width:0;padding:10px 14px;}.billing-offer__action{flex:1 0 calc(100% - 28px);margin:0 14px 14px;}}",
            "@media (prefers-reduced-motion: reduce){.billing-offer__dot::after,.billing-offer__shine::before{animation:none;}}",
            ".billing-tab.is-active{color:#fff;}",
            ".billing-tab.is-active small.is-deal{color:#b7ffe3;}",
            ".billing-switch__hint{max-width:600px;margin:0;text-align:center;font-size:.9rem;line-height:1.65;color:#a49fb8;}",
            ".billing-switch__hint b{color:#ff1aa3;font-weight:750;}",
            /* ---- price lockup: big number, subtle meta ---- */
            ".pricing-price{display:flex;flex-direction:column;align-items:center;gap:8px;}",
            ".pricing-price .price-lockup{display:flex;align-items:baseline;justify-content:center;gap:10px;flex-wrap:nowrap;}",
            ".pricing-price .price-now{font-size:clamp(2.9rem,3.6vw,3.7rem);font-weight:800;letter-spacing:-.05em;line-height:1;color:#14141c;}",
            ".pricing-price .price-per{font-size:1.05rem;font-weight:700;color:#5f5a6d;letter-spacing:0;}",
            ".pricing-price .price-was{position:relative;font-size:1.35rem;font-weight:700;color:#6e6a7c;}",
            ".pricing-price .price-was::after{content:'';position:absolute;left:-6%;top:52%;width:112%;height:2.5px;border-radius:2px;background:linear-gradient(90deg,#f20089,#ff1aa3);transform:rotate(-9deg);}",
            ".pricing-price .price-meta{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;}",
            ".pricing-price .price-save{padding:4px 11px;border-radius:999px;background:rgba(16,163,110,.12);border:1px solid rgba(16,163,110,.42);color:#0a6d49;font-size:.66rem;font-weight:850;letter-spacing:.08em;text-transform:uppercase;}",
            ".pricing-price .price-tax{font-size:.66rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;color:#5f5a6d;}",
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
