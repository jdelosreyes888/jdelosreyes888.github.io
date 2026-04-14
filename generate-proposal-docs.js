// generate-proposal-docs.js
// Generates all 5 Word (.docx) proposal documents for SJDEFI Website Package
// Run: node generate-proposal-docs.js

const path = require("path");
const fs = require("fs");
const docxPath = "C:/Users/James/AppData/Roaming/npm/node_modules/docx";

const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  LevelFormat,
  HeadingLevel,
  BorderStyle,
  WidthType,
  ShadingType,
  VerticalAlign,
  PageNumber,
  PageBreak,
  NumberFormat,
} = require(docxPath);

const OUTPUT_DIR = "C:/myFiles/SJDEFI Website/jdelosreyes888.github.io/proposal-documents";

// ─── Shared constants ────────────────────────────────────────────────────────
const PAGE_WIDTH  = 12240; // US Letter DXA
const PAGE_HEIGHT = 15840;
const MARGIN      = 1440;  // 1 inch
const CONTENT_W   = 9360;  // 12240 - 1440 - 1440

const NAVY   = "003087";
const GOLD   = "C9A84C";
const WHITE  = "FFFFFF";
const LT_BLUE = "D6E4F0";
const LT_YELLOW = "FFF9C4";

// ─── Reusable helpers ────────────────────────────────────────────────────────
const pageProps = {
  page: {
    size: { width: PAGE_WIDTH, height: PAGE_HEIGHT },
    margin: { top: MARGIN, right: MARGIN, bottom: MARGIN, left: MARGIN },
  },
};

function makeHeader(text) {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: NAVY, space: 4 } },
        children: [
          new TextRun({ text, font: "Arial", size: 18, color: NAVY, bold: true }),
        ],
      }),
    ],
  });
}

function makeFooter() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        border: { top: { style: BorderStyle.SINGLE, size: 4, color: "AAAAAA", space: 4 } },
        children: [
          new TextRun({ text: "Page ", font: "Arial", size: 18, color: "666666" }),
          new TextRun({ children: [PageNumber.CURRENT], font: "Arial", size: 18, color: "666666" }),
          new TextRun({ text: " of ", font: "Arial", size: 18, color: "666666" }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: "Arial", size: 18, color: "666666" }),
        ],
      }),
    ],
  });
}

// Standard cell border
const cellBorder = { style: BorderStyle.SINGLE, size: 4, color: "CCCCCC" };
const cellBorders = { top: cellBorder, bottom: cellBorder, left: cellBorder, right: cellBorder };
const noBorder = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder };

function bodyPara(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before ?? 120, after: opts.after ?? 120 },
    alignment: opts.align ?? AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, font: "Arial", size: 22, ...opts.run })],
  });
}

function headingPara(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before ?? 240, after: opts.after ?? 120 },
    children: [
      new TextRun({
        text,
        font: "Arial",
        size: opts.size ?? 26,
        bold: true,
        color: opts.color ?? NAVY,
        allCaps: opts.allCaps ?? false,
      }),
    ],
  });
}

function bulletNumberingConfig(ref) {
  return {
    reference: ref,
    levels: [
      {
        level: 0,
        format: LevelFormat.BULLET,
        text: "\u2022",
        alignment: AlignmentType.LEFT,
        style: {
          paragraph: { indent: { left: 720, hanging: 360 } },
          run: { font: "Arial", size: 22 },
        },
      },
    ],
  };
}

function bulletPara(text, ref, opts = {}) {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    spacing: { before: 60, after: 60 },
    children: [new TextRun({ text, font: "Arial", size: 22, ...opts.run })],
  });
}

function spacer(pts = 120) {
  return new Paragraph({ spacing: { before: 0, after: pts }, children: [new TextRun("")] });
}

