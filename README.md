# NutriTwin: Your Living Diet Twin

NutriTwin is a wellness-first nutrition and habit app that builds a digital twin of the user’s body and behaviors. The twin evolves daily from food, hunger/cravings, movement, sleep, stress, and habits—then produces forward-looking predictions and adaptive guidance (not just tracking).

**Core promise (Week 1 headline):**
> “You’ll understand when and why cravings hit — and how to reduce them.”

## Status legend
- [x] **Complete in current prototype** (implemented in the app UI and/or local demo logic)
- [x] **Planned / Not yet implemented**

## Feature checklist

### 1) Product summary
- [x] NutriTwin product overview and positioning (summary above).

### 2) Goals and non-goals
**Goals**
- [x] Deliver a “foresight” experience via Future Impact Cards (24h / 72h / 7d).
- [x] Learn hunger/craving patterns and visualize them as a Hunger Map (UI heatmap preview).
- [x] Score meals based on personal response (energy, satiety, mood/focus, GI comfort).
- [x] Provide Adaptive Diet Mode that flexes targets based on real life (sleep, stress, weekends).
- [x] Motivate with an honest visual body timeline and full avatar that reflects trends + uncertainty (timeline UI + avatar chat UI).
- [x] Prevent churn using Good Enough Days (Optimal / Good Enough / Recovery) instead of fragile streaks.
- [x] Remain wellness-first: no diagnosis, no medication changes, no clinical claims (copy tone + UI intent).

**Non-goals (v1)**
- [x] No diagnosing medical conditions or prescribing treatment.
- [x] No guarantees of fat loss outcomes.
- [x] No aggressive fasting/VLCD protocols as directives.
- [x] No training global models on user data.

### 3) Target users and personalization strategy
- [x] Broad audience support via settings with a safe Balanced default (goal settings scaffold).

### 4) Agent definition
- [x] Predictor: forecasts near-term outcomes (weight trend, water retention risk, energy, cravings).
- [x] Coach (Co-pilot style): offers tradeoffs and options rather than commands (tone used in UI copy + chat).
- [x] Scientist layer (transparency): shows confidence and “why” factors.
- [x] Learner: updates personal model from feedback.

### 5) Default experience (core loop)
- [x] Dashboard-first home experience.
- [x] Secondary entry: Quick log hub for meals, hunger, and biometrics.
- [x] Morning Plan output (targets, priority actions, forecast snippets, risk windows) — UI scaffolding.
- [x] Evening Reflection output with Good Enough rating — UI scaffolding.
- [x] Full two-touchpoint/day workflow with calibration loops.

### 6) Inputs
**User-provided (manual)**
- [x] Meals (text input).
- [x] Hunger before meals (1–5) + quick hunger check-ins.
- [x] Notes (optional).
- [x] Water.
- [x] Weight + optional measurements.
- [x] Craving events (intensity + trigger tags).
- [x] Sleep quality/length.
- [x] Stress scale.

**Tools / integrations**
- [x] Barcode scan + packaged food DB.
- [x] Photo-based food logging.
- [x] Voice logging.
- [x] Wearables (steps/HR/sleep).
- [x] Optional CGM data.
- [x] Restaurant/menu sources.

**Missing-data handling**
- [x] Gentle re-entry + estimated continuity from passive signals.

### 7) Outputs
**7.1 Future Impact Cards**
- [x] Future Impact Cards UI (mock predictions + confidence).
- [x] 24h / 72h / 7d forecasts.
- [x] Confidence ranges and “why” factors for all predictions.

**7.2 Hunger Map**
- [x] Hunger Map heatmap (UI preview).
- [x] Trigger attributions + suggested counter-moves.

**7.3 Personal Response Score**
- [x] Weekly response score UI cards (energy/satiety/mood).
- [x] Meal-level response scoring and smart swaps.

**7.4 Adaptive Diet Mode**
- [x] Mode selection scaffold (Balanced, Fast, Consistency, Recovery, Performance).
- [x] Adaptive targets, timing guidance, and “missed target” planning.

**7.5 Visual Body Timeline + Full Avatar**
- [x] Body timeline visualization (timeline UI + uncertainty hinting).
- [x] Full avatar presence in chat UI.
- [x] Water retention vs fat trend vs muscle preservation layering.
- [x] Cycle-related shifts (opt-in) with real data.
- [x] Avatar uncertainty controls + charts-only toggle.

