"""
Builds docs/seo/2026-11-24/KARGAR_SEO_Delivery_2026-11-24.xlsx from:
  - a production crawl JSON (before), a local-build crawl JSON (after)
  - the QA harness report JSON
Usage: python build-seo-workbook.py <before.json> <after.json> <qa-report.json> <out.xlsx>
Unavailable data is written as "Unavailable", never 0.
"""
import json, sys
from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill
from openpyxl.utils import get_column_letter

before_p, after_p, qa_p, out_p = sys.argv[1:5]
before = json.load(open(before_p, encoding='utf8'))
after = json.load(open(after_p, encoding='utf8'))
qa = json.load(open(qa_p, encoding='utf8'))
UA = 'Unavailable'

HEAD = Font(bold=True, color='FFFFFF')
FILL = PatternFill('solid', fgColor='1F3A5F')
PASS = PatternFill('solid', fgColor='E3F4E8')
FAIL = PatternFill('solid', fgColor='FCE4E0')
PROTECT = PatternFill('solid', fgColor='FFF4D6')

wb = Workbook()
wb.remove(wb.active)

def sheet(name, header, rows, widths=None, note=None):
    ws = wb.create_sheet(name[:31])
    r0 = 1
    if note:
        ws.cell(1, 1, note).font = Font(italic=True)
        ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=min(len(header), 12))
        r0 = 3
    for c, h in enumerate(header, 1):
        cell = ws.cell(r0, c, h)
        cell.font, cell.fill = HEAD, FILL
        cell.alignment = Alignment(wrap_text=True, vertical='top')
    for i, row in enumerate(rows, r0 + 1):
        for c, v in enumerate(row, 1):
            cell = ws.cell(i, c, v)
            cell.alignment = Alignment(wrap_text=True, vertical='top')
    ws.freeze_panes = ws.cell(r0 + 1, 2)
    ws.auto_filter.ref = f'A{r0}:{get_column_letter(len(header))}{r0 + len(rows)}'
    for c, w in enumerate(widths or [], 1):
        ws.column_dimensions[get_column_letter(c)].width = w
    return ws, r0

# ---------------------------------------------------------------- A. inventory
TRACKER = {  # manual observations supplied by the business, 2026-11-05 (not GSC averages)
    '/building-maintenance-services-pune': 'Building Maintenance Services in Pune: P1 #3',
    '/office-housekeeping-services-pune': 'Corporate Housekeeping Services in Pune: P2 #4',
    '/facility-staffing-services-pune': 'Facility Staffing & Manpower Services in Pune: P1 #1',
    '/society-housekeeping-services-pune': 'Housekeeping Services for Housing Societies in Pune: P1 #1',
    '/facility-management-company-pune': 'Facility Maintenance Services in Pune: P1 #1; Facility Management Pune: P3 #5',
    '/resources/housekeeping-cost-pune': 'Housekeeping Cost in Pune: P1 #3',
    '/healthcare-housekeeping-services-pune': 'Healthcare Housekeeping Pune: P1 #2',
    '/hvac-maintenance-services-pune': 'HVAC Maintenance Pune: P1 #1; Commercial HVAC Maintenance Pune: P1 #2',
    '/facility-management-for-societies-pune': 'Society Facility Management Pune: P1 #2',
}

