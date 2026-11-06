import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const projectPdfPath = 'C:\\Users\\soura\\OneDrive\\Desktop\\ReactProject\\DineEase_Project_Viva_Guide.pdf';
const desktopPdfPath = 'C:\\Users\\soura\\OneDrive\\Desktop\\DineEase_Project_Viva_Guide_Latest.pdf';

const doc = new PDFDocument({
  size: 'A4',
  margin: 40,
});

const writeStreamProject = fs.createWriteStream(projectPdfPath);
doc.pipe(writeStreamProject);

const writeStreamDesktop = fs.createWriteStream(desktopPdfPath);
writeStreamDesktop.on('error', (err) => console.log('[Notice] Desktop stream error:', err.message));
doc.pipe(writeStreamDesktop);

// Styling constants
const primaryColor = '#0F172A';
const accentAmber = '#D97706';
const accentEmerald = '#047857';
const darkText = '#1E293B';
const lightBg = '#F8FAFC';

// Cover Banner
doc.rect(40, 40, 515, 110).fill('#0F172A');
doc.fillColor('#FBBF24').fontSize(22).font('Helvetica-Bold').text('DineEase — Technical Viva Guide', 60, 60);
doc.fillColor('#94A3B8').fontSize(11).font('Helvetica').text('Full-Stack Restaurant & Café Management System (React 18, Node.js, Express, MongoDB)', 60, 90);
doc.fillColor('#10B981').fontSize(10).font('Helvetica-Bold').text('Architecture: MERN Stack | Security: JWT Access + Refresh Cookies | Currency: INR (₹)', 60, 115);

doc.moveDown(4);

// Section 1: Abstract
doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text('1. Project Abstract & Core Objectives', 40, 170);
doc.strokeColor(accentAmber).lineWidth(2).moveTo(40, 188).lineTo(555, 188).stroke();

doc.moveDown(0.8);
doc.fillColor(darkText).fontSize(10).font('Helvetica').text(
  'DineEase is a modern full-stack web application built to digitize and automate the dining workflow for customers, restaurant staff, and administrative management. It solves real-world rush-hour congestion, eliminates customer wait times, automates pre-ordering, and enforces secure role-based table reservations.',
  { align: 'justify' }
);

doc.moveDown(0.5);
doc.fillColor(accentEmerald).fontSize(11).font('Helvetica-Bold').text('Key Real-World Benefits (Why This Project is Helpful):');
doc.fillColor(darkText).fontSize(10).font('Helvetica');
doc.text('• Zero Table Wait Time: Customers book tables & pre-order food so dishes are served fresh upon arrival.');
doc.text('• Kitchen Efficiency: Chefs receive pre-orders in advance, reducing peak rush hour bottlenecks.');
doc.text('• Multi-Restaurant Outlet Support: Manages multiple Indian restaurant brands under one portal.');
doc.text('• Automated Staff Desk: Staff track incoming reservations & update table seating status in real-time.');

doc.moveDown(1.5);

// Section 2: Tech Stack Justifications
doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text('2. Technology Stack & Technical Justification ("Why We Used It")');
doc.strokeColor(accentAmber).lineWidth(2).moveTo(40, doc.y + 4).lineTo(555, doc.y + 4).stroke();
doc.moveDown(0.8);

const techStackData = [
  ['React.js (v18)', 'Frontend Framework', 'Component-driven, Virtual DOM for sub-second UI updates without page reloads.'],
  ['Vite', 'Build Tool / Dev Server', 'Sub-200ms HMR build tool, significantly faster than legacy Create React App (Webpack).'],
  ['Tailwind CSS', 'Styling Framework', 'Utility-first styling with dark/light themes, ambient glassmorphism, & responsive cards.'],
  ['Axios', 'HTTP Client', 'Automatic 401 JWT refresh token interceptor retries failed calls transparently.'],
  ['Node.js & Express', 'Backend Runtime & API', 'Non-blocking I/O event loop capable of high concurrency; clean REST route handlers.'],
  ['MongoDB & Mongoose', 'Database & ODM', 'Flexible NoSQL document model perfect for nested arrays like pre-ordered food items.'],
  ['JWT (jsonwebtoken)', 'Authentication', 'Stateless auth using 15m Access Tokens in memory & 7d Refresh Tokens in HttpOnly cookies.'],
  ['bcryptjs & Helmet', 'Security & Hashing', '10-round salted password hashing & HTTP security header enforcement against DDoS.'],
];

