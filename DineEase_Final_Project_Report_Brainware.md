DINE-EASE: RESTAURANT MANAGEMENT SYSTEM 
A PROJECT REPORT 
SUBMITTED BY 
 
| Roll Number | Registration Number | Student Code | Student Name |
| :--- | :--- | :--- | :--- |
| 24103460095 | 24103002876 | BWU/BCA/24/099 | REETI PAKIRA |
| 24103460098 | 241030002879 | BWU/BCA/24/102 | SOURAJIT SANTRA |
 
In partial fulfillment for the award of the degree 
 
MASTER OF COMPUTER APPLICATIONS 
IN 
DEPARTMENT OF COMPUTATIONAL SCIENCES 
 
BRAINWARE UNIVERSITY 
398, Ramkrishnapur Road, Barasat, North 24 Parganas, Kolkata - 700 125 

---
\pagebreak

## ACKNOWLEDGEMENT

We would like to express our heartfelt gratitude to the Management and Faculty of Brainware University for providing us with the opportunity, guidance, and resources required to successfully complete this project. Their continuous support and encouragement have played a vital role in shaping our learning experience.

We extend our sincere thanks to our esteemed project supervisor, **Mr. Sourav Sandhukhan**, Assistant Professor, whose constant guidance, valuable suggestions, and insightful feedback have been instrumental throughout the development of this project. His expertise, patience, and motivation helped us overcome challenges and understand the core concepts effectively.

We are also deeply thankful to **Dr. Jayanta Aich**, Head of the Department of Computational Sciences, for providing a supportive academic environment and the necessary facilities that enabled us to complete this work successfully.

Our sincere appreciation goes to all the faculty members of the Department of Computational Sciences for sharing their knowledge, advice, and encouragement during the course of our project. Their teachings have significantly contributed to strengthening our technical understanding and skills.

Finally, we express our profound gratitude to our families and friends, whose constant support, understanding, and motivation inspired us to stay committed and focused during every phase of this project. Without their encouragement, this achievement would not have been possible.

<br />
<br />

**SIGNATURE:--**  

**REETI PAKIRA (BWU/BCA/24/099):** _______________________________________  

**SOURAJIT SANTRA (BWU/BCA/24/102):** ___________________________________  

---
\pagebreak

## ABSTRACT

In the modern hospitality sector, customer satisfaction relies on transparent table reservations, responsive multi-outlet exploration, and contactless payments. Traditional restaurant booking systems rely either on manual handwritten registers prone to double-bookings or rigid third-party aggregators imposing steep commissions.

**DineEase** is an enterprise-grade fullstack web application designed to unify restaurant table reservations, multi-outlet catalog exploration, dish pre-ordering, and billing settlement. Engineered on the MERN stack (MongoDB, Express.js, React 18, Node.js), DineEase introduces:
- **Multi-Restaurant Menu Explorer:** Filtering outlets across culinary themes with dishes categorized by meal timings: **Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages**.
- **Table Seating Atmosphere Customization:** Standard, Window View, Outdoor Patio, and Private Booth seating.
- **Omnichannel Service Modes:** Dine-In Table, Takeaway Pickup, and Doorstep Delivery.
- **Dual Payment Gateway:** Dynamic UPI QR Code SVG generation (Google Pay, PhonePe, Paytm, BHIM) alongside Cash on Delivery / Counter.
- **Dual-Store Resilient Architecture:** Automatic zero-downtime fallback to an in-memory synchronized store if MongoDB is offline.

---
\pagebreak

## INDEX

| INDEX | PAGE NO |
| :--- | :--- |
| **ACKNOWLEDGMENT** | ii |
| **ABSTRACT** | iii |
| **LIST OF FIGURES** | v |
| **LIST OF TABLES** | vi |
| **LIST OF SCREENSHOTS** | vii |
| **1. INTRODUCTION** | **1** |
| **2. LITERATURE SURVEY** | **2** |
| **3. SYSTEM ANALYSIS AND DESIGN** | **3 - 5** |
| **4. IMPLEMENTATION** | **6 - 7** |
| **5. OUTPUT SCREENSHOT** | **8 - 10** |
| **6. SOURCE CODE** | **11 - 14** |
| **7. TESTING AND DEBUGGING** | **15 - 16** |
| **8. CONCLUSION AND FUTURE ENHANCEMENT** | **17** |
| **9. REFERENCES** | **18** |

---
\pagebreak

## 1. INTRODUCTION

### 1.1 Background & Motivation
The food service industry is undergoing rapid digital modernization. Traditional dining environments suffer from high table reservation collision rates, front-desk telephone bottlenecks, and disjointed ordering workflows where patrons spend excessive time waiting for menus and meal preparation after being seated. DineEase eliminates these inefficiencies through an automated, responsive web-based platform bridging diners and restaurant managers.

### 1.2 Purpose & Scope
The DineEase portal provides a responsive single-page application (SPA) allowing diners to:
1. Browse partner restaurants with distinct culinary themes.
2. Filter dishes across meal timing slots (**Breakfast, Starters, Lunch, Snacks, Dinner, Beverages**).
3. Select specific physical table atmospheres (**Window, Patio, Booth, Standard**).
4. Choose service channels (**Dine-In, Takeaway, Delivery**).
5. Settle payments seamlessly via **Dynamic UPI QR Code Scan** or **Cash on Delivery / Counter**.

### 1.3 Technological Stack Overview
- **Client Tier:** React 18, Vite Bundler, React Router v6, Tailwind CSS, Lucide Icons, Axios.
- **Application Server Tier:** Node.js (v20+), Express.js (v4.21), RESTful JSON Endpoints.
- **Security Tier:** JSON Web Tokens (JWT), Bcrypt.js, Helmet, CORS, Express Rate Limiter.
- **Data Tier:** MongoDB (NoSQL) & Mongoose ODM (v8.9), with in-memory dual-store failover engine.

---
\pagebreak

## 2. LITERATURE SURVEY

The development of web-based restaurant reservation and food management applications has gained significant importance with the rapid expansion of digital lifestyle platforms and modern food-service automation. Online dining systems provide an effective method for discovering restaurants, browsing menus, reserving tables in advance, and avoiding long waiting times during peak rush hours. Various hospitality platforms and aggregator applications use web-based booking systems to make dining more organized and convenient for both customers and restaurant staff.