# path: (service, buyer, primary query, decision, reason, enquiry action after)
D = {
 '/': ('All (router)', 'Any buyer who searched the brand or a broad FM term', 'KARGAR facility management (brand)', 'Improve', 'Introduces KARGAR and routes to services. Service cards now link to the Pune pages with descriptive anchors instead of generic detail pages. Title overlap with FM pillar ("Facility Management Company") left unchanged until GSC shows which URL Google tests for "facility management Pune".', 'Request Proposal → form (no service preselected)'),
 '/services': ('All (hub)', 'Buyer comparing service lines', 'facility services Pune', 'Keep', 'Service overview hub; links every Pune page.', 'Request Proposal'),
 '/sectors': ('All', 'Buyer checking sector fit', 'facility management sectors', 'Keep', 'Removed link to retired security detail page.', 'Request Proposal'),
 '/company-profile': ('Company', 'Buyer vetting KARGAR', 'KARGAR company profile', 'Keep', 'Trust page.', 'Request Proposal'),
 '/support': ('Company', 'Existing client / prospect', 'KARGAR support', 'Keep', 'Hero link repointed from retired housekeeping detail page to the Pune pillar; address now from shared contact source.', 'Request Proposal'),
 '/contact-us': ('Enquiry', 'Prospect ready to enquire', 'KARGAR contact', 'Improve', 'New service-aware enquiry form: service preselected from the landing page, optional quote fields per service, company and message optional, lead carries service/team/landing page; email now carries full lead.', 'Send Enquiry (form)'),
 '/privacy-policy': ('Legal', '-', '-', 'Keep', 'Contact details from shared source.', '-'),
 '/resources': ('Guides hub', 'Researching buyer', 'facility management guides Pune', 'Keep', 'Guides removed from the sitewide footer; hub and contextual links remain.', '-'),
 '/housekeeping-services-pune': ('Housekeeping (managed contract)', 'Admin/facility managers, society committees', 'housekeeping services in Pune', 'Improve', 'B2B qualification in opening + "Do you clean homes?" FAQ (SERP is mixed with home cleaning); responsibility table (managed vs manpower); quote factors; post-enquiry steps; unconfirmed locality list removed; duplicate FAQs and generic comparison removed.', 'Get a Housekeeping Proposal → form preselects Housekeeping contract → Housekeeping team'),
 '/commercial-housekeeping-services-pune': ('Housekeeping', 'Building owner / association (multi-tenant common areas)', 'commercial housekeeping services Pune', 'Keep', 'Distinct buyer (common areas no tenant owns) and zone-based body; no overlap found with corporate/office copy.', 'Request a Quote → Housekeeping team'),
 '/corporate-housekeeping-services-pune': ('Housekeeping', 'Admin/FM head of large multi-floor, multi-shift office', 'corporate housekeeping services Pune', 'Keep', 'Unique on governance, vendor changeover and payroll verification. Tracker shows Google ranking the office page for "corporate housekeeping" (P2 #4): check indexing of this URL in GSC before any merge.', 'Request a Quote → Housekeeping team'),
 '/office-housekeeping-services-pune': ('Housekeeping', 'Office manager of 1–3 floor office', 'office housekeeping / office cleaning services Pune', 'Keep (protect)', 'Ranks P2 #4 for "corporate housekeeping". Unique on single-person routine and right-sizing. Added to footer.', 'Request a Quote → Housekeeping team'),
 '/society-housekeeping-services-pune': ('Housekeeping', 'Society managing committee', 'society housekeeping services Pune', 'Keep (protect)', 'Ranks P1 #1. No change.', 'Request a Quote → Housekeeping team'),
 '/housekeeping-staff-pune': ('Housekeeping manpower supply', 'Organisation with its own supervisor', 'housekeeping manpower supplier Pune', 'Improve', 'Clarified that the client directs staff (KARGAR supervisor optional); meta no longer says "supervised by KARGAR"; title changed to "Housekeeping Manpower in Pune" because "housekeeping staff Pune" results are mostly job boards; job-seeker FAQ routes to HR.', 'Request Manpower Proposal → form preselects Housekeeping staff → Housekeeping team'),
 '/industrial-housekeeping-services-pune': ('Housekeeping', 'Plant admin / EHS', 'industrial housekeeping Pune', 'Keep', 'Distinct sector page.', 'Request a Quote → Housekeeping team'),
 '/school-housekeeping-services-pune': ('Housekeeping', 'School/college administrator', 'school housekeeping services Pune', 'Keep', 'Distinct sector page.', 'Request a Quote → Housekeeping team'),
 '/healthcare-housekeeping-services-pune': ('Housekeeping', 'Clinic/hospital administrator', 'healthcare housekeeping Pune', 'Keep (protect)', 'Ranks P1 #2.', 'Request a Quote → Housekeeping team'),
 '/facility-management-company-pune': ('Integrated FM', 'Operations head / procurement evaluating one contract', 'facility management company in Pune', 'Improve', 'Opening aimed at evaluating an integrated contract; new "Who runs your site and how escalation works" table; integrated-FM CTA; duplicate sectors FAQ removed. Title and H1 kept (ranks P1 #1 for facility maintenance, P3 for FM Pune).', 'Request an Integrated FM Proposal → Facility management team'),
 '/facility-management-for-societies-pune': ('Society management', 'Society committee', 'society facility management Pune', 'Keep (protect)', 'Ranks P1 #2. Footer kept.', 'Request a Quote → Facility management team'),
 '/office-facility-management-pune': ('Integrated FM', 'Office admin', 'office facility management Pune', 'Keep', '-', 'Request a Quote → Facility management team'),
 '/commercial-facility-management-pune': ('Integrated FM', 'Building owner/association', 'commercial facility management Pune', 'Keep', '-', 'Request a Quote → Facility management team'),
 '/facility-staffing-services-pune': ('Staffing', 'Organisation needing several roles', 'facility staffing services Pune', 'Keep (protect)', 'Ranks P1 #1.', 'Request a Quote → Facility management team'),
 '/facility-maintenance-services-pune': ('Facility maintenance (hub)', 'Facility manager / engineering head', 'facility maintenance services Pune', 'Improve', 'Hub to electrical, HVAC, plumbing, STP, building pages; added on-call/incidental model (brochure) and quote inputs.', 'Request a Maintenance Assessment → Technical maintenance team'),
 '/electrical-maintenance-services-pune': ('Electrical maintenance', 'Facility manager of society/office/plant', 'electrical maintenance services Pune', 'Improve', 'Opening with scope and next step; in-scope vs handled-separately list; commercial-not-household callout; quote inputs; resident-electrician FAQ; link to retired detail page removed.', 'Request an Electrical Maintenance Quote → Technical maintenance team'),
 '/hvac-maintenance-services-pune': ('HVAC maintenance', 'Facility manager of building with AHU/FCU/VRV', 'HVAC maintenance Pune', 'Improve (protect title/H1/URL)', 'Rewritten to brochure scope (AHU, FCU, VRV/VRF); removed unverified chillers, cooling towers, split/cassette ACs, duct cleaning, balancing, IAQ testing, IT Parks, Retail & Malls; added servicing table, visit-frequency logic, visit record, spares/specialists, quote inputs. Ranks P1 #1/#2: monitor weekly for 4 weeks.', 'Request an HVAC Maintenance Quote → Technical maintenance team'),
 '/plumbing-maintenance-services-pune': ('Plumbing', 'Facility manager', 'plumbing maintenance Pune', 'Keep', '-', 'Request a Quote → Technical maintenance team'),
 '/building-maintenance-services-pune': ('Technicians', 'Society/building manager', 'building maintenance services Pune', 'Keep (protect)', 'Ranks P1 #3. MST copy deferred until the term is confirmed.', 'Request a Quote → Technical maintenance team'),
 '/stp-operation-maintenance-pune': ('STP/WTP', 'Society/plant', 'STP operation and maintenance Pune', 'Keep', '-', 'Request a Quote → Technical maintenance team'),
 '/landscaping-services-pune': ('Landscaping', 'Society/campus', 'landscaping services Pune', 'Keep', '-', 'Request a Quote → Facility management team'),
 '/security-services-pune': ('Security guarding', 'Admin/FM/committee hiring guards', 'security services in Pune / security guard services Pune', 'Improve', 'Title and H1 → "Security Guard Services in Pune"; opening names properties, area and next step; added "What the guarding proposal includes" and "What to send us"; job-seeker FAQ to HR; 5 FAQs that repeated the body removed. Not ranking before (top 100 not observed), so low risk.', 'Request a Security Staffing Proposal → form preselects Security → Security team'),
 '/corporate-security-services-pune': ('Security', 'Office admin', 'corporate security services Pune', 'Keep', 'New 2026-11-17; let it index.', 'Request a Quote → Security team'),
 '/industrial-security-services-pune': ('Security', 'Plant admin', 'industrial security services Pune', 'Keep', 'New 2026-11-17.', 'Request a Quote → Security team'),
 '/society-security-services-pune': ('Security', 'Society committee', 'society security services Pune', 'Keep', '-', 'Request a Quote → Security team'),
 '/services/hard-services': ('Hard services overview', 'Buyer browsing categories', 'hard services facility management', 'Investigate', 'Overlaps /facility-maintenance-services-pune. Kept (sitewide links) and now links to maintenance cluster pages. Decide merge after GSC queries/pages export.', 'Request a Proposal'),
 '/services/soft-services': ('Soft services overview', 'Buyer browsing categories', 'soft services facility management', 'Investigate', 'Overlaps housekeeping/security pillars and /services. Kept; links to those pillars. Decide after GSC.', 'Request a Proposal'),
 '/services/hard-services/electrical-maintenance': ('Electrical', 'Same as Pune page', '-', 'Redirect (301) → /electrical-maintenance-services-pune', 'Same service, buyer and market as the Pune page; thinner, non-local, carried unverified HT panel/transformer claims. Linked from 6 pages before (homepage card). GSC traffic not available: check before merge.', '-'),
 '/services/hard-services/hvac-maintenance': ('HVAC', 'Same as Pune page', '-', 'Redirect (301) → /hvac-maintenance-services-pune', 'Duplicate intent; unverified chiller/cooling tower claims; title "Commercial HVAC Maintenance" competed with the Pune page that ranks P1 #2 for that query.', '-'),
 '/services/soft-services/housekeeping': ('Housekeeping', 'Same as pillar', '-', 'Redirect (301) → /housekeeping-services-pune', 'Duplicate intent; homepage card pointed here instead of the pillar.', '-'),
 '/services/soft-services/security-services': ('Security', 'Same as pillar', '-', 'Redirect (301) → /security-services-pune', 'Duplicate intent (retitled 2026-11-17 to stop competing; now consolidated).', '-'),
}
GUIDE = ('Guide', 'Researching buyer', '', 'Keep', 'Informational; linked from hub and pillars (removed from sitewide footer).', 'Guide CTA')

