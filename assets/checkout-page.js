(function () {
    "use strict";

    /* Whop checkout plan IDs per package + billing period. */
    const WHOP = {
        starter:  { monthly: "plan_VnTTHDjp4IFiw", quarterly: "plan_aOq1QpsY5sWJB" },
        growth:   { monthly: "plan_1WNKWE6cYCupT", quarterly: "plan_QIy1lE4MfeAsi" },
        pro:      { monthly: "plan_d4YY0DcqLXx8b", quarterly: "plan_VWmHJTwHW6Pj5" }
    };
    const QUARTER_PROMO = "summer_50";
    const QUARTER_DISCOUNT = (window.KyntloPricing && window.KyntloPricing.quarterDiscount) || 0.5;

    /* Names, prices and summaries come from currency-pricing.js (window.KyntloPricing);
       only the checkout-specific highlight lists live here. */
    const HIGHLIGHTS = {
        starter: ["CRM contacts and opportunities", "1 pipeline", "Funnels, landing pages, forms, and surveys", "Calendar booking", "Live chat widget", "Up to 3 users"],
        growth: ["Everything in Starter", "2-3 pipelines", "Workflow automation", "Full omnichannel inbox", "Appointment reminders", "Up to 10 users"],
        pro: ["Everything in Growth", "Unlimited AI usage across the whole platform", "Unlimited pipelines", "Instant missed-call reply", "Advanced AI chatbot", "Voice AI access", "Premium workflow actions", "Reputation manager", "Advanced analytics"]
    };
    const SUMMARIES = {
        starter: "Launch CRM, booking, forms, landing pages, live chat, and essential lead capture for a small team.",
        growth: "Add workflow automation, full omnichannel inbox, appointment reminders, and stronger team collaboration.",
        pro: "Unlimited AI usage across the entire platform, plus advanced AI, instant missed-call reply, voice AI access, reviews, reactivation, analytics, and deeper campaign execution."
    };

    const shared = (window.KyntloPricing && window.KyntloPricing.packages) || {};
    const packages = Object.keys(HIGHLIGHTS).reduce(function (out, key) {
        const base = shared[key] || {};
        out[key] = {
            name: base.name || key.charAt(0).toUpperCase() + key.slice(1),
            monthly: base.monthly,
            summary: SUMMARIES[key],
            highlights: HIGHLIGHTS[key]
        };
        return out;
    }, {});

    function usd(amount) {
        return "$" + Math.round(amount).toLocaleString("en-US");
    }

    function getParams() {
        const params = new URLSearchParams(window.location.search);
        const requested = params.get("package");
        if (requested === "scale" || requested === "custom") {
            /* these are quote-only plans: leave before painting a Starter checkout */
            window.location.replace("contact.html#contact-form");
            return null;
        }
        const packageKey = packages[requested] ? requested : "starter";
        const billingKey = params.get("billing") === "monthly" ? "monthly" : "quarterly";
        return { packageKey, billingKey };
    }

    function billingCards(plan, activeBilling) {
        const perMonth = plan.monthly * (1 - QUARTER_DISCOUNT);
        const quarterTotal = plan.monthly * 3 * (1 - QUARTER_DISCOUNT);
        return `
            <div class="billing-choice" role="radiogroup" aria-label="Choose your billing plan">
                <button type="button" class="billing-card ${activeBilling === "monthly" ? "is-active" : ""}" data-billing="monthly" role="radio" aria-checked="${activeBilling === "monthly"}">
                    <span class="billing-card__name">Monthly</span>
                    <span class="billing-card__price">${usd(plan.monthly)}<small>/mo</small></span>
                    <ul class="billing-card__list">
                        <li>Billed every month</li>
                        <li>Standard package price</li>
                        <li>Cancel anytime</li>
                    </ul>
                </button>
                <button type="button" class="billing-card is-deal ${activeBilling === "quarterly" ? "is-active" : ""}" data-billing="quarterly" role="radio" aria-checked="${activeBilling === "quarterly"}">
                    <span class="billing-card__badge">Best deal &middot; Save 50%</span>
                    <span class="billing-card__name">Quarterly</span>
                    <span class="billing-card__price"><s>${usd(plan.monthly)}</s> ${usd(perMonth)}<small>/mo</small></span>
                    <span class="billing-card__save">${usd(quarterTotal)} billed once &middot; you save ${usd(plan.monthly * 3 - quarterTotal)}</span>
                    <ul class="billing-card__list">
                        <li><b>50% off</b> your first 3 months</li>
                        <li>Exact same features as monthly</li>
                        <li>More runway to launch and see results</li>
                        <li>Renews at ${usd(plan.monthly)}/mo after the first quarter</li>
                    </ul>
                </button>
            </div>
        `;
    }

    /* Whop's loader replaces the placeholder div in-place, so it must be
       re-created (and the loader re-run) every time the selection changes. */
    /* Whop's loader scans the DOM once and hydrates every [data-whop-checkout-plan-id]
       node it finds. Re-injecting the script does not make it scan again, so the old
       "rebuild the host and re-add the loader on every switch" approach left an empty
       box after the first change of billing period. Both plans are mounted up front
       instead, the loader runs exactly once, and switching only changes which of the
       two mounted forms is shown. */
    function planNode(planId, billingKey) {
        const node = document.createElement("div");
        node.setAttribute("data-whop-checkout-plan-id", planId);
        node.setAttribute("data-whop-checkout-theme", "light");
        node.setAttribute("data-whop-checkout-theme-accent-color", "#6d00c1");
        node.setAttribute("data-whop-checkout-theme-button-text", "Start Free Trial!");
        node.setAttribute("data-whop-checkout-adaptive-pricing", "true");
        node.setAttribute("data-whop-checkout-setup-future-usage", "off_session");
        node.setAttribute("data-whop-checkout-collect-phone-numbers", "true");
        node.setAttribute("data-whop-checkout-hide-address", "true");
        node.setAttribute("data-whop-checkout-promo-code", billingKey === "quarterly" ? QUARTER_PROMO : "");
        return node;
    }

    function mountWhop(packageKey, billingKey) {
        const host = document.getElementById("whop-checkout-host");
        if (!host) return;
        const plans = WHOP[packageKey] || {};

        host.innerHTML = "";
        Object.keys(plans).forEach((key) => {
            const slot = document.createElement("div");
            slot.className = "whop-plan";
            slot.dataset.billing = key;
            slot.dataset.active = String(key === billingKey);
            slot.appendChild(planNode(plans[key], key));
            host.appendChild(slot);
        });

        /* one loader for the life of the page */
        if (!document.getElementById("whop-loader")) {
            const script = document.createElement("script");
            script.id = "whop-loader";
            script.async = true;
            script.src = "https://js.whop.com/static/checkout/loader.js";
            document.body.appendChild(script);
        }

        /* If the payment script is blocked or slow, never leave an empty box. */
        window.setTimeout(function () {
            if (host.querySelector("iframe")) return;
            if (document.querySelector(".whop-fallback")) return;
            const note = document.createElement("p");
            note.className = "whop-fallback";
            note.innerHTML = "The secure payment form is taking longer than usual to load. " +
                "Please check your connection and refresh the page, or " +
                '<a href="contact.html#contact-form" style="color:#ff1aa3;font-weight:700;">contact our team</a> ' +
                "and we'll send you a direct payment link.";
            host.insertAdjacentElement("afterend", note);
        }, 7000);
    }

    function showWhopPlan(billingKey) {
        document.querySelectorAll("#whop-checkout-host .whop-plan").forEach((slot) => {
            slot.dataset.active = String(slot.dataset.billing === billingKey);
        });
    }

    /* Switching billing period only rewrites the copy that actually changes. The
       payment forms stay mounted and keep whatever the customer has already typed. */
    function applyBilling(packageKey, billingKey) {
        const plan = packages[packageKey];
        if (!plan) return;

        const quarterly = billingKey === "quarterly";
        const dueMonthly = quarterly ? plan.monthly * (1 - QUARTER_DISCOUNT) : plan.monthly;
        const quarterTotal = plan.monthly * 3 * (1 - QUARTER_DISCOUNT);

        const set = (selector, html) => {
            const el = document.querySelector(selector);
            if (el) el.innerHTML = html;
        };

        set("#checkout-billing-pill", quarterly ? "Quarterly &middot; 50% off first 3 months" : "Monthly");
        const pill = document.getElementById("checkout-billing-pill");
        if (pill) pill.classList.toggle("pill--deal", quarterly);

        set("#checkout-price",
            (quarterly ? '<span class="price-was">' + usd(plan.monthly) + "</span>" : "") +
            '<span class="price-now">' + usd(dueMonthly) + "<small>/mo</small></span>" +
            (quarterly ? '<span class="price-save">SAVE 50%</span>' : ""));

        set("#checkout-note", quarterly
            ? "Nothing today. " + usd(quarterTotal) + " is charged when your 14-day trial ends, covering your first 3 months. The package then renews at " + usd(plan.monthly) + "/mo plus taxes."
            : "Nothing today. " + usd(plan.monthly) + " is charged when your 14-day trial ends, then monthly, plus taxes. Cancel anytime.");

        set("#checkout-trial-note",
            "<b>You will not be charged today.</b> Your login details are emailed to you and the trial starts from there. After the 14 days end, <b>" +
            (quarterly
                ? usd(quarterTotal) + " will be charged once for your first 3 months"
                : usd(plan.monthly) + " will be charged for your first month") +
            "</b> unless you cancel first. Cancel any time before day 14 and you pay nothing.");

        set("#checkout-payment-note",
            "Complete your " + plan.name + " " + billingKey + " subscription below. Payments are processed securely by our payment provider, and your login details are emailed to you once the trial starts.");

        document.querySelectorAll(".billing-card").forEach((card) => {
            const active = card.dataset.billing === billingKey;
            card.classList.toggle("is-active", active);
            card.setAttribute("aria-checked", String(active));
        });

        showWhopPlan(billingKey);

        if (window.history && typeof window.history.replaceState === "function") {
            const url = new URL(window.location.href);
            url.searchParams.set("package", packageKey);
            url.searchParams.set("billing", billingKey);
            window.history.replaceState(null, "", url.toString());
        }
    }

    /* The payment form stays mounted while locked - Whop's loader scans the DOM once,
       so removing and re-adding the host would leave a dead box. We disable interaction
       with a class instead, and record the acknowledgement so it can be evidenced. */
    const TERMS_VERSION = "2026-10-04";
    const CONSENT_KEY = "kyntloTermsAccepted";

    /* What the customer actually ticked, itemised. A bare "accepted the terms"
       flag is weak evidence; naming each point means the record shows WHAT was
       put in front of them, which is the part that gets argued about later. */
    const ACKNOWLEDGED = [
        "b2b-capacity-and-authority",
        "customer-is-data-controller",
        "recording-consent-is-customers",
        "messaging-registration-is-customers",
        "ai-output-reviewed-by-human",
        "usage-billed-on-top-of-plan",
        "results-not-guaranteed"
    ];

    function recordConsent(packageKey, billingKey, arbitration) {
        try {
            window.localStorage.setItem(CONSENT_KEY, JSON.stringify({
                termsVersion: TERMS_VERSION,
                acceptedAt: new Date().toISOString(),
                documents: ["terms", "privacy", "dpa", "refund"],
                acknowledged: ACKNOWLEDGED,
                arbitrationAndClassWaiver: !!arbitration,
                package: packageKey || null,
                billing: billingKey || null,
                /* the page they were actually looking at when they agreed */
                url: window.location.href
            }));
        } catch (error) {
            /* Private browsing can refuse storage. The gate still works for this visit. */
        }
    }

    function wireConsent(packageKey, billingKey) {
        const box = document.getElementById("consentAccept");
        const arb = document.getElementById("consentArbitration");
        const host = document.getElementById("whop-checkout-host");
        const note = document.getElementById("consentNote");
        if (!box || !arb || !host) return;

        function apply() {
            /* Both are required. The dispute-resolution waiver is a separate tick
               on purpose: courts look hardest at arbitration and class-action
               waivers, and a distinct affirmative act is far stronger evidence
               than one bundled into a paragraph of other terms. */
            const ok = box.checked && arb.checked;
            host.classList.toggle("is-locked", !ok);
            host.setAttribute("aria-hidden", String(!ok));
            if (!note) return;
            if (ok) {
                recordConsent(packageKey, billingKey, arb.checked);
                note.textContent = "Accepted on " + new Date().toLocaleDateString(undefined, {
                    year: "numeric", month: "long", day: "numeric"
                }) + ". Terms version " + TERMS_VERSION + ".";
                note.classList.add("is-accepted");
            } else if (box.checked || arb.checked) {
                note.textContent = "One box still to tick before the payment form unlocks.";
                note.classList.remove("is-accepted");
            } else {
                note.textContent = "Tick both boxes to unlock the payment form.";
                note.classList.remove("is-accepted");
            }
        }

        box.addEventListener("change", apply);
        arb.addEventListener("change", apply);
        apply();
    }

    function renderCheckout() {
        const root = document.getElementById("checkout-page");
        if (!root) return;

        const params = getParams();
        if (!params) return;
        const { packageKey, billingKey } = params;
        const plan = packages[packageKey];

        document.title = plan.name + " Checkout | Kyntlo";

        root.innerHTML = `
            <section class="checkout-hero">
                <div class="container">
                    <p class="checkout-eyebrow">Secure checkout</p>
                    <h1 class="checkout-title">You're one step away from <span>${plan.name}</span></h1>
                    <p class="checkout-subtitle">Pick your billing rhythm, review your package, and complete payment securely below. Every plan starts with a 14-day free trial.</p>
                    <ol class="checkout-steps" aria-label="Trial steps">
                        <li class="is-done"><span>1</span> Package chosen</li>
                        <li class="is-current"><span>2</span> Payment details</li>
                        <li><span>3</span> Login emailed &middot; 14 days free</li>
                    </ol>
                </div>
            </section>

            <section class="checkout-section">
                <div class="container">
                    ${billingCards(plan, billingKey)}

                    <div class="checkout-grid">
                        <article class="checkout-card">
                            <div class="order-topline">
                                <span class="pill">${plan.name}</span>
                                <span class="pill" id="checkout-billing-pill"></span>
                            </div>
                            <h2>Order summary</h2>
                            <p>${plan.summary}</p>
                            <div class="checkout-price" id="checkout-price"></div>
                            <p class="checkout-note" id="checkout-note"></p>
                            <ul class="checkout-list">
                                ${plan.highlights.map((item) => "<li>" + item + "</li>").join("")}
                            </ul>
                            <a class="switch-package" href="pricing.html">&larr; Change package</a>
                        </article>

                        <aside class="payment-card" aria-label="Payment">
                            <div class="payment-card__inner">
                                <div class="trial-banner">
                                    <span class="trial-banner__pill">14-day free trial</span>
                                    <p id="checkout-trial-note"></p>
                                </div>
                                <h2>Secure payment</h2>
                                <p id="checkout-payment-note"></p>
                            </div>
                            <div class="consent-gate" id="consentGate">
                                <p class="consent-lead">Before your first payment, please confirm the following. Each point is a term you are agreeing to, shown here rather than buried in a link.</p>

                                <ul class="consent-list">
                                    <li><b>This is a business account.</b> You are buying for a business or professional purpose, not as a consumer, you are at least 18, and you are authorised to commit your organisation.</li>
                                    <li><b>You control your customers' data.</b> For the contacts and conversations you bring in, you are the data controller and Kyntlo is your processor. You hold the lawful basis, issue your own privacy notice, and answer data-subject requests.</li>
                                    <li><b>Recording consent is yours to obtain.</b> Many territories require the consent of <em>every</em> party to a recorded call. You decide what notice your recordings need and obtain that consent before recording.</li>
                                    <li><b>Messaging registration is yours to maintain.</b> Sender registration such as A2P&nbsp;10DLC, opt-in records, opt-outs and quiet hours are your responsibility, and carriers may filter or refuse traffic at their discretion.</li>
                                    <li><b>You review AI output before relying on it.</b> AI replies, summaries and bookings are advisory. A person checks anything that carries commercial or contractual weight.</li>
                                    <li><b>Usage is billed on top of the plan.</b> Messages, minutes, AI and third-party services are charged per unit at the published rates, and any wallet or auto-recharge you enable will top up automatically.</li>
                                    <li><b>Results are not guaranteed.</b> Figures shown anywhere on this site, including the calculator and the worked examples, are illustrative models and not a forecast or a promise.</li>
                                </ul>

                                <label class="consent-check">
                                    <input type="checkbox" id="consentAccept">
                                    <span class="consent-box" aria-hidden="true"></span>
                                    <span class="consent-copy">I confirm every point above, and I have read and agree to the <a href="terms.html" target="_blank" rel="noopener">Terms of Service</a>, the <a href="privacy.html" target="_blank" rel="noopener">Privacy Policy</a>, the <a href="dpa.html" target="_blank" rel="noopener">Data Processing Agreement</a> and the <a href="refund.html" target="_blank" rel="noopener">Refund Policy</a>.</span>
                                </label>

                                <label class="consent-check consent-check--dispute">
                                    <input type="checkbox" id="consentArbitration">
                                    <span class="consent-box" aria-hidden="true"></span>
                                    <span class="consent-copy">I agree that disputes are resolved by <b>binding arbitration in Cairo under CRCICA rules</b>, and I <b>waive the right to a court trial and to bring or join a class action</b>. This is set out in section 11 of the <a href="terms.html#governing-law" target="_blank" rel="noopener">Terms</a>.</span>
                                </label>

                                <p class="consent-note" id="consentNote">Tick both boxes to unlock the payment form.</p>
                            </div>
                            <div id="whop-checkout-host" class="whop-host is-locked"></div>
                        </aside>
                    </div>
                </div>
            </section>
        `;

        mountWhop(packageKey, billingKey);
        applyBilling(packageKey, billingKey);
        wireConsent(packageKey, billingKey);

        root.querySelectorAll(".billing-card").forEach((card) => {
            card.addEventListener("click", () => {
                applyBilling(packageKey, card.dataset.billing);
            });
        });
    }

    renderCheckout();
})();
