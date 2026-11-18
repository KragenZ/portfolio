# Srijit Kumar Roy — AI & Machine Learning Engineering Portfolio

> Production-ready, recruiter-verified personal portfolio for **Srijit Kumar Roy**, B.Tech Computer Science and Engineering (AI & ML) student at Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar.

[![Live Site](https://img.shields.io/badge/Live_Site-GitHub_Pages-2563eb?style=for-the-badge&logo=github)](https://kragenz.github.io/portfolio/)
[![Design System](https://img.shields.io/badge/Design_System-Impeccable_Compliant-10b981?style=for-the-badge)](./DESIGN.md)
[![Resume](https://img.shields.io/badge/Resume-Verified_PDF-d97706?style=for-the-badge&logo=adobeacrobatreader)](assets/Resume.pdf)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 📌 Professional Profile

- **Identity:** Srijit Kumar Roy
- **Academic Degree:** B.Tech in Computer Science and Engineering (Artificial Intelligence & Machine Learning)
- **Institution:** Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar (June 2024 – Expected 2028)
- **Secondary Education:** Bal Bhavan International School, Dwarka, New Delhi (Class XII, 2018 – 2022)
- **Target Roles:** Software Development, Machine Learning, and Data Engineering / Analytics Internships
- **Core Competencies:** RAG Applications, Supervised Machine Learning & Regression, Python Backend Systems, and Relational Data Analytics.

---

## 🛠️ Verified Technical Skills

Skills are strictly aligned with demonstrated codebases and official credentials:

| Domain | Technologies & Frameworks |
|---|---|
| **Programming Languages** | Python, SQL (MySQL), HTML5 |
| **Machine Learning & Data** | scikit-learn, XGBoost, pandas, NumPy, matplotlib, Feature Engineering, 5-Fold Cross-Validation |
| **LLM & Modern AI Applications** | Retrieval-Augmented Generation (RAG), LangChain, FAISS Vector Indexing, HuggingFace MiniLM Embeddings, Google Gemini, FastAPI, Streamlit |
| **Databases & BI** | MySQL (Relational Schema Design & Normalization), Power BI (DAX & Interactive KPI Telemetry) |
| **Certifications** | HackerRank Python (Basic), HackerRank SQL (Basic & Intermediate), Kudu Applied Power BI Training |

---

## 🚀 Featured Engineering Projects

### 1. [AI Property Assistant — RAG](https://github.com/KragenZ/ai-property-assistant-rag)
- **Stack:** Python, LangChain, FAISS, HuggingFace MiniLM (`all-MiniLM-L6-v2`), Google Gemini, Streamlit
- **Architecture:** Natural-language conversational interface over 500 tabular property records from the Ames Housing dataset.
- **Key Features:**
  - Dense 384-dimensional passage embeddings with sub-15ms FAISS vector similarity search (top-5 candidate retrieval).
  - Grounded contextual reasoning via Google Gemini preventing hallucinations.
  - Multi-turn conversational memory with persistent session history.
  - Transparent UI telemetry: per-query relevance distance scoring, latency metrics, and raw context inspection.
- **Deep-Dive:** [View Architectural Case Study](case_study_pa.html)

### 2. [House Price Predictor — Machine Learning](https://github.com/KragenZ/house-price-predictor-ml)
- **Stack:** Python, scikit-learn, XGBoost, pandas, NumPy, Streamlit
- **Architecture:** End-to-end regression pipeline analyzing ~1,500 homes across 80 raw features from the Ames Housing dataset.
- **Key Features:**
  - Robust data imputation, categorical encoding, and 10 custom engineered domain features.
  - Benchmarked Ridge Regression, Random Forest, and XGBoost via 5-fold cross-validation.
  - **Results:** XGBoost achieved **$R^2 \approx 0.91$** and **MAE $\approx \$12,800$** on holdout test splits.
  - Interactive Streamlit dashboard with real-time prediction and feature impact explanation.
- **Live Demo:** [Launch Streamlit Application](https://house-price-predictor-ml-nh9zrtguvhpmhwsys9qexr.streamlit.app/)

### 3. FraudShield AI — Real-Time Financial Fraud Detection *(IN PROGRESS)*
- **Stack:** Python, XGBoost, FastAPI, React, PaySim Synthetic Financial Dataset
- **Architecture:** High-throughput streaming fraud detection pipeline addressing severe transaction class imbalance.
- **Focus:** Optimized strictly for **Precision, Recall, F1-Score, and PR-AUC** (averting deceptive high-accuracy metrics).
- **Status:** Active backend model training and FastAPI inference service integration.

### 4. Target E-commerce Business Case — Relational SQL & Power BI
- **Stack:** MySQL, Power BI, SQL
- **Architecture:** Normalized relational data modeling and analysis of large-scale Target e-commerce order transactions.
- **Key Features:**
  - Entity-relationship schema architecture with optimized SQL queries, aggregations, and subqueries.
  - DAX-driven measures computing total order volume, freight economics, and Average Order Value (AOV).

---

## 🎨 Design Philosophy & Impeccable Architecture

The interface was crafted strictly adhering to **Impeccable** design principles:
- **Zero Anti-Patterns:** Audited via `impeccable detect` with zero design debt or contrast failures.
- **Calm, High-Contrast Palette:** Precision dark/light modes engineered with WCAG AA+ contrast ratios (`#f8fafc` text on `#090d16` canvas in dark mode; `#0f172a` text on `#f8fafc` in light mode).
- **Typography:** High-legibility editorial pairing — **Manrope** for structural headings, **DM Sans** for descriptive copy, and **JetBrains Mono** for technical specs and telemetry.
- **Tasteful, Purposeful Interaction (80/20 Rule):**
  - Instant theme toggle with `localStorage` memory and system `prefers-color-scheme` fallback.
  - Smooth scroll-spy section tracking with native `IntersectionObserver`.
  - Accessible mobile hamburger navigation with Escape-key and outside-click dismiss.
  - Single-click email clipboard copy with accessible floating toast notification.
  - Zero heavy WebGL, zero intrusive particle canvases, zero artificial loading spinners, and full `prefers-reduced-motion` compliance.

---

## 📂 Repository Structure

```text
portfolio/
├── index.html              # Main portfolio landing page & project showcase
├── case_study_pa.html      # Architectural case study: AI Property Assistant RAG
├── resume.html             # Recruiter-friendly printable web resume view
├── styles.css              # Custom CSS design system (tokens, layout, responsive)
├── script.js               # Zero-dependency vanilla JavaScript interaction engine
├── favicon.ico             # 16x16 standard favicon
├── favicon.svg             # Scalable vector brand icon
├── DESIGN.md               # Impeccable design system tokens & accessibility spec
├── PRODUCT.md              # Product requirements, identity & project verification log
├── README.md               # Repository documentation & guide
└── assets/
    ├── Resume.pdf          # Verified single source of truth resume
    ├── ai_property.webp    # Verified UI asset for AI Property Assistant
    └── house_price.webp    # Verified UI asset for House Price Predictor
```

---

## 💻 Local Preview & Verification

Run a lightweight static HTTP server from the project directory:

```bash
# Using Node.js npx serve
npx serve -l 8000

# OR using Python 3
python -m http.server 8000
```

Open `http://localhost:8000` in your web browser.

---

## 📫 Contact & Connect

- **Email:** [srijitroy2212@gmail.com](mailto:srijitroy2212@gmail.com)
- **GitHub:** [@KragenZ](https://github.com/KragenZ)
- **LinkedIn:** [Srijit Kumar Roy](https://linkedin.com/in/srijit-kumar-roy-7840043b8)
- **Location:** Delhi, India