def inb(d, p):
    v = d['inbound'].get(p)
    return len(v['pages']) if v else 0

rows = []
paths = list(dict.fromkeys([*before['pages'].keys(), *after['pages'].keys(), *D.keys()]))
for p in paths:
    if p.startswith('/images/'):
        continue
    b = before['pages'].get(p, {})
    a = after['pages'].get(p, {})
    meta = D.get(p) or (GUIDE[:2] + (p.split('/')[-1].replace('-', ' '),) + GUIDE[3:])
    a_status = a.get('status', 'not crawled (no longer linked)')
    if p in D and D[p][3].startswith('Redirect') and not a:
        a_status = '301/308 (see QA sheet)'
    rows.append([
        p, b.get('status', '-'), a_status,
        'Yes' if b.get('robots', '').startswith('index') else ('-' if not b else 'No'),
        ', '.join(c.replace(before['base'], '') for c in b.get('canonical', [])) or '-',
        (b.get('title') or '-'), (a.get('title') or '-'),
        ' | '.join(b.get('h1', [])) or '-', ' | '.join(a.get('h1', [])) or '-',
        b.get('mainWords', '-'), a.get('mainWords', '-'),
        meta[0], meta[1], meta[2],
        inb(before, p), inb(after, p),
        'Yes' if b.get('inSitemap') else 'No', 'Yes' if a.get('inSitemap') else 'No',
        TRACKER.get(p, 'Not in tracker'), UA, UA, UA, UA, UA,
        meta[3], meta[4], meta[5],
    ])
