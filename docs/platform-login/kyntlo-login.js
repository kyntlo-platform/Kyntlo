/* ==========================================================================
   Kyntlo — hub.kyntlo.ai login skin (behaviour + DOM adapter)
   --------------------------------------------------------------------------
   The login page is a Vue application whose class names are HighLevel's, not
   ours, and can change without warning. So this script does not style anything
   by their selectors. It finds the real elements by what they ARE — the email
   input, the password input, the submit button, the Google button — tags each
   one with a data-kyn attribute, and lets kyntlo-login.css key off those.

   Three rules this script holds to, because a login page that looks good and
   cannot log you in is worse than an ugly one that works:

     1. It never moves, replaces or removes a node the Vue app owns. Reparenting
        a node under Vue's feet is how you get a form that silently submits
        nothing. Everything here is either a new element of ours, an attribute,
        or a CSS class. Layout is done by positioning their card, not relocating
        it.
     2. It never writes into a form field. Prefilling an input without telling
        Vue leaves the model empty while the user sees a filled box, and the
        browser's own autofill already does this properly.
     3. If anything at all goes wrong, it stops and leaves the page in
        HighLevel's default styling, which works. The <html data-kyn-ready>
        flag that switches the CSS on is set last, only once the form has
        actually been found and tagged.
   ========================================================================== */

