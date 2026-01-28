# Intelligent Registration System

A robust, responsive registration system with real-time validations, automation-ready architecture, and a complete Selenium test suite.

🔗 **Live Demo:** [https://frugal-testing-assignment.vercel.app/](https://frugal-testing-assignment.vercel.app/)  
*(Note: If the link is different, please update it here)*

---

## 📋 Project Overview

This project is a full-stack QA validation assignment designed to demonstrate:

1. **Frontend Development:** A modern, responsive web form with complex logic.
2. **Client-Side Validation:** Real-time feedback, dependent dropdowns, and security checks.
3. **Test Automation:** A production-grade Selenium framework using the Page Object Model (POM).

## 🛠️ Tech Stack

### Frontend (Application)

* **HTML5 / CSS3:** Custom responsive design (Flexbox/Grid), no frameworks.
* **JavaScript (ES6+):** Vanilla JS for DOM manipulation and logic.
* **Hosting:** Vercel (Continuous Deployment).

### Automation (Testing)

* **Language:** Java (JDK 17)
* **Framework:** Selenium WebDriver 4.20
* **Runner:** JUnit 5
* **Build Tool:** Maven
* **Design Pattern:** Page Object Model (POM)

---

## ✨ Features & Validations

### Web Application

* **Dynamic Dropdowns:** State/City options populate based on Country selection.
* **Password Strength:** Visual meter detecting Weak/Medium/Strong passwords.
* **Disposable Email Check:** Blocks domains like `tempmail.com`, `yopmail.com`.
* **Phone Validation:** Enforces length constraints based on Country Code.
* **Real-time Feedback:** Inline error messages and success alerts.
* **Automation Friendly:** specific `data-testid` attributes on all elements.

### Automation Suite

* **Flow A (Negative):** Verifies error handling for missing fields.
* **Flow B (Positive):** Verifies successful submission and form reset.
* **Flow C (Logic):** Validates dropdown dependencies and password logic.
* **Auto-Screenshots:** captures evidence on every test run.

---

## 🚀 Quick Start

### 1. Web Application

The web app is hosted on Vercel, but you can run it locally:

```bash
cd web
# using python simple server
python -m http.server 5500
# Open http://localhost:5500
```

### 2. Run Automation Tests

Ensure you have **Java 17+** and **Maven** installed.

```bash
cd automation
mvn test
```

Test reports are generated in `automation/target/surefire-reports`.
Screenshots are saved in `automation/screenshots`.

---

## 📂 Project Structure

```
├── web/                  # Frontend Source Code
│   ├── index.html        # Main Form Structure
│   └── assets/           # CSS & JS Logic
│
├── automation/           # Selenium Java Suite
│   ├── src/test/java     # Test Scripts & Page Objects
│   └── pom.xml           # Maven Dependencies
│
├── screenshots/          # Automation Execution Evidence
└── README.md             # Documentation
```