ws, r0 = sheet('A. URL inventory', [
    'URL', 'Status before (live)', 'Status after (build)', 'Indexable before', 'Canonical before', 'Title before', 'Title after',
    'H1 before', 'H1 after', 'Main words before', 'Main words after', 'Service', 'Intended buyer', 'Primary query',
    'Pages linking in (before)', 'Pages linking in (after)', 'In sitemap before', 'In sitemap after',
    'Manual rank tracker 2026-11-05 (not GSC)', 'GSC impressions', 'GSC clicks', 'GSC CTR', 'GSC avg position', 'Conversions',
    'Decision', 'Reason', 'Enquiry action (after)'],
    rows, [44, 9, 12, 9, 30, 34, 34, 30, 30, 9, 9, 22, 28, 30, 9, 9, 8, 8, 34, 11, 9, 8, 9, 10, 22, 70, 40],
    note=f"Before = production crawl {before['fetchedAt'][:10]} (sitemap + links from homepage). After = local production build via Vercel emulation {after['fetchedAt'][:10]}. GSC/GA4/GBP: Unavailable (no access in this session). Highlighted rows have ranking evidence to protect. Main-word counts include FAQs and tables inside <main>.")
for i in range(r0 + 1, r0 + 1 + len(rows)):
    if ws.cell(i, 19).value != 'Not in tracker':
        for c in range(1, 4):
            ws.cell(i, c).fill = PROTECT