(function () {
    "use strict";

    /* ---------------------------------------------------------------- config */

    var KYN = {
        /* Where the stylesheet lives once you have uploaded it. Leave as null
           if you are pasting the CSS into the platform's own CSS field. */
        cssHref: null,

        /* Falls back to the logo already on the page if this is left null. */
        logoSrc: null,

        /* Injected copy. The platform's own strings are translated by the
           Platform Language selector; these are ours and are not, so keep them
           short, or swap them per language here. */
        copy: {
            morning: "Good morning",
            afternoon: "Good afternoon",
            evening: "Good evening",
            wordmark: ["Kyntlo,", "Own Tomorrow."],
            blurb: "Your leads, conversations, bookings and follow-up in one place — with AI answering the ones you would have missed.",
            loop: ["Capture", "Respond", "Book", "Follow up"],
            subtitle: "Welcome back. Sign in to pick up where your business left off.",
            caps: "Caps Lock is on.",
            skip: "Skip to sign-in form"
        },

        /* Longest we will wait for the Vue app to render the form. */
        readyTimeoutMs: 15000,

        /* How long the submit button stays in its busy state before we release
           it, in case the attempt fails without navigating away. */
        busyReleaseMs: 10000
    };

    /* ------------------------------------------------------------- utilities */

    var doc = document;
    var root = doc.documentElement;

    function el(tag, attrs, text) {
        var node = doc.createElement(tag);
        if (attrs) {
            Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
        }
        if (text != null) node.textContent = text;
        return node;
    }

    function tag(node, name) {
        if (node && !node.getAttribute("data-kyn")) node.setAttribute("data-kyn", name);
        return node;
    }

    function visible(node) {
        if (!node) return false;
        var r = node.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
    }

    /* First match that is actually rendered — the login page ships hidden
       duplicates of some fields for its other auth flows. */
    function pick(selector, within) {
        var list = (within || doc).querySelectorAll(selector);
        for (var i = 0; i < list.length; i++) {
            if (visible(list[i])) return list[i];
        }
        return null;
    }

    /* Innermost match, not the first one. textContent includes descendants, so
       a document-wide search for "Terms and Conditions" matches the page
       wrapper before it matches the sentence itself; taking the first hit tags
       the whole layout as the legal line and centres the entire page. A
       candidate that contains the current best is a wrapper and is skipped. */
    function byText(selector, pattern, within) {
        var list = (within || doc).querySelectorAll(selector);
        var best = null;
        for (var i = 0; i < list.length; i++) {
            var node = list[i];
            if (!pattern.test((node.textContent || "").trim())) continue;
            if (!visible(node)) continue;
            if (best && node.contains(best)) continue;
            best = node;
        }
        return best;
    }

    /* Nearest ancestor that contains both nodes. */
    function commonAncestor(a, b) {
        var node = a;
        while (node && node !== doc.body) {
            if (node.contains(b)) return node;
            node = node.parentElement;
        }
        return doc.body;
    }

    /* ------------------------------------------------------ find the form */

    function findParts() {
        var email = pick('input[type="email"]')
            || pick('input[name="email"]')
            || pick('input[id*="email" i]')
            || pick('input[placeholder*="email" i]');

        var password = pick('input[type="password"]')
            || pick('input[name="password"]')
            || pick('input[id*="password" i]');

        if (!email || !password) return null;

        var lang = pick("select");

        /* The card is the panel around the fields. Start at the smallest box
           holding both, then keep climbing while the parent still looks like
           part of the same panel.

           Getting this wrong is not cosmetic. Stopping too early leaves the
           heading, the Google button and the terms line outside the card,
           where hideDecoration() would hide them and take Google sign-in off
           the page. So the climb is bounded by three things that mean "you
           have left the panel and are now in the page": the parent is a
           document-level landmark, the parent also contains the language
           selector, or the parent is nearly as tall as the viewport. */
        var card = commonAncestor(email, password);
        var LANDMARK = /^(BODY|HTML|MAIN|HEADER|FOOTER)$/;
        for (var i = 0; i < 6; i++) {
            var parent = card && card.parentElement;
            if (!parent || LANDMARK.test(parent.tagName)) break;
            if (lang && parent.contains(lang)) break;
            if (parent.getBoundingClientRect().height > window.innerHeight * 0.92) break;
            card = parent;
        }
        if (!card || card === doc.body) return null;

        /* These are looked up across the document rather than inside the card:
           on some layouts the Google button and the terms line sit just
           outside it, and finding them is what keeps them visible. */
        var submit = pick('button[type="submit"]', card)
            || byText("button", /^(sign\s?in|log\s?in|continue|submit)/i, card)
            || pick("button", card);

        var oauth = byText("button, a", /google|microsoft|sso|apple/i);
        var forgot = byText("a, button", /forgot|reset/i);
        var legal = byText("p, div, span, small", /terms|privacy|conditions/i);
        var title = card.querySelector("h1, h2, h3") || byText("h1, h2, h3", /sign|log|welcome|account/i);
        var reveal = null;

        /* The reveal eye is the button sitting inside the password field's own
           wrapper — never the submit button. */
        var pwWrap = password.parentElement;
        for (var j = 0; j < 2 && pwWrap; j++) {
            var candidate = pwWrap.querySelector("button, i, svg, span[role='button']");
            if (candidate && candidate !== submit && !candidate.contains(submit)) { reveal = candidate; break; }
            pwWrap = pwWrap.parentElement;
        }

        var form = email.closest("form");

        return {
            email: email, password: password, card: card, submit: submit,
            oauth: oauth, forgot: forgot, legal: legal, title: title,
            reveal: reveal, form: form, lang: lang
        };
    }

    /* --------------------------------------------------------------- chrome */

    function greeting() {
        var h = new Date().getHours();
        if (h < 12) return KYN.copy.morning;
        if (h < 18) return KYN.copy.afternoon;
        return KYN.copy.evening;
    }

    function logoSource() {
        if (KYN.logoSrc) return KYN.logoSrc;
        var imgs = doc.querySelectorAll("img");
        for (var i = 0; i < imgs.length; i++) {
            var src = imgs[i].getAttribute("src") || "";
            if (/logo|brand|kyntlo/i.test(src) || (imgs[i].naturalWidth > 60 && visible(imgs[i]))) return src;
        }
        return null;
    }

    function buildBrandPanel(parts) {
        var brand = el("aside", { "data-kyn": "brand", "aria-hidden": "true" });

        var src = logoSource();
        if (src) {
            var mark = el("div", { "data-kyn": "brandmark" });
            mark.appendChild(el("img", { src: src, alt: "" }));
            brand.appendChild(mark);
        }

        brand.appendChild(el("p", { "data-kyn": "greeting" }, greeting()));

        var word = el("h1", { "data-kyn": "wordmark" });
        word.appendChild(doc.createTextNode(KYN.copy.wordmark[0]));
        word.appendChild(el("br"));
        var em = el("em", null, KYN.copy.wordmark[1]);
        word.appendChild(em);
        brand.appendChild(word);

        brand.appendChild(el("p", { "data-kyn": "blurb" }, KYN.copy.blurb));

        var loop = el("ul", { "data-kyn": "loop" });
        KYN.copy.loop.forEach(function (step) { loop.appendChild(el("li", null, step)); });
        brand.appendChild(loop);

        return brand;
    }

    function buildAmbience() {
        var frag = doc.createDocumentFragment();

        var aurora = el("div", { "data-kyn": "aurora", "aria-hidden": "true" });
        aurora.appendChild(el("span"));
        aurora.appendChild(el("span"));
        aurora.appendChild(el("span"));
        frag.appendChild(aurora);

        frag.appendChild(el("div", { "data-kyn": "signal", "aria-hidden": "true" }));
        return frag;
    }

    /* Everything that is neither an ancestor nor a descendant of the card, the
       language selector, or our own additions is HighLevel's decoration — the
       purple diagonal, the illustration panel — and is hidden.

       Only nodes present at init are touched. Anything the app mounts later
       (an error toast, a two-factor step) is left alone by design, and the
       observer below rescues any alert that does appear inside a hidden
       branch, so a failed sign-in never loses its error message. */
    function hideDecoration(parts) {
        /* Every element we identified is protected, not just the card. If the
           card resolved tighter than the real panel, the Google button, the
           terms link and the heading are still on this list and still get
           shown. Hiding is only ever applied to what we could not name. */
        var keep = [parts.card, parts.lang, parts.oauth, parts.forgot,
                    parts.legal, parts.title, parts.submit, parts.form]
            .filter(function (n) { return !!n; });

        function keeps(node) {
            for (var i = 0; i < keep.length; i++) {
                if (node === keep[i] || node.contains(keep[i])) return true;
            }
            return false;
        }

        var node = parts.card;
        while (node && node !== doc.body && node.parentElement) {
            var parent = node.parentElement;
            tag(parent, "flatten");
            Array.prototype.forEach.call(parent.children, function (sib) {
                if (sib === node) return;
                if (keeps(sib)) return;
                if (sib.hasAttribute("data-kyn")) return;
                sib.setAttribute("data-kyn-hidden", "");
                sib.style.setProperty("display", "none", "important");
            });
            node = parent;
        }

        watchForAlerts();
    }

    var ALERT = /toast|alert|error|notification|snackbar|message/i;

    function watchForAlerts() {
        if (!window.MutationObserver) return;
        new MutationObserver(function (records) {
            records.forEach(function (rec) {
                Array.prototype.forEach.call(rec.addedNodes, function (n) {
                    if (n.nodeType !== 1) return;
                    var isAlert = n.getAttribute("role") === "alert"
                        || ALERT.test(n.className || "")
                        || n.querySelector('[role="alert"]');
                    if (!isAlert) return;
                    var up = n;
                    while (up && up !== doc.body) {
                        if (up.hasAttribute("data-kyn-hidden")) {
                            up.removeAttribute("data-kyn-hidden");
                            up.style.removeProperty("display");
                        }
                        up = up.parentElement;
                    }
                });
            });
        }).observe(doc.body, { childList: true, subtree: true });
    }

    /* ------------------------------------------------------------ behaviour */

    /* The reveal eye is absolutely positioned inside whatever wrapper the
       platform gave the password field. That wrapper often also holds the
       label, and now holds our Caps Lock notice too, so "top: 50%" lands the
       eye somewhere in the middle of the group rather than in the field.
       Measure the input instead, and re-measure when the box changes. */
    function alignReveal(parts) {
        if (!parts.reveal) return;
        var input = parts.password;

        function place() {
            var host = parts.reveal.offsetParent;
            if (!host) return;
            var ir = input.getBoundingClientRect();
            var hr = host.getBoundingClientRect();
            var size = parts.reveal.offsetHeight || 34;
            parts.reveal.style.setProperty("top", Math.round(ir.top - hr.top + (ir.height - size) / 2) + "px", "important");
            parts.reveal.style.setProperty("transform", "none", "important");
        }

        place();
        window.addEventListener("resize", place);
        if (window.ResizeObserver) {
            var ro = new ResizeObserver(place);
            ro.observe(input);
            if (parts.reveal.offsetParent) ro.observe(parts.reveal.offsetParent);
        }
        /* Web fonts land after first paint and shift the field by a pixel or two. */
        if (doc.fonts && doc.fonts.ready && doc.fonts.ready.then) doc.fonts.ready.then(place);
        setTimeout(place, 400);
    }

    function wireCapsLock(parts) {
        var warn = el("p", { "data-kyn": "caps", role: "status" }, KYN.copy.caps);
        var host = parts.password.parentElement || parts.card;
        host.appendChild(warn);

        function check(e) {
            var on = false;
            try { on = e.getModifierState && e.getModifierState("CapsLock"); } catch (err) { return; }
            if (on) warn.setAttribute("data-kyn-on", "");
            else warn.removeAttribute("data-kyn-on");
        }

        parts.password.addEventListener("keydown", check);
        parts.password.addEventListener("keyup", check);
        parts.password.addEventListener("blur", function () { warn.removeAttribute("data-kyn-on"); });
    }

    function wireBusyState(parts) {
        if (!parts.submit) return;
        var timer = null;

        function busy() {
            if (parts.submit.hasAttribute("data-kyn-busy")) return;
            parts.submit.setAttribute("data-kyn-busy", "");
            clearTimeout(timer);
            timer = setTimeout(release, KYN.busyReleaseMs);
        }

        function release() {
            clearTimeout(timer);
            parts.submit.removeAttribute("data-kyn-busy");
        }

        /* Listen, never intercept: no preventDefault, no submit() call, so the
           app's own handler runs exactly as it did before. */
        parts.submit.addEventListener("click", busy);
        if (parts.form) parts.form.addEventListener("submit", busy);

        /* Any keystroke after a failure means the user is retrying. */
        [parts.email, parts.password].forEach(function (input) {
            input.addEventListener("input", release);
        });
    }

    function addSkipLink(parts) {
        var skip = el("a", { "data-kyn": "skip", href: "#" }, KYN.copy.skip);
        skip.addEventListener("click", function (e) {
            e.preventDefault();
            parts.email.focus();
        });
        doc.body.insertBefore(skip, doc.body.firstChild);
    }

    function loadFonts() {
        if (doc.getElementById("kyn-login-fonts")) return;
        var link = el("link", {
            id: "kyn-login-fonts",
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@500;700&display=swap"
        });
        doc.head.appendChild(link);
    }

    function loadStylesheet() {
        if (!KYN.cssHref || doc.getElementById("kyn-login-css")) return;
        doc.head.appendChild(el("link", { id: "kyn-login-css", rel: "stylesheet", href: KYN.cssHref }));
    }

    /* ----------------------------------------------------------------- init */

    function apply(parts) {
        tag(parts.card, "card");
        tag(parts.email, "input");
        tag(parts.password, "input");
        if (parts.submit) tag(parts.submit, "submit");
        if (parts.oauth) tag(parts.oauth, "oauth");
        if (parts.forgot) tag(parts.forgot, "forgot");
        if (parts.legal) tag(parts.legal, "legal");
        if (parts.title) tag(parts.title, "title");
        if (parts.reveal) tag(parts.reveal, "reveal");
        if (parts.lang) {
            tag(parts.lang, "lang");
            if (parts.lang.parentElement) tag(parts.lang.parentElement, "langwrap");
        }

        /* The "Or Continue with" rule, if the page has one. */
        var divider = byText("div, p, span", /^or\s+(continue|sign\s?in)\s+with$/i, parts.card);
        if (divider) tag(divider, "divider");

        /* Our own subtitle, added after the title rather than replacing it, so
           the platform's translated heading is left intact. */
        if (parts.title && !parts.title.parentElement.querySelector('[data-kyn="subtitle"]')) {
            var sub = el("p", { "data-kyn": "subtitle" }, KYN.copy.subtitle);
            parts.title.insertAdjacentElement("afterend", sub);
        }

        doc.body.appendChild(buildAmbience());
        doc.body.appendChild(buildBrandPanel(parts));

        hideDecoration(parts);
        wireCapsLock(parts);
        alignReveal(parts);
        wireBusyState(parts);
        addSkipLink(parts);

        /* Last line: this is what switches the stylesheet on. Everything above
           has to have succeeded to reach it. */
        root.setAttribute("data-kyn-ready", "");
    }

    function start() {
        loadStylesheet();
        loadFonts();

        var parts = findParts();
        if (parts) { apply(parts); return; }

        /* The form is rendered asynchronously; watch for it, and give up
           quietly if it never appears. */
        if (!window.MutationObserver) return;
        var done = false;
        var observer = new MutationObserver(function () {
            if (done) return;
            var found = findParts();
            if (!found) return;
            done = true;
            observer.disconnect();
            apply(found);
        });
        observer.observe(doc.documentElement, { childList: true, subtree: true });
        setTimeout(function () { if (!done) observer.disconnect(); }, KYN.readyTimeoutMs);
    }

    function boot() {
        try { start(); }
        catch (err) {
            /* Leave the page exactly as HighLevel rendered it. */
            root.removeAttribute("data-kyn-ready");
            if (window.console && console.warn) console.warn("[kyntlo-login] skin not applied:", err);
        }
    }

    if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
    else boot();
})();
