import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const desktopPdfPath = 'C:\\Users\\soura\\OneDrive\\Desktop\\DineEase_Project_Report.pdf';
const projectPdfPath = 'C:\\Users\\soura\\OneDrive\\Desktop\\ReactProject\\DineEase_Project_Report.pdf';

const doc = new PDFDocument({
  size: 'A4',
  margin: 40,
  autoFirstPage: true,
});

const writeStreamDesktop = fs.createWriteStream(desktopPdfPath);
const writeStreamProject = fs.createWriteStream(projectPdfPath);

doc.pipe(writeStreamDesktop);
doc.pipe(writeStreamProject);

// Primary styling palette matching academic standards & sample PDF
const fontTitle = 'Helvetica-Bold';
const fontRegular = 'Helvetica';
const fontOblique = 'Helvetica-Oblique';
const primaryDark = '#0F172A';
const textDark = '#1E293B';
const accentBlue = '#1E40AF';
const borderGray = '#CBD5E1';
const bgLight = '#F8FAFC';

// Helper for centered bold title
const addMainHeader = (titleText) => {
  doc.fillColor(primaryDark).fontSize(18).font(fontTitle).text(titleText, { align: 'center' });
  doc.moveDown(1.5);
};

// ==========================================
// PAGE 1: COVER / TITLE PAGE
// ==========================================
doc.moveDown(3);
doc.fillColor('#000000').fontSize(26).font(fontTitle).text('DineEase', { align: 'center' });
doc.fontSize(14).font(fontTitle).text('(Restaurant & Café Management System)', { align: 'center' });

doc.moveDown(2);
doc.fontSize(16).font(fontTitle).text('A PROJECT REPORT', { align: 'center' });
doc.fontSize(11).font(fontRegular).text('SUBMITTED BY', { align: 'center' });

doc.moveDown(1);

// Table SUBMITTED BY
const tableTop = doc.y;
const colWidths = [120, 145, 125, 125];
const colPositions = [40, 160, 305, 430];
const tableWidth = 515;
const rowHeight = 24;

// Table Header Row
doc.rect(40, tableTop, tableWidth, rowHeight).fill('#DCE6F1').stroke('#94A3B8');
doc.fillColor('#0F172A').fontSize(10).font(fontTitle);
doc.text('Roll Number', colPositions[0], tableTop + 6, { width: colWidths[0], align: 'center' });
doc.text('Registration Number', colPositions[1], tableTop + 6, { width: colWidths[1], align: 'center' });
doc.text('Student Code', colPositions[2], tableTop + 6, { width: colWidths[2], align: 'center' });
doc.text('Student Name', colPositions[3], tableTop + 6, { width: colWidths[3], align: 'center' });

// Table Data Row
const row2Top = tableTop + rowHeight;
doc.rect(40, row2Top, tableWidth, rowHeight).stroke('#94A3B8');
doc.fillColor('#1E293B').fontSize(10).font(fontRegular);
doc.text('24103460035', colPositions[0], row2Top + 6, { width: colWidths[0], align: 'center' });
doc.text('24103002816', colPositions[1], row2Top + 6, { width: colWidths[1], align: 'center' });
doc.text('BWU/BCA/24/000', colPositions[2], row2Top + 6, { width: colWidths[2], align: 'center' });
doc.text('MITA PAUL', colPositions[3], row2Top + 6, { width: colWidths[3], align: 'center' });

doc.y = row2Top + rowHeight + 35;

doc.fillColor('#1E293B').fontSize(11).font(fontOblique).text('Of in partial fulfillment for the award of the degree', { align: 'center' });