# ---------------------------------------------------------------- B. keyword map
KM = [
 # Service, buyer/need, primary, related, URL, action, evidence, priority, enquiry action
 ('Security', 'Organisation or society hiring guards for posts and shifts', 'security services in Pune', 'security service in Pune; security guard services Pune; security agency in Pune; security guards in Pune', '/security-services-pune', 'Improved (title/H1 → Security Guard Services in Pune)', 'Autocomplete 2026-11-05 (agency/guards variants); SERP sample 2026-11-24: directory-led + Indeed jobs; not ranking in top 100 (owner observation)', 'P1', 'Request a security staffing proposal'),
 ('Security (recruitment)', 'Job seeker', 'security guard jobs Pune', 'security guard vacancy Pune', 'No page (FAQ → hrdesk@kargar.co.in)', 'Route away from sales form', 'SERP sample: Indeed in results for security queries', 'Exclude', 'HR email'),
 ('Security', 'Office/commercial building admin', 'corporate security services Pune', 'office security services Pune', '/corporate-security-services-pune', 'Keep', 'Distinct procedures (visitor/access); built 2026-11-17', 'P2', 'Request a Quote (Security)'),
 ('Security', 'Plant/warehouse admin', 'industrial security services Pune', 'factory security guards Pune', '/industrial-security-services-pune', 'Keep', 'Autocomplete: "industrial security services"', 'P2', 'Request a Quote (Security)'),
 ('Security', 'Society committee', 'society security services Pune', 'residential security services Pune', '/society-security-services-pune', 'Keep', 'Autocomplete: "residential security services"', 'P3', 'Request a Quote (Security)'),
 ('Housekeeping', 'Organisation/society needing a supervised cleaning contract', 'housekeeping services in Pune', 'housekeeping company Pune; housekeeping agency Pune; housekeeping services provider Pune', '/housekeeping-services-pune', 'Improved', 'SERP sample: Urban Company home-cleaning pages dominate → B2B qualification added', 'P1', 'Get a housekeeping proposal'),
 ('Housekeeping', 'Small/mid office manager', 'office housekeeping services Pune', 'office cleaning services Pune; housekeeping services in Pune for office', '/office-housekeeping-services-pune', 'Keep (protect)', 'Tracker P2 #4 for corporate housekeeping; autocomplete office-cleaning variants', 'P2', 'Request a Quote (Housekeeping)'),
 ('Housekeeping', 'Large office admin', 'corporate housekeeping services Pune', 'corporate office cleaning Pune', '/corporate-housekeeping-services-pune', 'Keep; verify indexing in GSC', 'Autocomplete top suggestion; Google shows office page instead (tracker)', 'P2', 'Request a Quote (Housekeeping)'),
 ('Housekeeping', 'Multi-tenant building owner', 'commercial housekeeping services Pune', 'commercial cleaning services Pune', '/commercial-housekeeping-services-pune', 'Keep', 'Autocomplete: low for "commercial housekeeping", "commercial cleaning" used', 'P3', 'Request a Quote (Housekeeping)'),
 ('Housekeeping manpower', 'Organisation that will direct staff itself', 'housekeeping manpower supplier Pune', 'housekeeping manpower agency Pune; housekeeping staff Pune', '/housekeeping-staff-pune', 'Improved (title → Housekeeping Manpower in Pune)', 'SERP sample: "housekeeping staff Pune" is mostly job boards', 'P2', 'Request manpower proposal'),
 ('Housekeeping (consumer)', 'Household', 'home cleaning / deep cleaning Pune', 'flat cleaning price', 'No page', 'Declined: KARGAR does not offer one-off home cleaning', 'SERP sample + autocomplete: consumer intent', 'Exclude', '-'),
 ('Integrated FM', 'Operations head consolidating vendors', 'facility management company in Pune', 'facility management services Pune; integrated facility management Pune; FM contractors Pune', '/facility-management-company-pune', 'Improved', 'Tracker P3 #5 (FM Pune); SERP sample: directories + listicles', 'P1', 'Request an integrated FM proposal'),
 ('Society management', 'Society committee', 'society management services Pune', 'society facility management Pune; housing society management services Pune', '/facility-management-for-societies-pune', 'Keep (protect)', 'Tracker P1 #2; autocomplete', 'P2', 'Request a Quote (FM)'),
 ('Facility maintenance', 'Engineering/FM head', 'facility maintenance services Pune', 'preventive maintenance services Pune; technical maintenance Pune', '/facility-maintenance-services-pune', 'Improved (hub)', 'Tracker shows FM pillar ranking P1 #1 for this query: watch URL Google picks', 'P2', 'Request a maintenance assessment'),
 ('Electrical maintenance', 'Facility manager (society/office/plant)', 'electrical maintenance services Pune', 'electrical AMC Pune; DG set maintenance Pune; LT panel maintenance Pune', '/electrical-maintenance-services-pune', 'Improved', 'SERP sample: mixed industrial and household electricians → commercial callout', 'P1', 'Request an electrical maintenance quote'),
 ('Electrical (household)', 'Resident needing an electrician', 'electrician near me Pune', 'home electrician Pune', 'No page', 'Declined: not KARGAR\'s offering', 'SERP sample', 'Exclude', '-'),
 ('HVAC maintenance', 'Facility manager with AHU/FCU/VRV', 'HVAC maintenance Pune', 'commercial HVAC maintenance Pune; HVAC AMC Pune; VRV VRF maintenance Pune', '/hvac-maintenance-services-pune', 'Improved (title/H1 kept)', 'Tracker P1 #1 / #2; brochure confirms AMC and on-call models', 'P1', 'Request an HVAC maintenance quote'),
 ('HVAC (consumer)', 'Household', 'AC service Pune', 'split AC repair Pune', 'No page', 'Declined: split/cassette ACs not in documented scope; consumer intent', 'SERP sample (AC AMC per-tonne listings)', 'Exclude', '-'),
 ('Chiller / cooling tower maintenance', 'Plant/large building', 'chiller maintenance Pune', 'cooling tower maintenance Pune', 'No page', 'Deferred: not in brochure; add only if confirmed', 'Brochure p.2', 'Blocked (business)', '-'),
 ('Building technicians', 'Society/building manager', 'building maintenance services Pune', 'society maintenance services Pune', '/building-maintenance-services-pune', 'Keep (protect)', 'Tracker P1 #3', 'P3', 'Request a Quote (Technical)'),
 ('MST (Multi-Skilled Technician)', 'Building needing one resident technician for several trades', 'multi skilled technician services Pune', 'MST manpower Pune', 'No page', 'Deferred: brief says "MSD"; profile lists "STP / WTP / MSTs" without full form, duties or contract model. Confirm with operations, then add a subsection to building maintenance before considering a page', 'Company Profile org chart', 'Blocked (business)', '-'),
 ('Plumbing', 'Facility manager', 'plumbing maintenance Pune', 'water system maintenance Pune', '/plumbing-maintenance-services-pune', 'Keep', '-', 'P3', 'Request a Quote (Technical)'),
 ('STP/WTP', 'Society/plant', 'STP operation and maintenance Pune', 'STP operator services Pune', '/stp-operation-maintenance-pune', 'Keep', '-', 'P3', 'Request a Quote (Technical)'),
 ('Staffing', 'Organisation needing several roles', 'facility staffing services Pune', 'manpower services Pune', '/facility-staffing-services-pune', 'Keep (protect)', 'Tracker P1 #1', 'P3', 'Request a Quote (FM)'),
 ('Locality pages', '-', 'housekeeping services Baner / Hinjewadi / Kharadi', '-', 'No pages', 'Declined: doorway risk; locality coverage not confirmed', 'Brief instruction', 'Exclude', '-'),
 ('Property management', 'Landlord/NRI owner', 'property management Pune', '-', 'No page', 'Deferred: not a documented service (open question)', 'Autocomplete', 'Blocked (business)', '-'),
 ('Separate industrial guarding page vs pillar', '-', 'industrial security guards Pune', '-', '/industrial-security-services-pune (exists)', 'Keep existing; no further split', '-', '-', '-'),
]
sheet('B. Keyword-to-page map', ['Service', 'Buyer and need', 'Primary query', 'Related queries', 'Existing URL', 'Proposed action', 'Evidence', 'Priority', 'Enquiry action'], KM,
      [22, 34, 30, 44, 34, 34, 50, 12, 30],
      note='Evidence sources: Google Autocomplete (gl=in, 2026-11-05, seo-audit/data), owner rank tracker (2026-11-05, manual), web-search sample 2026-11-24 (seo-audit/data/serp-sample-2026-11-24.md; not a geolocated Pune SERP). Search volume: Unavailable (no tool). GSC queries: Unavailable.')

