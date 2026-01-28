# Test Report Template — Intelligent Registration System

## Project Info

- **Project**: Intelligent Registration System (Project 2)
- **Tester**: <Your Name>
- **Date**: <DD-MMM-YYYY>
- **Browser**: Google Chrome
- **Automation**: Selenium WebDriver (Java), JUnit 5, POM

## Environment

- **OS**: Windows 10/11
- **App URL**: `http://localhost:5500/`
- **Build/Run**: Local static server (`python -m http.server 5500`)

## Test Summary

| Test Case ID | Scenario | Expected Result | Actual Result | Status | Screenshot |
|---|---|---|---|---|---|
| TC-NEG-01 | Missing Last Name | Last Name error shown; submit disabled |  |  | `error-state_*.png` |
| TC-POS-01 | Valid submission | Success message; form resets |  |  | `success-state_*.png` |
| TC-LOG-01 | Dropdown + password logic | Dependent dropdowns update; mismatch error; strength updates |  |  | `logic-state_*.png` |

## Detailed Test Cases

### TC-NEG-01 — Negative Scenario (Missing Last Name)

- **Steps**
  - Open registration page
  - Fill all fields except Last Name
  - Observe inline error
- **Expected**
  - Last Name error message displayed
  - Last Name field highlighted
  - Submit disabled
- **Actual**
  - <Fill during execution>
- **Evidence**
  - Screenshot: `screenshots/error-state_*.png`

### TC-POS-01 — Positive Scenario

- **Steps**
  - Fill all fields with valid data
  - Accept Terms
  - Click Submit
- **Expected**
  - Success message displayed
  - Form resets
- **Actual**
  - <Fill during execution>
- **Evidence**
  - Screenshot: `screenshots/success-state_*.png`

### TC-LOG-01 — Form Logic Validation

- **Steps**
  - Select country → verify state options update
  - Select state → verify city options update
  - Enter weak password → strength shows Weak
  - Enter strong password → strength shows Medium/Strong
  - Enter mismatching confirm password → error shown
- **Expected**
  - Dropdowns update correctly
  - Strength indicator updates
  - Confirm password mismatch error shown
- **Actual**
  - <Fill during execution>
- **Evidence**
  - Screenshot: `screenshots/logic-state_*.png`

