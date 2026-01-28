package com.frugal.utils;

import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public final class ScreenshotUtil {
  private static final DateTimeFormatter TS = DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss");

  private ScreenshotUtil() {}

  public static Path take(WebDriver driver, String fileName) {
    try {
      Path outDir = Path.of("..", "screenshots");
      Files.createDirectories(outDir);

      String safe = fileName.replaceAll("[^a-zA-Z0-9._-]", "_");
      if (!safe.toLowerCase().endsWith(".png")) safe = safe + ".png";
      String stamped = safe.replace(".png", "_" + LocalDateTime.now().format(TS) + ".png");

      File src = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
      Path dst = outDir.resolve(stamped).normalize();
      Files.copy(src.toPath(), dst, StandardCopyOption.REPLACE_EXISTING);
      return dst;
    } catch (IOException e) {
      throw new RuntimeException("Failed to take screenshot", e);
    }
  }
}