# ---------------------------------------------------------------- C. changes
CH = [
 ('Enquiry delivery (critical)', 'src/services/email.service.ts', 'Notification email carried only name, message and time: no phone, email, company or service', 'Full lead summary (service, team, contact details, quote details, enquiry and landing pages) placed in {{message}}, which the live template renders; extra named params for a richer template', 'Verified in build (intercepted)'),
 ('Lead attribution (critical)', 'src/services/contact.service.ts, src/lib/landingAttribution.ts', 'Service known only as CTA page path; lost if visitor used header link; landing page not captured', 'Lead metadata: enquiry_service, label, team, CTA page, first landing page, referrer host, quote details. DB constraints (subject 5–200, message 10–5000) guaranteed', 'Verified in build (intercepted)'),
 ('Sales visibility (critical)', 'src/features/admin/pages/AdminContactsPage.tsx, admin.service.ts', 'Admin list showed subject only; metadata/source discarded', '"Service requested" column with team; modal shows enquiry page, first page visited, details', 'Type-checked; not exercised against live admin login'),
 ('Enquiry form', 'src/features/enquiry/*', '6 required generic fields, no service choice', 'Required: name, phone, email, service. Service preselected from landing page; optional per-service quote fields; company/message optional; inline status; accessibility review applied', 'Verified in build'),
 ('Analytics', 'EnquiryForm.tsx', 'contact_form_submit with page path only', 'Adds enquiry_service, team, landing_page (ids/paths only; no PII). cta_click, call_click unchanged and separate', 'Verified (no PII in dataLayer)'),
 ('Consolidation', 'services/config/landingPaths.ts, seo.config.ts, ServicePage.tsx', '4 generic detail pages duplicated Pune pages; homepage cards linked to them', '301 to Pune pages; removed from sitemap; cards/hubs link to Pune pages; client-side redirect', 'Verified in build'),
 ('Homepage cards', 'ServiceCard.tsx', '"Learn More" + aria-label', 'Visible "Electrical Maintenance in Pune" etc.', 'Verified in build'),
 ('Footer', 'KargarSinglePage.tsx', '~40 links on every page (all services + guides)', 'Pillars + 12 flagged priority pages + company links', 'Verified: no orphans (crawl)'),
 ('Governance', 'pune-landing/domain/types.ts, config/review.ts, scripts/seo/validate-governance.ts', 'No owner/review date; no draft state', 'Every page has owner role, last-reviewed date, pendingFacts; only published pages routed/sitemapped; build fails on bad metadata, warns at 180 days', 'Build gate passes'),
 ('Contact data', 'config/contact.ts', 'Address/phones/email hardcoded in 6 places', 'One source used by header, contact page, support, privacy and LocalBusiness schema', 'Verified in build'),
 ('Claims', 'hard-services.ts, images.ts, categories.ts', 'Unverified HT panels, transformers, chillers, cooling towers, IAQ, balancing, duct cleaning on cards/hubs', 'Brochure scope only', 'Verified in build'),
 ('Copy', 'pune-landing/config/pages/*.ts', 'See sheet A', 'Final copy: docs/seo/2026-11-24/C_FINAL_PAGE_COPY.md', 'Verified in build'),
]
sheet('C. Implemented changes', ['Area', 'Files', 'Before', 'After', 'Status'], CH, [24, 44, 50, 70, 30],
      note='Status: everything is on branch seo/service-pages-and-enquiry-routing-2026-11-24, verified on a local production build. Nothing is live until merged to main (Vercel deploys main).')