// ─── DOCUMENT 1: Cover Letter ────────────────────────────────────────────────
async function makeDoc1() {
  const HEADER_TEXT = "San Juan De Dios Educational Foundation, Inc. - College | Website Proposal Package";

  const numbering = { config: [bulletNumberingConfig("bullets1")] };

  const children = [
    // Date
    new Paragraph({
      spacing: { before: 0, after: 80 },
      children: [new TextRun({ text: "April 8, 2026", font: "Arial", size: 22 })],
    }),
    spacer(160),
    // To block
    bodyPara("To:", { before: 0, after: 40, align: AlignmentType.LEFT }),
    bodyPara("The Administration", { before: 0, after: 40, align: AlignmentType.LEFT }),
    bodyPara("San Juan De Dios Educational Foundation, Inc. - College", { before: 0, after: 40, align: AlignmentType.LEFT }),
    bodyPara("Pasay City, Philippines", { before: 0, after: 160, align: AlignmentType.LEFT }),
    // Subject line
    new Paragraph({
      spacing: { before: 0, after: 200 },
      children: [
        new TextRun({ text: "Subject: ", font: "Arial", size: 22, bold: true }),
        new TextRun({ text: "Submission of Website Landing Page Proposal", font: "Arial", size: 22, underline: {} }),
      ],
    }),
    // Body paragraphs
    bodyPara(
      "I am pleased to submit this formal proposal for the development of a dedicated website landing page for San Juan De Dios Educational Foundation, Inc. (SJDEFI) - College. This proposal outlines a comprehensive plan to establish a modern, responsive, and mission-aligned digital presence for the institution, aimed at supporting the admissions campaign for Academic Year 2026-2027.",
      { before: 0, after: 160 }
    ),
    bodyPara(
      "The proposed landing page has been thoughtfully designed to reflect the rich Vincentian heritage, academic excellence, and community spirit that define SJDEFI. It features key sections including the institution's program offerings, admissions process, campus events, and a call-to-action designed to encourage prospective students to apply. The design prioritizes clarity, accessibility, and mobile responsiveness to reach the widest possible audience.",
      { before: 0, after: 160 }
    ),
    bodyPara(
      "Enclosed in this proposal package are the following documents: (1) Website Proposal Document, (2) Content Requirements Checklist, (3) Terms and Conditions / Service Agreement, and (4) Cost Estimate and Quotation. I encourage the Administration to review each document carefully and reach out should there be any questions, clarifications, or requests for additional information.",
      { before: 0, after: 160 }
    ),
    bodyPara(
      "I am confident that this landing page will serve as an effective digital tool in attracting and informing prospective SJDCians. It is my hope that this proposal reflects the quality, dedication, and values that I intend to bring to this project. I look forward to the opportunity to serve SJDEFI and its mission.",
      { before: 0, after: 280 }
    ),
    // Closing
    bodyPara("Respectfully submitted,", { before: 0, after: 0, align: AlignmentType.LEFT }),
    spacer(560), // signature space
    new Paragraph({
      spacing: { before: 0, after: 40 },
      children: [new TextRun({ text: "James Montealegre", font: "Arial", size: 22, bold: true })],
    }),
    bodyPara("Web Developer", { before: 0, after: 40, align: AlignmentType.LEFT }),
    bodyPara("April 8, 2026", { before: 0, after: 0, align: AlignmentType.LEFT }),
  ];

  const doc = new Document({
    numbering,
    sections: [
      {
        properties: pageProps,
        headers: { default: makeHeader(HEADER_TEXT) },
        footers: { default: makeFooter() },
        children,
      },
    ],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUTPUT_DIR, "01_Cover_Letter.docx"), buf);
  console.log("  [OK] 01_Cover_Letter.docx");
}