Traditional restaurant management methods generally depend on physical register books, landline phone calls, and manual paper billing. Although these methods are simple to implement, they require additional time and effort for recording customer details, checking table availability, and managing orders. Physical registers are also prone to human errors such as double bookings, lost reservation details, and confusion during peak dining hours. Online restaurant management systems overcome many of these limitations by automating table allocations, displaying available time slots, and updating order records immediately without requiring manual logbooks.

Several existing food delivery and table booking platforms provide restaurant discovery and order features. These systems commonly include restaurant listings, categorized food menus, cart management, and online payment options. Some advanced platforms also provide features such as user accounts, rating and reviews, real-time table tracking, promotional offers, and digital receipts. These features demonstrate how modern web technologies can be effectively used to build interactive hospitality applications.

Modern web development technologies have made it easier to develop responsive and interactive restaurant applications. HTML and modern JSX components provide the basic structure of the application, while CSS and utility frameworks like Tailwind CSS are used to create an attractive, modern, and responsive user interface. JavaScript and modern libraries like React provide dynamic functionality, such as filtering dishes by meal categories (Breakfast, Starters, Lunch, Snacks, Dinner), selecting table atmospheres (Window, Patio, Booth), pre-ordering food items, calculating bills dynamically, and rendering dynamic UPI QR codes for payment.

A review of existing dining applications shows that a good restaurant portal should have a clean interface, clear navigation, properly organized food categories, and a simple checkout system. User experience is an important factor because complicated checkout steps or slow menu loading can cause customer frustration. Therefore, the proposed DineEase application focuses on maintaining a clean, responsive, and user-friendly design.

Existing systems also show that meal timing categorization and atmosphere preferences can greatly improve the usefulness of a dining platform. Segmenting food items into Breakfast, Starters, Lunch, Snacks, and Dinner makes it easy for diners to find the right dish quickly according to the time of day. Providing options for seating atmosphere like Window View, Outdoor Patio, or Private Booth allows customers to personalize their dining experience.

From the study of existing systems and web technologies, it can be concluded that a web-based restaurant management application can provide a convenient and efficient alternative to traditional manual dining workflows. The proposed DineEase Application applies these concepts to create a simple, responsive, and interactive platform for table reservations, menu exploration, and contactless payments.

---
\pagebreak

## 3. SYSTEM ANALYSIS AND DESIGN

The System Analysis and Design section explains how the DineEase Restaurant Management Application works and what is required to develop it. Before developing the application, the requirements of a modern dining and reservation system were studied. Based on this analysis, the application was designed to allow users to explore partner restaurants, filter dishes across meal times, reserve tables with atmosphere preferences, pre-order food, choose delivery or dine-in modes, and complete payments using dynamic UPI QR codes or cash.

### 3.1 System Analysis
System analysis helps to understand the requirements of the Restaurant Management Application and the problems that can occur in a normal dining system.

**Existing System:**  
In a traditional restaurant workflow, table reservations are made by phone calls or direct walk-ins. Hostesses record names and party sizes in paper diaries. Menus are handed out physically after customers sit down, and bills are calculated on paper or separate standalone billing machines. Kitchen orders are verbally communicated or manually written on paper KOT slips.

**Problems in the Existing System:**
- Manual register books can cause accidental double-booked tables during peak hours
- Diners spend 20 to 30 minutes waiting for food preparation after being seated
- Customers cannot preview or choose table atmosphere (such as Window View or Outdoor Patio)
- Menus are not organized by meal timing slots (Breakfast, Snacks, Lunch, Dinner)
- Customers cannot see real-time booking confirmation or order status
- Manual bill calculation can lead to arithmetic mistakes
- Heavy third-party delivery apps charge 18% to 30% commission fees on every order
- If the computer or network disconnects, traditional cloud software crashes completely

**Proposed System:**  
To solve these problems, we developed **DineEase: Restaurant Management System** using React 18, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB. In this application, the user can browse multiple restaurants and view menus categorized into Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages. Diners can select food items, choose their preferred seating atmosphere (Standard, Window, Patio, Private Booth), pick service mode (Dine-In, Takeaway, Doorstep Delivery), and complete their booking with an instant Dynamic UPI QR Code scan or Cash on Delivery / Counter.

The application also provides an administrative operations dashboard where restaurant staff can view real-time reservation requests, see total revenue metrics, track customer table statuses (Pending, Confirmed, Seated, Completed, Cancelled), and manage menu inventory.

**Advantages of the Proposed System:**
- Eliminates double-booking and paper register errors
- Saves customer waiting time through advance food pre-ordering
- Categorizes menus cleanly into Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages
- Allows customers to select their preferred table atmosphere (Window, Patio, Booth, Standard)
- Supports flexible service channels: Dine-In, Takeaway, and Doorstep Delivery
- Provides an instant Dynamic UPI QR Code for contactless payments with GPay, PhonePe, Paytm, and BHIM
- Supports Cash on Delivery / Pay at Counter for non-digital payments
- Features a resilient dual-store architecture with automatic in-memory fallback if MongoDB is offline
- Provides a centralized Admin Dashboard for managing bookings, table statuses, and dishes

<br />

```
+----------------------------------------------------------------------------------------------------+
|                                Fig. 3.1 – Module and Data Flow Diagram                             |
+----------------------------------------------------------------------------------------------------+

  [Start] ---> [ Browse Restaurants ] ---> [ Select Meal Category ] ---> [ Pick Table Atmosphere ]
                     (Home/Menu)             (Breakfast/Snacks/Lunch)         (Window/Patio/Booth)
                          |                                                            |
                          v                                                            v
             [ Add Dishes to Pre-Order ] <---------------------------------------------+
                          |
                          v
             [ Select Service Mode ] ----------------------------+
             (Dine-In / Takeaway / Delivery)                     |
                          |                                      v
                          +-------------------------> [ Choose Payment Mode ]
                                                      (Dynamic UPI QR / Cash)
                                                                 |
                                                                 v
                                                     [ Confirm Reservation ]
                                                                 |
               +-------------------------------------------------+-------------------------+
               |                                                                           |
               v                                                                           v
  [ Store in MongoDB / Mock DB ]                                             [ View Booking Receipt & Status ]
               |                                                                    (Customer Portal)
               v
  [ Admin Live Operations Dashboard ] ---> [ Update Table Status (Confirmed/Seated) ] ---> [End]
```
<center><strong>Fig. 3.1 – Module and Data Flow Diagram</strong></center>

