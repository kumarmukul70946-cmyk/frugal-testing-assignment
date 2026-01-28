package com.frugal.tests;

import com.frugal.utils.DriverFactory;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.openqa.selenium.WebDriver;

public abstract class BaseTest {
  protected WebDriver driver;
  protected String appUrl;

  @BeforeEach
  void setUp() {
    driver = DriverFactory.createChrome();
    appUrl = System.getProperty("app.url", "http://localhost:5500/");
  }

  @AfterEach
  void tearDown() {
    if (driver != null) driver.quit();
  }
}

