# Selenium Automation (Java + POM)

## Prereqs

- Java 17+
- Maven
- Google Chrome

## Start the web app

In a terminal:

```powershell
cd "c:\Users\Mukul Anand\Downloads\Frugal Testing Assignment\web"
python -m http.server 5500
```

Open once manually (optional): `http://localhost:5500/`

## Run tests

From the `automation` folder:

```powershell
cd "c:\Users\Mukul Anand\Downloads\Frugal Testing Assignment\automation"
mvn test
```

### Headless

```powershell
mvn test -Dheadless=true
```

### Custom URL

```powershell
mvn test -Dapp.url=http://localhost:5500/
```

## Output

- Screenshots are saved under `../screenshots/` as timestamped PNGs.