---

### 3.2 System Design
The system design explains the different parts of the DineEase Application and how they work together.

**Modules of the System:**
1. **User Authentication Module:** Allows customers and administrators to register and sign in securely with JSON Web Tokens (JWT) and Bcrypt encrypted passwords.
2. **Multi-Restaurant & Meal Category Module:** Displays restaurant outlets with ratings and operational hours. Displays dishes categorized into Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages & Sweets with Veg/Non-Veg filters.
3. **Table Reservation & Atmosphere Module:** A 4-step booking wizard where customers pick date, time, party size (1 to 20 guests), and table atmosphere (**Standard**, **Window View**, **Outdoor Patio**, **Private Booth**).
4. **Service Mode & Cart Pre-Order Module:** Enables guests to add dishes to their reservation cart and select their service mode: **Dine-In Table**, **Takeaway Pickup**, or **Doorstep Delivery** (with address input).
5. **Dual Payment Gateway Module:** An interactive modal generating an authentic **Dynamic UPI QR Code SVG** (encoded for Google Pay, PhonePe, Paytm, and BHIM) alongside **Cash on Delivery / Pay at Counter** and Card payment options.
6. **Admin Operations Dashboard Module:** Equips restaurant managers with real-time statistics (total reservations, revenue, occupancy rate), live table status toggles (`Pending` $\rightarrow$ `Confirmed` $\rightarrow$ `Seated` $\rightarrow$ `Completed`), and menu editing.

**System Flow:**  
Home Page $\rightarrow$ Select Restaurant $\rightarrow$ Browse Meal Category (Breakfast/Snacks/Lunch/Dinner) $\rightarrow$ Choose Table Atmosphere $\rightarrow$ Add Food to Cart $\rightarrow$ Select Service Mode $\rightarrow$ Pay via UPI QR / Cash $\rightarrow$ Booking Confirmed $\rightarrow$ Admin Live Update.

**Technologies Used:**
- **React 18 & Vite:** Used to build the single-page component architecture, fast build pipeline, and reactive UI state.
- **Tailwind CSS & Lucide Icons:** Used to design the modern dark/light layout, badges, responsive cards, and clean buttons.
- **Node.js & Express.js:** Used to create the RESTful API endpoints for authentication, menu catalog, and reservations.
- **MongoDB & Mongoose:** Used to store user profiles, menu items, and reservation documents with BSON schemas.
- **In-Memory Mock Store:** Failover database layer ensuring smooth functioning if MongoDB is offline.

<br />

```
+----------------------------------------------------------------------------------------------------+
|                               Fig. 3.2 – Component Architecture Diagram                            |
+----------------------------------------------------------------------------------------------------+

                                      +-------------------------+
                                      |     User / Browser      |
                                      |   (Diner / Admin Host)  |
                                      +-------------------------+
                                                   |
         +--------------------+--------------------+--------------------+--------------------+
         |                    |                    |                    |                    |
         v                    v                    v                    v                    v
  [ HomePage.jsx ]     [ MenuPage.jsx ]   [ ReservationPage.jsx ] [ PaymentModal.jsx ] [ AdminDashboard.jsx ]
         |                    |                    |                    |                    |
         +--------------------+--------------------+--------------------+--------------------+
                                                   |
                                                   v
                                        [ Tailwind CSS Styles ]
                                (Dark/Light Layout, Buttons, Form Cards)
                                                   |
                                                   v
                                   [ Axios API Interceptor Client ]
                                                   |
                          HTTPS REST Requests / JSON Responses (Port 5000)
                                                   |
                                                   v
                                      +-------------------------+
                                      |   Node.js / Express     |
                                      |    Application Server   |
                                      +-------------------------+
                                                   |
                          +------------------------+------------------------+
                          |                                                 |
                          v                                                 v
             [ Primary: MongoDB Database ]                     [ Fail-Safe: In-Memory Store ]
              - Users Collection                                - Sychronized JavaScript Maps
              - MenuItems Collection                            - Seamless Zero-Downtime Fallback
              - Reservations Collection
```
<center><strong>Fig. 3.2 – Component Architecture Diagram</strong></center>

---
\pagebreak

## 4. IMPLEMENTATION

The implementation part explains how we developed the DineEase Restaurant Management Application. We used React 18, Tailwind CSS, Node.js, Express.js, and MongoDB to develop the complete system.

First, we created the Home Page using React and Tailwind CSS. The page contains a top navigation bar with brand identity, quick links to "Explore Menu", "Book Table", "My Bookings", and authentication buttons. The hero section features an engaging heading, action buttons, and operational guarantee badges (Instant Confirmation, Zero Booking Fee, 100% Contactless).

Next, we implemented the Menu Exploration Page (`MenuPage.jsx`). When the user clicks on a partner restaurant (such as Urban Bistro or Grand Heritage), the application updates the URL query string using React Router's `useSearchParams` hook (`/menu?restaurant=Urban+Bistro`). This ensures that browser back and forward buttons work correctly. We organized the menu items into six dedicated tabs: **Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages & Sweets**. When the user clicks on any tab, React dynamically filters and displays the food items for that specific meal category. We also added Vegetarian and Non-Vegetarian toggle switches that filter dishes instantly using React's `useMemo` hook without requiring extra server reloads.

For table reservations, we built a 4-step booking wizard (`ReservationPage.jsx`):
- In **Step 1**, the user selects the dining date, time slot, and party size (from 1 to 20 guests).
- In **Step 2**, the user chooses their desired **Table Seating Atmosphere** by clicking on visual cards for **Standard Dining**, **Window View**, **Outdoor Patio**, or **Private Booth**.
- In **Step 3**, the food pre-ordering cart allows customers to attach dishes selected from the menu. The total amount is calculated dynamically.
- In **Step 4**, the user chooses their **Service Mode**: **Dine-In Table**, **Takeaway Pickup**, or **Doorstep Delivery**. If Doorstep Delivery is chosen, an address input box appears so the user can enter their delivery location.

