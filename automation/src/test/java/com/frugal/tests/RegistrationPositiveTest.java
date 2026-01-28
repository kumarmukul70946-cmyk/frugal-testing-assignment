package com.frugal.tests;

import com.frugal.pages.RegistrationPage;
import com.frugal.utils.ScreenshotUtil;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class RegistrationPositiveTest extends BaseTest {

  @Test
  void shouldSubmitSuccessfullyAndResetForm() {
    RegistrationPage page = new RegistrationPage(driver);
    page.open(appUrl);

    page.fillValidDefaults();
    assertTrue(page.isSubmitEnabled(), "Submit should be enabled for a valid form");

    page.clickSubmit();
    assertTrue(page.getTopAlertText().toLowerCase().contains("registration successful"));

    ScreenshotUtil.take(driver, "success-state.png");

    // After success, the page calls form.reset(); submit should be disabled again.
    assertFalse(page.isSubmitEnabled(), "Submit should be disabled after reset");
  }
}