# ---------------------------------------------------------------- D. redirects, links, external, facts
RL = [
 ('Redirect (new)', '/services/hard-services/electrical-maintenance', '/electrical-maintenance-services-pune', '301 (Vercel permanent = 308)'),
 ('Redirect (new)', '/services/hard-services/hvac-maintenance', '/hvac-maintenance-services-pune', '301/308'),
 ('Redirect (new)', '/services/soft-services/housekeeping', '/housekeeping-services-pune', '301/308'),
 ('Redirect (new)', '/services/soft-services/security-services', '/security-services-pune', '301/308'),
 ('Redirect (existing, kept)', '/contact, /about, /about-us, /category/services, /amp, /home', '/contact-us, /company-profile, /services, /', 'unchanged'),
 ('Internal link fixed', 'Homepage service cards ×4, /services and category hub cards', 'Pune pages', 'via serviceHref()'),
 ('Internal link fixed', 'categories.ts (hard-services hub list) ×2', '/electrical-…-pune, /hvac-…-pune', 'also removed "system balancing and duct cleaning"'),
 ('Internal link fixed', 'sectors.ts ×2, SectorsContent.tsx ×1', 'Pune pages / removed', ''),
 ('Internal link fixed', '/support hero link', '/housekeeping-services-pune', ''),
 ('Internal link fixed', 'Pune pages linking to retired detail pages (housekeeping, security, HVAC footnotes; electrical intro)', 'removed', 'would otherwise link through redirects'),
 ('Internal link fixed', 'Category hubs "Serving Pune" links', 'Derived from clusters', 'soft-services hub would otherwise lose links'),
 ('External reference', 'None added', '-', 'Candidate once confirmed: KARGAR PSARA licence on the issuing authority page; verified Google Business Profile'),
]
FACTS = [
 ('PSARA licence number and validity', 'Security pages tell buyers to ask any agency for a PSARA licence', 'High — confirm before more security promotion', 'Ops/legal'),
 ('Pune/PCMC localities served', 'Locality list removed from housekeeping pillar', 'Medium', 'Ops'),
 ('HVAC: chillers, cooling towers, split/cassette ACs; duct cleaning, balancing, IAQ testing', 'Removed (not in brochure)', 'Medium', 'Technical head'),
 ('Spares and major-repair billing basis (HVAC, electrical)', 'Copy says "agreed separately"', 'Medium', 'Technical head'),
 ('HT equipment/transformers, new installation work', 'Listed as "confirmed case by case"', 'Low', 'Technical head'),
 ('Manpower supply supervision model', 'Copy: client directs; KARGAR supervisor optional', 'Medium', 'Ops'),
 ('Default site facilities provided by client (storage, water, power)', 'Responsibility table row', 'Low', 'Ops'),
 ('MST / "MSD": exact term, full form, duties, contract model', 'No copy published', 'Medium', 'Ops'),
 ('Office address form', 'Site: "301, 3rd Floor, Unity Commercial, Baner"; Profile PDF: "301-302, Unity Commercial, Near Amar Business Zone, Baner"', 'High for GBP/NAP', 'Owner'),
 ('Primary phone', 'Site: +91 78218 44591 (alt 87887 26752); Brochure/Profile: 87887 26752 / 92262 90310', 'High for GBP/NAP', 'Owner'),
 ('Business name used on listings', 'KARGAR Facility Management / Kargar Business Services Pvt. Ltd. / "Kargar Facility Services" (profile) / "Kargar Facility and Security Services PVT LTD" (Facebook page)', 'High for GBP/NAP', 'Owner'),
 ('Fazier launch badge link (footer, every page)', 'Link now 307-redirects to fazier.com home: listing appears removed. Keep, update or remove', 'Low', 'Marketing'),
 ('hrdesk@kargar.co.in still the jobs inbox', 'Used in job-seeker FAQs (from brochure)', 'Low', 'HR'),
 ('EmailJS template: add {{subject}}, {{reply_to}}, {{service}}, {{team}}; per-team inboxes', 'Current template renders {{message}} only (assumed from code)', 'Medium', 'Whoever owns the EmailJS account'),
 ('Property management (rental) offered?', 'Not targeted', 'Low', 'Owner'),
 ('Real site photographs and anonymised case studies', 'Pages use generic illustrations', 'Medium', 'Marketing'),
]
ws = wb.create_sheet('D. Redirects, links, facts')
r = 1
for title, header, data in [('Redirects, internal links fixed, external references', ['Type', 'From / where', 'To', 'Note'], RL),
                            ('Business facts awaiting confirmation (kept off the pages until confirmed)', ['Fact', 'Current handling', 'Priority', 'Who confirms'], FACTS)]:
    ws.cell(r, 1, title).font = Font(bold=True, size=12)
    r += 1
    for c, h in enumerate(header, 1):
        ws.cell(r, c, h).font, ws.cell(r, c).fill = HEAD, FILL
    for row in data:
        r += 1
        for c, v in enumerate(row, 1):
            ws.cell(r, c, v).alignment = Alignment(wrap_text=True, vertical='top')
    r += 3