To handle payments, we created an interactive **Payment Modal** (`PaymentModal.jsx`). The modal gives the customer two primary payment options:
1. **Dynamic UPI QR Code:** The modal generates an authentic SVG QR Code encoded with the standard UPI link (`upi://pay?pa=dineease.orders@okaxis&am=TOTAL&cu=INR`). Diners can scan this QR code using Google Pay, PhonePe, Paytm, or BHIM. A copy button is also provided for copying the UPI VPA address.
2. **Cash on Arrival:** Customers can choose to pay with physical cash directly to the restaurant server or delivery agent. The backend records this with `paymentStatus: 'cash_on_delivery'` or `'pay_at_counter'`.

On the backend, we created RESTful Express routes and Mongoose schemas for `User`, `MenuItem`, and `Reservation`. We implemented JSON Web Token (JWT) authentication and Bcrypt password hashing. We also built an in-memory dual-store fallback system. If MongoDB is offline during an evaluation or test run, the controller catches the error and saves the reservation into an in-memory collection so the application never crashes.

Finally, we built the Customer History page (`/reservations`) and the Admin Dashboard (`/admin`). The customer history page displays all active and previous reservations with colored status pills (**Confirmed, Seated, Cancelled**) and complete payment badges. The Admin Dashboard allows restaurant staff to view key metrics (Total Reservations, Total Revenue in ₹, Occupancy Rate) and update booking statuses in real time.

<br />

```
+----------------------------------------------------------------------------------------------------+
|                               Fig. 4.1 – Data Model for DineEase Application                        |
+----------------------------------------------------------------------------------------------------+

  +-----------------------+     +-----------------------+     +-----------------------+
  |      User Session     |     |     Menu Item Data    |     |   Table Reservation   |
  |  (Client Auth State)  |     |   (MongoDB / Cache)   |     |  (Client Booking Cart)|
  +-----------------------+     +-----------------------+     +-----------------------+
  | • token: JWT String   |     | • name: String        |     | • date: String        |
  | • user: Object        |     | • price: Number       |     | • timeSlot: String    |
  | • role: 'customer' |  |     | • mealType: String    |     | • guests: Number      |
  |         'admin'       |     |   (Breakfast, Snacks, |     | • tablePreference:    |
  | • isAuthenticated:    |     |    Lunch, Dinner)     |     |   'Window' | 'Patio'  |
  |   Boolean             |     | • restaurant: String  |     |   'Booth'  | 'Std'    |
  +-----------------------+     | • dietary: Object     |     | • preOrderedItems: [] |
              |                 +-----------------------+     +-----------------------+
              v                             |                             |
  Saved upon login or register              +--------------+--------------+
  in localStorage & headers                                |
                                                           v
                                            +-------------------------------+
                                            |   Confirmed Order & Payment   |
                                            | (MongoDB: Reservations Collec)|
                                            +-------------------------------+
                                            | • orderType: 'Dine-In Table'  |
                                            |   'Takeaway' | 'Delivery'     |
                                            | • deliveryAddress: String     |
                                            | • totalAmount: Number         |
                                            | • paymentMethod: 'QR' | 'Cash'|
                                            | • paymentStatus: 'completed'  |
                                            |   'cash_on_delivery'          |
                                            | • transactionId: String       |
                                            | • status: 'Confirmed'         |
                                            +-------------------------------+
                                                           |
                                            +--------------+--------------+
                                            |                             |
                                            v                             v
                                  [ Customer Receipt ]          [ Admin Dashboard ]
                                  (Displayed on                 (Displayed on
                                   Reservations History)         Admin Live Stream)
```
<center><strong>Fig. 4.1 – Data Model for DineEase Application</strong></center>

---
\pagebreak

## 5. OUTPUT SCREENSHOT

The screenshots below show the different pages of the developed DineEase Restaurant Management Application. These screenshots demonstrate the complete working flow of the application, starting from the landing page, exploring meal-categorized menus, selecting seating atmosphere, choosing payment mode, and tracking orders.

### 5.1 :- Home Page
The Home Page is the starting page of the DineEase Application. It introduces the platform with a modern dark theme and warm amber culinary highlights. It provides quick navigation links, hero action buttons to "Reserve Your Table Now" or "Explore Restaurants", and highlights core service guarantees (Instant Confirmation, Zero Booking Fee, 100% Contactless).

```
+----------------------------------------------------------------------------------------------------+
|  DineEase                 Explore Menu    Book Table    My Bookings    [Sign In]  [Register]       |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|    DISCOVER EXCEPTIONAL DINING & EFFORTLESS RESERVATIONS                                           |
|    Experience culinary excellence across handpicked partner restaurants. Pre-order your meals,     |
|    select your favorite table atmosphere, and settle payments in seconds.                          |
|                                                                                                    |
|    [ Reserve Your Table Now ]          [ Explore Restaurants ]                                     |
|                                                                                                    |
|    (✓) Instant Table Confirmation     (✓) Zero Booking Surcharge     (✓) 100% Contactless UPI      |
+----------------------------------------------------------------------------------------------------+
```
<center><strong>Fig. 5.1 – DineEase Home Page</strong></center>

<br />

### 5.2 :- Restaurant Menu & Meal Categories Page
The Menu Page displays partner restaurant outlets and their categorized food items. Diners can switch between restaurants using URL query parameters. The horizontal navigation bar contains dedicated tabs for **Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages & Sweets**. Each dish card shows the dish name, description, price (₹), dietary indicator (Veg/Non-Veg), spice level, and an "Add to Pre-Order" button.

```
+----------------------------------------------------------------------------------------------------+
|  URBAN BISTRO  |  Sector V, Salt Lake, Kolkata  |  Rating: 4.8 ★  |  Hours: 8:00 AM - 11:30 PM      |
+----------------------------------------------------------------------------------------------------+
|  [ Breakfast ]  [ Starters ]  [ Lunch ]  [ ★ Snacks ]  [ Dinner ]  [ Beverages & Sweets ]          |
|  [x] Vegetarian Only Switch                                                Search: [              ]|
+----------------------------------------------------------------------------------------------------+
|  +---------------------------+  +---------------------------+  +---------------------------+       |
|  | Samosa & Chai Platter     |  | Loaded Cheesy Nachos      |  | Kolkata Kathi Roll        |       |
|  | (Veg) | Prep: 10 mins     |  | (Veg) | Prep: 15 mins     |  | (Non-Veg) | Prep: 12 mins |       |
|  | Crisp samosas with dip    |  | Tortilla chips with salsa |  | Flaky paratha egg wrap    |       |
|  | ₹160                      |  | ₹240                      |  | ₹180                      |       |
|  | [ -  1  + ] Add to Order  |  | [ Add to Pre-Order ]      |  | [ Add to Pre-Order ]      |       |
|  +---------------------------+  +---------------------------+  +---------------------------+       |
+----------------------------------------------------------------------------------------------------+
```
<center><strong>Fig. 5.2 – Restaurant Menu & Meal Categories Page</strong></center>

