package com.frugal.tests;

import com.frugal.pages.RegistrationPage;
import com.frugal.utils.ScreenshotUtil;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RegistrationNegativeTest extends BaseTest {

  @Test
  void shouldShowErrorWhenLastNameMissing() {
    RegistrationPage page = new RegistrationPage(driver);
    page.open(appUrl);

    System.out.println("URL: " + page.url());
    System.out.println("Title: " + page.title());

    // Fill all valid defaults then clear last name to simulate missing.
    page.fillValidDefaults();
    page.setLastName("");

    assertFalse(page.isSubmitEnabled(), "Submit should be disabled until all required fields are valid");

    // Clicking submit won't do anything if disabled; force validation by focusing flow:
    // (we still take a screenshot of the error state after blurring)
    page.setFirstName("Mukul"); // triggers validation in app

    String err = page.getLastNameError();
    assertTrue(err.toLowerCase().contains("required"), "Expected required error for last name");

    ScreenshotUtil.take(driver, "error-state.png");
  }
}

