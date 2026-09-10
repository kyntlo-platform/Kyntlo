(function () {
    "use strict";

    const currentFile = window.location.pathname.split("/").pop() || "index.html";
    const rawPageKey = currentFile.replace(".html", "") || "index";
    const pageKey = rawPageKey.startsWith("package-") ? "pricing" : rawPageKey;
    const REQUEST_DEMO_HREF = "index.html#book-demo";
    const LOGIN_HREF = "https://hub.kyntlo.ai/";
    const GET_STARTED_HREF = "get-started.html";
    const labels = {
        platform: "Platform",
        funnels: "Funnels",
        compare: "Compare",
        pricing: "Pricing",
        contact: "Contact",
        about: "About",
        login: "Login",
        getStarted: "Get Started",
        requestDemo: "Request a Demo",
        features: "Features",
        resources: "Resources",
        legal: "Legal",
        social: "Social",
        faq: "FAQ",
        security: "Security",
        startTrial: "Start Free Trial",
        contactSupport: "Platform support",
        salesInquiry: "Sales inquiry",
        call: "Call"
    };

    const navItems = [
        { key: "index", href: "index.html#features", labelKey: "platform" },
        { key: "funnels", href: "funnels.html", labelKey: "funnels" },
        { key: "pricing", href: "pricing.html", labelKey: "pricing" },
        { key: "contact", href: "contact.html", labelKey: "contact" },
        { key: "about", href: "about.html", labelKey: "about" }
    ];

    function isHostedProtocol() {
        return window.location.protocol === "http:" || window.location.protocol === "https:";
    }

    function siteHref(href) {
        if (!isHostedProtocol()) return href;
        if (/^(https?:|mailto:|tel:|#)/i.test(href)) return href;

        const hashIndex = href.indexOf("#");
        const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
        const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;

        if (path === "index.html") return `/${hash}`;
        if (path.endsWith(".html")) return `/${path.slice(0, -5)}${hash}`;
        return href;
    }

    function cleanPublicUrl() {
        if (!isHostedProtocol() || !window.history || typeof window.history.replaceState !== "function") return;

        const pathname = window.location.pathname;
        let cleanPath = "";

        if (pathname.endsWith("/index.html")) {
            cleanPath = pathname.slice(0, -"index.html".length) || "/";
        } else if (pathname.endsWith(".html")) {
            cleanPath = pathname.slice(0, -5);
        }

        if (cleanPath && cleanPath !== pathname) {
            window.history.replaceState(null, document.title, `${cleanPath}${window.location.search}${window.location.hash}`);
        }
    }

    function t(key) {
        return labels[key] || key;
    }

    function setupSiteLocale() {
        document.documentElement.lang = "en";
        window.KyntloI18n = { language: "en", translate: t };
    }

    function ensureFavicon() {
        if (document.querySelector('link[rel~="icon"]')) return;

        const icon = document.createElement("link");
        icon.rel = "icon";
        icon.type = "image/png";
        icon.href = "assets/favicon.png";
        document.head.appendChild(icon);
    }

    function ensureSharePreview() {
        const description = document.querySelector('meta[name="description"]');
        const pageDescription = description
            ? description.getAttribute("content")
            : "Kyntlo is an AI-powered growth operations platform for CRM, conversations, booking, funnels, and automation.";
        const pageUrl = isHostedProtocol()
            ? window.location.href.split("#")[0]
            : "https://kyntlo.ai/";

        const metaDefinitions = [
            ["property", "og:type", "website"],
            ["property", "og:site_name", "Kyntlo"],
            ["property", "og:title", document.title || "Kyntlo"],
            ["property", "og:description", pageDescription],
            ["property", "og:url", pageUrl],
            ["property", "og:image", "https://kyntlo.ai/assets/og-kyntlo-preview.png"],
            ["property", "og:image:alt", "Kyntlo logo and AI Growth Operations Platform preview"],
            ["property", "og:image:width", "1200"],
            ["property", "og:image:height", "630"],
            ["name", "twitter:card", "summary_large_image"],
            ["name", "twitter:title", document.title || "Kyntlo"],
            ["name", "twitter:description", pageDescription],
            ["name", "twitter:image", "https://kyntlo.ai/assets/og-kyntlo-preview.png"]
        ];

        metaDefinitions.forEach(([attribute, key, value]) => {
            if (document.querySelector(`meta[${attribute}="${key}"]`)) return;
            const meta = document.createElement("meta");
            meta.setAttribute(attribute, key);
            meta.setAttribute("content", value);
            document.head.appendChild(meta);
        });
    }

    /* Keyboard users land on the nav first; give them a way past it. */
    function ensureSkipLink() {
        const main = document.querySelector("main");
        if (!main || document.querySelector(".skip-to-content")) return;
        if (!main.id) main.id = "main-content";

        const link = document.createElement("a");
        link.className = "skip-to-content";
        link.href = "#" + main.id;
        link.textContent = "Skip to main content";
        document.body.insertBefore(link, document.body.firstChild);

        /* a hash jump alone does not move focus to a non-focusable target */
        link.addEventListener("click", function () {
            main.setAttribute("tabindex", "-1");
            main.focus({ preventScroll: true });
        });
    }

    function navLink(item, mobileClass) {
        const active = item.key === pageKey;
        const current = active ? ' aria-current="page"' : "";
        const className = mobileClass ? ` class="${mobileClass}"` : "";
        return `<a href="${siteHref(item.href)}"${className}${current}>${t(item.labelKey)}</a>`;
    }

    function renderNavigation() {
        const nav = document.querySelector("nav");
        if (!nav) return;
        if (nav.hidden || nav.dataset.shell === "false") return;

        nav.className = "site-nav";
        nav.setAttribute("aria-label", "Primary navigation");
        nav.innerHTML = `
            <div class="container site-nav__inner">
                <a class="site-nav__brand" href="${siteHref("index.html")}" aria-label="Kyntlo home">
                    <img src="assets/kyntlo-logo-cropped.png" alt="Kyntlo">
                </a>
                <div class="site-nav__links" id="site-navigation" hidden>
                    <span class="site-nav__marker" aria-hidden="true"></span>
                    ${navItems.map((item) => navLink(item)).join("")}
                    <a class="site-nav__mobile-login" href="${LOGIN_HREF}">${t("login")}</a>
                    <a class="site-nav__mobile-cta" href="${siteHref(GET_STARTED_HREF)}">${t("getStarted")}</a>
                </div>
                <div class="site-nav__actions">
                    <a class="site-nav__login" href="${LOGIN_HREF}">${t("login")}</a>
                    <a class="site-nav__cta" href="${siteHref(GET_STARTED_HREF)}">${t("getStarted")}</a>
                    <button class="site-nav__toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
                        <span class="site-nav__toggle-lines" aria-hidden="true"></span>
                        <span class="sr-only">Toggle navigation</span>
                    </button>
                </div>
            </div>
        `;

        const toggle = nav.querySelector(".site-nav__toggle");
        const links = nav.querySelector(".site-nav__links");
        const inner = nav.querySelector(".site-nav__inner");
        const mobileQuery = window.matchMedia("(max-width: 980px)");
        const calmMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        /* ---------- one marker that travels between the links ---------- */
        const marker = links.querySelector(".site-nav__marker");
        let markerRaf = 0;

        function currentLink() {
            return links.querySelector('a[aria-current="page"]');
        }

        /* `resting` = nobody is pointing at the nav, so the pill sits quietly on the
           current page and the rail stays dark. Hover/focus brings both up to full. */
        function moveMarkerTo(link, resting) {
            if (!marker || !inner || mobileQuery.matches) return;
            if (!link) {
                marker.classList.remove("is-on", "is-rest");
                inner.style.setProperty("--rail-o", "0");
                return;
            }
            const box = link.getBoundingClientRect();
            const base = links.getBoundingClientRect();
            const innerBox = inner.getBoundingClientRect();
            marker.style.width = box.width + "px";
            marker.style.transform = "translate3d(" + (box.left - base.left) + "px, -50%, 0)";
            marker.classList.add("is-on");
            marker.classList.toggle("is-rest", !!resting);
            /* the bar's top edge lights up above whichever item the pointer is on */
            inner.style.setProperty("--rail-x", (box.left - innerBox.left + box.width / 2) + "px");
            inner.style.setProperty("--rail-o", resting ? "0" : "1");
        }

        function restMarker() {
            moveMarkerTo(currentLink(), true);
        }

        function queueMarker(link, resting) {
            if (markerRaf) cancelAnimationFrame(markerRaf);
            markerRaf = requestAnimationFrame(function () {
                markerRaf = 0;
                moveMarkerTo(link, resting);
            });
        }

        if (marker) {
            links.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("pointerenter", function () { queueMarker(link); });
                link.addEventListener("focus", function () { queueMarker(link); });
            });
            links.addEventListener("pointerleave", function () { queueMarker(currentLink(), true); });
            links.addEventListener("focusout", function (event) {
                if (!links.contains(event.relatedTarget)) queueMarker(currentLink(), true);
            });
            /* fonts land after first paint and change link widths, so measure again */
            if (document.fonts && document.fonts.ready) {
                document.fonts.ready.then(restMarker).catch(function () {});
            }
            window.addEventListener("resize", restMarker);
            requestAnimationFrame(restMarker);
        }

        /* ---------- mobile panel ---------- */
        let hideTimer = 0;

        function openMenu() {
            window.clearTimeout(hideTimer);
            links.hidden = false;
            toggle.setAttribute("aria-expanded", "true");
            if (calmMotion) { links.classList.add("is-open"); return; }
            /* one frame in the closed state first, or there is nothing to animate from */
            requestAnimationFrame(function () {
                requestAnimationFrame(function () { links.classList.add("is-open"); });
            });
        }

        function closeMenu(focusToggle) {
            toggle.setAttribute("aria-expanded", "false");
            links.classList.remove("is-open");
            window.clearTimeout(hideTimer);
            /* keep it in the tree until the close transition ends, then hide it from AT */
            hideTimer = window.setTimeout(function () {
                if (mobileQuery.matches && toggle.getAttribute("aria-expanded") !== "true") {
                    links.hidden = true;
                }
            }, calmMotion ? 0 : 300);
            if (focusToggle) toggle.focus();
        }

        function syncMenu() {
            window.clearTimeout(hideTimer);
            if (mobileQuery.matches) {
                const expanded = toggle.getAttribute("aria-expanded") === "true";
                links.hidden = !expanded;
                links.classList.toggle("is-open", expanded);
                marker && marker.classList.remove("is-on");
            } else {
                toggle.setAttribute("aria-expanded", "false");
                links.hidden = false;
                links.classList.remove("is-open");
                restMarker();
            }
        }

        toggle.addEventListener("click", function () {
            if (toggle.getAttribute("aria-expanded") === "true") closeMenu(false);
            else openMenu();
        });

        links.addEventListener("click", function (event) {
            if (mobileQuery.matches && event.target.closest("a")) closeMenu(false);
        });

        document.addEventListener("click", function (event) {
            if (
                mobileQuery.matches &&
                toggle.getAttribute("aria-expanded") === "true" &&
                !nav.contains(event.target)
            ) {
                closeMenu(false);
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
                closeMenu(true);
            }
        });

        if (typeof mobileQuery.addEventListener === "function") {
            mobileQuery.addEventListener("change", syncMenu);
        } else {
            mobileQuery.addListener(syncMenu);
        }
        syncMenu();
    }

    function renderFooter() {
        const footer = document.querySelector("footer");
        if (!footer) return;
        if (footer.hidden || footer.dataset.shell === "false") return;

        footer.className = "site-footer";
        footer.innerHTML = `
            <div class="site-footer__glow" aria-hidden="true"></div>
            <div class="container">
                <div class="site-footer__cta">
                    <div>
                        <h2>Ready to run growth on one system?</h2>
                        <p>Start your 14-day free trial, or talk to our team about a plan built around your business.</p>
                    </div>
                    <div class="site-footer__cta-actions">
                        <a class="site-footer__cta-primary" href="${siteHref("trial.html")}">Start Free Trial</a>
                        <a class="site-footer__cta-ghost" href="${siteHref("contact.html#contact-form")}">Talk to Sales</a>
                    </div>
                </div>

                <div class="site-footer__grid">
                    <div class="site-footer__brand">
                        <a href="${siteHref("index.html")}" aria-label="Kyntlo home">
                            <img src="assets/kyntlo-logo-cropped.png" alt="Kyntlo">
                        </a>
                        <p>An AI-powered growth platform for CRM, conversations, booking, funnels, and automation.</p>
                        <ul class="site-footer__contact">
                            <li><span aria-hidden="true">✉</span><a href="mailto:contact@kyntlo.ai">contact@kyntlo.ai</a></li>
                            <li><span aria-hidden="true">⌖</span><a href="https://maps.app.goo.gl/1wYuZVjADThQcFWq8" target="_blank" rel="noopener noreferrer">Building Lotus2 North90, After Chill Out Lotus,<br>Cairo Governorate 11234, Egypt</a></li>
                        </ul>
                        <div class="site-footer__social" aria-label="Kyntlo on social media">
                            <a href="https://www.facebook.com/people/Kyntlo/61590216517723/" target="_blank" rel="noopener noreferrer" aria-label="Kyntlo on Facebook"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5h1.65V3.6c-.29-.04-1.27-.12-2.41-.12-2.38 0-4.01 1.45-4.01 4.12v2.3H7.6V13h2.68v8h3.22z"/></svg></a>
                            <a href="https://www.instagram.com/kyntlo.ai/" target="_blank" rel="noopener noreferrer" aria-label="Kyntlo on Instagram"><svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" stroke="none"/></svg></a>
                            <a href="https://youtube.com/@kyntlo" target="_blank" rel="noopener noreferrer" aria-label="Kyntlo on YouTube"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 00-1.75-1.77C18.28 5 12 5 12 5s-6.28 0-7.85.43A2.5 2.5 0 002.4 7.2 26.1 26.1 0 002 12a26.1 26.1 0 00.4 4.8 2.5 2.5 0 001.75 1.77C5.72 19 12 19 12 19s6.28 0 7.85-.43a2.5 2.5 0 001.75-1.77A26.1 26.1 0 0022 12a26.1 26.1 0 00-.4-4.8zM10.1 14.9V9.1l5.02 2.9-5.02 2.9z"/></svg></a>
                            <a href="https://www.linkedin.com/company/kyntlo/" target="_blank" rel="noopener noreferrer" aria-label="Kyntlo on LinkedIn"><svg viewBox="0 0 24 24" width="17" height="17" fill="currentColor" aria-hidden="true"><path d="M6.94 8.5H4.06V20h2.88V8.5zM5.5 4a1.67 1.67 0 100 3.34A1.67 1.67 0 005.5 4zM20 20h-2.88v-5.6c0-1.34-.03-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V20H10.2V8.5h2.77v1.57h.04c.39-.73 1.33-1.5 2.74-1.5 2.93 0 3.47 1.93 3.47 4.43V20z"/></svg></a>
                        </div>
                    </div>

                    <nav class="site-footer__col" aria-label="Platform">
                        <h2 class="site-footer__title">${t("platform")}</h2>
                        <ul class="site-footer__links">
                            <li><a href="${siteHref("index.html#features")}">${t("features")}</a></li>
                            <li><a href="${siteHref("funnels.html")}">${t("funnels")}</a></li>
                            <li><a href="${siteHref("pricing.html")}">${t("pricing")}</a></li>
                            <li><a href="${siteHref("compare.html")}">${t("compare")}</a></li>
                        </ul>
                    </nav>

                    <nav class="site-footer__col" aria-label="Company">
                        <h2 class="site-footer__title">Company</h2>
                        <ul class="site-footer__links">
                            <li><a href="${siteHref("about.html")}">About Kyntlo</a></li>
                            <li><a href="${siteHref("contact.html")}">${t("contact")}</a></li>
                            <li><a href="${siteHref("security.html")}">${t("security")}</a></li>
                            <li><a href="${siteHref("faq.html")}">${t("faq")}</a></li>
                        </ul>
                    </nav>

                    <nav class="site-footer__col" aria-label="Get started">
                        <h2 class="site-footer__title">Get Started</h2>
                        <ul class="site-footer__links">
                            <li><a href="${siteHref("trial.html")}">${t("startTrial")}</a></li>
                            <li><a href="${siteHref(REQUEST_DEMO_HREF)}">${t("requestDemo")}</a></li>
                            <li><a href="${LOGIN_HREF}">${t("login")}</a></li>
                        </ul>
                    </nav>

                    <nav class="site-footer__col" aria-label="Legal">
                        <h2 class="site-footer__title">${t("legal")}</h2>
                        <ul class="site-footer__links">
                            <li><a href="${siteHref("privacy.html")}">Privacy Policy</a></li>
                            <li><a href="${siteHref("terms.html")}">Terms of Use</a></li>
                            <li><a href="${siteHref("cookies.html")}">Cookie Policy</a></li>
                            <li><a href="${siteHref("refund.html")}">Refund Policy</a></li>
                            <li><a href="${siteHref("dpa.html")}">Data Processing Agreement</a></li>
                            <li><a href="${siteHref("accessibility.html")}">Accessibility</a></li>
                        </ul>
                    </nav>
                </div>

                <div class="site-footer__bottom">
                    <p>&copy; 2026 Kyntlo for Artificial Intelligence Tools. All rights reserved.</p>
                    <div class="site-footer__bottom-links">
                        <a href="mailto:Sales@Kyntlo.ai">${t("salesInquiry")}</a>
                        <a href="mailto:Support@Kyntlo.ai">${t("contactSupport")}</a>
                        <a href="${siteHref("privacy.html")}">Privacy</a>
                        <a href="${siteHref("terms.html")}">Terms</a>
                    </div>
                </div>
            </div>
        `;
    }

    function addScreenReaderUtility() {
        if (document.getElementById("site-shell-utilities")) return;
        const style = document.createElement("style");
        style.id = "site-shell-utilities";
        style.textContent = `
            .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
            .comparison-master,.comparison-table-wrap{-webkit-overflow-scrolling:touch;touch-action:pan-x}
            .comparison-master.is-dragging,.comparison-table-wrap.is-dragging{cursor:grabbing;user-select:none}
            .kyn-page-loader{position:fixed;inset:0;z-index:100001;display:grid;place-items:center;background:radial-gradient(circle at 50% 42%,rgba(242,0,137,.14),transparent 42%),radial-gradient(circle at 20% 80%,rgba(109,0,193,.12),transparent 40%),#07050f;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .32s ease,visibility .32s ease}
            .kyn-page-loader__card{display:grid;gap:22px;place-items:center;transform:translateY(10px) scale(.97);transition:transform .5s cubic-bezier(.2,.8,.2,1)}
            .kyn-page-loader img{width:min(230px,50vw);height:auto;filter:brightness(0) invert(1) drop-shadow(0 18px 40px rgba(242,0,137,.35));animation:kynLogoBreathe 1.65s ease-in-out infinite}
            .kyn-page-loader__dest{min-height:1.5em;font-family:'JetBrains Mono',monospace;font-size:.8rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;color:#a49fb8;opacity:0;transform:translateY(6px);transition:opacity .42s ease .12s,transform .42s ease .12s}
            body.kyn-leaving .kyn-page-loader__dest,body.kyn-loading .kyn-page-loader__dest{opacity:1;transform:translateY(0)}
            .kyn-page-loader__dest b{background:linear-gradient(135deg,#f20089,#b06bff);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent}
            .kyn-page-loader__bar{width:190px;height:4px;border-radius:999px;background:rgba(255,255,255,.08);overflow:hidden}
            .kyn-page-loader__bar::before{content:"";display:block;width:42%;height:100%;border-radius:inherit;background:linear-gradient(135deg,#f20089,#6d00c1);animation:kynLoaderBar 1.15s ease-in-out infinite}
            body.kyn-loading .kyn-page-loader,body.kyn-leaving .kyn-page-loader{opacity:1;visibility:visible;pointer-events:auto}
            body.kyn-instant .kyn-page-loader,body.kyn-instant .kyn-page-loader__card{transition:none!important}
            body.kyn-loading .kyn-page-loader__card,body.kyn-leaving .kyn-page-loader__card{transform:translateY(0) scale(1)}
            @keyframes kynLogoBreathe{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
            @keyframes kynLoaderBar{0%{transform:translateX(-120%)}100%{transform:translateX(260%)}}
        `;
        document.head.appendChild(style);
    }

    const KYN_PAGE_NAMES = {
        "index": "Home", "": "Home", "funnels": "Funnels", "pricing": "Pricing",
        "contact": "Contact", "about": "About", "checkout": "Checkout",
        "trial": "Free Trial", "get-started": "Get Started", "login": "Login",
        "faq": "FAQ", "compare": "Compare",
        "security": "Security", "privacy": "Privacy Policy", "terms": "Terms of Use",
        "refund": "Refund Policy", "cookies": "Cookie Policy", "accessibility": "Accessibility",
        "package-starter": "Starter Package", "package-growth": "Growth Package",
        "package-pro": "Pro Package", "package-scale": "Customized Package"
    };

    function kynPageName(pathname) {
        const slug = (pathname.split("/").pop() || "index").replace(".html", "");
        return KYN_PAGE_NAMES[slug] || slug.replace(/-/g, " ");
    }

    function setupPageTransitions() {
        if (document.querySelector(".kyn-page-loader")) return;

        document.body.classList.add("kyn-loading");
        const loader = document.createElement("div");
        loader.className = "kyn-page-loader";
        loader.setAttribute("aria-hidden", "true");
        loader.innerHTML = `
            <div class="kyn-page-loader__card">
                <img src="assets/kyntlo-logo-cropped.png" alt="">
                <div class="kyn-page-loader__dest" aria-live="polite"></div>
                <div class="kyn-page-loader__bar"></div>
            </div>
        `;
        document.body.prepend(loader);

        const arrivalLabel = loader.querySelector(".kyn-page-loader__dest");
        if (arrivalLabel) {
            arrivalLabel.innerHTML = "<b>" + kynPageName(window.location.pathname) + "</b>";
        }

        function hideLoader() {
            document.body.classList.remove("kyn-loading");
        }

        /* Back/forward restores from bfcache without firing `load`, which used to
           leave the overlay stuck on screen. Clear it explicitly on pageshow. */
        window.addEventListener("pageshow", function (event) {
            if (event.persisted) {
                /* restored from bfcache: the page is already painted, so drop the
                   overlay immediately instead of replaying the fade */
                document.body.classList.add("kyn-instant");
                document.body.classList.remove("kyn-leaving");
                hideLoader();
                window.setTimeout(function () {
                    document.body.classList.remove("kyn-instant");
                }, 60);
            }
        });
        /* If the browser starts a back navigation, drop the leaving overlay too. */
        window.addEventListener("popstate", function () {
            document.body.classList.remove("kyn-leaving");
            hideLoader();
        });
        /* Safety net: never let the overlay outlive the page. */
        window.setTimeout(hideLoader, 2500);

        if (document.readyState === "complete") {
            window.setTimeout(hideLoader, 320);
        } else {
            window.addEventListener("load", function () {
                window.setTimeout(hideLoader, 320);
            }, { once: true });
            window.setTimeout(hideLoader, 1800);
        }

        document.addEventListener("click", function (event) {
            const link = event.target.closest("a[href]");
            if (!link) return;
            if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            if (link.target && link.target !== "_self") return;
            if (link.hasAttribute("download")) return;

            const href = link.getAttribute("href") || "";
            if (!href || href.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(href)) return;

            let nextUrl;
            try {
                nextUrl = new URL(href, window.location.href);
            } catch (error) {
                return;
            }

            if (nextUrl.origin !== window.location.origin) return;
            if (nextUrl.pathname === window.location.pathname && nextUrl.search === window.location.search && nextUrl.hash) return;

            event.preventDefault();
            const destLabel = loader.querySelector(".kyn-page-loader__dest");
            if (destLabel) {
                destLabel.innerHTML = "Taking you to <b>" + kynPageName(nextUrl.pathname) + "</b>";
            }
            document.body.classList.add("kyn-leaving");
            window.setTimeout(function () {
                window.location.href = nextUrl.href;
            }, 620);
        });
    }

    function loadSilktideConsentManager() {
        if (!document.querySelector('link[rel="preconnect"][href="https://cdn.jsdelivr.net"]')) {
            const preconnect = document.createElement("link");
            preconnect.rel = "preconnect";
            preconnect.href = "https://cdn.jsdelivr.net";
            preconnect.crossOrigin = "anonymous";
            document.head.appendChild(preconnect);
        }

        if (!document.getElementById("silktide-consent-manager-css")) {
            const stylesheet = document.createElement("link");
            stylesheet.rel = "stylesheet";
            stylesheet.id = "silktide-consent-manager-css";
            stylesheet.href = "https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.css";
            stylesheet.integrity = "sha384-EdMq+R+YOnsbelo08wPenoTlnxbAyxI11NMIxzugx/qAsbh64KcOkqxYqq6pfvO/";
            stylesheet.crossOrigin = "anonymous";
            document.head.appendChild(stylesheet);
        }

        if (!document.getElementById("silktide-consent-manager-overrides")) {
            const overrides = document.createElement("style");
            overrides.id = "silktide-consent-manager-overrides";
            overrides.textContent = `
                #stcm-wrapper {
                  --boxShadow: -5px 5px 10px 0px #00000012, 0px 0px 50px 0px #0000001a;
                  --fontFamily: Helvetica Neue, Segoe UI, Arial, sans-serif;
                  --primaryColor: #B000A5;
                  --backgroundColor: #ffffff;
                  --textColor: #253b48;
                  --backdropBackgroundColor: #00000033;
                  --backdropBackgroundBlur: 0px;
                  --iconColor: #b000a5;
                  --iconBackgroundColor: #ffffff;
                }
                #stcm-wrapper [class*="icon"],
                #stcm-wrapper button[aria-label*="cookie" i],
                #stcm-wrapper button[aria-label*="preferences" i] {
                  left: 20px !important;
                  right: auto !important;
                  bottom: 20px !important;
                }
                #stcm-wrapper:has([role="dialog"]) [class*="icon"],
                #stcm-wrapper:has([aria-modal="true"]) [class*="icon"],
                #stcm-wrapper:has([class*="prompt"]) [class*="icon"] {
                  display: none !important;
                }
            `;
            document.head.appendChild(overrides);
        }

        function initConsentManager() {
            if (window.__kyntloSilktideConsentReady) return;
            if (!window.silktideConsentManager || typeof window.silktideConsentManager.init !== "function") return;

            window.__kyntloSilktideConsentReady = true;
            window.silktideConsentManager.init({
                backdrop: {
                    show: true
                },
                icon: {
                    position: "bottomLeft"
                },
                prompt: {
                    position: "bottomCenter"
                },
                consentTypes: [
                    {
                        id: "essential",
                        label: "Essential",
                        description: "<p>These cookies are necessary for the website to function properly and cannot be switched off. They help with things like logging in and setting your privacy preferences.</p>",
                        required: true,
                        onAccept: function () {}
                    },
                    {
                        id: "analytics",
                        label: "Analytics",
                        description: "<p>These cookies help us improve the site by tracking which pages are most popular and how visitors move around the site.</p>",
                        /* No defaultValue: consent has to be given, not assumed.
                           A pre-ticked analytics box is not valid consent under GDPR/ePrivacy. */
                        gtag: "analytics_storage"
                    },
                    {
                        id: "marketing",
                        label: "Marketing",
                        description: "<p>These cookies are used by us and our advertising partners to show you relevant ads on this site and elsewhere, and to measure how those campaigns perform.</p>",
                        gtag: [
                            "ad_storage",
                            "ad_user_data",
                            "ad_personalization"
                        ]
                    }
                ],
                text: {
                    prompt: {
                        description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic.</p>",
                        acceptAllButtonText: "Accept all",
                        acceptAllButtonAccessibleLabel: "Accept all cookies",
                        rejectNonEssentialButtonText: "Reject non-essential",
                        rejectNonEssentialButtonAccessibleLabel: "Reject all non-essential cookies",
                        preferencesButtonText: "Preferences",
                        preferencesButtonAccessibleLabel: "Toggle preferences"
                    },
                    preferences: {
                        title: "Customize your cookie preferences",
                        description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",
                        saveButtonText: "Save and close",
                        saveButtonAccessibleLabel: "Save your cookie preferences",
                        creditLinkText: "Get this banner for free",
                        creditLinkAccessibleLabel: "Get this banner for free"
                    }
                }
            });
        }

        let script = document.getElementById("silktide-consent-manager-js");
        if (script) {
            initConsentManager();
            script.addEventListener("load", initConsentManager, { once: true });
            return;
        }

        script = document.createElement("script");
        script.id = "silktide-consent-manager-js";
        script.src = "https://cdn.jsdelivr.net/gh/silktide/consent-manager@v2.0.1/silktide-consent-manager.js";
        script.integrity = "sha384-5Pt34uiIbCsvfiiZXoLi4HRf/YBXjr9c8e+gYeVo9smUaInNHYVtc8NZ8wUnXJIq";
        script.crossOrigin = "anonymous";
        script.addEventListener("load", initConsentManager, { once: true });
        document.head.appendChild(script);
    }

    function loadChatWidget() {
        if (document.querySelector('script[data-widget-id="6a579e7ad166a8719f6ed338"]')) return;

        const script = document.createElement("script");
        script.src = "https://widgets.leadconnectorhq.com/loader.js";
        script.setAttribute("data-resources-url", "https://widgets.leadconnectorhq.com/chat-widget/loader.js");
        script.setAttribute("data-widget-id", "6a579e7ad166a8719f6ed338");
        document.body.appendChild(script);
    }

    function setupHorizontalDrag() {
        const scrollers = document.querySelectorAll(".comparison-master, .comparison-table-wrap");
        scrollers.forEach((scroller) => {
            if (scroller.dataset.dragReady === "true") return;
            scroller.dataset.dragReady = "true";

            let isDragging = false;
            let startX = 0;
            let startScrollLeft = 0;

            scroller.addEventListener("pointerdown", function (event) {
                if (event.button !== 0 || scroller.scrollWidth <= scroller.clientWidth) return;
                isDragging = true;
                startX = event.clientX;
                startScrollLeft = scroller.scrollLeft;
                scroller.classList.add("is-dragging");
                scroller.setPointerCapture(event.pointerId);
            });

            scroller.addEventListener("pointermove", function (event) {
                if (!isDragging) return;
                scroller.scrollLeft = startScrollLeft - (event.clientX - startX);
            });

            function stopDrag(event) {
                if (!isDragging) return;
                isDragging = false;
                scroller.classList.remove("is-dragging");
                if (scroller.hasPointerCapture(event.pointerId)) {
                    scroller.releasePointerCapture(event.pointerId);
                }
            }

            scroller.addEventListener("pointerup", stopDrag);
            scroller.addEventListener("pointercancel", stopDrag);
        });
    }

    /* The brand cursor: a pink dot that tracks the pointer exactly, plus a ring that
       eases in behind it. Fine pointers only, and never when reduced motion is asked
       for - the CSS hands the system cursor back in both of those cases. */
    function setupBrandCursor() {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        if (document.querySelector(".kyn-cursor")) return;

        const dot = document.createElement("div");
        dot.className = "kyn-cursor";
        const ring = document.createElement("div");
        ring.className = "kyn-cursor-ring";
        dot.setAttribute("aria-hidden", "true");
        ring.setAttribute("aria-hidden", "true");
        document.body.append(ring, dot);

        const INTERACTIVE = 'a, button, select, summary, [role="button"], .billing-card, .tool-badge';
        let x = window.innerWidth / 2, y = window.innerHeight / 2;
        let ringX = x, ringY = y, raf = 0;

        function frame() {
            /* the ring lags by a fixed fraction each frame, which reads as weight */
            ringX += (x - ringX) * 0.18;
            ringY += (y - ringY) * 0.18;
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
            raf = window.requestAnimationFrame(frame);
        }

        document.addEventListener("pointermove", function (event) {
            if (event.pointerType !== "mouse") return;
            x = event.clientX;
            y = event.clientY;
            dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
            if (!document.body.classList.contains("kyn-cursor-ready")) {
                ringX = x; ringY = y;
                document.body.classList.add("kyn-cursor-ready");
                if (!raf) raf = window.requestAnimationFrame(frame);
            }
            document.body.classList.remove("kyn-cursor-hidden");
            const over = event.target.closest && event.target.closest(INTERACTIVE);
            document.body.classList.toggle("kyn-cursor-active", !!over);
        }, { passive: true });

        /* leaving the window, or switching to a tab, should not leave a dot stranded */
        document.addEventListener("pointerleave", function () {
            document.body.classList.add("kyn-cursor-hidden");
        });
        window.addEventListener("blur", function () {
            document.body.classList.add("kyn-cursor-hidden");
        });
        document.addEventListener("visibilitychange", function () {
            if (document.hidden) {
                window.cancelAnimationFrame(raf);
                raf = 0;
            } else if (!raf) {
                raf = window.requestAnimationFrame(frame);
            }
        });
    }

    function setupScrollState() {
        var ticking = false;
        var scrolled = null;
        function apply() {
            ticking = false;
            var next = window.scrollY > 24;
            if (next === scrolled) return;   // only touch the DOM when the state actually flips
            scrolled = next;
            document.body.classList.toggle("kyn-scrolled", next);
        }
        function onScroll() {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(apply);
        }
        window.addEventListener("scroll", onScroll, { passive: true });
        apply();
    }

    cleanPublicUrl();
    ensureFavicon();
    ensureSharePreview();
    addScreenReaderUtility();
    ensureSkipLink();
    setupPageTransitions();
    renderNavigation();
    renderFooter();
    setupSiteLocale();
    setupScrollState();
    setupHorizontalDrag();
    setupBrandCursor();
    loadChatWidget();
    loadSilktideConsentManager();
})();
