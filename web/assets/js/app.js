(() => {
    const form = document.getElementById("registrationForm");
    const topAlert = document.getElementById("topAlert");
    const submitBtn = document.getElementById("submitBtn");

    const els = {
        firstName: document.getElementById("firstName"),
        lastName: document.getElementById("lastName"),
        email: document.getElementById("email"),
        countryCode: document.getElementById("countryCode"),
        phone: document.getElementById("phone"),
        age: document.getElementById("age"),
        gender: () => form.querySelector("input[name='gender']:checked"),
        address: document.getElementById("address"),
        country: document.getElementById("country"),
        state: document.getElementById("state"),
        city: document.getElementById("city"),
        password: document.getElementById("password"),
        confirmPassword: document.getElementById("confirmPassword"),
        terms: document.getElementById("terms"),
        strengthBar: document.getElementById("strengthBar"),
        strengthLabel: document.getElementById("strengthLabel"),
    };

    const errors = {
        firstName: document.getElementById("firstNameError"),
        lastName: document.getElementById("lastNameError"),
        email: document.getElementById("emailError"),
        phone: document.getElementById("phoneError"),
        age: document.getElementById("ageError"),
        gender: document.getElementById("genderError"),
        country: document.getElementById("countryError"),
        state: document.getElementById("stateError"),
        city: document.getElementById("cityError"),
        password: document.getElementById("passwordError"),
        confirmPassword: document.getElementById("confirmPasswordError"),
        terms: document.getElementById("termsError"),
    };

    // Dynamic dropdown data (simple, assignment-friendly)
    const LOCATION = {
        India: {
            Karnataka: ["Bengaluru", "Mysuru", "Mangaluru"],
            Maharashtra: ["Mumbai", "Pune", "Nagpur"],
            Delhi: ["New Delhi", "Dwarka", "Rohini"],
        },
        USA: {
            California: ["Los Angeles", "San Francisco", "San Diego"],
            Texas: ["Austin", "Dallas", "Houston"],
            "New York": ["New York City", "Buffalo", "Albany"],
        },
        UK: {
            England: ["London", "Manchester", "Birmingham"],
            Scotland: ["Edinburgh", "Glasgow", "Aberdeen"],
            Wales: ["Cardiff", "Swansea", "Newport"],
        },
    };

    // Small disposable list (easy to explain + extend)
    const DISPOSABLE_DOMAINS = new Set([
        "mailinator.com",
        "tempmail.com",
        "10minutemail.com",
        "guerrillamail.com",
        "yopmail.com",
    ]);

    function showTopAlert(message, variant) {
        topAlert.hidden = false;
        topAlert.textContent = message;
        if (variant === "success") {
            topAlert.style.borderColor = "rgba(39, 197, 139, 0.40)";
            topAlert.style.background = "rgba(39, 197, 139, 0.14)";
        } else {
            topAlert.style.borderColor = "rgba(255, 77, 77, 0.35)";
            topAlert.style.background = "rgba(255, 77, 77, 0.12)";
        }
    }

    function hideTopAlert() {
        topAlert.hidden = true;
        topAlert.textContent = "";
    }

    function fieldWrap(inputEl) {
        if (!inputEl) return null;
        if (typeof inputEl.closest !== "function") return null;
        return inputEl.closest(".field");
    }

    function setError(key, message) {
        const el = errors[key];
        if (el) el.textContent = message || "";

        let inputEl = null;
        if (key === "gender") inputEl = form.querySelector("[data-testid='genderGroup']");
        else if (key === "terms") inputEl = els.terms;
        else inputEl = els[key];

        const wrap = fieldWrap(inputEl);
        if (wrap) {
            if (message) wrap.classList.add("invalid");
            else wrap.classList.remove("invalid");
        }
    }

    function clearAllErrors() {
        Object.keys(errors).forEach((k) => setError(k, ""));
        // Don't hide the top alert here. We want success alerts to remain visible
        // even after form reset (automation needs to validate it).
    }

    function trim(v) {
        return (v == null ? "" : v).toString().trim();
    }

    function isEmailFormatOk(email) {
        // Basic RFC-ish check; avoids rejecting valid-but-uncommon addresses.
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isDisposableEmail(email) {
        const at = email.lastIndexOf("@");
        if (at < 0) return false;
        const domain = email.slice(at + 1).toLowerCase();
        return DISPOSABLE_DOMAINS.has(domain);
    }

    function phoneRules() {
        const opt = els.countryCode.options[els.countryCode.selectedIndex];
        const ds = opt && opt.dataset ? opt.dataset : {};
        const minlen = Number(ds.minlen != null ? ds.minlen : 10);
        const maxlen = Number(ds.maxlen != null ? ds.maxlen : 10);
        return { minlen, maxlen, code: els.countryCode.value };
    }

    function scorePassword(pw) {
        const s = trim(pw);
        let score = 0;
        if (s.length >= 8) score++;
        if (s.length >= 12) score++;
        if (/[a-z]/.test(s)) score++;
        if (/[A-Z]/.test(s)) score++;
        if (/\d/.test(s)) score++;
        if (/[^A-Za-z0-9]/.test(s)) score++;

        // Cap to 5 for a simple meter.
        score = Math.min(score, 5);
        let label = "Weak";
        if (score >= 4) label = "Strong";
        else if (score >= 3) label = "Medium";
        return { score, label };
    }

    function renderStrength() {
        const { score, label } = scorePassword(els.password.value);
        const pct = (score / 5) * 100;
        els.strengthBar.style.width = `${pct}%`;
        if (label === "Strong") els.strengthBar.style.background = "linear-gradient(90deg, #27c58b, #7c5cff)";
        else if (label === "Medium") els.strengthBar.style.background = "linear-gradient(90deg, #ffb84d, #7c5cff)";
        else els.strengthBar.style.background = "linear-gradient(90deg, #ff4d4d, #ffb84d)";
        els.strengthLabel.textContent = `Strength: ${trim(els.password.value) ? label : "—"}`;
    }

    function fillSelect(selectEl, options, placeholder) {
        selectEl.innerHTML = "";
        const ph = document.createElement("option");
        ph.value = "";
        ph.textContent = placeholder;
        selectEl.appendChild(ph);
        options.forEach((opt) => {
            const o = document.createElement("option");
            o.value = opt;
            o.textContent = opt;
            selectEl.appendChild(o);
        });
    }

    function initLocationDropdowns() {
        const countries = Object.keys(LOCATION);
        fillSelect(els.country, countries, "Select country");
        fillSelect(els.state, [], "Select state");
        fillSelect(els.city, [], "Select city");
    }

    function updateStates() {
        const country = els.country.value;
        const states = country && LOCATION[country] ? Object.keys(LOCATION[country]) : [];
        fillSelect(els.state, states, "Select state");
        fillSelect(els.city, [], "Select city");
    }

    function updateCities() {
        const country = els.country.value;
        const state = els.state.value;
        const cities =
            country && state && LOCATION[country] && LOCATION[country][state] ?
            LOCATION[country][state] :
            [];
        fillSelect(els.city, cities, "Select city");
    }

    function validateFirstName() {
        const v = trim(els.firstName.value);
        if (!v) return setError("firstName", "First Name is required."), false;
        if (!/^[A-Za-z][A-Za-z\s'.-]{1,49}$/.test(v))
            return setError("firstName", "Enter a valid first name."), false;
        setError("firstName", "");
        return true;
    }

    function validateLastName() {
        const v = trim(els.lastName.value);
        if (!v) return setError("lastName", "Last Name is required."), false;
        if (!/^[A-Za-z][A-Za-z\s'.-]{1,49}$/.test(v))
            return setError("lastName", "Enter a valid last name."), false;
        setError("lastName", "");
        return true;
    }

    function validateEmail() {
        const v = trim(els.email.value).toLowerCase();
        if (!v) return setError("email", "Email is required."), false;
        if (!isEmailFormatOk(v)) return setError("email", "Enter a valid email address."), false;
        if (isDisposableEmail(v)) return setError("email", "Disposable email domains are not allowed."), false;
        setError("email", "");
        return true;
    }

    function validatePhone() {
        const v = trim(els.phone.value);
        const rules = phoneRules();
        if (!v) return setError("phone", "Phone Number is required."), false;
        if (!/^\d+$/.test(v)) return setError("phone", "Phone must contain digits only."), false;
        if (v.length < rules.minlen || v.length > rules.maxlen)
            return setError("phone", `Phone length must be ${rules.minlen}-${rules.maxlen} digits for ${rules.code}.`), false;
        setError("phone", "");
        return true;
    }

    function validateAge() {
        const raw = trim(els.age.value);
        if (!raw) return setError("age", ""), true; // optional
        const n = Number(raw);
        if (!Number.isFinite(n) || n < 1 || n > 120) return setError("age", "Age must be between 1 and 120."), false;
        setError("age", "");
        return true;
    }

    function validateGender() {
        if (!els.gender()) return setError("gender", "Please select a gender."), false;
        setError("gender", "");
        return true;
    }

    function validateCountryStateCity() {
        let ok = true;
        if (!els.country.value)(setError("country", "Country is required."), (ok = false));
        else setError("country", "");

        if (!els.state.value)(setError("state", "State is required."), (ok = false));
        else setError("state", "");

        if (!els.city.value)(setError("city", "City is required."), (ok = false));
        else setError("city", "");
        return ok;
    }

    function validatePassword() {
        const pw = trim(els.password.value);
        if (!pw) return setError("password", "Password is required."), false;
        if (pw.length < 8) return setError("password", "Password must be at least 8 characters."), false;
        const { label } = scorePassword(pw);
        if (label === "Weak") return setError("password", "Password is too weak. Add uppercase, digits, or symbols."), false;
        setError("password", "");
        return true;
    }

    function validateConfirmPassword() {
        const pw = trim(els.password.value);
        const cpw = trim(els.confirmPassword.value);
        if (!cpw) return setError("confirmPassword", "Confirm Password is required."), false;
        if (pw !== cpw) return setError("confirmPassword", "Passwords do not match."), false;
        setError("confirmPassword", "");
        return true;
    }

    function validateTerms() {
        if (!els.terms.checked) return setError("terms", "You must accept Terms & Conditions."), false;
        setError("terms", "");
        return true;
    }

    function validateAll({ showSummary } = { showSummary: false }) {
        const results = [
            validateFirstName(),
            validateLastName(),
            validateEmail(),
            validatePhone(),
            validateAge(),
            validateGender(),
            validateCountryStateCity(),
            validatePassword(),
            validateConfirmPassword(),
            validateTerms(),
        ];
        const ok = results.every(Boolean);
        if (showSummary) {
            if (!ok) showTopAlert("Please fix the highlighted fields before submitting.", "error");
            else hideTopAlert();
        }
        submitBtn.disabled = !ok;
        return ok;
    }

    // Wire events (real-time feedback)
    els.firstName.addEventListener("input", () => (validateFirstName(), validateAll()));
    els.lastName.addEventListener("input", () => (validateLastName(), validateAll()));
    els.email.addEventListener("input", () => (validateEmail(), validateAll()));
    els.countryCode.addEventListener("change", () => (validatePhone(), validateAll()));
    els.phone.addEventListener("input", () => (validatePhone(), validateAll()));
    els.age.addEventListener("input", () => (validateAge(), validateAll()));
    form.querySelectorAll("input[name='gender']").forEach((r) => r.addEventListener("change", () => (validateGender(), validateAll())));
    els.country.addEventListener("change", () => {
        updateStates();
        validateCountryStateCity();
        validateAll();
    });
    els.state.addEventListener("change", () => {
        updateCities();
        validateCountryStateCity();
        validateAll();
    });
    els.city.addEventListener("change", () => (validateCountryStateCity(), validateAll()));
    els.password.addEventListener("input", () => {
        renderStrength();
        validatePassword();
        validateConfirmPassword();
        validateAll();
    });
    els.confirmPassword.addEventListener("input", () => (validateConfirmPassword(), validateAll()));
    els.terms.addEventListener("change", () => (validateTerms(), validateAll()));

    form.addEventListener("reset", () => {
        // Reset happens before DOM updates, so defer.
        setTimeout(() => {
            clearAllErrors();
            renderStrength();
            initLocationDropdowns();
            submitBtn.disabled = true;
        }, 0);
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const ok = validateAll({ showSummary: true });
        if (!ok) return;
        showTopAlert("Registration Successful! Your profile has been submitted successfully.", "success");
        form.reset();
    });

    // Initial state
    initLocationDropdowns();
    renderStrength();
    validateAll();
})();