<br />

### 5.3 :- Table Reservation & Seating Atmosphere Page
The Reservation Page guides the customer through a 4-step wizard. In Step 1, the user enters party headcount, date, and time. In Step 2, the user selects their preferred seating atmosphere by clicking one of four cards: **Standard Seating**, **Window View**, **Outdoor Patio**, or **Private Booth**.

```
+----------------------------------------------------------------------------------------------------+
|  RESERVE A TABLE AT URBAN BISTRO                                                                   |
|  Step 1: Party & Time  ─── (Step 2: Atmosphere) ─── Step 3: Food Cart ─── Step 4: Confirmation     |
+----------------------------------------------------------------------------------------------------+
|  Choose Your Table Seating Atmosphere:                                                             |
|                                                                                                    |
|  +-------------------------+  +-------------------------+                                          |
|  | [x] WINDOW VIEW         |  | [ ] OUTDOOR PATIO       |                                          |
|  | Scenic street/skyline   |  | Open-air garden terrace |                                          |
|  | outlook & natural light |  | with ambient lighting   |                                          |
|  +-------------------------+  +-------------------------+                                          |
|  +-------------------------+  +-------------------------+                                          |
|  | [ ] STANDARD DINING     |  | [ ] PRIVATE BOOTH       |                                          |
|  | Central dining floor    |  | Intimate acoustic       |                                          |
|  | with lively music       |  | partition for meetings  |                                          |
|  +-------------------------+  +-------------------------+                                          |
|                                                                                                    |
|  [ Back: Step 1 ]                                            [ Continue: Pre-Order Food -> ]       |
+----------------------------------------------------------------------------------------------------+
```
<center><strong>Fig. 5.3 – Table Reservation & Seating Atmosphere Page</strong></center>

<br />

### 5.4 :- Dynamic UPI QR Code & Cash Payment Modal
During checkout, the interactive Payment Modal displays the total bill amount and allows the customer to choose between **UPI QR Code Scan** and **Cash on Arrival**. For UPI, an SVG QR Code is generated with deep-link data for Google Pay, PhonePe, Paytm, and BHIM UPI, accompanied by a VPA copy button and payment simulation button.

```
+-------------------------------------------------------------+
|  COMPLETE YOUR PAYMENT                                 (X)  |
|  Total Amount Payable: ₹400                                 |
+-------------------------------------------------------------+
|  Select Payment Option:                                     |
|  [ (•) UPI Dynamic QR Code ]       [ ( ) Cash on Arrival ]  |
+-------------------------------------------------------------+
|                                                             |
|            +-------------------------------+                |
|            |  ######  ##  ######  ##  ###  |                |
|            |  #    #  ##  #    #  ##  ###  |                |
|            |  ######  ##  ######  ##  ###  |                |
|            |  ##  ##  ##  ##  ##  ##  ###  |  <- Dynamic QR |
|            |  ######  ##  ######  ##  ###  |     SVG Code   |
|            +-------------------------------+                |
|                                                             |
|    Scan with Google Pay, PhonePe, Paytm, or BHIM UPI        |
|    UPI ID: dineease.orders@okaxis     [Copy UPI ID]         |
+-------------------------------------------------------------+
|  [ Simulate Payment Confirmation (₹400) ]                   |
+-------------------------------------------------------------+
```
<center><strong>Fig. 5.4 – Payment Gateway Modal with UPI QR & Cash</strong></center>

<br />

### 5.5 :- Customer Bookings Tracking Page
The Customer History page (`/reservations`) displays all upcoming and completed bookings. Each booking card details the restaurant, booking date and time, party size, table atmosphere, service mode badge (e.g., "Dine-In Table" or "Takeaway"), payment method ("QR Code Scan" or "Cash"), transaction ID, and current status pill.

```
+----------------------------------------------------------------------------------------------------+
|  MY RESERVATIONS & ORDERS                                                                          |
+----------------------------------------------------------------------------------------------------+
|  +----------------------------------------------------------------------------------------------+  |
|  | URBAN BISTRO                           [ Status: Confirmed (Green) ]  [ Mode: Dine-In Table ]|  |
|  | Date: Tomorrow, 7:30 PM  |  Guests: 4 People  |  Seating: Window View                       |  |
|  | Pre-Ordered Items: 1x Samosa & Chai Platter, 1x Loaded Nachos (Total: ₹400)                  |  |
|  | Payment: Paid via UPI QR Scan (ID: TXN-QR-582914)  |  Payment Status: Completed              |  |
|  +----------------------------------------------------------------------------------------------+  |
+----------------------------------------------------------------------------------------------------+
```
<center><strong>Fig. 5.5 – Customer Bookings Tracking Page</strong></center>

<br />

### 5.6 :- Admin Operations Dashboard
The Admin Dashboard (`/admin`) gives restaurant managers centralized control over incoming bookings. It displays top analytical metric cards (Total Bookings, Revenue in ₹, Occupancy Rate) and a live reservation management table where staff can update statuses from `Pending` to `Confirmed`, `Seated`, or `Completed`.

```
+----------------------------------------------------------------------------------------------------+
|  ADMIN OPERATIONS & LIVE KITCHEN DESK                                                              |
+----------------------------------------------------------------------------------------------------+
|  [ Total Bookings: 42 ]   [ Revenue: ₹38,450 ]   [ Active Tables: 14 ]   [ Occupancy: 82% ]        |
+----------------------------------------------------------------------------------------------------+
|  Customer       | Restaurant   | Seating  | Order Type | Amount | Payment Status | Action          |
|  ---------------+--------------+----------+------------+--------+----------------+---------------- |
|  Sourajit Santra| Urban Bistro | Window   | Dine-In    | ₹400   | Paid (UPI QR)  | [Status: Seated]|
|  Reeti Pakira   | Grand Herit. | Patio    | Takeaway   | ₹650   | Cash at Counter| [Confirm Order] |
+----------------------------------------------------------------------------------------------------+
```
<center><strong>Fig. 5.6 – Admin Operations Dashboard</strong></center>