doc.moveDown(1.5);
doc.fillColor('#000000').fontSize(14).font(fontTitle).text('BACHELOR OF COMPUTER APPLICATION', { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(11).font(fontTitle).text('IN', { align: 'center' });
doc.moveDown(0.5);
doc.fontSize(14).font(fontTitle).text('DEPARTMENT OF COMPUTATIONAL SCIENCE', { align: 'center' });

doc.moveDown(2);

// Brainware Emblem / Seal representation
const centerX = 297;
const centerY = doc.y + 40;
doc.circle(centerX, centerY, 38).lineWidth(2).stroke('#0EA5E9');
doc.circle(centerX, centerY, 34).lineWidth(1).stroke('#0284C7');
doc.fillColor('#0284C7').fontSize(9).font(fontTitle).text('BRAINWARE', centerX - 30, centerY - 15, { width: 60, align: 'center' });
doc.fillColor('#D97706').fontSize(12).font(fontTitle).text('★', centerX - 4, centerY - 4);
doc.fillColor('#0284C7').fontSize(8).font(fontTitle).text('UNIVERSITY', centerX - 30, centerY + 10, { width: 60, align: 'center' });

doc.y = centerY + 55;

doc.fillColor('#000000').fontSize(13).font(fontTitle).text('BRAINWARE UNIVERSITY', { align: 'center' });
doc.fontSize(10).font(fontTitle).text('398, Ramkrishnapur Road, Barasat, North 24 Parganas, Kolkata - 700 125', { align: 'center' });

// ==========================================
// PAGE 2: ACKNOWLEDGEMENT
// ==========================================
doc.addPage();
addMainHeader('ACKNOWLEDGEMENT');

doc.fillColor(textDark).fontSize(10.5).font(fontRegular).lineGap(4);
doc.text(
  'We would like to express our heartfelt gratitude to the Management and Faculty of Brainware University for providing us with the opportunity, guidance, and resources required to successfully complete this project. Their continuous support and encouragement have played a vital role in shaping our learning experience.',
  { align: 'justify' }
);
doc.moveDown(1);
doc.text(
  'We extend our sincere thanks to our esteemed project supervisor, Mr. Sourav Sandhukhan, Assistant Professor, whose constant guidance, valuable suggestions, and insightful feedback have been instrumental throughout the development of this project. His expertise, patience, and motivation helped us overcome challenges and understand the core concepts effectively.',
  { align: 'justify' }
);
doc.moveDown(1);
doc.text(
  'We are also deeply thankful to Dr. Jayanta Aich, Head of the Department of Computational Sciences, for providing a supportive academic environment and the necessary facilities that enabled us to complete this work successfully.',
  { align: 'justify' }
);
doc.moveDown(1);
doc.text(
  'Our sincere appreciation goes to all the faculty members of the Department of Computational Sciences for sharing their knowledge, advice, and encouragement during the course of our project. Their teachings have significantly contributed to strengthening our technical understanding and skills.',
  { align: 'justify' }
);
doc.moveDown(1);
doc.text(
  'Finally, we express our profound gratitude to our families and friends, whose constant support, understanding, and motivation inspired us to stay committed and focused during every phase of this project. Without their encouragement, this achievement would not have been possible.',
  { align: 'justify' }
);

doc.moveDown(3);
doc.strokeColor(borderGray).lineWidth(1).moveTo(40, doc.y).lineTo(555, doc.y).stroke();
doc.moveDown(1.5);
doc.fillColor(primaryDark).fontSize(10).font(fontTitle).text('SIGNATURE:--');
doc.moveDown(0.8);
doc.fontSize(10).font(fontTitle).text('MITA PAUL');
doc.fontSize(9.5).font(fontRegular).text('(BWU/BCA/24/000)');

// ==========================================
// PAGE 3: ABSTRACT
// ==========================================
doc.addPage();
addMainHeader('ABSTRACT');

doc.fillColor(textDark).fontSize(10.5).font(fontRegular).lineGap(4);
doc.text(
  'The DineEase (Restaurant & Café Management System) is a web-based application built using React JS that allows users to view restaurant outlets, check table availability, book table reservations, and pre-order food in a fast and interactive manner. The main objective of this project is to demonstrate the practical implementation of core React concepts while providing a convenient way for diners to schedule table reservations and pre-order meals online.',
  { align: 'justify' }
);
doc.moveDown(1);
doc.text(
  'The system is developed using a component-based architecture, where the user interface is broken down into small, independent, and reusable components such as the menu item card, reservation wizard, navigation bar, and booking confirmation drawer. Each component receives data through props and manages its own state, making the application modular, maintainable, and easy to extend.',
  { align: 'justify' }
);
doc.moveDown(1);
doc.text(
  'React Router is used to enable seamless client-side navigation between pages such as Home, Outlets & Menu, Table Reservations, My Bookings, and Admin Dashboard, without reloading the browser. State management using React Hooks (useState, useEffect and useContext) allows the application to track user selections, cart items, pre-order totals, and booking status dynamically.',
  { align: 'justify' }
);
doc.moveDown(1);
doc.text(
  'The application communicates with a backend API to fetch real-time outlet menus, dish availability, and time slots, and to submit table pre-orders, ensuring that users always see up-to-date information. Multiple styling approaches, including Tailwind CSS, CSS Modules, and conditional inline styling, are used to give the interface a clean, responsive, and user-friendly appearance across devices.',
  { align: 'justify' }
);
doc.moveDown(1);
doc.text(
  'Overall, the DineEase system reinforces core concepts of component-based architecture, JSX, props and state management, routing, reusable components, multiple styling approaches, and real-time data handling through API integration, while giving diners a fast and modern way to reserve tables and pre-order food online.',
  { align: 'justify' }
);

// ==========================================
// PAGE 4: INDEX
// ==========================================
doc.addPage();
addMainHeader('INDEX');

const indexItems = [
  '❖  ACKNOWLEDGMENT',
  '❖  ABSTRACT',
  '❖  LIST OF FIGURE',
  '❖  LIST OF TABLE',
  '❖  LIST OF SCREENSHOTS',
  '',
  '1. INTRODUCTION',
  '2. LITERATURE SURVEY',
  '3. SYSTEM ANALYSIS AND DESIGN',
  '4. IMPLEMENTATION',
  '5. OUTPUT SCREENSHOT',
  '6. SOURCE CODE',
  '7. TESTING AND DEBUGGING',
  '8. CONCLUSION AND FUTURE ENHANCEMENT',
  '9. REFERENCES',
];

doc.fillColor(primaryDark).fontSize(11).font(fontTitle);
indexItems.forEach((item) => {
  if (item === '') {
    doc.moveDown(0.5);
  } else {
    doc.text(item);
    doc.moveDown(0.5);
  }
});

// ==========================================
// PAGE 5: 1. INTRODUCTION
// ==========================================
doc.addPage();
addMainHeader('1. INTRODUCTION');

doc.fillColor(textDark).fontSize(10).font(fontRegular).lineGap(3.5);
doc.text(
  "In today's fast-paced world, technology plays a crucial role in improving the efficiency and accessibility of various services, including dining and hospitality. The traditional method of reserving restaurant tables and ordering food often involves visiting outlets in person, calling desk managers, or waiting in long queues during peak rush hours, which can be time-consuming and inconvenient. Customers frequently face long waiting times, difficulty in securing preferred table seating, and delayed food service. These challenges highlight the need for a fast, interactive, and user-friendly system.",
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'The DineEase (Restaurant & Café Management System) is a web-based application developed using React JS to overcome the limitations of traditional reservation systems. It provides a single-page online platform where diners can view multi-outlet restaurant menus, check table availability, book reservations, and pre-order food from anywhere at any time, without the delays caused by full-page reloads that older websites require.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'The system is organized into multiple reusable modules to ensure smooth functioning. The Outlet & Menu Listing Module allows users to browse Indian restaurant outlets (Bukhara Royal Grill, Punjab Dhaba, Dakshin Tiffin Room, Hyderabadi Shahi Kitchen) and view menu items through a reusable MenuItemCard component. The Availability & Pre-Order Booking Module lets users pick table preferences (Standard, Window, Outdoor, Booth), date/time slots, and submit pre-orders through a controlled form component. The My Bookings & Staff Desk Module displays the reservations a user has booked, fetched live from the backend.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'The development of this system involves the use of modern frontend technologies such as React JS and JSX for building the user interface, React Router DOM for client-side navigation, and React Hooks such as useState, useEffect and useContext for state management. The application communicates with a REST API using Axios to fetch and submit data in real time, while styling is handled through a combination of Tailwind CSS, CSS Modules, and conditional class-based styling.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'One of the major advantages of the DineEase system is its ability to reflect table availability, menu stock, and booking status instantly, without requiring the page to reload. Because the interface is built from small, independent, reusable components, new features and pages can be added with minimal changes to existing code. This component-based approach also makes the application easier to test, debug, and maintain.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'Furthermore, the system enhances the overall user experience by providing quick, dynamic feedback as users interact with the interface – for example, updating live pre-order price totals in Indian Rupees (₹) as dishes are selected, disabling sold-out menu items, or showing a confirmation reference immediately after submission. The responsive, multi-approach styling ensures the application looks consistent and usable across desktop and mobile devices.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'In conclusion, the DineEase (Restaurant & Café Management System) is a modern, component-driven solution that not only simplifies table scheduling and food pre-ordering for diners but also reinforces the core concepts of React JS development – component-based architecture, JSX, props and state management, routing, reusable components, multiple styling approaches, and real-time data handling through API integration.',
  { align: 'justify' }
);

// ==========================================
// PAGE 6: 2. LITERATURE SURVEY
// ==========================================
doc.addPage();
addMainHeader('2. LITERATURE SURVEY');

doc.fillColor(textDark).fontSize(10).font(fontRegular).lineGap(3.5);
doc.text(
  'The DineEase (Restaurant & Café Management System) builds upon an established body of work in web-based healthcare and dining scheduling platforms. Earlier systems were typically developed using server-rendered pages built with HTML, CSS, JavaScript, and a backend language such as PHP, where every user action – searching for a restaurant, checking table availability, or confirming a booking – required a full page reload from the server.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'Research into modern frontend development shows that Single Page Application (SPA) frameworks and libraries, such as React JS, Angular, and Vue, significantly improve user experience by updating only the parts of the page that change, using a virtual DOM. This reduces perceived load time and makes applications feel faster and more responsive, which is especially valuable for time-sensitive tasks such as reserving a table during peak rush hours or pre-ordering meals.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'Studies on component-based design highlight that breaking an interface into small, reusable components – each with clearly defined props (inputs) and state (internal data) – improves code reusability, testability, and long-term maintainability compared to monolithic page templates. This principle is central to React JS development and is directly applied in the design of this system.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'Previous work in healthcare and restaurant scheduling systems has also emphasized the importance of real-time data: diners need to see accurate, up-to-date availability, and double-booking of tables must be prevented. Systems that integrate a REST API with asynchronous requests (using tools such as Axios or the Fetch API) are shown to handle this more gracefully than systems that depend on repeated full page reloads.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'Based on these studies, the DineEase system is designed as a React JS single-page application that combines component-based architecture, client-side routing, and real-time REST API integration to provide a simple, efficient, and reliable way for diners to view outlets, check table availability, and book pre-ordered dining reservations.',
  { align: 'justify' }
);

// ==========================================
// PAGE 7: 3. SYSTEM ANALYSIS AND DESIGN
// ==========================================
doc.addPage();
addMainHeader('3. SYSTEM ANALYSIS AND DESIGN');

doc.fillColor(textDark).fontSize(10).font(fontRegular).lineGap(3);
doc.text(
  'The System Analysis and Design phase is an important step in the development of the DineEase (Restaurant & Café Management System). It helps in understanding the requirements of the system and designing a component-based structure that meets the needs of diners and management while reinforcing core React JS concepts.',
  { align: 'justify' }
);

doc.moveDown(0.8);
doc.fillColor(primaryDark).fontSize(11).font(fontTitle).text('3.1 System Analysis');
doc.moveDown(0.4);

doc.fillColor(textDark).fontSize(10).font(fontRegular);
doc.text(
  'System analysis focuses on identifying the problems in existing manual or legacy reservation systems and determining the requirements for the new system.',
  { align: 'justify' }
);
doc.moveDown(0.5);
doc.font(fontTitle).text('Existing System: ', { continued: true }).font(fontRegular).text(
  'In many restaurants and cafes, table booking is done manually through phone calls or in-person visits, or through older websites that reload the entire page for every action. This process often causes long waiting times, unclear table availability information, pre-order miscommunications, and a slow, disjointed user experience.',
  { align: 'justify' }
);

doc.moveDown(0.5);
doc.font(fontTitle).text('Problems in the Existing System:');
const probs = [
  '• Time-consuming manual or phone-based table reservation process',
  '• Full page reloads on every action, resulting in a slow user experience',
  '• Difficulty in checking real-time table availability and menu item stock',
  '• Non-reusable, hard-to-maintain front-end code in older systems',
];
probs.forEach((p) => doc.text(`   ${p}`));

doc.moveDown(0.5);
doc.font(fontTitle).text('Proposed System: ', { continued: true }).font(fontRegular).text(
  'The proposed DineEase system is a React JS single-page application that allows diners to view outlets, check table availability, choose seating preferences, pre-order meals with instant ₹ INR bill calculations, and book reservations through a fast, component-driven web interface that updates instantly without full page reloads.',
  { align: 'justify' }
);

doc.moveDown(0.5);
doc.font(fontTitle).text('Advantages of the Proposed System:');
const advs = [
  "• Fast, dynamic user interface powered by React's virtual DOM",
  '• Reusable, independent components (MenuItemCard, ReservationCard, Navbar) that speed up development and testing',
  '• Seamless client-side navigation using React Router DOM',
  '• Real-time availability and booking updates through REST API integration',
];
advs.forEach((a) => doc.text(`   ${a}`));

doc.moveDown(0.8);
doc.fillColor(primaryDark).fontSize(11).font(fontTitle).text('3.2 System Design');
doc.moveDown(0.4);
doc.fillColor(textDark).fontSize(10).font(fontRegular).text(
  'System design describes how the application will be structured and how different components will work together.'
);

doc.moveDown(0.4);
doc.font(fontTitle).text('Modules of the System:');
doc.font(fontRegular).text('1. Outlet & Menu Listing Module');
doc.font(fontRegular).text('2. Availability & Pre-Order Booking Module');
doc.font(fontRegular).text('3. My Bookings & Staff Management Desk Module');

// ==========================================
// PAGE 8: SYSTEM ARCHITECTURE & DIAGRAM 3.1
// ==========================================
doc.addPage();
doc.fillColor(textDark).fontSize(10).font(fontRegular).lineGap(3);

const moduleDescs = [
  '• Outlet & Menu Listing Module – Browse multi-outlet Indian restaurant menus (Bukhara Royal Grill, Punjab Dhaba, Dakshin Tiffin Room, Hyderabadi Shahi Kitchen), view dish details, dietary flags (Veg/Gluten-free), and prices through a reusable MenuItemCard component that receives data via props.',
  "• Availability & Pre-Order Booking Module – View available table time slots, pick party size (1–20 guests), select seating area (Window, Outdoor, Booth), add pre-order food items, and submit an appointment through a controlled booking form managed with useState.",
  '• My Bookings & Staff Management Desk Module – View previously booked reservations, fetched live from the backend REST API, and enable staff/admin to update reservation statuses (Pending → Confirmed → Seated → Completed → Cancelled) and manage menu availability.',
];
moduleDescs.forEach((m) => {
  doc.text(m, { align: 'justify' });
  doc.moveDown(0.4);
});

doc.moveDown(0.5);
doc.font(fontTitle).text('System Architecture: ', { continued: true }).font(fontRegular).text(
  'The system follows a client-server architecture in which the React JS front end runs entirely in the browser as a single-page application. It communicates asynchronously with a backend REST API using Axios, which processes requests and stores data in a MongoDB database, allowing the interface to update in real time without reloading the page.',
  { align: 'justify' }
);

doc.moveDown(0.5);
doc.font(fontTitle).text('Technologies Used:');
const techList = [
  '• Frontend: React JS (v18), JSX, React Router DOM',
  '• State Management: React Hooks – useState, useEffect, useContext (AuthContext & ThemeContext)',
  '• Styling: Tailwind CSS, CSS Modules, conditional/inline styling',
  '• API Integration: Axios for real-time data handling and automatic 401 JWT token refresh interceptors',
  '• Backend (API layer): Node.js / Express.js (REST API)',
  '• Database: MongoDB / Mongoose ODM',
];
techList.forEach((t) => doc.text(`   ${t}`));

doc.moveDown(1);

// Draw Fig 3.1 Flowchart Diagram
const drawBox = (x, y, w, h, text, bgColor, textColor = '#FFFFFF') => {
  doc.roundedRect(x, y, w, h, 4).fill(bgColor);
  doc.fillColor(textColor).fontSize(8).font(fontTitle);
  doc.text(text, x + 2, y + (h / 2) - 4, { width: w - 4, align: 'center' });
};

const diagStartY = doc.y + 5;
drawBox(230, diagStartY, 135, 22, 'Start', '#16A34A');

drawBox(190, diagStartY + 30, 215, 25, 'DineEase System\n(React JS Application)', '#0284C7');

// 3 columns
drawBox(45, diagStartY + 70, 140, 24, 'Outlet & Menu\nModule', '#BAE6FD', '#0369A1');
drawBox(227, diagStartY + 70, 140, 24, 'Availability &\nPre-Order Module', '#FED7AA', '#C2410C');
drawBox(410, diagStartY + 70, 140, 24, 'My Bookings &\nStaff Desk Module', '#E9D5FF', '#6B21A8');

drawBox(45, diagStartY + 102, 140, 24, 'MenuItemCard\n(reusable component)', '#E0F2FE', '#0369A1');
drawBox(227, diagStartY + 102, 140, 24, 'ReservationForm\n(form, state via props)', '#FFEDD5', '#C2410C');
drawBox(410, diagStartY + 102, 140, 24, 'ReservationCard\n(props + state)', '#F3E8FF', '#6B21A8');

drawBox(45, diagStartY + 134, 140, 24, 'Fetch menus via\nREST API (Axios)', '#E0F2FE', '#0369A1');
drawBox(227, diagStartY + 134, 140, 24, 'POST booking to\nREST API (real-time)', '#FFEDD5', '#C2410C');
drawBox(410, diagStartY + 134, 140, 24, 'GET/PATCH bookings\nvia REST API', '#F3E8FF', '#6B21A8');

drawBox(170, diagStartY + 170, 255, 24, 'Backend REST API (Express / Node.js)', '#0F766E');
drawBox(200, diagStartY + 202, 195, 24, 'MongoDB Database', '#0284C7');

doc.y = diagStartY + 235;
doc.fillColor(primaryDark).fontSize(10).font(fontTitle).text('Fig. no. 3.1 – Module and data flow diagram', { align: 'center' });

// ==========================================
// PAGE 9: DIAGRAM 3.2 & CONCLUSION 3
// ==========================================
doc.addPage();
addMainHeader('Component Architecture - DineEase (React JS)');

const diag2Y = doc.y + 10;
drawBox(230, diag2Y, 135, 24, 'App.jsx', '#0284C7');
drawBox(200, diag2Y + 34, 195, 24, 'React Router (Routes)', '#0D9488');

drawBox(40, diag2Y + 70, 85, 22, 'Navbar\n(reusable)', '#F59E0B');
drawBox(140, diag2Y + 70, 85, 22, 'HomePage', '#38BDF8', '#0F172A');
drawBox(240, diag2Y + 70, 85, 22, 'MenuPage', '#38BDF8', '#0F172A');
drawBox(340, diag2Y + 70, 95, 22, 'ReservationPage', '#38BDF8', '#0F172A');
drawBox(450, diag2Y + 70, 100, 22, 'AdminDashboard', '#38BDF8', '#0F172A');

drawBox(230, diag2Y + 102, 105, 24, 'MenuItemCard\n(props: item)', '#BAE6FD', '#0369A1');
drawBox(345, diag2Y + 102, 90, 24, 'PreOrderCart\n(props, state)', '#FED7AA', '#C2410C');

drawBox(200, diag2Y + 136, 195, 22, 'api.js - Axios service layer', '#7C3AED');
drawBox(190, diag2Y + 166, 215, 24, 'Backend REST API (real-time data)', '#0D9488');
drawBox(220, diag2Y + 198, 155, 24, 'MongoDB Database', '#0284C7');

doc.y = diag2Y + 235;
doc.fillColor(primaryDark).fontSize(10).font(fontTitle).text('Fig. no. 3.2 – Component architecture diagram', { align: 'center' });

doc.moveDown(2);
doc.fillColor(textDark).fontSize(10.5).font(fontRegular).lineGap(4);
doc.text(
  'Overall, the system design ensures that the DineEase system is modular, responsive, and capable of handling real-time reservation and food pre-order data effectively, while giving hands-on experience with the core building blocks of React JS.',
  { align: 'justify' }
);

// ==========================================
// PAGE 10: 4. IMPLEMENTATION
// ==========================================
doc.addPage();
addMainHeader('4. IMPLEMENTATION');

doc.fillColor(textDark).fontSize(10).font(fontRegular).lineGap(3.5);
doc.text(
  'The implementation phase involves developing and integrating the different components of the DineEase (Restaurant & Café Management System) based on the design identified earlier. The project is scaffolded using Vite, a modern React build tool, and the user interface is built entirely using functional components written in JSX.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'The interface is broken down into small, independent, reusable components such as Navbar, MenuItemCard, ReservationCard, AuthModal, AdminMenuModal, and Footer. Data is passed from parent components to child components using props – for example, the menu list page passes each dish details to a MenuItemCard component as props, which then renders that item information, image, dietary flags, and price in Indian Rupees (₹).',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  "Local, changing data such as pre-order food cart items, selected time slots, party size, and loading status is managed using React's useState hook, while side effects such as fetching menu items when a component first renders are handled with the useEffect hook. React Router DOM is used to configure client-side routes for the Home, Menu, Reservations, My Bookings, and Admin Dashboard pages, allowing users to move between pages instantly without a full page reload.",
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'Real-time data handling is implemented through Axios, which is used inside a dedicated api.js service layer to call the backend REST API. The application fetches the current list of restaurant outlets and their active menu items when a page loads, and sends a POST request to the API when a diner submits a new table reservation and pre-order, ensuring that the interface always reflects the latest data. Newly booked slots and reserved tables are immediately updated in the database without requiring the user to refresh the page.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'Multiple styling approaches are used across the application: Tailwind CSS utility classes scope styles and provide glassmorphism UI elements, Bootstrap grid supports layout structure, and conditional/inline styling is used to dynamically change the appearance of elements – for example, showing a sold-out dish in a muted grayscale color.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'Basic form validation is implemented on the reservation wizard to ensure that required fields such as guest name, contact details, date, and time slot are filled in correctly before a request is sent to the API, and any errors returned by the API (such as a conflicting table slot) are displayed to the user immediately.',
  { align: 'justify' }
);

// ==========================================
// PAGE 11: IMPLEMENTATION FIG 4.1
// ==========================================
doc.addPage();
doc.moveDown(3);

const dataModelY = doc.y;
doc.rect(80, dataModelY, 435, 140).fill('#F1F5F9').stroke('#94A3B8');
doc.fillColor(primaryDark).fontSize(11).font(fontTitle).text('Online Restaurant Table & Pre-Order Data Model', 90, dataModelY + 12, { align: 'center', width: 415 });

doc.fillColor(textDark).fontSize(9.5).font(fontRegular);
doc.text('• Customer Entity: Name, Phone, Email, Auth Role (Customer/Staff/Admin)', 100, dataModelY + 35);
doc.text('• Outlet Entity: Bukhara Royal Grill, Punjab Dhaba, Dakshin Tiffin Room, Hyderabadi', 100, dataModelY + 55);
doc.text('• Menu Item Entity: Dish Name, Price (₹ INR), Veg/Gluten-free badges, Stock Status', 100, dataModelY + 75);
doc.text('• Reservation Entity: Date, Time Slot, Party Size, Pre-Order Items Array, Status', 100, dataModelY + 95);
doc.text('• REST API Endpoints: /api/menu, /api/reservations, /api/auth/refresh', 100, dataModelY + 115);

doc.y = dataModelY + 160;
doc.fillColor(primaryDark).fontSize(10).font(fontTitle).text('Fig. 4.1 – Data model for outlets, menu items, reservations and users (consumed via the REST API)', { align: 'center' });

doc.moveDown(3);
doc.fillColor(textDark).fontSize(10.5).font(fontRegular).lineGap(4);
doc.text(
  'Thus, the implementation phase transforms the system design into a fully functional DineEase system that reinforces component-based architecture, JSX, props and state management, routing, reusable components, multiple styling approaches, and real-time data handling through API integration.',
  { align: 'justify' }
);

// ==========================================
// PAGE 12: 5. OUTPUT SCREENSHOT (PART 1)
// ==========================================
doc.addPage();
addMainHeader('5. OUTPUT SCREENSHOT');

doc.fillColor(textDark).fontSize(10).font(fontRegular).lineGap(3);
doc.text(
  'The screenshots below are placeholders showing where each page of the running application should be inserted; replace each placeholder image with the corresponding screenshot captured from the deployed React application.'
);

const drawScreenshotPlaceholder = (yPos, title, subtitle) => {
  doc.rect(70, yPos, 455, 140).lineWidth(1).dash(5, { space: 3 }).stroke('#94A3B8').undash();
  doc.rect(70, yPos, 455, 140).fill('#F8FAFC');

  // Window dots
  doc.circle(85, yPos + 12, 3).fill('#EF4444');
  doc.circle(95, yPos + 12, 3).fill('#F59E0B');
  doc.circle(105, yPos + 12, 3).fill('#10B981');

  doc.fillColor(primaryDark).fontSize(12).font(fontTitle).text(title, 70, yPos + 50, { width: 455, align: 'center' });
  doc.fillColor('#64748B').fontSize(9).font(fontRegular).text('Screenshot placeholder - to be replaced with actual application output', 70, yPos + 70, { width: 455, align: 'center' });

  doc.fillColor(primaryDark).fontSize(10.5).font(fontTitle).text(subtitle, 40, yPos + 150, { width: 515, align: 'center' });
};

drawScreenshotPlaceholder(doc.y + 15, 'Home Page', '5.1 :- Home Page');
drawScreenshotPlaceholder(doc.y + 185, 'Restaurant Outlets Listing Page', '5.2 :- Restaurant Outlets Listing Page');

// ==========================================
// PAGE 13: 5. OUTPUT SCREENSHOT (PART 2)
// ==========================================
doc.addPage();
drawScreenshotPlaceholder(60, 'Outlet Details & Menu Catalog', '5.3 :- Outlet Details & Menu Catalog');
drawScreenshotPlaceholder(240, 'Book Table & Pre-Order Form', '5.4 :- Table Reservation & Pre-Order Form');

// ==========================================
// PAGE 14: 5. OUTPUT SCREENSHOT (PART 3)
// ==========================================
doc.addPage();
drawScreenshotPlaceholder(60, 'Booking Confirmation', '5.5 :- Booking Confirmation');
drawScreenshotPlaceholder(240, 'My Bookings & Staff Desk Page', '5.6 :- My Bookings & Staff Desk Page');

// ==========================================
// PAGE 15: 6. SOURCE CODE (PART 1)
// ==========================================
doc.addPage();
addMainHeader('6. SOURCE CODE');

doc.fillColor(primaryDark).fontSize(10.5).font(fontTitle).text('6.1 :- MenuItemCard.jsx (reusable component, props)');
doc.moveDown(0.4);

const code1 = `// MenuItemCard.jsx - Reusable component receiving dish data via props
import React from 'react';
import { Clock, Star, Utensils, Check, X, Store } from 'lucide-react';

export const MenuItemCard = ({ item, isAdminView = false, onToggleAvailability }) => {
  const { name, restaurantName, description, price, isAvailable, imageUrl } = item;

  return (
    <div className={\`glass-card rounded-3xl \${!isAvailable ? 'opacity-60' : ''}\`}>
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-5">
        <span className="text-xs font-bold text-emerald-600">\${restaurantName}</span>
        <h3 className="text-lg font-bold">\${name}</h3>
        <span className="text-xl font-extrabold">₹\${Number(price).toLocaleString('en-IN')}</span>
        <p className="text-sm text-slate-600">\${description}</p>
      </div>
      {isAdminView && (
        <button onClick={() => onToggleAvailability(item._id)}>Toggle Availability</button>
      )}
    </div>
  );
};
export default MenuItemCard;`;

doc.rect(40, doc.y, 515, 230).fill('#0F172A');
doc.fillColor('#38BDF8').fontSize(8.5).font('Courier').text(code1, 50, doc.y + 10, { width: 495 });

doc.y = doc.y + 245;

doc.fillColor(primaryDark).fontSize(10.5).font(fontTitle).text('6.2 :- BookTable.jsx (state management with useState/useEffect, REST API)');
doc.moveDown(0.4);

const code2 = `// BookTable.jsx - Controlled form component using hooks & Axios API
import React, { useState, useEffect } from 'react';
import { getOutlets, createReservation } from '../api/axiosInstance';

function BookTable({ selectedOutletId }) {
  const [partySize, setPartySize] = useState(2);
  const [reservationDate, setReservationDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('19:00');
  const [guestName, setGuestName] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!guestName || !reservationDate) return setStatus('Fill all fields.');
    try {
      await createReservation({ outletId: selectedOutletId, guestName, partySize, reservationDate, timeSlot });
      setStatus('Table reserved successfully!');
    } catch (err) {
      setStatus('Slot full. Choose another.');
    }
  };`;

doc.rect(40, doc.y, 515, 200).fill('#0F172A');
doc.fillColor('#38BDF8').fontSize(8.5).font('Courier').text(code2, 50, doc.y + 10, { width: 495 });

// ==========================================
// PAGE 16: 6. SOURCE CODE (PART 2)
// ==========================================
doc.addPage();
doc.moveDown(1);

const code2Cont = `  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" value={guestName} onChange={(e) => setGuestName(e.target.value)} />
      <input type="date" value={reservationDate} onChange={(e) => setReservationDate(e.target.value)} />
      <button type="submit">Book Table Reservation</button>
      {status && <p>{status}</p>}
    </form>
  );
}
export default BookTable;`;

doc.rect(40, doc.y, 515, 120).fill('#0F172A');
doc.fillColor('#38BDF8').fontSize(8.5).font('Courier').text(code2Cont, 50, doc.y + 10, { width: 495 });

doc.y = doc.y + 135;

doc.fillColor(primaryDark).fontSize(10.5).font(fontTitle).text('6.3 :- App.jsx (React Router – client-side routing)');
doc.moveDown(0.4);

const code3 = `// App.jsx – React Router setup for client-side navigation
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { ReservationPage } from './pages/ReservationPage';

export const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/reservations" element={<ReservationPage />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};
export default App;`;

doc.rect(40, doc.y, 515, 240).fill('#0F172A');
doc.fillColor('#38BDF8').fontSize(8.5).font('Courier').text(code3, 50, doc.y + 10, { width: 495 });

// ==========================================
// PAGE 17: 7. TESTING AND DEBUGGING
// ==========================================
doc.addPage();
addMainHeader('7. TESTING AND DEBUGGING');

doc.fillColor(primaryDark).fontSize(11).font(fontTitle).text('Introduction');
doc.moveDown(0.4);
doc.fillColor(textDark).fontSize(10).font(fontRegular).lineGap(3.5);
doc.text(
  'Testing and debugging are very important steps in the development of the DineEase (Restaurant & Café Management System). These processes help to ensure that each React component renders correctly, that data flows correctly through props and state, and that the application communicates correctly with the backend REST API. Testing checks whether the system performs all functions properly, while debugging is the process of finding and fixing errors in the code.',
  { align: 'justify' }
);
doc.moveDown(0.6);
doc.text(
  'During development, different types of testing were performed to verify that the Outlet & Menu Listing, Availability & Pre-Order Booking, and My Bookings & Staff Desk modules all work correctly, both individually and together.'
);

doc.moveDown(0.8);
doc.fillColor(primaryDark).fontSize(11).font(fontTitle).text('Types of Testing');
doc.moveDown(0.4);

const testTypes = [
  {
    title: '1. Unit Testing',
    desc: 'Unit testing is the process of testing individual components of the application separately. For example, the MenuItemCard component is tested to verify it correctly renders the dish name, price in ₹ INR, dietary indicators, and availability status when given different props, and the BookTable component is tested to confirm its form state updates correctly as the user types.',
  },
  {
    title: '2. Integration Testing',
    desc: "Integration testing is performed after unit testing. In this stage, different components and modules are combined and tested together – for example, verifying that selecting an outlet from the Outlet Listing Module correctly loads that outlet's menu items and available table slots in the Booking Module, and that a successful booking updates the My Bookings Module through the shared API service layer.",
  },
  {
    title: '3. System Testing',
    desc: 'System testing involves testing the complete application as a whole. All features of the DineEase system, such as browsing outlets, checking table availability, pre-ordering food items, navigating between pages, and viewing booked reservations, are tested together to ensure the entire system works smoothly.',
  },
  {
    title: '4. User Acceptance Testing (UAT)',
    desc: 'User Acceptance Testing is the final stage of testing. In this stage, actual users test the system to check whether it meets their needs and expectations. Sample diners interact with the application to verify that it is easy to use, responsive, and performs all required functions properly.',
  },
];

testTypes.forEach((t) => {
  doc.fillColor(primaryDark).fontSize(10).font(fontTitle).text(t.title);
  doc.fillColor(textDark).fontSize(9.5).font(fontRegular).text(t.desc, { align: 'justify' });
  doc.moveDown(0.5);
});

doc.moveDown(0.5);
doc.fillColor(primaryDark).fontSize(11).font(fontTitle).text('Overall Conclusion');
doc.moveDown(0.4);
doc.fillColor(textDark).fontSize(9.5).font(fontRegular).text(
  'Through proper testing and debugging, the DineEase system becomes more reliable and efficient. These processes help identify errors early, improve component performance, and ensure that users can view outlets and book table reservations smoothly without technical problems. Testing and debugging play a crucial role in delivering a successful, user-friendly React application.',
  { align: 'justify' }
);

// ==========================================
// PAGE 18: TEST CASES TABLE
// ==========================================
doc.addPage();
addMainHeader('TEST CASES:--');

const tcTop = doc.y + 10;
const tcColW = [40, 110, 110, 140, 60, 55];
const tcColX = [40, 80, 190, 300, 440, 500];

// Header row
doc.rect(40, tcTop, 515, 24).fill('#DCE6F1').stroke('#94A3B8');
doc.fillColor(primaryDark).fontSize(9).font(fontTitle);
doc.text('Test Id', tcColX[0], tcTop + 6, { width: tcColW[0], align: 'center' });
doc.text('Description', tcColX[1], tcTop + 6, { width: tcColW[1], align: 'center' });
doc.text('Input', tcColX[2], tcTop + 6, { width: tcColW[2], align: 'center' });
doc.text('Expected Result', tcColX[3], tcTop + 6, { width: tcColW[3], align: 'center' });
doc.text('Actual Output', tcColX[4], tcTop + 6, { width: tcColW[4], align: 'center' });
doc.text('Status', tcColX[5], tcTop + 6, { width: tcColW[5], align: 'center' });

const testCasesData = [
  {
    id: 'TC-1',
    desc: 'Load outlet & menu list on Home/Menu page',
    input: 'Page navigation to /menu',
    expected: 'Outlet menu loads from API and renders MenuItemCard for each dish',
    actual: 'As expected',
    status: 'Pass',
  },
  {
    id: 'TC-2',
    desc: 'Book table reservation with valid data',
    input: 'Guest name, valid date & slot, pre-order cart',
    expected: 'Booking submitted, table slot reserved, confirmation shown',
    actual: 'As expected',
    status: 'Pass',
  },
  {
    id: 'TC-3',
    desc: 'Book appointment with missing fields',
    input: 'Empty name or no slot selected',
    expected: 'Validation message shown, form not submitted',
    actual: 'As expected',
    status: 'Pass',
  },
  {
    id: 'TC-4',
    desc: 'Book an already-booked slot',
    input: 'Valid name, previously booked slot',
    expected: 'API returns conflict error message displayed to user',
    actual: 'As expected',
    status: 'Pass',
  },
  {
    id: 'TC-5',
    desc: 'Navigate between pages',
    input: 'Click Menu, Reservations, My Bookings links',
    expected: 'Page content updates instantly via React Router, no full reload',
    actual: 'As expected',
    status: 'Pass',
  },
];

let currY = tcTop + 24;
testCasesData.forEach((tc) => {
  const rowH = 45;
  doc.rect(40, currY, 515, rowH).stroke('#CBD5E1');
  doc.fillColor(textDark).fontSize(8.5).font(fontRegular);
  doc.text(tc.id, tcColX[0], currY + 12, { width: tcColW[0], align: 'center' });
  doc.text(tc.desc, tcColX[1], currY + 8, { width: tcColW[1] });
  doc.text(tc.input, tcColX[2], currY + 8, { width: tcColW[2] });
  doc.text(tc.expected, tcColX[3], currY + 8, { width: tcColW[3] });
  doc.text(tc.actual, tcColX[4], currY + 12, { width: tcColW[4], align: 'center' });
  doc.fillColor('#16A34A').font(fontTitle).text(tc.status, tcColX[5], currY + 12, { width: tcColW[5], align: 'center' });
  currY += rowH;
});

// ==========================================
// PAGE 19: 8. CONCLUSION AND FUTURE ENHANCEMENT
// ==========================================
doc.addPage();
addMainHeader('8. CONCLUSION AND FUTURE ENHANCEMENT');

doc.fillColor(textDark).fontSize(10).font(fontRegular).lineGap(3.5);
doc.text(
  'The DineEase (Restaurant & Café Management System) is designed to simplify and improve the process of scheduling restaurant table reservations and pre-ordering meals by giving diners a fast, interactive, single-page application to view outlets, check availability, and book reservations. Traditional appointment and reservation systems often require full page reloads for every action, which can feel slow and disjointed. This system provides an effective, component-driven solution built on React JS that updates instantly as users interact with it.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'The system enables diners to browse restaurant outlets (Bukhara Royal Grill, Punjab Dhaba, Dakshin Tiffin Room, Hyderabadi Shahi Kitchen), view menu availability in real time, and schedule table reservations according to their convenience. By using React JS, JSX, React Router, React Hooks and a REST API, the system reinforces component-based architecture, props and state management, client-side routing, reusable components, multiple styling approaches, and real-time data handling.',
  { align: 'justify' }
);
doc.moveDown(0.8);
doc.text(
  'Overall, the DineEase system improves the efficiency of the dining reservation experience by reducing page reloads, reflecting availability instantly, and providing a convenient, responsive interface for both desktop and mobile users.',
  { align: 'justify' }
);

doc.moveDown(1);
doc.fillColor(primaryDark).fontSize(11).font(fontTitle).text('Future Enhancement');
doc.moveDown(0.5);

const futures = [
  '1. Centralized State Management - Introducing Redux or the Context API more extensively to manage application-wide state as the system grows in complexity.',
  '2. Authentication & Authorization - Adding secure patient and staff login using JWT-based authentication, with protected routes in React Router.',
  '3. Real-Time Notifications - Using WebSockets or a service such as Socket.io to instantly notify users of table booking confirmations or slot changes.',
  '4. Online Payment Integration - Allowing diners to pay consultation/reservation fees online at the time of booking through a payment gateway.',
  '5. Progressive Web App / Mobile App - Converting the application into a Progressive Web App or building a React Native version for easier mobile access.',
  '6. Customer Rating and Feedback Component - Adding a reusable rating/review component so diners can rate menu items and help improve service quality.',
];

futures.forEach((f) => {
  doc.fillColor(textDark).fontSize(9.5).font(fontRegular).text(f, { align: 'justify' });
  doc.moveDown(0.4);
});

doc.moveDown(0.5);
doc.text(
  'With these future improvements, the DineEase (Restaurant & Café Management System) can become a more comprehensive and advanced healthcare and hospitality scheduling platform.',
  { align: 'justify' }
);

// ==========================================
// PAGE 20: 9. REFERENCES
// ==========================================
doc.addPage();
addMainHeader('REFERENCES :--');

const refs = [
  {
    name: 'React JS – Official Documentation',
    url: 'https://react.dev',
    desc: '(For component-based architecture, JSX, hooks, props and state)',
  },
  {
    name: 'React Router',
    url: 'https://reactrouter.com',
    desc: '(For client-side routing and navigation between pages)',
  },
  {
    name: 'Axios',
    url: 'https://axios-http.com',
    desc: '(For real-time API integration and HTTP requests)',
  },
  {
    name: 'MDN Web Docs',
    url: 'https://developer.mozilla.org',
    desc: '(For JavaScript, HTML and CSS reference)',
  },
  {
    name: 'Bootstrap',
    url: 'https://getbootstrap.com',
    desc: '(For responsive styling and UI components)',
  },
  {
    name: 'W3Schools',
    url: 'https://www.w3schools.com',
    desc: '(For basic web development tutorials and examples)',
  },
];

refs.forEach((r) => {
  doc.fillColor(primaryDark).fontSize(10.5).font(fontTitle).text(r.name);
  doc.fillColor(accentBlue).fontSize(10).font(fontRegular).text(r.url);
  doc.fillColor(textDark).fontSize(9.5).font(fontOblique).text(r.desc);
  doc.moveDown(0.8);
});

doc.moveDown(0.5);
doc.fillColor(primaryDark).fontSize(10.5).font(fontTitle).text('Class notes and study materials provided by Brainware University');

doc.end();

console.log('[PDF Generator] DineEase Project Report PDF compiled successfully!');
