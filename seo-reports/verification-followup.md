# Verification Follow-Up: kargar.co.in, "Foodable", "HAXPUNE"

**Status:** RESEARCH ONLY. No outreach, no accounts created, no backlinks acquired, no production code changed. Per instruction: no ownership/identity is assumed from name similarity alone; anything not independently confirmed from a public primary source is marked **Unverified**.

---

## 1. `kargar.co.in`

**Verdict: Unverified** (ownership not independently confirmed from a primary source)

**What was checked:**
- Attempted to fetch `https://www.kargar.co.in/` and `https://kargar.co.in/` directly to read any About/footer/legal ownership text. **Both attempts failed** (`ECONNREFUSED` — the site did not respond during this research session). No page content could be read directly, so no primary-source confirmation exists.
- A public third-party aggregator, ZoomInfo, has a listing titled **"Kargar Facility and Security Services Pvt"** that lists `www.kargar.co.in` as its website and phone number **+91 8788726752**.
- That same phone number, **+91-8788726752**, is the one already documented in this project's own codebase/prior audit (`SEO_AUDIT_REPORT.md` §7) as Kargar Business Services' real, schema-listed contact number.

**What this evidence does and does not prove:**
- It is a real, publicly visible signal (a third-party business-data aggregator independently associating that domain with the same phone number Kargar Business Services uses) — stronger than "the names look similar."
- It is **not** a primary-source confirmation. ZoomInfo listings are aggregated/scraped and can be stale, merged, or wrong. The site itself could not be reached to confirm directly, and no WHOIS/registrar lookup was performed (not attempted — would require a dedicated WHOIS tool not available in this session; flagged here rather than skipped silently).
- **Do not treat this as confirmed ownership.** Mark: **Unverified — one third-party aggregator shows a matching phone number; the site itself did not respond when checked directly; no registrar/WHOIS data was checked.**

**Recommended next step (still no action taken):** check WHOIS registration data directly (e.g., via a registrar lookup tool) and/or try reaching `kargar.co.in` again later — it may simply be down, or blocking automated fetches, rather than nonexistent.

---

## 2. "Foodable" (from `logo-manifest.json`: `"name": "Foodable", "file": "/logos/food/foodable.png"`)

**Verdict: Unverified** (a plausible candidate exists, but identity is not confirmed — not treated as a match)

**What was checked:**
- The actual logo file was opened and visually inspected (not guessed from the filename): it renders as a wordmark reading **"Foodable"** in an outlined/cartoon style, with a knife-and-tomato icon replacing the "oo" — clearly a food/culinary-branded logo, consistent with a food-tech, cloud-kitchen, or restaurant brand.
- Live search for that specific visual (tomato + knife, "Foodable") returned **no confirmed match** to a specific branded app/company with that logo.
- A company named **"Foodable India Limited"** was found in public company-registry data (Tofler/ZaubaCorp/IndiaFilings): incorporated 21 December 2021, registered address in Parvati, Pune, Maharashtra — an unlisted public company in the food sector, three named directors, status Active. **This is geographically plausible** (Pune-based, matching Kargar's own Pune client base) but:
  - No official website was found for this registered entity in search results.
  - No visual (logo) confirmation ties this specific registered company to the tomato-knife "Foodable" logo in Kargar's manifest.
  - The name match alone is not sufficient per your instruction — this is flagged as a **candidate to verify internally**, not substituted as the confirmed answer.

**Verdict:** Unverified. "Foodable India Limited" (Pune-registered, active) is the most plausible public candidate found, but it is not confirmed to be the same entity as the logo — do not treat it as such without internal confirmation (e.g., asking whoever manages the client-logo list which specific "Foodable" client this represents).

---

## 3. "HAXPUNE" (from `logo-manifest.json`: `"name": "HAXPUNE", "file": "/logos/companies/haxpune.svg"`)

**Verdict: Unverified**

**What was checked:**
- The SVG file itself was opened. It contains only `<path>` vector-shape data with no embedded `<title>`, `<text>`, or metadata elements — meaning the company name is not recoverable from the file's source code, only from how the shapes visually render as a wordmark/logo. Rendering the SVG as a viewable image was attempted (a local static file server was started to view it in a browser) but did not complete successfully in this session, so the logo could **not** be visually confirmed the way "Foodable" was.
- Live search for "HAXPUNE" (as a single word, matching the manifest entry) returned no confirmed matching company.
- Two **unrelated, non-matching** entities surfaced in earlier research and are explicitly **not** being substituted as the answer, per your instruction:
  - "Haxpune Engineering Private Limited" — a Mumbai-registered private subsidiary of a foreign company (incorporated July 2023) — different city, no confirmed connection to Kargar or to Pune-based client relationships.
  - "HAX" — an unrelated international hard-tech venture-capital firm with a Pune office page — a venture-capital firm is not a plausible facility-management client type, and nothing ties it to Kargar.
- Neither of these is being reported as the identity of "HAXPUNE" — both are name-similarity coincidences only, correctly excluded per your instruction not to substitute similarly named organizations.

**Verdict:** Unverified — the exact entity behind "HAXPUNE" could not be confirmed from public sources in this pass. The logo file contains no extractable text, and no company by that exact name was found. This requires internal confirmation (whoever added this client to the logo list) rather than further public search, since public search has now been exhausted without a match.

---

## Summary Table

| Item | Verdict | Strongest public evidence found | Explicitly rejected as unconfirmed |
|---|---|---|---|
| `kargar.co.in` | **Unverified** | ZoomInfo lists it under "Kargar Facility and Security Services Pvt" with the same phone number (+91 8788726752) used by Kargar Business Services elsewhere | Site itself unreachable in this session; no WHOIS check performed; not treated as confirmed ownership |
| "Foodable" | **Unverified** | "Foodable India Limited" — real, active, Pune-registered company (Dec 2021) — geographically plausible candidate | Not confirmed to match the tomato/knife logo; not substituted as the answer without internal confirmation |
| "HAXPUNE" | **Unverified** | None — no matching entity found by that exact name | "Haxpune Engineering Pvt Ltd" (Mumbai) and "HAX" (VC firm) explicitly excluded — different city/different business type, not substituted |

**No action taken beyond this verification.** No outreach was sent, no accounts created, no backlinks acquired, no production code modified.