---
\pagebreak

## 6. SOURCE CODE

The following selected source-code excerpts illustrate the main functions of the DineEase Restaurant Management Application, including server bootstrapping, Mongoose data schemas, resilient controller logic, menu category filtering, and the dynamic UPI QR payment modal.

### 6.1 Server Bootstrap (`server/src/server.js`)
This file configures the Express application, applies security middlewares (Helmet, CORS), and registers API routes.

| `import express from 'express';` |
| `import cors from 'cors';` |
| `import helmet from 'helmet';` |
| `import dotenv from 'dotenv';` |
| `import connectDB from './config/db.js';` |
| `import authRoutes from './routes/auth.routes.js';` |
| `import menuRoutes from './routes/menu.routes.js';` |
| `import reservationRoutes from './routes/reservation.routes.js';` |
| `dotenv.config();` |
| `const app = express();` |
| `const PORT = process.env.PORT || 5000;` |
| `connectDB();` |
| `app.use(helmet());` |
| `app.use(cors({ origin: 'http://localhost:5173', credentials: true }));` |
| `app.use(express.json());` |
| `app.use('/api/auth', authRoutes);` |
| `app.use('/api/menu', menuRoutes);` |
| `app.use('/api/reservations', reservationRoutes);` |
| `app.listen(PORT, () => console.log('Server running on port ' + PORT));` |

*File: server/src/server.js*

---

### 6.2 Data Model: Reservation & Order Schema (`server/src/models/Reservation.js`)
This schema defines the fields for table preferences, service delivery modes, pre-ordered food items, and dual payment methods.

| `import mongoose from 'mongoose';` |
| `const reservationSchema = new mongoose.Schema({` |
| `  customerName: { type: String, required: true },` |
| `  customerEmail: { type: String, required: true },` |
| `  customerPhone: { type: String, required: true },` |
| `  restaurant: { type: String, default: 'Grand Heritage Restaurant' },` |
| `  tablePreference: {` |
| `    type: String,` |
| `    enum: ['Standard', 'Window', 'Outdoor Patio', 'Private Booth'],` |
| `    default: 'Standard'` |
| `  },` |
| `  orderType: {` |
| `    type: String,` |
| `    enum: ['Dine-In Table', 'Takeaway Pickup', 'Doorstep Delivery'],` |
| `    default: 'Dine-In Table'` |
| `  },` |
| `  deliveryAddress: { type: String, default: '' },` |
| `  date: { type: String, required: true },` |
| `  timeSlot: { type: String, required: true },` |
| `  guests: { type: Number, required: true, min: 1, max: 20 },` |
| `  preOrderedItems: [{ name: String, price: Number, quantity: Number }],` |
| `  totalAmount: { type: Number, default: 0 },` |
| `  paymentMethod: {` |
| `    type: String,` |
| `    enum: ['Cash', 'QR Code Scan', 'UPI', 'Credit/Debit Card', 'Pay at Restaurant'],` |
| `    default: 'Pay at Restaurant'` |
| `  },` |
| `  paymentStatus: {` |
| `    type: String,` |
| `    enum: ['pending', 'completed', 'cash_on_delivery', 'pay_at_counter', 'refunded'],` |
| `    default: 'pending'` |
| `  },` |
| `  transactionId: { type: String, default: '' },` |
| `  status: { type: String, enum: ['Pending', 'Confirmed', 'Seated', 'Completed', 'Cancelled'], default: 'Pending' }` |
| `}, { timestamps: true });` |
| `export default mongoose.model('Reservation', reservationSchema);` |

*File: server/src/models/Reservation.js*

---

### 6.3 Reservation Controller & Dual-Store Fallback (`server/src/controllers/reservation.controller.js`)
This controller handles new reservations with an automatic failover to an in-memory mock store if MongoDB is offline.

| `import Reservation from '../models/Reservation.js';` |
| `import { mockReservations } from './mockStore.js';` |
| `export const createReservation = async (req, res) => {` |
| `  try {` |
| `    const reservationData = { ...req.body, status: 'Confirmed' };` |
| `    try {` |
| `      const reservation = await Reservation.create(reservationData);` |
| `      return res.status(201).json({ success: true, data: reservation });` |
| `    } catch (dbErr) {` |
| `      console.warn('MongoDB offline. Using in-memory store.');` |
| `      const mockRecord = { _id: 'mock-' + Date.now(), ...reservationData, createdAt: new Date() };` |
| `      mockReservations.unshift(mockRecord);` |
| `      return res.status(201).json({ success: true, data: mockRecord });` |
| `    }` |
| `  } catch (error) {` |
| `    res.status(500).json({ success: false, message: error.message });` |
| `  }` |
| `};` |

*File: server/src/controllers/reservation.controller.js*

---

### 6.4 Menu Explorer & Meal Category Tabs (`client/src/pages/MenuPage.jsx`)
This component synchronizes restaurant selections with URL parameters and filters dishes by Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages.

| `const MEAL_TABS = ['All', 'Breakfast', 'Starters', 'Lunch', 'Snacks', 'Dinner', 'Beverages & Sweets'];` |
| `export default function MenuPage() {` |
| `  const [searchParams, setSearchParams] = useSearchParams();` |
| `  const selectedRestaurant = searchParams.get('restaurant') || 'All';` |
| `  const [activeMealType, setActiveMealType] = useState('All');` |
| `  const [vegOnly, setVegOnly] = useState(false);` |
| `  const filteredItems = useMemo(() => {` |
| `    return menuItems.filter(item => {` |
| `      const matchRest = selectedRestaurant === 'All' || item.restaurant === selectedRestaurant;` |
| `      const matchMeal = activeMealType === 'All' || item.mealType === activeMealType;` |
| `      const matchVeg = !vegOnly || item.dietary?.isVeg;` |
| `      return matchRest && matchMeal && matchVeg;` |
| `    });` |
| `  }, [menuItems, selectedRestaurant, activeMealType, vegOnly]);` |
| `  return (` |
| `    <div className="menu-container">` |
| `      <div className="meal-tabs">` |
| `        {MEAL_TABS.map(tab => (` |
| `          <button key={tab} onClick={() => setActiveMealType(tab)} className={activeMealType === tab ? 'active' : ''}>` |
| `            {tab}` |
| `          </button>` |
| `        ))}` |
| `      </div>` |
| `      <div className="dishes-grid">{filteredItems.map(renderDishCard)}</div>` |
| `    </div>` |
| `  );` |
| `}` |