techStackData.forEach(([tech, cat, why]) => {
  doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text(`${tech} (${cat}): `, { continued: true });
  doc.fillColor(darkText).font('Helvetica').text(why);
  doc.moveDown(0.3);
});

doc.addPage();

// Section 3: Architecture & Security
doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text('3. Security & System Architecture Workflows', 40, 40);
doc.strokeColor(accentAmber).lineWidth(2).moveTo(40, 58).lineTo(555, 58).stroke();
doc.moveDown(0.8);

doc.fillColor(accentEmerald).fontSize(11).font('Helvetica-Bold').text('A. JWT Token Rotation Security Architecture:');
doc.fillColor(darkText).fontSize(10).font('Helvetica').text(
  '1. User Login: Server issues a 15-minute Access Token in memory and sets a 7-day Refresh Token as an HttpOnly, SameSite=Lax cookie.\n' +
  '2. Why HttpOnly Cookie? JavaScript cannot access HttpOnly cookies, protecting the refresh token against Cross-Site Scripting (XSS) attacks.\n' +
  '3. Axios Interceptor: If an access token expires, Axios intercepts the 401 Unauthorized response, silently hits /api/auth/refresh, receives a new access token, and retries the request seamlessly.',
  { align: 'justify' }
);

doc.moveDown(1);
doc.fillColor(accentEmerald).fontSize(11).font('Helvetica-Bold').text('B. Multi-Step Table Reservation & Pre-Order Flow:');
doc.fillColor(darkText).fontSize(10).font('Helvetica').text(
  'Step 1 (Outlet Selection): Select from Bukhara Royal Grill, Punjab Dhaba, Dakshin Tiffin Room, or Hyderabadi Shahi Kitchen.\n' +
  'Step 2 (Table & Time): Pick party size (1-20), reservation date, time slot, and seating area (Window, Outdoor, Booth).\n' +
  'Step 3 (Food Pre-Order): Add dishes to pre-order cart with live ₹ INR price calculation.\n' +
  'Step 4 (Confirmation): Receives booking reference & saves booking to database & localStorage tracking.',
  { align: 'justify' }
);

doc.moveDown(1.5);

// Section 4: Viva Q&A
doc.fillColor(primaryColor).fontSize(14).font('Helvetica-Bold').text('4. Top 12 Expected Viva / Interview Questions & Model Answers');
doc.strokeColor(accentAmber).lineWidth(2).moveTo(40, doc.y + 4).lineTo(555, doc.y + 4).stroke();
doc.moveDown(1);

