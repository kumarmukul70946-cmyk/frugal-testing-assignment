# Web App (Intelligent Registration System)

## Run

You can open `web/index.html` directly in Chrome, or run a local server (recommended):

```powershell
cd "c:\Users\Mukul Anand\Downloads\Frugal Testing Assignment\web"
python -m http.server 5500
```

Then open: `http://localhost:5500/`

## Notes for Automation

- Stable selectors are provided via `data-testid` attributes.
- Required fields show inline errors and red highlight.
- Submit button stays disabled until the form is valid.