**7.6 Good Enough Day System**
- [x] Good Enough day rating (Optimal / Good Enough / Recovery) in dashboard messaging.
- [x] Supportive, future-focused nudges tied to real data.

**7.7 Weekly Strategy Adjustment**
- [x] Weekly Strategy screen with experiments and review placeholder.
- [x] Full weekly report, revised target plan, and habit experiments with success criteria.

### 8) Decisioning and reasoning loop
- [x] Ingest new signals → update state → generate forecasts → choose 1–3 actions.
- [x] Explain “why” succinctly and solicit tiny feedback.
- [x] Handle “that was wrong” feedback with calibration questions.

### 9) Prediction engine strategy (hybrid)
- [x] Rules/heuristics layer.
- [x] Population priors (privacy-safe).
- [x] LLM layer for explanations and planning.
- [x] Confidence-gated numeric outputs + ranges when uncertain.

### 10) Memory design (user-configurable)
- [x] Local persistence for settings, logs, and chat history (offline-first storage).
- [x] Short-term working memory windows (7–14 days) for forecasts.
- [x] Trend memory windows (30–90 days).
- [x] Long-term preference memory (opt-in).
- [x] Sensitive data controls + export/delete.

### 11) Tooling requirements (conceptual)
- [x] Food DB connector with offline starter set.
- [x] Barcode scan.
- [x] Photo meal capture + on-device parsing.
- [x] Voice-to-meal capture.
- [x] Wearable imports.
- [x] Optional CGM import.
- [x] Offline-first sync strategy.

### 12) Safety, guardrails, and policy
- [x] Wellness-first boundaries in product intent (no diagnosis, no medication changes).
- [x] Supplements guidance with clinician-safe messaging.
- [x] Fasting/VLCD guardrails.
- [x] Eating-disorder risk escalation flow.
- [x] No-shame language requirements (tone reflected in UI copy).

### 13) Monetization plan (v1)
- [x] Free vs Pro tier outline.
- [x] Paywall moments identified (forecast horizons, hunger map unlock, adaptive auto-adjust, response score history).

### 14) Evaluation plan (Evals)
- [x] North Star and supporting metrics instrumentation.
- [x] Calibration and failure mode tests.

### 15) Termination and escalation conditions
- [x] Low-confidence behavior and risk escalation flows.
- [x] Clinician-safe redirects for medical advice requests.

### 16) MVP launch definition
- [x] Single launch definition with two operational modes (offline baseline + optional enhanced).
- [x] Core offline user journeys represented in UI flow.

## Onboarding Flow (Recommended: 6–8 screens, <3 minutes)

**Implementation status**
- [x] Screen 0 — Welcome / Value Framing
- [x] Screen 1 — Primary Goal
- [x] Screen 2 — Body Basics
- [x] Screen 3 — Lifestyle Rhythm
- [x] Screen 4 — Eating Style & Constraints
- [x] Screen 5 — Craving Awareness
- [x] Screen 6 — Tracking Style
- [x] Screen 7 — Permissions & Integrations
- [x] Screen 8 — Confirmation + First Prediction

### Screen 0 — Welcome / Value Framing (No inputs)
**Purpose:** Set expectations + trust + wellness boundary.

**Headline**  
Meet NutriTwin — your living diet twin.

**Subtext**  
We learn how your body responds to food, stress, and sleep — and help you reduce cravings before they happen.

**Trust bullets**  
- No medical diagnosis  
- No perfect streaks  
- Your data stays yours (no global training)

**CTA**  
Build My Twin

### Screen 1 — Primary Goal (1 tap, reversible)
**Purpose:** Anchor predictions + language, not restrict behavior.

**Question**  
What would you like NutriTwin to support right now?

**Options (single-select)**  
- ⚖️ Fat loss (steady & realistic)  
- 💪 Muscle / strength  
- 🍽 Blood sugar steadiness  
- 🧠 Focus & energy  
- 🧘 General wellness (Balanced)

**UX notes**  
- “Balanced” pre-selected  
- You can change this anytime

### Screen 2 — Body Basics (Foundational, non-sensitive)
**Purpose:** Enable weight trend + energy estimates.

**Inputs**  
- Height (optional but encouraged)  
- Weight (optional)  
- Sex at birth (optional, used only for estimates)  
- Age range (not exact age): 18–29 / 30–39 / 40–49 / 50+

