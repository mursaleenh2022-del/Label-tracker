# LABEL TRACKER PRO — landing page redesign brief (pairs with template-to-yours-master.md)

Paste this file ALONGSIDE template-to-yours-master.md into your coding agent. This is a REDESIGN
of an existing single-page SaaS marketing site, not a from-scratch build — most functional copy
and structure already exists and should be preserved; the visual execution is what's being rebuilt.

## INPUTS (filled)
```
[TEMPLATE_PATH]     = the existing Label Tracker Pro site (label-tracker-pro.netlify.app) — treat
                      this as the source to redesign, not a third-party builder export. Skip Step 7
                      (builder-fingerprint grep) entirely — there's no builder to de-brand, this is
                      your own prior build. Steps 4-6 (asset localization, export-bug fixes) still
                      apply if the current code has any of those issues.
[SITE_TYPE]         = marketing site (SaaS) — SINGLE PAGE, long-scroll. Not a multi-page site. Keep
                      it one page (hero → features → how it works → pricing → footer) exactly as
                      structured now; only the legal pages (Privacy/Terms) the footer already links
                      to are separate pages.
[NICHE]             = logistics / dropshipping ops SaaS — warehouse teams doing bulk dropshipping
                      from China to USA, UK, and Pakistan; the product reads shipping labels via
                      Vision AI and auto-fills inventory/tracking data
[BUSINESS_NAME]     = Label Tracker Pro
[SHORT_NAME]        = Label Tracker Pro (keep full name — it's already short and clear)
[TAGLINE]           = keep the existing "Stop typing. Start scanning." — it's a genuinely strong,
                      specific line already; the redesign should make it feel more premium, not
                      replace it
[EMAIL] / [PHONE_*] = not needed for this build — this is a SaaS product with sign-up/trial CTAs,
                      not a business needing a phone/WhatsApp contact pill. Skip Step 16's contact-
                      pill component entirely for this project.
[CREDIT]            = none — skip
[IMAGE_TOOL]        = the claude-code-generate-images-mcp MCP server (as configured previously) —
                      BUT see the SaaS imagery override below before using it for the dashboard
                      preview specifically.
[DEPLOY_TARGET]     = Netlify (already deployed there — redeploy in place)
[GITHUB_OWNER]      = to be provided when ready
[REPO_VISIBILITY]   = to be provided when ready
```

## What's already working — don't rewrite these, just restyle them
The existing copy is solid: "Everything you need to scale," the three feature cards (Vision AI
Extraction, Auto-Categorization, One-Click Excel Reports), the 3-step "How it works" timeline
(Upload or Paste → AI Processing → Verify & Save), and the three-tier pricing (Starter $0 /
Professional $49 "Most Popular" / Enterprise $199). Keep this information architecture. The
problem is entirely visual execution — generic card styling, no depth, no signature visual, and an
unfinished-looking dashboard mockup (three flat colored rectangles standing in for a real product
preview) — not the content or structure.

## SaaS imagery override (replaces Step 11's default approach for THIS build)
A dropshipping/logistics dashboard's hero visual is a product screenshot, not a photograph — and
AI image generators frequently render UI screenshots with garbled, illegible fake text and
nonsensical layouts, which would look worse than the current placeholder boxes, not better. For the
"Live Dashboard" preview specifically: build it as a REAL coded UI mockup (actual HTML/CSS
components — a small table or card list showing believable sample data: real-looking tracking
numbers, product names like "Wireless Earbuds Pro," quantities, status badges), not a generated
image and not empty colored blocks. This becomes the strongest candidate for the Signature Element
in Step 3 — see below. Reserve [IMAGE_TOOL] for anything that IS genuinely photographic if the
build ends up needing it (e.g. an abstract background texture), not for the product UI itself.

## Signature Element candidates for Step 3's divergent pass (seed ideas, still run all 3 properly)
This product's core value prop — turning a messy label photo into clean structured data — is
exactly the "abstract the product's real function into a visual" pattern. Strong directions to
compare:
1. **Scan-line motif**: an animated line sweeping across a label graphic (echoes "Start scanning"
   literally), with the real coded dashboard mockup appearing as if freshly populated by the scan.
2. **Route/map motif**: an abstracted line-and-node graphic connecting China → USA/UK/Pakistan,
   reflecting the actual shipping lanes this business runs — ties to the dropshipping angle
   specifically rather than to label-scanning generically.
3. **Data-transform motif**: a visual "before → after" — a raw, slightly messy label photo
   morphing/dissolving into clean structured table rows — the most literal visualization of "stop
   typing, start scanning."
Run the real 3-direction comparison per Step 3 rather than picking blind — but these three give the
agent a running start suited to this specific product instead of generic decorative shapes.

## MOTION OVERRIDE (read this before Step 2 picks a motion style — this fixes a specific complaint)
Do NOT use the generic hover-zoom / hover-scale-up pattern on cards, buttons, or the dashboard
preview — no `transform: scale(1.05)` or similar on hover, anywhere on this page. This is the
single most overused default AI-generated landing pages reach for and it must not appear here.
Instead:
- **Hover states** use ONE of: a subtle shadow deepening + 1-2px `translateY` lift (not scale), a
  border/accent-color reveal, or a background tint shift. Never a size change on hover.
- **Scroll reveals** use Appendix 2's Motion Style #1 (fade + slide-up, 0.6-0.9s ease-out) via the
  reveal engine in Appendix 1 — fade and position only, never combined with a scale transform on
  entry either (no "zooms out as it enters" effect, which was specifically flagged as a recurring
  bad pattern from prior builds).
- The ONE exception, if the Signature Element's own animation calls for it (e.g. the scan-line
  sweep), is a purpose-built animation unique to that one element — not a reusable hover/reveal
  utility applied everywhere else on the page.

## Everything else
Run the master file's full sequence (Steps 1-3, then 8-11/13-19, skipping Steps 4-7's builder-
specific parts and Step 12's Store Module since this isn't a store) — Design Seed for layout/
palette/type still applies via Step 2, Premium-Feel Gate and the enforcement loop in Step 18 still
apply in full (this page's current gray-on-white subheadings and flat cards are likely candidates
for contrast/depth fixes), and Step 21's compliance audit still applies at the end.
