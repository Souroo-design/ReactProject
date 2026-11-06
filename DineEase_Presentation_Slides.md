# DINEEASE — PROJECT DEFENSE & VIVA PRESENTATION SLIDES
### DEPARTMENT OF COMPUTATIONAL SCIENCES | BRAINWARE UNIVERSITY, KOLKATA
**Course:** Master of Computer Applications (MCA) / Full-Stack Web Development  
**Student Name:** Sourajit Santra  
**Head of Department:** Dr. Jayanta Aich  

---

## SLIDE 1: TITLE SLIDE
- **Title:** DINEEASE: A Modern Full-Stack Restaurant Reservation, Multi-Outlet Menu Exploration & Contactless Payment System
- **Subtitle:** Final Academic Project Presentation
- **Presented By:** Sourajit Santra (Department of Computational Sciences)
- **Institution:** Brainware University, Barasat, Kolkata - 700 125
- **Academic Session:** 2025 – 2026

---

## SLIDE 2: PROBLEM STATEMENT & MOTIVATION
- **Manual Registers:** Paper logbooks cause frequent double-bookings and no-shows during peak rush hours.
- **Aggregator Bottlenecks:** Third-party aggregators (Zomato/Swiggy) charge 18%–30% commission and treat reservations as decoupled from dining table environments.
- **In-Restaurant Wait Times:** Diners waste 20–30 minutes waiting for menus and meal preparation after being seated.
- **Payment Inflexibility:** Redirect-heavy payment gateways frequently fail or cause transaction drop-offs.
- **Motivation:** To engineer a fast, autonomous, 0% commission MERN single-page web application bridging diners, kitchen staff, and management.

---

## SLIDE 3: OBJECTIVES & SCOPE
- **Multi-Restaurant Catalog:** Unified exploration of multiple culinary brands under one portal.
- **Meal Timing Categorization:** Granular filtering across **Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages & Sweets**.
- **Table Atmosphere Selection:** Allowing guests to choose **Standard Seating, Window View, Outdoor Patio, or Private Booth**.
- **Omnichannel Service Channels:** Seamless support for **Dine-In Table**, **Takeaway Pickup**, and **Doorstep Delivery**.
- **Instant Contactless Payment:** In-app **Dynamic UPI QR Code SVG Scan** (GPay, PhonePe, Paytm, BHIM) + **Cash on Delivery / Counter**.
- **Zero-Downtime Architecture:** Dual-store persistence with automated fallback to in-memory caching if MongoDB is offline.

---

## SLIDE 4: SYSTEM ARCHITECTURE & TECH STACK
- **Frontend Tier:**
  - React 18 (Functional components, concurrent rendering, custom hooks)
  - Vite (Ultra-fast build tool & Hot Module Replacement)
  - React Router v6 (URL query parameter synchronization for restaurant menus)
  - Tailwind CSS & Lucide Icons (Responsive, modern glassmorphism UI)
- **Backend Tier:**
  - Node.js (v20+) & Express.js (v4.21)
  - RESTful API endpoints with centralized error handling
- **Security & Authorization:**
  - JSON Web Tokens (JWT) & Bcrypt.js (10 salt rounds)
  - Helmet, CORS, and Express Rate Limiter
- **Database Tier:**
  - Primary: MongoDB (NoSQL) with Mongoose ODM (v8.9)
  - Fail-Safe: Synchronized In-Memory Mock Database Engine

---

## SLIDE 5: DATA FLOW DIAGRAMS (DFD)
- **Level 0 (Context Level):**
  - High-level data exchange between Customer (Auth, Bookings, QR Payment), Core DineEase Engine, and Administrator (Live dashboard, table status updates).
- **Level 1 (Detailed Sub-Processes):**
  - **1.0 User Authentication:** Verifies credentials, signs JWT, stores in client state.
  - **2.0 Menu Explorer:** Queries items by restaurant and meal category (Breakfast/Snacks/Lunch).
  - **3.0 Reservation & Atmosphere:** Binds table preferences and pre-ordered dishes into cart.
  - **4.0 Dual Payment Engine:** Encodes dynamic UPI deep-links into QR codes or records Cash status.
  - **5.0 Admin Control:** Streams live reservations and updates lifecycle statuses (`Confirmed` → `Seated` → `Completed`).

---

## SLIDE 6: NOVEL FEATURES & INNOVATIONS
1. **Dynamic URL Menu Explorer:**
   - Deep-linking via `/menu?restaurant=Urban+Bistro` preserves browser back/forward history.
2. **Dedicated "Snacks" & Meal Slots:**
   - Solves the problem of unorganized menus by segmenting light evening snacks from heavy main courses.
3. **Table Atmosphere Customization:**
   - Diners reserve specific physical ambiance (Window, Patio, Booth, Standard) before arriving.
4. **Resilient Dual-Store Engine:**
   - Guaranteed 100% demo uptime: seamlessly shifts to synchronized in-memory mock collections if the database cluster fluctuates.

