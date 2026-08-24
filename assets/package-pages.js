(function () {
    "use strict";

    const packageKey = document.body.dataset.package || "starter";
    if (packageKey === "custom" || packageKey === "scale") {
        window.location.replace("contact.html#contact-form");
        return;
    }
    const allowedPackages = ["starter", "growth", "pro"];
    const safePackage = allowedPackages.includes(packageKey) ? packageKey : "starter";
    window.location.replace(`checkout.html?package=${encodeURIComponent(safePackage)}&billing=quarterly`);
})();
