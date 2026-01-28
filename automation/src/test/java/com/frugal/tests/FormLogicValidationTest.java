package com.frugal.tests;

import com.frugal.pages.RegistrationPage;
import com.frugal.utils.ScreenshotUtil;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class FormLogicValidationTest extends BaseTest {

  @Test
  void shouldValidateDropdownsPasswordStrengthAndConfirmMismatch() {
    RegistrationPage page = new RegistrationPage(driver);
    page.open(appUrl);

    // Submit disabled initially
    assertFalse(page.isSubmitEnabled());

    // Country -> State updates
    page.selectCountry("India");
    assertTrue(page.getStateOptionsCount() > 1, "State options should populate after selecting country");

    // State -> City updates
    page.selectState("Karnataka");
    assertTrue(page.getCityOptionsCount() > 1, "City options should populate after selecting state");

    // Password strength indicator should change for stronger password
    page.setPassword("abc");
    assertTrue(page.getPasswordStrengthText().toLowerCase().contains("weak"));

    page.setPassword("Test@12345");
    assertTrue(page.getPasswordStrengthText().toLowerCase().contains("medium")
        || page.getPasswordStrengthText().toLowerCase().contains("strong"));

    // Confirm password mismatch error
    page.setConfirmPassword("Wrong@12345");
    assertTrue(page.getConfirmPasswordError().toLowerCase().contains("match"));

    ScreenshotUtil.take(driver, "logic-state.png");
  }
}