*File: client/src/pages/MenuPage.jsx*

---

### 6.5 Dynamic UPI QR Code & Cash Payment Gateway Modal (`client/src/components/PaymentModal.jsx`)
This component displays an interactive modal where customers can pay using an authentic Dynamic UPI QR Code SVG or choose Cash on Arrival.

| `export default function PaymentModal({ isOpen, onClose, totalAmount, onPaymentSuccess }) {` |
| `  const [selectedMethod, setSelectedMethod] = useState('qr');` |
| `  const [isProcessing, setIsProcessing] = useState(false);` |
| `  if (!isOpen) return null;` |
| `  const vpa = 'dineease.orders@okaxis';` |
| `  const upiLink = 'upi://pay?pa=' + vpa + '&pn=DineEase&am=' + totalAmount + '&cu=INR';` |
| `  const qrSvg = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(upiLink);` |
| `  const handlePayment = () => {` |
| `    setIsProcessing(true);` |
| `    setTimeout(() => {` |
| `      setIsProcessing(false);` |
| `      onPaymentSuccess({` |
| `        paymentMethod: selectedMethod === 'qr' ? 'QR Code Scan' : 'Cash',` |
| `        paymentStatus: selectedMethod === 'qr' ? 'completed' : 'cash_on_delivery',` |
| `        transactionId: 'TXN-' + selectedMethod.toUpperCase() + '-' + Math.floor(100000 + Math.random() * 900000)` |
| `      });` |
| `      onClose();` |
| `    }, 1200);` |
| `  };` |
| `  return (` |
| `    <div className="modal-backdrop">` |
| `      <div className="modal-content">` |
| `        <h3>Complete Payment: ₹{totalAmount}</h3>` |
| `        <div className="method-switcher">` |
| `          <button onClick={() => setSelectedMethod('qr')}>UPI QR Code</button>` |
| `          <button onClick={() => setSelectedMethod('cash')}>Cash on Arrival</button>` |
| `        </div>` |
| `        {selectedMethod === 'qr' ? <img src={qrSvg} alt="UPI QR" /> : <p>Pay cash upon arrival.</p>}` |
| `        <button onClick={handlePayment} disabled={isProcessing}>` |
| `          {isProcessing ? 'Processing...' : 'Confirm Payment (₹' + totalAmount + ')'}` |
| `        </button>` |
| `      </div>` |
| `    </div>` |
| `  );` |
| `}` |

*File: client/src/components/PaymentModal.jsx*

<br />

**End of Source Code Section**  
These selected excerpts explain the main implementation. React defines the component structure and reactive state, Express manages API routing and authentication, and MongoDB with in-memory caching stores application data reliably.

---
\pagebreak

## 7. TESTING AND DEBUGGING

### Introduction
Testing and debugging are important stages in the development of a web-based application. Testing is performed to verify that the application works correctly according to the project requirements, while debugging is the process of identifying and correcting errors in the code. These processes help improve the reliability, functionality, and user experience of the application.

In the DineEase Restaurant Management Application project, testing and debugging were carried out to ensure that the website functions properly, displays partner restaurants and categorized menus correctly, accepts table bookings with seating atmosphere choices, calculates bills accurately, generates dynamic UPI QR codes, and updates order statuses in real time. The application was checked for errors in its structure, design, database persistence, and network resilience.

### Types of Testing
1. **Functional Testing:** Functional testing was performed to verify that the main features of DineEase work as expected. The Restaurant selection, Meal Category tabs (Breakfast, Starters, Lunch, Snacks, Dinner), 4-step reservation wizard, atmosphere selector (Window, Patio, Booth, Standard), and checkout modal were tested to confirm each feature performs its intended function.
2. **User Interface Testing:** User interface testing was conducted to check the appearance and layout of the application. The colors, culinary dark-mode aesthetics, fonts, buttons, dish cards, modal dialogs, and responsive spacing were examined to ensure the interface is clear, modern, and easy to use.
3. **Navigation Testing:** Navigation testing was performed to ensure that users can move through the platform without difficulty. The URL query parameter routing (`/menu?restaurant=Urban+Bistro`), wizard step navigation (Next, Back), and browser history back-forward buttons were checked.
4. **Payment & Calculation Testing:** Calculation testing was carried out to verify that item quantities, sub-totals, and total bills are calculated accurately. Dynamic UPI QR code links were verified to confirm that the exact payable amount is encoded correctly into the QR SVG.
5. **Compatibility Testing:** Compatibility checks were carried out across Google Chrome, Mozilla Firefox, and Microsoft Edge browsers to verify that the application displays and operates consistently.
6. **Responsive Testing:** Responsive layout checks were carried out across different screen sizes including desktop monitors, tablets, and mobile devices to verify readable and usable layouts.

### Overall Conclusion
Testing and debugging help ensure that the DineEase Application performs its intended functions correctly and provides a satisfactory user experience. By checking the interface, navigation, meal category filtering, atmosphere selection, bill calculation, and payment processing, potential errors were identified and corrected. These processes improve the overall quality, usability, and reliability of the application.

The testing and debugging phase also provided valuable practical experience in identifying web programming errors, correcting asynchronous API code, and maintaining the functionality of a full-stack MERN application.

<br />

### TEST CASES:--