for c, w in enumerate([46, 60, 36, 40], 1):
    ws.column_dimensions[get_column_letter(c)].width = w

# ---------------------------------------------------------------- E. QA
qrows = [[x['test'], x['url'], x['expected'], x['actual'], 'PASS' if x['pass'] else 'FAIL'] for x in qa['rows']]
ws, r0 = sheet('E. QA report', ['Test', 'URL', 'Expected', 'Actual', 'Result'], qrows, [34, 40, 50, 80, 8],
               note=f"Run {qa['ranAt'][:16]} UTC against the local production build (Vercel emulation). Supabase/EmailJS calls intercepted: no real lead or email created. Live delivery to the inbox is NOT verified here (see handover).")
for i in range(r0 + 1, r0 + 1 + len(qrows)):
    ws.cell(i, 5).fill = PASS if ws.cell(i, 5).value == 'PASS' else FAIL

# ---------------------------------------------------------------- F. baseline + 30/60/90
F = []
for svc, q, url, tracker in [
    ('Security', 'security services in pune', '/security-services-pune', 'Not in top 100 (owner, undated)'),
    ('Security', 'security guard services pune', '/security-services-pune', UA),
    ('Security', 'security agency in pune', '/security-services-pune', UA),
    ('Housekeeping', 'housekeeping services in pune', '/housekeeping-services-pune', 'Not in top 100 (owner, undated)'),
    ('Housekeeping', 'housekeeping company in pune', '/housekeeping-services-pune', UA),
    ('Housekeeping', 'office housekeeping services pune', '/office-housekeeping-services-pune', UA),
    ('Housekeeping', 'corporate housekeeping services in pune', '/corporate-housekeeping-services-pune', 'P2 #4 (office page shown)'),
    ('Housekeeping manpower', 'housekeeping manpower supplier pune', '/housekeeping-staff-pune', UA),
    ('FM', 'facility management company in pune', '/facility-management-company-pune', UA),
    ('FM', 'facility management pune', '/facility-management-company-pune', 'P3 #5'),
    ('FM', 'integrated facility management pune', '/facility-management-company-pune', UA),
    ('Maintenance', 'facility maintenance services in pune', '/facility-maintenance-services-pune', 'P1 #1 (FM pillar shown)'),
    ('Electrical', 'electrical maintenance services pune', '/electrical-maintenance-services-pune', UA),
    ('HVAC', 'hvac maintenance pune', '/hvac-maintenance-services-pune', 'P1 #1'),
    ('HVAC', 'commercial hvac maintenance pune', '/hvac-maintenance-services-pune', 'P1 #2'),
]:
    F.append([svc, q, url, 'Non-branded', tracker, '', '', UA, UA, UA, UA, UA] + [''] * 12)
F.append(['All', 'Qualified enquiries by service (Supabase metadata.enquiry_service, status not spam)', 'all', '-', '-', '', '', 'Starts at deploy (field is new)', '', '', '', ''] + [''] * 12)
F.append(['All', 'Form submissions (GA4 contact_form_submit) by enquiry_service', 'all', '-', '-', '', '', UA, '', '', '', ''] + [''] * 12)
F.append(['All', 'Phone clicks (GA4 call_click) by page — interest, not a conversation', 'all', '-', '-', '', '', UA, '', '', '', ''] + [''] * 12)
F.append(['All', 'Business Profile: calls, website clicks, direction requests (report separately from organic)', 'GBP', '-', '-', '', '', UA, '', '', '', ''] + [''] * 12)
sheet('F. Baseline & 30-60-90', [
    'Service', 'Query / metric', 'Target URL', 'Branded?', 'Manual rank 2026-11-05', 'Rank check location', 'Device',
    'Baseline impressions (GSC, 3 mo)', 'Baseline clicks', 'Baseline CTR', 'Baseline avg position', 'URL Google shows',
    'Day 30 impressions', 'Day 30 clicks', 'Day 30 CTR', 'Day 30 position',
    'Day 60 impressions', 'Day 60 clicks', 'Day 60 CTR', 'Day 60 position',
    'Day 90 impressions', 'Day 90 clicks', 'Day 90 CTR', 'Day 90 position'], F,
    [16, 46, 34, 10, 22, 16, 10] + [14] * 17,
    note='Fill the baseline from a GSC export (Performance → Queries and Pages, last 3 months, Country India) BEFORE merging. For manual rank checks record location (e.g. Baner, Pune), device and date. Unavailable means not measured — never enter 0 unless GSC reports 0.')

wb.save(out_p)
print('saved', out_p)