---

## SLIDE 7: OMNICHANNEL SERVICE & DUAL PAYMENT GATEWAY
- **Service Modes Supported:**
  - **Dine-In Table:** Food is cooked and served fresh at the scheduled table time.
  - **Takeaway Pickup:** Scheduled kitchen preparation for counter collection.
  - **Doorstep Delivery:** Prompts for full delivery address and attaches delivery dispatch tags.
- **Payment Modalities:**
  - **Dynamic UPI QR Code Scan:** SVG QR encoded with `upi://pay?pa=dineease.orders@okaxis&am=<TOTAL>&cu=INR`. Compatible with Google Pay, PhonePe, Paytm, and BHIM UPI.
  - **Cash on Delivery / Pay at Counter:** Fully supported for customers preferring physical cash payments.
  - **Credit / Debit Card:** Instant card checkout with alphanumeric reference tracking (`TXN-UPI-...`).

---

## SLIDE 8: DATABASE DESIGN (MONGOOSE SCHEMAS)
- **User Schema:** `_id`, `name`, `email` (unique), `password` (hashed), `role` (`'customer' | 'admin'`).
- **MenuItem Schema:** `_id`, `name`, `price`, `category`, `mealType` (`'Breakfast' | 'Starters' | 'Lunch' | 'Snacks' | 'Dinner' | 'Beverages'`), `restaurant`, `dietary` (`isVeg`, `spiceLevel`), `image`.
- **Reservation Schema:** `_id`, `user`, `customerName`, `customerEmail`, `customerPhone`, `restaurant`, `tablePreference`, `orderType`, `deliveryAddress`, `date`, `timeSlot`, `guests`, `preOrderedItems`, `totalAmount`, `paymentMethod`, `paymentStatus`, `transactionId`, `status`.

---

## SLIDE 9: TESTING & QUALITY ASSURANCE
- **Methodologies:** Unit Testing, End-to-End API Integration Testing, Cross-Browser Responsive Testing, and Database Offline Resilience Testing.
- **Test Matrix (TC01 – TC14):**
  - **TC01 & TC02:** User Registration & Duplicate Email handling $\rightarrow$ **PASS**
  - **TC03 & TC04:** Login security & RBAC admin route protection $\rightarrow$ **PASS**
  - **TC05 & TC06:** URL menu filtering & "Snacks" category rendering $\rightarrow$ **PASS**
  - **TC07 & TC08:** Veg-only dietary toggle & Table atmosphere selection $\rightarrow$ **PASS**
  - **TC09 & TC10:** Doorstep delivery mode & Dynamic UPI QR code generation $\rightarrow$ **PASS**
  - **TC11 & TC12:** Cash on delivery handling & Admin status update $\rightarrow$ **PASS**
  - **TC13 & TC14:** MongoDB offline failover & Production Vite build (5.58s) $\rightarrow$ **PASS**

---

## SLIDE 10: LIVE DEMONSTRATION WALKTHROUGH
- **Step 1:** Browse restaurants on Landing Page $\rightarrow$ Select *Urban Bistro*.
- **Step 2:** Click through meal tabs (**Breakfast**, **Snacks**, **Dinner**) $\rightarrow$ Add Samosa Platter & Masala Chai to Pre-Order.
- **Step 3:** Choose "Book a Table" $\rightarrow$ Pick Date, Time, 4 Guests $\rightarrow$ Select **"Window View"** seating atmosphere.
- **Step 4:** Select Service Mode: **"Dine-In Table"** (or **"Doorstep Delivery"**).
- **Step 5:** Modal pops up with **Dynamic UPI QR Code** showing exact ₹ Total $\rightarrow$ Click "Confirm Payment".
- **Step 6:** Inspect Customer History (`/reservations`) $\rightarrow$ Verify order receipt with QR Transaction ID.
- **Step 7:** Switch to Admin Dashboard (`/admin`) $\rightarrow$ Update status from `Confirmed` to `Seated`.

---

## SLIDE 11: CONCLUSION & FUTURE ENHANCEMENTS
- **Conclusion:**
  - Successfully demonstrated a full-stack MERN application that resolves real-world hospitality bottlenecks with 0% commissions and high fault tolerance.
- **Future Roadmap:**
  - **WebSocket KDS:** Real-time audio and visual kitchen display order tickets.
  - **SMS/WhatsApp Alerts:** Automated booking vouchers and directions via Twilio/Gupshup.
  - **Live GPS Tracking:** Turn-by-turn map coordinates for doorstep couriers.
  - **AI Recommender:** Machine learning-driven meal recommendations based on past dining patterns.

---

## SLIDE 12: Q&A & ACKNOWLEDGEMENT
- **Special Thanks:**
  - Dr. Jayanta Aich (Head of Department)
  - Department of Computational Sciences, Brainware University
  - Faculty Members, Lab Assistants, and Evaluators
- **Open for Questions:**
  - *Thank you for your time and guidance!*

