package com.frugal.utils;

import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.time.Duration;

public final class DriverFactory {
  private DriverFactory() {}

  public static WebDriver createChrome() {
    WebDriverManager.chromedriver().setup();

    ChromeOptions options = new ChromeOptions();
    String headless = System.getProperty("headless", "false");
    if ("true".equalsIgnoreCase(headless)) {
      options.addArguments("--headless=new");
    }
    options.addArguments("--window-size=1280,900");

    WebDriver driver = new ChromeDriver(options);
    driver.manage().timeouts().implicitlyWait(Duration.ofMillis(0));
    driver.manage().timeouts().pageLoadTimeout(Duration.ofSeconds(30));
    return driver;
  }
}