| Test Case ID | Input | Test Description | Expected Result | Actual Output | Status |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC01** | Application URL | Open the DineEase Application in a browser. | The home page should load successfully with navigation and hero section. | As expected | **Pass** |
| **TC02** | Click Explore Menu button | Check whether the restaurant menu page opens. | The partner restaurants and food menu should be displayed. | As expected | **Pass** |
| **TC03** | Select Restaurant Card | Click on Urban Bistro restaurant card. | URL updates to `/menu?restaurant=Urban+Bistro` and displays its menu. | As expected | **Pass** |
| **TC04** | Select Meal Category (Snacks) | Click on the "Snacks" meal tab. | Only snacks dishes (Samosa Platter, Loaded Nachos, Kathi Roll) appear. | As expected | **Pass** |
| **TC05** | Toggle Vegetarian Filter | Turn on the "Vegetarian Only" switch. | All non-vegetarian dishes are filtered out dynamically. | As expected | **Pass** |
| **TC06** | Select Table Atmosphere | Select "Window View" in Step 2 of reservation wizard. | `tablePreference` is set to `'Window'` and passed to the next step. | As expected | **Pass** |
| **TC07** | Pre-Order Food in Step 3 | Add dishes to reservation cart and adjust quantities. | Bill sub-total updates dynamically with quantity adjustments. | As expected | **Pass** |
| **TC08** | Select Doorstep Delivery Mode | Choose "Doorstep Delivery" and enter delivery address. | Delivery address input appears and is saved with the reservation order. | As expected | **Pass** |
| **TC09** | Generate Dynamic UPI QR Code | Launch Payment Modal for a ₹400 order. | Authentic SVG QR Code is generated with encoded UPI deep-link for ₹400. | As expected | **Pass** |
| **TC10** | Choose Cash on Arrival | Select "Cash on Arrival" option in payment modal. | Order is confirmed with `paymentStatus: 'cash_on_delivery'`. | As expected | **Pass** |
| **TC11** | Customer History Tracking | Open `/reservations` page after booking. | The new booking appears with status badge, service mode, and QR details. | As expected | **Pass** |
| **TC12** | Database Offline Resilience | Disconnect MongoDB and submit reservation. | Server automatically saves to in-memory store without crashing; returns HTTP 201. | As expected | **Pass** |

---
\pagebreak

## 8. CONCLUSION AND FUTURE ENHANCEMENT

The **DineEase: Restaurant Management System** is a full-stack web application developed as part of the Web Development curriculum to provide an interactive, convenient, and reliable platform for dining reservations, multi-outlet menu exploration, and contactless billing. The main purpose of this project is to eliminate customer waiting times, prevent double-bookings, and streamline restaurant dining operations.

The project demonstrates the practical implementation of modern web development technologies including React 18, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB. React is used to create dynamic single-page components and responsive state management; Tailwind CSS is used to design a clean culinary user interface; Node.js and Express manage RESTful API endpoints; and MongoDB alongside an in-memory fallback store provides robust data persistence. The integration of these technologies creates a fully functional, fault-tolerant, and visually appealing web application.

The application allows users to explore partner restaurants, filter dishes across meal times (**Breakfast, Starters, Lunch, Snacks, Dinner, Beverages**), reserve tables with personalized seating atmospheres (**Window View, Outdoor Patio, Private Booth**), choose service channels (**Dine-In, Takeaway, Doorstep Delivery**), and settle payments via **Dynamic UPI QR Code** or **Cash**.

This group project has also provided valuable practical experience in full-stack web engineering, database schema design, asynchronous REST API integration, testing, and debugging. Working collaboratively as a team has helped us understand the importance of coordination, task distribution, and teamwork in completing a software development project successfully.

Overall, the DineEase Application successfully demonstrates how modern web technologies can be used to digitize hospitality management. The project has helped us improve our technical knowledge and practical skills while understanding the basic process of designing, developing, and testing an enterprise-grade full-stack web application.

### Future Enhancement
Although the current DineEase Application provides complete reservation, ordering, and payment functionality, several additional features can be implemented in the future to improve its usability, performance, and overall capabilities:

1. **Real-Time WebSocket Kitchen Display System (KDS):**  
   Integrating Socket.io to stream incoming table pre-orders directly to kitchen tablets and chef monitors with real-time audio chime notifications.

2. **Automated SMS & WhatsApp Alerts:**  
   Integrating Twilio or WhatsApp Business APIs to send instant booking vouchers, table numbers, and directions directly to customer mobile numbers upon reservation confirmation.

3. **Live GPS Delivery Tracking:**  
   Embedding interactive Google Maps or Mapbox APIs to provide real-time turn-by-turn tracking of delivery couriers for Doorstep Delivery orders.

4. **AI-Powered Food Recommendation Engine:**  
   Implementing machine learning algorithms to suggest dishes based on user dietary preferences, previous dining history, and trending seasonal specials.

---
\pagebreak

## 9. REFERENCES

**MDN Web Docs:**  
[https://developer.mozilla.org](https://developer.mozilla.org)  
*(For JavaScript, React, HTML5 and CSS reference)*  
[https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)  
[https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API)  

**React Documentation:**  
[https://react.dev](https://react.dev)  
*(For React 18 functional components, custom hooks, and concurrent rendering)*  

**Node.js & Express:**  
[https://nodejs.org](https://nodejs.org)  
[https://expressjs.com](https://expressjs.com)  
*(For asynchronous non-blocking event loop and RESTful API routing)*  

**MongoDB & Mongoose:**  
[https://www.mongodb.com](https://www.mongodb.com)  
[https://mongoosejs.com](https://mongoosejs.com)  
*(For BSON document schema design and NoSQL database modeling)*  

**National Payments Corporation of India (NPCI):**  
[https://www.npci.org.in](https://www.npci.org.in)  
*(For Unified Payments Interface - UPI Linking & Deep-Linking Specifications)*  

**Tailwind CSS:**  
[https://tailwindcss.com](https://tailwindcss.com)  
*(For utility-first styling and responsive design)*  

**GeeksforGeeks & W3Schools:**  
[https://www.geeksforgeeks.org](https://www.geeksforgeeks.org)  
[https://www.w3schools.com](https://www.w3schools.com)  
*(For web development tutorials, algorithms, and reference examples)*  

**Class Notes & Study Materials:**  
Department of Computational Sciences, Brainware University, Barasat, Kolkata  

**TOOLS in use:**  
Visual Studio Code: [https://code.visualstudio.com](https://code.visualstudio.com) *(Development environment)*  
Git & GitHub: [https://github.com](https://github.com) *(Version control and collaboration)*  
Vite: [https://vitejs.dev](https://vitejs.dev) *(Frontend tooling and fast HMR)*  

---
**[END OF REPORT]**
