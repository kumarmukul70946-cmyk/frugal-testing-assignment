# Intelligent Registration System (Project 2) — Assignment Write‑Up

## 1) Project Overview

The Intelligent Registration System is a responsive web-based registration form that collects user information with strong client-side validations. It improves user experience using real-time feedback (inline error messages, field highlighting, and submit button gating) and prevents invalid submissions.  
The project also includes Selenium WebDriver automation (Java) to validate negative, positive, and UI logic scenarios.

## 2) Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Automation Tool**: Selenium WebDriver
- **Automation Language**: Java
- **Framework/Runner**: JUnit 5
- **Design Pattern**: Page Object Model (POM)
- **Browser**: Google Chrome
- **Build Tool**: Maven
- **Version Control (optional)**: GitHub

## 3) Web Page Development (Part 1)

### a) Form Fields Implemented

- First Name (**Required**)
- Last Name (**Required**)
- Email (**Required**, blocks disposable domains)
- Phone Number (**Required**, validated by selected country code)
- Age (optional)
- Gender (**Required**)
- Address (optional)
- Country → State → City (**Dynamic Dropdowns**)
- Password & Confirm Password (**Required**)
- Terms & Conditions (**Required**)

### b) Client-Side Validations

- Required fields highlighted in **red** when invalid
- Inline error messages shown under invalid fields
- Submit button disabled until all required validations pass
- Email validation blocks disposable domains (example list included)
- Phone digits-only validation and length validation based on country code
- Password strength meter (Weak / Medium / Strong)
- Confirm password must match password

### c) User Feedback

- ❌ Top + inline error prompt when form is invalid
- ✅ Success message: **“Registration Successful! Your profile has been submitted successfully.”**
- Form resets automatically after a successful submission

## 4) Automation Testing (Part 2)

### Automation Framework & Design

- Selenium WebDriver with Java
- Page Object Model (POM) for clean reusable code
- Explicit waits used to avoid synchronization issues
- Screenshots captured and stored for evidence

### Automation Flow A: Negative Scenario (Missing Last Name)

1. Launch registration page
2. Print page URL and title
3. Fill all fields except **Last Name**
4. Verify inline error message for **Last Name**
5. Verify Submit remains disabled
6. Capture screenshot: **error-state_YYYYMMDD_HHMMSS.png**

### Automation Flow B: Positive Scenario

1. Fill all fields with valid data
2. Match Password and Confirm Password
3. Accept Terms & Conditions
4. Submit
5. Verify success message appears
6. Verify form reset (submit disabled again)
7. Capture screenshot: **success-state_YYYYMMDD_HHMMSS.png**

### Automation Flow C: Form Logic Validation

1. Change Country → verify State dropdown updates
2. Change State → verify City dropdown updates
3. Validate password strength indicator updates
4. Enter wrong Confirm Password → verify mismatch error
5. Capture screenshot: **logic-state_YYYYMMDD_HHMMSS.png**

## 5) Test Reporting

- **Screenshots**: saved in `screenshots/` with timestamps
- **Logs**: console output prints URL and title (negative flow)
- **Test Report**: steps, expected vs actual, plus screenshots (template provided)

## 6) Submission Details

- Web source: `web/index.html`, `web/assets/css/styles.css`, `web/assets/js/app.js`
- Automation: `automation/` (Maven project)
- Screenshots: `screenshots/`
- Report: `report/` (write-up + template)