**Copy**  
These help us estimate trends — not judge progress.

**Rules**  
- All optional  
- If skipped → wider confidence ranges shown later

### Screen 3 — Lifestyle Rhythm (High signal, low burden)
**Purpose:** Power Hunger Map + craving windows early.

**Questions**  
- Typical sleep: ⏱ <6h / 6–7h / 7–8h / 8h+  
- Usual stress level: Low / Medium / High  
- Typical activity: Mostly sedentary / Lightly active / Active most days

**Why this matters (inline micro-copy)**  
Sleep + stress explain most late-day cravings.

### Screen 4 — Eating Style & Constraints (Preferences, not rules)
**Purpose:** Avoid bad suggestions + improve swaps.

**Multi-select**  
- No restrictions  
- Vegetarian / Vegan  
- Halal / Kosher  
- Lactose sensitive  
- Gluten sensitive  
- Prefer low ultra-processed foods

**Optional**  
- Foods you don’t want suggested (free text)

### Screen 5 — Craving Awareness (Key to your core promise)
**Purpose:** Seed craving model immediately.

**Question**  
When do cravings usually hit?

**Multi-select**  
- Late night  
- Afternoon slump  
- Stressful days  
- Weekends  
- After workouts  
- Not sure yet

**Intensity slider**  
When they hit, how strong? Mild → Strong (1–5)

### Screen 6 — Tracking Style (Agency + anti-friction)
**Purpose:** Reduce churn + match effort level.

**Question**  
How hands-on do you want NutriTwin to be?

**Options**  
- 🟢 Light — I log when I can  
- 🟡 Guided — Gentle prompts & reflections (default)  
- 🔵 Detailed — I like insights & patterns

**Used to control**  
- Prompt frequency  
- Feedback requests  
- Explanation depth

### Screen 7 — Permissions & Integrations (Optional, skippable)
**Purpose:** Enable passive continuity, not required.

**Toggles**  
- Connect steps/sleep (wearable)  
- Enable photo meal logging  
- Enable voice logging  
- Offline-first mode (recommended)

**Important copy**  
NutriTwin works even if you log nothing.

### Screen 8 — Confirmation + First Prediction (Magic Moment)
**Purpose:** Deliver immediate value.

**Show**  
- Mini Hunger Map preview (empty but scaffolded)  
- First 24h Forecast Card (low confidence, ranges)

**Example**  
Craving risk may be higher between 8–10pm tonight.  
Confidence: Low (we’ll refine this fast)

**CTA**  
Start My Day

## Minimal Required Data (Hard floor)

If the user speed-taps through everything, we still capture:

| Signal | Source |
| --- | --- |
| Goal mode | Screen 1 |
| Sleep estimate | Screen 3 |
| Stress baseline | Screen 3 |
| Activity level | Screen 3 |
| Craving timing hint | Screen 5 |

That’s enough to:
- Generate risk windows
- Use “why” explanations
- Avoid overconfidence

## Defaults & Safety Choices (Critical)

| Area | Default |
| --- | --- |
| Mode | Balanced |
| Tone | Co-pilot |
| Retention | 30–90 days |
| Avatar | On (with uncertainty overlay) |
| Predictions | Ranges until calibrated |
| ED-risk | Conservative targets |

## Copy & Language Rules for Onboarding

**Allowed**  
- “Patterns”  
- “Signals”  
- “Tends to”  
- “May help”  
- “We’ll learn together”

**Banned**  
- “Fix your body”  
- “Cheat”  
- “Failure”  
- “Optimal only”  
- “Guaranteed”

## What NOT to Ask in Onboarding (Very Important)

- ❌ Detailed calorie targets  
- ❌ Medical conditions (unless later, opt-in)  
- ❌ Diet history failures  
- ❌ “Goal weight” pressure  
- ❌ Fasting duration preferences  
- ❌ Supplement use

These belong after trust is earned, not at first open.

## Optional: Onboarding Completion Output (Internal)

```json
{
  "goal_mode": "Balanced",
  "sleep_baseline": "6–7h",
  "stress_baseline": "Medium",
  "activity_level": "Lightly active",
  "craving_windows": ["Late night"],
  "tracking_style": "Guided",
  "confidence_floor": "Low"
}
```

## Repo quickstart
```bash
npm install
npm run dev
```