// ─── DOCUMENT 2: Website Proposal ────────────────────────────────────────────
async function makeDoc2() {
  const HEADER_TEXT = "San Juan De Dios Educational Foundation, Inc. - College | Website Proposal Package";

  const numbering = {
    config: [
      bulletNumberingConfig("bullets2a"),
      bulletNumberingConfig("bullets2b"),
      bulletNumberingConfig("bullets2c"),
      bulletNumberingConfig("bullets2d"),
      bulletNumberingConfig("bullets2e"),
    ],
  };

  // Timeline table
  const tblBorder = { style: BorderStyle.SINGLE, size: 4, color: "999999" };
  const tblBorders = { top: tblBorder, bottom: tblBorder, left: tblBorder, right: tblBorder };

  function timelineRow(phase, activities, duration, isHeader = false) {
    const widths = [1800, 5760, 1800];
    const texts  = [phase, activities, duration];
    return new TableRow({
      tableHeader: isHeader,
      children: texts.map((t, i) =>
        new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          borders: tblBorders,
          shading: isHeader
            ? { fill: NAVY, type: ShadingType.CLEAR }
            : { fill: "F5F5F5", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: t,
                  font: "Arial",
                  size: 20,
                  bold: isHeader,
                  color: isHeader ? WHITE : "000000",
                }),
              ],
            }),
          ],
        })
      ),
    });
  }

  const timelineTable = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [1800, 5760, 1800],
    rows: [
      timelineRow("Phase", "Activities", "Duration", true),
      timelineRow("Week 1 - Discovery & Content Gathering", "Requirements discussion, content checklist review, asset collection from client", "1 Week"),
      timelineRow("Week 2 - Wireframe & Design Approval", "Layout wireframing, color and typography selection, client design review and approval", "1 Week"),
      timelineRow("Week 3 - Development", "Full HTML/CSS/JS coding of all landing page sections, media integration", "1 Week"),
      timelineRow("Week 4 - Testing & Revisions", "Cross-browser and mobile testing, client review, first round of revisions", "1 Week"),
      timelineRow("Week 5 - Final Review & Launch", "Final client approval, GitHub Pages deployment, post-launch check", "1 Week"),
    ],
  });

  const sec = (n, title) => headingPara(`${n}. ${title}`, { allCaps: true, before: 280, after: 120 });

  const children = [
    // Title block
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [new TextRun({ text: "WEBSITE LANDING PAGE PROPOSAL", font: "Arial", size: 36, bold: true, color: NAVY })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [new TextRun({ text: "San Juan De Dios Educational Foundation, Inc. - College", font: "Arial", size: 26, bold: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({ text: "Prepared by: ", font: "Arial", size: 22 }),
        new TextRun({ text: "James Montealegre, Web Developer", font: "Arial", size: 22, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 280 },
      children: [new TextRun({ text: "Date: April 8, 2026", font: "Arial", size: 22 })],
    }),

    // Section 1
    sec("SECTION 1", "EXECUTIVE SUMMARY"),
    bodyPara(
      "This proposal presents a plan to design and develop a dedicated website landing page for San Juan De Dios Educational Foundation, Inc. (SJDEFI) - College. The landing page will serve as the institution's primary digital touchpoint for prospective students and their families, with a primary goal of driving enrollment inquiries and applications for Academic Year 2026-2027. The page has been designed to communicate the institution's Vincentian mission, academic programs, admissions process, and institutional strengths in a clear, compelling, and visually engaging manner."
    ),

    // Section 2
    sec("SECTION 2", "PROJECT BACKGROUND"),
    bodyPara(
      "San Juan De Dios Educational Foundation, Inc. is a private, non-stock, non-profit institution located in Pasay City, Philippines, with a heritage dating back to 1578. Operated by the Daughters of Charity and inspired by St. Vincent de Paul and St. Louise de Marillac, SJDEFI stands as one of the oldest and most respected educational and healthcare institutions in the country. The institution is PAASCU Level II accredited and offers programs in allied health sciences and business management.",
      { after: 120 }
    ),
    bodyPara(
      "In today's digital landscape, prospective students and parents rely heavily on online information when making enrollment decisions. A dedicated, modern, and mobile-friendly landing page will allow SJDEFI to present its offerings effectively, reach a broader audience, and strengthen its brand identity online."
    ),

    // Section 3
    sec("SECTION 3", "PROJECT OBJECTIVES"),
    bulletPara("Increase admissions inquiries and online applications for AY 2026-2027", "bullets2a"),
    bulletPara("Showcase the institution's college and senior high school program offerings", "bullets2a"),
    bulletPara("Establish a strong, professional digital presence aligned with Vincentian values", "bullets2a"),
    bulletPara("Highlight SJDEFI's PAASCU Level II accreditation and academic excellence", "bullets2a"),
    bulletPara("Communicate the institution's heritage, core values, and Christ-centered mission", "bullets2a"),
    bulletPara("Provide prospective students with a clear and accessible admissions guide", "bullets2a"),
    bulletPara("Promote campus life and community events to attract student interest", "bullets2a"),

    // Section 4
    sec("SECTION 4", "SCOPE OF WORK"),
    bodyPara("The landing page will consist of the following sections:", { after: 80 }),

    ...[
      ["1. Header / Navigation", "Institutional logos, school name, and mobile-responsive navigation toggle."],
      ["2. Hero Section", "Full-width video background featuring the Miracle Building, headline text, and call-to-action buttons for applying and exploring programs."],
      ["3. Stats Strip", "Four key institutional highlights: 113 Years of Vincentian Education, PAASCU Level II Accreditation, Base Hospital Access, and Board Exam Excellence."],
      ["4. Who We Are", "Institutional overview, Vincentian mission, and the 3Cs (Christ-Centered, Charitable, Competent) displayed as value cards."],
      ["5. Senior High School Tracks", "Overview of the Academic Track and TechPro Track with a link to the full SHS programs page."],
      ["6. College Program Offerings", "Detailed descriptions of all six college programs grouped under Allied Health and Business & Management."],
      ["7. Events Gallery", "Six-image gallery showcasing campus life including Eucharistic Celebrations, E-Sports, Bench Cheer, Technical Training, Intramurals, and NSTP Emergency Response Training."],
      ["8. Why Choose SJDEFI", "Six feature cards highlighting the institution's key differentiators."],
      ["9. Admissions Section", "Step-by-step admissions guide and a card listing official admission requirements."],
      ["10. CTA with QR Code", "Call-to-action section with a QR code placeholder for the online application portal."],
      ["11. Social Media Links", "Facebook and TikTok links with QR code placeholders for each platform."],
      ["12. Footer", "Copyright notice and links to Contact, Privacy Policy, and Terms pages."],
    ].map(
      ([label, desc]) =>
        new Paragraph({
          spacing: { before: 60, after: 60 },
          indent: { left: 360 },
          children: [
            new TextRun({ text: label + " - ", font: "Arial", size: 22, bold: true }),
            new TextRun({ text: desc, font: "Arial", size: 22 }),
          ],
        })
    ),

    // Section 5
    sec("SECTION 5", "DESIGN AND CONTENT APPROACH"),
    bodyPara(
      "The landing page has been designed with a professional, faith-based, and modern aesthetic that reflects SJDEFI's identity. The visual design draws from the institution's color palette of deep navy blue and gold, reinforcing brand consistency and institutional prestige. The typography uses Poppins (via Google Fonts), chosen for its modern readability and clean appearance across all devices.",
      { after: 120 }
    ),
    bodyPara(
      "The layout is fully responsive, adapting seamlessly to mobile phones, tablets, and desktop screens. Special attention has been given to the hero section, which features a video of the Miracle Building to create an immediate visual impact and emotional connection with prospective students. Content across the page is written in a tone that is welcoming, aspirational, and mission-aligned."
    ),

    // Section 6
    sec("SECTION 6", "TECHNOLOGY STACK"),
    bulletPara("HTML5 - Semantic markup for content structure and accessibility", "bullets2b"),
    bulletPara("CSS3 - Custom styling, responsive layout using Flexbox and Grid", "bullets2b"),
    bulletPara("JavaScript - Dynamic elements including auto-updating copyright year and mobile navigation", "bullets2b"),
    bulletPara("Google Fonts (Poppins) - Modern, cross-platform typography", "bullets2b"),
    bulletPara("MP4 Video - Hero background video of the Miracle Building", "bullets2b"),
    bulletPara("GitHub Pages - Free, reliable static site hosting with version control", "bullets2b"),
    bulletPara("Responsive Design - Optimized for mobile, tablet, and desktop viewports", "bullets2b"),

    // Section 7
    sec("SECTION 7", "PROJECT TIMELINE"),
    timelineTable,

    // Section 8
    sec("SECTION 8", "DELIVERABLES"),
    bulletPara("Complete HTML, CSS, and JavaScript source code files", "bullets2c"),
    bulletPara("Live landing page hosted on GitHub Pages", "bullets2c"),
    bulletPara("Responsive design optimized for mobile, tablet, and desktop", "bullets2c"),
    bulletPara("Integrated image and video media assets", "bullets2c"),
    bulletPara("One (1) round of revisions post-delivery", "bullets2c"),
    bulletPara("Basic documentation on how to update content", "bullets2c"),

    // Section 9
    sec("SECTION 9", "ASSUMPTIONS AND LIMITATIONS"),
    bulletPara("All written content, images, and video assets must be provided by SJDEFI in a timely manner", "bullets2d"),
    bulletPara("QR codes for the online application portal and social media pages are pending and must be supplied by the client", "bullets2d"),
    bulletPara("Final official logo files (high-resolution PNG or SVG) must be confirmed and provided by the client", "bullets2d"),
    bulletPara("Social media URLs for Facebook and TikTok are to be confirmed by the institution", "bullets2d"),
    bulletPara("The project timeline begins upon receipt of signed agreement and initial content assets", "bullets2d"),
    bulletPara("The scope covers only the landing page as described; additional pages or features are not included in this proposal", "bullets2d"),

    // Section 10
    sec("SECTION 10", "CONCLUSION"),
    bodyPara(
      "This landing page proposal represents a meaningful opportunity to strengthen SJDEFI's digital presence and serve its mission of forming Christ-centered, charitable, and competent graduates. I am committed to delivering a high-quality, professional product that reflects the values and heritage of this institution. I look forward to the possibility of collaborating with San Juan De Dios Educational Foundation, Inc. and contributing to the success of its AY 2026-2027 admissions campaign."
    ),
  ];

  const doc = new Document({
    numbering,
    sections: [
      {
        properties: pageProps,
        headers: { default: makeHeader(HEADER_TEXT) },
        footers: { default: makeFooter() },
        children,
      },
    ],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUTPUT_DIR, "02_Website_Proposal.docx"), buf);
  console.log("  [OK] 02_Website_Proposal.docx");
}

// ─── DOCUMENT 3: Content Requirements Checklist ──────────────────────────────
async function makeDoc3() {
  const COL_WIDTHS = [2500, 3000, 1500, 2360]; // sum = 9360

  function contentRow(item, desc, status, isHeader = false) {
    const texts = [item, desc, status, ""];
    const fill  = isHeader ? NAVY : "FFFFFF";
    const shade = ShadingType.CLEAR;
    return new TableRow({
      tableHeader: isHeader,
      children: texts.map((t, i) =>
        new TableCell({
          width: { size: COL_WIDTHS[i], type: WidthType.DXA },
          borders: cellBorders,
          shading: { fill, type: shade },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: t,
                  font: "Arial",
                  size: isHeader ? 20 : 20,
                  bold: isHeader,
                  color: isHeader ? WHITE : "000000",
                }),
              ],
            }),
          ],
        })
      ),
    });
  }

  function sectionTable(sectionTitle, rows) {
    return [
      headingPara(sectionTitle, { size: 22, color: NAVY, before: 200, after: 60 }),
      new Table({
        width: { size: CONTENT_W, type: WidthType.DXA },
        columnWidths: COL_WIDTHS,
        rows: [
          contentRow("Item", "Description", "Status", true),
          ...rows.map(([item, desc, status]) => contentRow(item, desc, status)),
        ],
      }),
      spacer(80),
    ];
  }

  const noteBox = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: cellBorders,
            shading: { fill: LT_YELLOW, type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { before: 0, after: 60 },
                children: [new TextRun({ text: "IMPORTANT:", font: "Arial", size: 20, bold: true, color: "B71C1C" })],
              }),
              new Paragraph({
                spacing: { before: 0, after: 0 },
                children: [
                  new TextRun({
                    text: "All content items marked 'To Provide' must be submitted at least 7 days before the development phase begins to avoid project delays. Please coordinate with James Montealegre for proper file formats and submission guidelines.",
                    font: "Arial",
                    size: 20,
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  const children = [
    // Title
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [new TextRun({ text: "WEBSITE CONTENT REQUIREMENTS CHECKLIST", font: "Arial", size: 32, bold: true, color: NAVY })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [new TextRun({ text: "San Juan De Dios Educational Foundation, Inc. - College", font: "Arial", size: 24, bold: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 200 },
      children: [
        new TextRun({ text: "Prepared by: James Montealegre  |  Date: April 8, 2026", font: "Arial", size: 20 }),
      ],
    }),
    bodyPara(
      "This checklist identifies all content items required from SJDEFI to complete the website landing page. Please review each item, indicate the current status, and provide any relevant notes. All content must be submitted at least 7 days before the development phase begins.",
      { before: 0, after: 200 }
    ),

    // Section 1
    ...sectionTable("Section 1: Branding & Identity", [
      ["Official SJDEFI Logo", "High-resolution PNG or SVG format, transparent background", "To Provide"],
      ["DC-SLMES Logo", "High-resolution PNG or SVG format, transparent background", "To Provide"],
      ["Approved Color Palette", "Official hex color codes for primary and accent colors", "To Provide"],
      ["Official Tagline / Motto", "Final approved institutional tagline for use on the website", "To Provide"],
    ]),

    // Section 2
    ...sectionTable("Section 2: Hero Section", [
      ["Hero Headline Text", "Final approved main heading for the hero section", "On Hand"],
      ["Hero Subtext", "Final approved subtitle/description below the headline", "On Hand"],
      ["Miracle Building Video", "MP4 format, HD quality (1080p preferred), max 30MB", "On Hand"],
      ["Hero Poster / Fallback Image", "Static image shown while video loads or if video fails", "To Provide"],
    ]),

    // Section 3
    ...sectionTable("Section 3: Programs Content", [
      ["BS Nursing Description", "Official program description, 2-3 sentences", "On Hand"],
      ["BS Medical Technology Description", "Official program description, 2-3 sentences", "On Hand"],
      ["BS Physical Therapy Description", "Official program description, 2-3 sentences", "On Hand"],
      ["BS Hospitality Management Description", "Official program description, 2-3 sentences", "On Hand"],
      ["BS Entrepreneurship Description", "Official program description, 2-3 sentences", "On Hand"],
      ["BS Office Administration Description", "Official program description, 2-3 sentences", "On Hand"],
      ["SHS Academic Track Description", "Official track description for the landing page", "On Hand"],
      ["SHS TechPro Track Description", "Official track description for the landing page", "On Hand"],
      ["Program-Specific Admission Requirements", "Any requirements unique to individual programs", "To Provide"],
    ]),

    // Section 4
    ...sectionTable("Section 4: Events & Gallery", [
      ["Event Photo 1 (Eucharistic Celebration)", "High-resolution JPG/PNG, min 1200px wide", "On Hand"],
      ["Event Photo 2 (E-Sports Competition)", "High-resolution JPG/PNG, min 1200px wide", "On Hand"],
      ["Event Photo 3 (Bench Cheer Competition)", "High-resolution JPG/PNG, min 1200px wide", "On Hand"],
      ["Event Photo 4 (Technical Training)", "High-resolution JPG/PNG, min 1200px wide", "On Hand"],
      ["Event Photo 5 (Intramurals)", "High-resolution JPG/PNG, min 1200px wide", "On Hand"],
      ["Event Photo 6 (NSTP Emergency Training)", "High-resolution JPG/PNG, min 1200px wide", "On Hand"],
      ["Event Names, Dates, and Captions", "Correct labels for each event photo", "To Provide"],
    ]),

    // Section 5
    ...sectionTable("Section 5: Admissions", [
      ["Admissions Deadline (AY 2026-2027)", "Official last date for application submissions", "To Provide"],
      ["Online Application Portal Link", "URL of the official online application form", "To Provide"],
      ["Registrar's Office Contact Details", "Phone number, email address, and office address", "To Provide"],
      ["Application QR Code Image", "PNG image of the QR code linking to the application portal", "To Provide"],
    ]),

    // Section 6
    ...sectionTable("Section 6: Social Media & Links", [
      ["Official Facebook Page URL", "Full URL of the SJDEFI Facebook page", "To Provide"],
      ["Official TikTok Page URL", "Full URL of the SJDEFI TikTok account", "To Provide"],
      ["Facebook QR Code Image", "PNG image of the QR code linking to the Facebook page", "To Provide"],
      ["TikTok QR Code Image", "PNG image of the QR code linking to the TikTok account", "To Provide"],
    ]),

    // Section 7
    ...sectionTable("Section 7: Institutional Information", [
      ["PAASCU Accreditation Details", "Official accreditation level and year of recognition", "To Provide"],
      ["Board Exam Performance Data", "Passing rates and relevant years for all board programs", "To Provide"],
      ["Footer Contact Information", "Complete address, phone, and email for the footer", "To Provide"],
    ]),

    noteBox,
  ];

  const doc = new Document({
    sections: [{ properties: pageProps, children }],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUTPUT_DIR, "03_Content_Requirements.docx"), buf);
  console.log("  [OK] 03_Content_Requirements.docx");
}

// ─── DOCUMENT 4: Terms and Conditions ────────────────────────────────────────
async function makeDoc4() {
  const HEADER_TEXT = "San Juan De Dios Educational Foundation, Inc. - College | Website Proposal Package";

  const numbering = { config: [bulletNumberingConfig("bullets4")] };

  function sectionHead(num, title) {
    return new Paragraph({
      spacing: { before: 280, after: 100 },
      children: [
        new TextRun({ text: `Section ${num} - ${title}`, font: "Arial", size: 24, bold: true, color: NAVY, allCaps: true }),
      ],
    });
  }

  // Signature table
  function sigCell(lines, w) {
    return new TableCell({
      width: { size: w, type: WidthType.DXA },
      borders: noBorders,
      margins: { top: 80, bottom: 80, left: 120, right: 120 },
      children: lines.map(
        (line, i) =>
          new Paragraph({
            spacing: { before: 0, after: i === lines.length - 1 ? 0 : 60 },
            children: [new TextRun({ text: line, font: "Arial", size: 22, bold: line.startsWith("FOR THE") })],
          })
      ),
    });
  }

  const sigTable = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [4500, 4860],
    rows: [
      new TableRow({
        children: [
          sigCell(
            [
              "FOR THE DEVELOPER:",
              "",
              "Signature: ___________________________",
              "",
              "Name: James Montealegre",
              "Title: Web Developer",
              "Date: ___________________________",
            ],
            4500
          ),
          sigCell(
            [
              "FOR THE CLIENT:",
              "",
              "Signature: ___________________________",
              "",
              "Name: ___________________________",
              "Title: ___________________________",
              "Date: ___________________________",
            ],
            4860
          ),
        ],
      }),
    ],
  });

  const children = [
    // Title
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [new TextRun({ text: "WEBSITE DEVELOPMENT SERVICE AGREEMENT", font: "Arial", size: 32, bold: true, color: NAVY })],
    }),
    spacer(160),

    // Parties
    headingPara("PARTIES TO THIS AGREEMENT", { size: 22, color: NAVY, before: 0, after: 100 }),
    bodyPara("This Website Development Service Agreement ('Agreement') is entered into as of April 8, 2026, by and between:"),
    new Paragraph({
      spacing: { before: 80, after: 60 },
      indent: { left: 360 },
      children: [
        new TextRun({ text: "Developer: ", font: "Arial", size: 22, bold: true }),
        new TextRun({ text: "James Montealegre, Web Developer, hereinafter referred to as 'the Developer'", font: "Arial", size: 22 }),
      ],
    }),
    new Paragraph({
      spacing: { before: 0, after: 160 },
      indent: { left: 360 },
      children: [
        new TextRun({ text: "Client: ", font: "Arial", size: 22, bold: true }),
        new TextRun({
          text: "San Juan De Dios Educational Foundation, Inc. - College, Pasay City, Philippines, hereinafter referred to as 'the Client'",
          font: "Arial",
          size: 22,
        }),
      ],
    }),

    // Section 1
    sectionHead(1, "SCOPE OF SERVICES"),
    bodyPara(
      "The Developer agrees to design, develop, and deploy a responsive website landing page for the Client as described in the accompanying Website Landing Page Proposal dated April 8, 2026. The scope of work includes all sections outlined in the Scope of Work portion of said proposal, including but not limited to: the Hero Section, Program Offerings, Admissions Guide, Events Gallery, and social media integration."
    ),

    // Section 2
    sectionHead(2, "DELIVERABLES"),
    bodyPara("Upon completion of the project, the Developer shall deliver the following:", { after: 80 }),
    bulletPara("Complete HTML, CSS, and JavaScript source code files", "bullets4"),
    bulletPara("A live, hosted landing page on GitHub Pages", "bullets4"),
    bulletPara("Responsive design compatible with mobile, tablet, and desktop devices", "bullets4"),
    bulletPara("Integrated image and video media assets as provided by the Client", "bullets4"),
    bulletPara("One (1) round of post-delivery revisions as specified in Section 6", "bullets4"),

    // Section 3
    sectionHead(3, "PROJECT TIMELINE"),
    bodyPara(
      "The project is estimated to be completed within five (5) weeks from the date of: (a) execution of this Agreement, and (b) receipt of all required content assets from the Client as listed in the Content Requirements Checklist. Delays in content submission by the Client may result in corresponding delays to the project timeline."
    ),

    // Section 4
    sectionHead(4, "CLIENT RESPONSIBILITIES"),
    bodyPara("The Client agrees to:", { after: 80 }),
    bulletPara("Provide all required content, images, videos, logos, and text as specified in the Content Requirements Checklist within the agreed timeline", "bullets4"),
    bulletPara("Designate a single point of contact for all project communications and approvals", "bullets4"),
    bulletPara("Provide written approval (email is acceptable) at each project milestone before proceeding to the next phase", "bullets4"),
    bulletPara("Review and respond to submissions within five (5) business days to avoid project delays", "bullets4"),

    // Section 5
    sectionHead(5, "INTELLECTUAL PROPERTY"),
    bodyPara(
      "Upon receipt of full payment, all custom code, design, and content created exclusively for this project shall transfer to the Client. The Client shall have full ownership and rights to use, modify, and distribute the delivered materials. Third-party assets used in the project, including Google Fonts and any licensed stock images, remain subject to their respective license agreements and are not transferred as exclusive property of the Client."
    ),

    // Section 6
    sectionHead(6, "REVISIONS"),
    bodyPara(
      "This Agreement includes one (1) round of revisions after the initial delivery of the completed landing page. A revision round consists of a consolidated list of changes submitted by the Client in writing. Additional revision rounds beyond the one (1) included shall be billed at a separate rate to be agreed upon in writing prior to commencement."
    ),

    // Section 7
    sectionHead(7, "CONFIDENTIALITY"),
    bodyPara(
      "Both parties agree to keep confidential any proprietary information, institutional data, or project details shared during the course of this engagement. Neither party shall disclose such information to third parties without prior written consent from the other party, except as required by law."
    ),

    // Section 8
    sectionHead(8, "LIMITATION OF LIABILITY"),
    bodyPara(
      "The Developer shall not be held liable for: (a) errors, inaccuracies, or omissions in content provided by the Client; (b) outages, downtime, or service interruptions caused by third-party hosting providers (including GitHub Pages); or (c) any indirect, incidental, or consequential damages arising from the use or inability to use the delivered website. The Developer's total liability under this Agreement shall not exceed the total amount paid by the Client."
    ),

    // Section 9
    sectionHead(9, "GOVERNING LAW"),
    bodyPara(
      "This Agreement shall be governed by and construed in accordance with the laws of the Republic of the Philippines. Any disputes arising from this Agreement shall be resolved through mutual negotiation, and if unresolved, through the appropriate courts of Pasay City, Philippines."
    ),

    // Section 10
    sectionHead(10, "SIGNATURES"),
    bodyPara(
      "By signing below, both parties agree to the terms and conditions set forth in this Agreement.",
      { after: 200 }
    ),
    sigTable,
  ];

  const doc = new Document({
    numbering,
    sections: [
      {
        properties: pageProps,
        headers: { default: makeHeader(HEADER_TEXT) },
        footers: { default: makeFooter() },
        children,
      },
    ],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUTPUT_DIR, "04_Terms_and_Conditions.docx"), buf);
  console.log("  [OK] 04_Terms_and_Conditions.docx");
}

// ─── DOCUMENT 5: Cost Estimate ────────────────────────────────────────────────
async function makeDoc5() {
  // Main table column widths: 700+2200+3000+500+1100+1860 = 9360
  const MAIN_COLS = [700, 2200, 3000, 500, 1100, 1860];

  function mainRow(no, service, desc, qty, unit, total, isHeader = false, isSubtotal = false, isNote = false, isEven = false) {
    const vals = [no, service, desc, qty, unit, total];
    let fill = "FFFFFF";
    if (isHeader)   fill = NAVY;
    else if (isSubtotal) fill = "E8EAF6";
    else if (isNote) fill = "FAFAFA";
    else if (isEven) fill = LT_BLUE;

    return new TableRow({
      tableHeader: isHeader,
      children: vals.map((v, i) =>
        new TableCell({
          width: { size: MAIN_COLS[i], type: WidthType.DXA },
          borders: cellBorders,
          shading: { fill, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          verticalAlign: VerticalAlign.CENTER,
          children: [
            new Paragraph({
              alignment: (i >= 4) ? AlignmentType.RIGHT : AlignmentType.LEFT,
              children: [
                new TextRun({
                  text: String(v),
                  font: "Arial",
                  size: 20,
                  bold: isHeader || isSubtotal,
                  color: isHeader ? WHITE : "000000",
                }),
              ],
            }),
          ],
        })
      ),
    });
  }

  const mainTable = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: MAIN_COLS,
    rows: [
      mainRow("No.", "Service / Deliverable", "Description", "Qty", "Unit Cost", "Total", true),
      mainRow("1", "Discovery & Planning", "Requirements gathering, content review, and project scoping", "1", "PHP 2,000", "PHP 2,000", false, false, false, false),
      mainRow("2", "UI/UX Design", "Landing page layout and visual design, color scheme, typography", "1", "PHP 5,000", "PHP 5,000", false, false, false, true),
      mainRow("3", "Frontend Development", "HTML5/CSS3/JS coding of all landing page sections", "1", "PHP 8,000", "PHP 8,000", false, false, false, false),
      mainRow("4", "Responsive Design", "Mobile, tablet, and desktop layout optimization", "1", "PHP 3,000", "PHP 3,000", false, false, false, true),
      mainRow("5", "Media Integration", "Video hero (MP4) embed, image gallery, asset optimization", "1", "PHP 2,000", "PHP 2,000", false, false, false, false),
      mainRow("6", "GitHub Pages Deployment", "Hosting setup, domain configuration, final launch", "1", "PHP 1,500", "PHP 1,500", false, false, false, true),
      mainRow("7", "Testing & QA", "Cross-browser and cross-device testing", "1", "PHP 1,500", "PHP 1,500", false, false, false, false),
      mainRow("8", "Revision Round (1 included)", "One round of client-requested changes post-delivery", "1", "Included", "Included", false, false, false, true),
      mainRow("9", "Post-Launch Support (30 days)", "Minor bug fixes and content updates within 30 days of launch", "1", "PHP 2,000", "PHP 2,000", false, false, false, false),
      // Subtotal
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 5,
            width: { size: MAIN_COLS.slice(0,5).reduce((a,b)=>a+b,0), type: WidthType.DXA },
            borders: cellBorders,
            shading: { fill: "E8EAF6", type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: "SUBTOTAL", font: "Arial", size: 22, bold: true })] })],
          }),
          new TableCell({
            width: { size: MAIN_COLS[5], type: WidthType.DXA },
            borders: cellBorders,
            shading: { fill: "E8EAF6", type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: "PHP 25,000", font: "Arial", size: 22, bold: true })] })],
          }),
        ],
      }),
      // Note row
      new TableRow({
        children: [
          new TableCell({
            columnSpan: 6,
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: cellBorders,
            shading: { fill: "FAFAFA", type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [
              new Paragraph({
                children: [
                  new TextRun({ text: "VAT not included. All amounts in Philippine Peso (PHP).", font: "Arial", size: 20, italics: true }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Payment terms
  const paymentBox = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: cellBorders,
            shading: { fill: "EEF2FF", type: ShadingType.CLEAR },
            margins: { top: 120, bottom: 120, left: 160, right: 160 },
            children: [
              new Paragraph({
                spacing: { before: 0, after: 80 },
                children: [new TextRun({ text: "PAYMENT TERMS", font: "Arial", size: 22, bold: true, color: NAVY })],
              }),
              new Paragraph({
                spacing: { before: 0, after: 60 },
                children: [new TextRun({ text: "50% downpayment (PHP 12,500) — Upon signing of the Service Agreement", font: "Arial", size: 22 })],
              }),
              new Paragraph({
                spacing: { before: 0, after: 0 },
                children: [new TextRun({ text: "50% final payment (PHP 12,500) — Upon project completion and delivery", font: "Arial", size: 22 })],
              }),
            ],
          }),
        ],
      }),
    ],
  });

  // Add-ons table: 2500+4500+2360 = 9360
  const ADDON_COLS = [2500, 4500, 2360];

  function addonRow(service, desc, price, isHeader = false) {
    const vals = [service, desc, price];
    return new TableRow({
      tableHeader: isHeader,
      children: vals.map((v, i) =>
        new TableCell({
          width: { size: ADDON_COLS[i], type: WidthType.DXA },
          borders: cellBorders,
          shading: { fill: isHeader ? NAVY : "FFFFFF", type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 80, left: 120, right: 120 },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: v,
                  font: "Arial",
                  size: 20,
                  bold: isHeader,
                  color: isHeader ? WHITE : "000000",
                }),
              ],
            }),
          ],
        })
      ),
    });
  }

  const addonsTable = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: ADDON_COLS,
    rows: [
      addonRow("Add-On Service", "Description", "Price", true),
      addonRow("Additional Revision Round", "Each extra round of revisions beyond the included one", "PHP 1,500 per round"),
      addonRow("Custom Domain Setup", "Configuration of a custom domain (e.g., sjdefi.edu.ph redirect)", "PHP 1,000"),
      addonRow("SEO Optimization", "On-page search engine optimization for better discoverability", "PHP 3,000"),
      addonRow("Social Media Integration", "Live social media feed embeds (Facebook, TikTok)", "PHP 2,500"),
    ],
  });

  // Acceptance signature table
  const acceptTable = new Table({
    width: { size: CONTENT_W, type: WidthType.DXA },
    columnWidths: [CONTENT_W],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: CONTENT_W, type: WidthType.DXA },
            borders: cellBorders,
            shading: { fill: "F5F5F5", type: ShadingType.CLEAR },
            margins: { top: 160, bottom: 160, left: 200, right: 200 },
            children: [
              new Paragraph({
                spacing: { before: 0, after: 120 },
                children: [new TextRun({ text: "ACCEPTANCE", font: "Arial", size: 22, bold: true, color: NAVY })],
              }),
              new Paragraph({
                spacing: { before: 0, after: 200 },
                children: [
                  new TextRun({
                    text: "I/We hereby accept the above cost estimate and authorize James Montealegre to proceed with the Website Landing Page project for San Juan De Dios Educational Foundation, Inc. - College.",
                    font: "Arial",
                    size: 22,
                  }),
                ],
              }),
              ...[
                "Authorized Representative: ___________________________",
                "Name: ___________________________",
                "Title: ___________________________",
                "Date: ___________________________",
              ].map(
                (line, i) =>
                  new Paragraph({
                    spacing: { before: 0, after: 60 },
                    children: [new TextRun({ text: line, font: "Arial", size: 22 })],
                  })
              ),
            ],
          }),
        ],
      }),
    ],
  });

  const children = [
    // Title block
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 80 },
      children: [new TextRun({ text: "WEBSITE DEVELOPMENT COST ESTIMATE", font: "Arial", size: 32, bold: true, color: NAVY })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [new TextRun({ text: "SJDEFI College Website Landing Page", font: "Arial", size: 24, bold: true })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 60 },
      children: [
        new TextRun({ text: "Prepared by: ", font: "Arial", size: 22 }),
        new TextRun({ text: "James Montealegre, Web Developer", font: "Arial", size: 22, bold: true }),
      ],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 40 },
      children: [new TextRun({ text: "Date: April 8, 2026", font: "Arial", size: 22 })],
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 280 },
      children: [new TextRun({ text: "Valid Until: May 8, 2026", font: "Arial", size: 22, italics: true, color: "666666" })],
    }),

    // Main table
    headingPara("ITEMIZED COST BREAKDOWN", { size: 22, color: NAVY, before: 0, after: 100 }),
    mainTable,
    spacer(160),

    // Payment terms
    paymentBox,
    spacer(200),

    // Add-ons
    headingPara("OPTIONAL ADD-ON SERVICES", { size: 22, color: NAVY, before: 0, after: 100 }),
    addonsTable,
    spacer(200),

    // Acceptance
    acceptTable,
    spacer(120),

    // Validity note
    new Paragraph({
      alignment: AlignmentType.CENTER,
      spacing: { before: 0, after: 0 },
      children: [
        new TextRun({
          text: "This estimate is valid for 30 days from the date of issue (April 8, 2026).",
          font: "Arial",
          size: 20,
          italics: true,
          color: "666666",
        }),
      ],
    }),
  ];

  const doc = new Document({
    sections: [{ properties: pageProps, children }],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(path.join(OUTPUT_DIR, "05_Cost_Estimate.docx"), buf);
  console.log("  [OK] 05_Cost_Estimate.docx");
}

// ─── Main ────────────────────────────────────────────────────────────────────
(async () => {
  console.log("Generating SJDEFI Website Proposal Documents...");
  console.log("Output:", OUTPUT_DIR);
  console.log("");
  try {
    await makeDoc1();
    await makeDoc2();
    await makeDoc3();
    await makeDoc4();
    await makeDoc5();
    console.log("\nAll 5 documents generated successfully.");
  } catch (err) {
    console.error("\nERROR:", err.message);
    console.error(err.stack);
    process.exit(1);
  }
})();
