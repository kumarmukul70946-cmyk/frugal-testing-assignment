package com.frugal.pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class RegistrationPage {
  private final WebDriver driver;
  private final WebDriverWait wait;

  // Top alert
  private final By topAlert = byTestId("topAlert");

  // Inputs
  private final By firstName = byTestId("firstName");
  private final By lastName = byTestId("lastName");
  private final By email = byTestId("email");
  private final By countryCode = byTestId("countryCode");
  private final By phone = byTestId("phone");
  private final By age = byTestId("age");
  private final By address = byTestId("address");
  private final By country = byTestId("country");
  private final By state = byTestId("state");
  private final By city = byTestId("city");
  private final By password = byTestId("password");
  private final By confirmPassword = byTestId("confirmPassword");
  private final By terms = byTestId("terms");

  // Buttons
  private final By submitBtn = byTestId("submitBtn");
  private final By resetBtn = byTestId("resetBtn");

  // Errors (inline)
  private final By lastNameError = byTestId("lastNameError");
  private final By confirmPasswordError = byTestId("confirmPasswordError");
  private final By passwordStrength = byTestId("passwordStrength");

  // Gender radios
  private final By genderMale = byTestId("genderMale");
  private final By genderFemale = byTestId("genderFemale");
  private final By genderOther = byTestId("genderOther");

  public RegistrationPage(WebDriver driver) {
    this.driver = driver;
    this.wait = new WebDriverWait(driver, Duration.ofSeconds(10));
  }

  public void open(String url) {
    driver.get(url);
    wait.until(ExpectedConditions.visibilityOfElementLocated(submitBtn));
  }

  public String title() {
    return driver.getTitle();
  }

  public String url() {
    return driver.getCurrentUrl();
  }

  public void setFirstName(String v) {
    type(firstName, v);
  }

  public void setLastName(String v) {
    type(lastName, v);
  }

  public void setEmail(String v) {
    type(email, v);
  }

  public void setCountryCode(String visibleTextOrValue) {
    WebElement el = wait.until(ExpectedConditions.elementToBeClickable(countryCode));
    Select s = new Select(el);
    try {
      s.selectByVisibleText(visibleTextOrValue);
    } catch (Exception ignored) {
      s.selectByValue(visibleTextOrValue);
    }
  }

  public void setPhoneDigits(String digits) {
    type(phone, digits);
  }

  public void setAge(String v) {
    type(age, v);
  }

  public void selectGender(String gender) {
    String g = gender == null ? "" : gender.trim().toLowerCase();
    if (g.equals("male")) click(genderMale);
    else if (g.equals("female")) click(genderFemale);
    else click(genderOther);
  }

  public void setAddress(String v) {
    type(address, v);
  }

  public void selectCountry(String v) {
    selectByValue(country, v);
  }

  public void selectState(String v) {
    selectByValue(state, v);
  }

  public void selectCity(String v) {
    selectByValue(city, v);
  }

  public void setPassword(String v) {
    type(password, v);
  }

  public void setConfirmPassword(String v) {
    type(confirmPassword, v);
  }

  public void acceptTerms(boolean yes) {
    WebElement el = wait.until(ExpectedConditions.elementToBeClickable(terms));
    if (el.isSelected() != yes) el.click();
  }

  public boolean isSubmitEnabled() {
    return driver.findElement(submitBtn).isEnabled();
  }

  public void clickSubmit() {
    click(submitBtn);
  }

  public void clickReset() {
    click(resetBtn);
  }

  public String getLastNameError() {
    return wait.until(ExpectedConditions.visibilityOfElementLocated(lastNameError)).getText().trim();
  }

  public String getConfirmPasswordError() {
    return wait.until(ExpectedConditions.visibilityOfElementLocated(confirmPasswordError)).getText().trim();
  }

  public String getTopAlertText() {
    return wait.until(ExpectedConditions.visibilityOfElementLocated(topAlert)).getText().trim();
  }

  public String getPasswordStrengthText() {
    return wait.until(ExpectedConditions.visibilityOfElementLocated(passwordStrength)).getText().trim();
  }

  public int getStateOptionsCount() {
    Select s = new Select(driver.findElement(state));
    return s.getOptions().size();
  }

  public int getCityOptionsCount() {
    Select s = new Select(driver.findElement(city));
    return s.getOptions().size();
  }

  public void fillValidDefaults() {
    setFirstName("Mukul");
    setLastName("Anand");
    setEmail("mukul.anand@example.com");
    setCountryCode("+91");
    setPhoneDigits("9876543210");
    setAge("24");
    selectGender("Male");
    setAddress("221B, Example Street");
    selectCountry("India");
    // Wait until states populated after country change
    wait.until(d -> getStateOptionsCount() > 1);
    selectState("Karnataka");
    wait.until(d -> getCityOptionsCount() > 1);
    selectCity("Bengaluru");
    setPassword("Test@12345");
    setConfirmPassword("Test@12345");
    acceptTerms(true);
  }

  private void type(By by, String v) {
    WebElement el = wait.until(ExpectedConditions.visibilityOfElementLocated(by));
    el.clear();
    if (v != null) el.sendKeys(v);

    // Some apps validate on input event; clear() alone may not fire it consistently.
    // This tiny "poke" ensures listeners run when setting empty values.
    if (v != null && v.isEmpty()) {
      el.sendKeys(Keys.SPACE);
      el.sendKeys(Keys.BACK_SPACE);
    }
  }

  private void click(By by) {
    wait.until(ExpectedConditions.elementToBeClickable(by)).click();
  }

  private void selectByValue(By by, String value) {
    WebElement el = wait.until(ExpectedConditions.elementToBeClickable(by));
    Select s = new Select(el);
    s.selectByValue(value);
  }

  private static By byTestId(String testId) {
    return By.cssSelector("[data-testid='" + testId + "']");
  }
}