const qaList = [
  {
    q: 'Q1: What is the architectural model of your DineEase project?',
    a: 'DineEase follows a Client-Server RESTful Architecture (MERN Stack). The React SPA frontend communicates asynchronously with the Node.js/Express API backend over JSON HTTP requests.',
  },
  {
    q: 'Q2: Why did you choose React instead of traditional HTML/JS or PHP?',
    a: 'React utilizes a Virtual DOM and component state. It dynamically re-renders UI components (like live pre-order bill calculation & availability toggles) instantaneously without refreshing the browser page.',
  },
  {
    q: 'Q3: Explain how JWT Access Tokens and Refresh Tokens work in your application.',
    a: 'Access Tokens are short-lived (15 min) and kept in memory for Bearer Authorization headers. Refresh Tokens are long-lived (7 days) and stored in secure HttpOnly cookies. When an access token expires, /api/auth/refresh issues a new one automatically.',
  },
  {
    q: 'Q4: Why store the Refresh Token in an HttpOnly cookie instead of localStorage?',
    a: 'localStorage is readable by client-side JavaScript, leaving tokens vulnerable to XSS attacks. HttpOnly cookies cannot be accessed via JavaScript, providing robust protection against token theft.',
  },
  {
    q: 'Q5: How does your frontend automatically handle expired Access Tokens?',
    a: 'We configured an Axios Response Interceptor in axiosInstance.js. On a 401 Unauthorized status, it automatically calls /api/auth/refresh, updates memory token, and retries the original API call transparently.',
  },
  {
    q: 'Q6: Why did you choose MongoDB over SQL databases (MySQL/PostgreSQL)?',
    a: 'MongoDB is a NoSQL document database using JSON-like BSON format. It handles nested array structures like preOrderedItems (name, price, quantity) natively without complex relational SQL joins.',
  },
  {
    q: 'Q7: How is Role-Based Access Control (RBAC) enforced in your system?',
    a: 'On frontend, <ProtectedRoute allowedRoles={["admin", "staff"]}> guards pages. On backend, Express authorize("admin", "staff") middleware verifies JWT role before permitting administrative CRUD operations.',
  },
  {
    q: 'Q8: How does the food pre-ordering feature work during table reservation?',
    a: 'During Step 3 of the reservation wizard, users select dishes from their chosen outlet. Items, quantities, and total bill in ₹ Rupees are saved directly with the reservation document in the database.',
  },
  {
    q: 'Q9: What security measures are implemented on your Express server?',
    a: '1) Helmet middleware for HTTP security headers. 2) Express Rate Limiting against brute-force DDoS. 3) Bcryptjs 10-round salted password hashing. 4) CORS locking to frontend domain.',
  },
  {
    q: 'Q10: How do you handle non-logged-in guest reservations?',
    a: 'All prices use Indian Rupees format ₹{price.toLocaleString("en-IN")}. For non-logged-in guests, created reservation IDs are stored in localStorage, allowing MyBookingsPage to query and display their exact booking.',
  },
  {
    q: 'Q11: How does the Admin/Staff Management Desk work?',
    a: 'Staff/Admin can toggle menu availability in 1 click, add/edit dishes, view incoming reservations, and update booking status (Pending -> Confirmed -> Seated -> Completed -> Cancelled).',
  },
  {
    q: 'Q12: How does the Dual Payment Gateway (Cash vs QR Code Scan) work?',
    a: 'For pre-ordered meals, users can choose between Instant UPI QR Code Scan (supports GPay, PhonePe, Paytm with dynamic transaction IDs) or Cash Payment (Cash on Delivery or Pay at Counter after dining). Both modes are tracked in MongoDB.',
  },
  {
    q: 'Q13: How does the system handle different modes of delivery and service?',
    a: 'DineEase supports 3 service modes: Dine-In Table (with seating preference: Window, Patio, Booth), Takeaway Pickup, and Doorstep Delivery (with street address validation). All are saved in the reservation document.',
  },
  {
    q: 'Q14: How does the Menu Catalog organize dishes by restaurant and meal time?',
    a: 'Using URL search parameters (/menu?restaurant=...), users can explore distinct restaurant outlets and filter dishes by meal timing: Breakfast, Starters, Lunch, Snacks, Dinner, and Sweets, fetched live from MongoDB.',
  },
  {
    q: 'Q15: How would you scale this application for production deployment?',
    a: 'Deploy React frontend to Vercel CDN, host Express backend on AWS EC2, connect to a MongoDB Atlas cluster, and integrate Redis for menu query caching & session blacklisting.',
  },
];

qaList.forEach((item, index) => {
  if (doc.y > 720) {
    doc.addPage();
  }
  doc.fillColor(primaryColor).fontSize(10).font('Helvetica-Bold').text(item.q);
  doc.fillColor(darkText).fontSize(9.5).font('Helvetica').text(item.a, { align: 'justify' });
  doc.moveDown(0.6);
});

doc.moveDown(1);
doc.fillColor('#64748B').fontSize(9).font('Helvetica-Oblique').text(
  'DineEase — Restaurant & Café Management System | Prepared for Technical Viva & Presentation',
  { align: 'center' }
);

doc.end();

console.log('[PDF Generator] PDF successfully compiled and generated!');
