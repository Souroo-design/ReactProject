import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

def create_document():
    doc = docx.Document()

    # 1. PAGE BORDERS ON EVERY PAGE (w:pgBorders)
    for section in doc.sections:
        section.top_margin = Inches(0.8)
        section.bottom_margin = Inches(0.8)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)
        section.different_first_page_header_footer = True
        
        # Add Page Borders to Every Page
        sectPr = section._sectPr
        borders = parse_xml(
            f'<w:pgBorders {nsdecls("w")} w:offsetFrom="page">'
            f'  <w:top w:val="single" w:sz="12" w:space="20" w:color="0F172A"/>'
            f'  <w:left w:val="single" w:sz="12" w:space="20" w:color="0F172A"/>'
            f'  <w:bottom w:val="single" w:sz="12" w:space="20" w:color="0F172A"/>'
            f'  <w:right w:val="single" w:sz="12" w:space="20" w:color="0F172A"/>'
            f'</w:pgBorders>'
        )
        sectPr.append(borders)

        # Header / Footer
        header = section.header
        hp = header.paragraphs[0]
        hp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        hrun = hp.add_run("DINE-EASE: RESTAURANT MANAGEMENT SYSTEM")
        hrun.font.name = "Calibri"
        hrun.font.size = Pt(8.5)
        hrun.font.color.rgb = RGBColor(120, 120, 120)

        footer = section.footer
        fp = footer.paragraphs[0]
        fp.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        frun = fp.add_run("Brainware University | Dept. of Computational Sciences")
        frun.font.name = "Calibri"
        frun.font.size = Pt(8.5)
        frun.font.color.rgb = RGBColor(120, 120, 120)

    # XML helpers
    def set_cell_background(cell, fill_hex):
        shading = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
        cell._tc.get_or_add_tcPr().append(shading)

    def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
        tcPr = cell._tc.get_or_add_tcPr()
        tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
        tcPr.append(tcMar)

    def set_table_borders(table, color="CBD5E1", sz="4"):
        for row in table.rows:
            for cell in row.cells:
                tcPr = cell._tc.get_or_add_tcPr()
                borders = parse_xml(
                    f'<w:tcBorders {nsdecls("w")}>'
                    f'<w:top w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                    f'<w:bottom w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                    f'<w:left w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                    f'<w:right w:val="single" w:sz="{sz}" w:space="0" w:color="{color}"/>'
                    f'</w:tcBorders>'
                )
                tcPr.append(borders)

    # Paragraph helpers
    def add_title(text, size=18, bold=True, color=RGBColor(15, 23, 42), align=WD_ALIGN_PARAGRAPH.CENTER, space_after=6):
        p = doc.add_paragraph()
        p.alignment = align
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = 1.15
        run = p.add_run(text)
        run.bold = bold
        run.font.name = "Calibri"
        run.font.size = Pt(size)
        run.font.color.rgb = color
        return p

    def add_h1(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(12)
        p.paragraph_format.space_after = Pt(4)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = "Calibri"
        run.font.size = Pt(13)
        run.font.color.rgb = RGBColor(15, 23, 42)
        return p

    def add_h2(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(3)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text)
        run.bold = True
        run.font.name = "Calibri"
        run.font.size = Pt(11)
        run.font.color.rgb = RGBColor(30, 41, 59)
        return p

    def add_p(text, bold_prefix="", space_after=5):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(space_after)
        p.paragraph_format.line_spacing = 1.15
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        if bold_prefix:
            br = p.add_run(bold_prefix)
            br.bold = True
            br.font.name = "Calibri"
            br.font.size = Pt(10)
            br.font.color.rgb = RGBColor(15, 23, 42)
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(30, 41, 59)
        return p

    def add_bullet(text):
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(2.5)
        p.paragraph_format.line_spacing = 1.15
        r = p.add_run(text)
        r.font.name = "Calibri"
        r.font.size = Pt(10)
        r.font.color.rgb = RGBColor(30, 41, 59)
        return p

    def add_code_box(code_text, file_name=""):
        table = doc.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = table.cell(0, 0)
        set_cell_background(cell, "F8FAFC")
        set_cell_margins(cell, top=100, bottom=100, left=150, right=150)
        tcPr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:left w:val="single" w:sz="6" w:space="0" w:color="D97706"/><w:right w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/></w:tcBorders>')
        tcPr.append(borders)

        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.05
        run = p.add_run(code_text)
        run.font.name = "Consolas"
        run.font.size = Pt(8.5)
        run.font.color.rgb = RGBColor(15, 23, 42)

        if file_name:
            fp = doc.add_paragraph()
            fp.paragraph_format.space_before = Pt(2)
            fp.paragraph_format.space_after = Pt(6)
            frun = fp.add_run(f"File: {file_name}")
            frun.italic = True
            frun.font.name = "Calibri"
            frun.font.size = Pt(9)
            frun.font.color.rgb = RGBColor(100, 116, 139)

    def add_diagram_box(caption, ascii_diagram):
        table = doc.add_table(rows=1, cols=1)
        table.alignment = WD_TABLE_ALIGNMENT.CENTER
        cell = table.cell(0, 0)
        set_cell_background(cell, "F8FAFC")
        set_cell_margins(cell, top=120, bottom=120, left=150, right=150)
        tcPr = cell._tc.get_or_add_tcPr()
        borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:bottom w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:left w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/><w:right w:val="single" w:sz="4" w:space="0" w:color="CBD5E1"/></w:tcBorders>')
        tcPr.append(borders)

        p = cell.paragraphs[0]
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.line_spacing = 1.05
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        run = p.add_run(ascii_diagram)
        run.font.name = "Consolas"
        run.font.size = Pt(8)
        run.font.color.rgb = RGBColor(15, 23, 42)

        cp = doc.add_paragraph()
        cp.paragraph_format.space_before = Pt(3)
        cp.paragraph_format.space_after = Pt(8)
        cp.alignment = WD_ALIGN_PARAGRAPH.CENTER
        crun = cp.add_run(caption)
        crun.bold = True
        crun.font.name = "Calibri"
        crun.font.size = Pt(9.5)
        crun.font.color.rgb = RGBColor(15, 23, 42)

    # ==========================================
    # COVER PAGE
    # ==========================================
    doc.add_paragraph().paragraph_format.space_after = Pt(14)
    add_title("DINE-EASE:RESTAURANT MANAGEMENT SYSTEM", size=18, bold=True, color=RGBColor(15, 23, 42), space_after=4)
    add_title("A PROJECT REPORT", size=13, bold=True, color=RGBColor(217, 119, 6), space_after=12)
    add_title("SUBMITTED BY", size=11, bold=True, color=RGBColor(71, 85, 105), space_after=10)

    # Student Table
    table = doc.add_table(rows=3, cols=4)
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["Roll Number", "Registration Number", "Student Code", "Student Name"]
    for j, h in enumerate(headers):
        cell = table.cell(0, j)
        set_cell_background(cell, "F1F5F9")
        set_cell_margins(cell, top=100, bottom=100, left=120, right=120)
        p = cell.paragraphs[0]
        p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(15, 23, 42)

    data = [
        ["24103460095", "24103002876", "BWU/BCA/24/099", "REETI PAKIRA"],
        ["24103460098", "241030002879", "BWU/BCA/24/102", "SOURAJIT SANTRA"]
    ]
    for i, row in enumerate(data):
        for j, val in enumerate(row):
            cell = table.cell(i+1, j)
            set_cell_margins(cell, top=80, bottom=80, left=120, right=120)
            p = cell.paragraphs[0]
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r = p.add_run(val)
            r.font.name = "Calibri"
            r.font.size = Pt(9.5)
            if j == 3:
                r.bold = True
                r.font.color.rgb = RGBColor(15, 23, 42)
            else:
                r.font.color.rgb = RGBColor(51, 65, 85)

    set_table_borders(table, "CBD5E1", "4")

    doc.add_paragraph().paragraph_format.space_after = Pt(16)
    add_title("In partial fulfillment for the award of the degree", size=10.5, bold=False, color=RGBColor(71, 85, 105), space_after=3)
    add_title("MASTER OF COMPUTER APPLICATIONS", size=13, bold=True, color=RGBColor(15, 23, 42), space_after=2)
    add_title("IN", size=10, bold=False, color=RGBColor(71, 85, 105), space_after=2)
    add_title("DEPARTMENT OF COMPUTATIONAL SCIENCES", size=12, bold=True, color=RGBColor(15, 23, 42), space_after=20)

    # University Seal Box
    seal_table = doc.add_table(rows=1, cols=1)
    seal_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    sc = seal_table.cell(0, 0)
    set_cell_background(sc, "F8FAFC")
    set_cell_margins(sc, top=140, bottom=140, left=200, right=200)
    sp = sc.paragraphs[0]
    sp.alignment = WD_ALIGN_PARAGRAPH.CENTER
    srun1 = sp.add_run("BRAINWARE UNIVERSITY\n")
    srun1.bold = True
    srun1.font.name = "Calibri"
    srun1.font.size = Pt(12)
    srun1.font.color.rgb = RGBColor(217, 119, 6)
    srun2 = sp.add_run("[ UNIVERSITY EMBLEM / LOGO ]\nDepartment of Computational Sciences")
    srun2.font.name = "Calibri"
    srun2.font.size = Pt(9.5)
    srun2.font.color.rgb = RGBColor(71, 85, 105)
    set_table_borders(seal_table, "CBD5E1", "4")

    doc.add_paragraph().paragraph_format.space_after = Pt(16)
    add_title("BRAINWARE UNIVERSITY", size=14, bold=True, color=RGBColor(15, 23, 42), space_after=2)
    add_title("398, Ramkrishnapur Road, Barasat, North 24 Parganas, Kolkata - 700 125", size=9.5, bold=False, color=RGBColor(51, 65, 85), space_after=0)

    # ==========================================
    # ACKNOWLEDGEMENT
    # ==========================================
    doc.add_page_break()
    ack_table = doc.add_table(rows=1, cols=1)
    ack_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    ac = ack_table.cell(0, 0)
    set_cell_margins(ac, top=140, bottom=140, left=180, right=180)
    tcPr = ac._tc.get_or_add_tcPr()
    borders = parse_xml(f'<w:tcBorders {nsdecls("w")}><w:top w:val="single" w:sz="6" w:space="0" w:color="0F172A"/><w:bottom w:val="single" w:sz="6" w:space="0" w:color="0F172A"/><w:left w:val="single" w:sz="6" w:space="0" w:color="0F172A"/><w:right w:val="single" w:sz="6" w:space="0" w:color="0F172A"/></w:tcBorders>')
    tcPr.append(borders)

    ap = ac.paragraphs[0]
    ap.paragraph_format.line_spacing = 1.15
    ap.paragraph_format.space_after = Pt(8)
    ap.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

    ack_head = ap.add_run("ACKNOWLEDGEMENT\n\n")
    ack_head.bold = True
    ack_head.font.name = "Calibri"
    ack_head.font.size = Pt(13)
    ack_head.font.color.rgb = RGBColor(15, 23, 42)

    ap.add_run(
        "We would like to express our heartfelt gratitude to the Management and Faculty of Brainware University for providing us with the opportunity, guidance, and resources required to successfully complete this project. Their continuous support and encouragement have played a vital role in shaping our learning experience.\n\n"
        "We extend our sincere thanks to our esteemed project supervisor, Mr. Sourav Sandhukhan, Assistant Professor, whose constant guidance, valuable suggestions, and insightful feedback have been instrumental throughout the development of this project. His expertise, patience, and motivation helped us overcome challenges and understand the core concepts effectively.\n\n"
        "We are also deeply thankful to Dr. Jayanta Aich, Head of the Department of Computational Sciences, for providing a supportive academic environment and the necessary facilities that enabled us to complete this work successfully.\n\n"
        "Our sincere appreciation goes to all the faculty members of the Department of Computational Sciences for sharing their knowledge, advice, and encouragement during the course of our project. Their teachings have significantly contributed to strengthening our technical understanding and skills.\n\n"
        "Finally, we express our profound gratitude to our families and friends, whose constant support, understanding, and motivation inspired us to stay committed and focused during every phase of this project. Without their encouragement, this achievement would not have been possible.\n\n\n"
        "SIGNATURE:--\n"
        "REETI PAKIRA (BWU/BCA/24/099)___________________________\n"
        "SOURAJIT SANTRA (BWU/BCA/24/102)_______________________"
    )
    for r in ap.runs[1:]:
        r.font.name = "Calibri"
        r.font.size = Pt(9.5)
        r.font.color.rgb = RGBColor(30, 41, 59)

    # ==========================================
    # ABSTRACT
    # ==========================================
    doc.add_page_break()
    add_h1("ABSTRACT")
    add_p("In the modern hospitality sector, customer satisfaction relies on transparent table reservations, responsive multi-outlet exploration, and contactless payments. Traditional restaurant booking systems rely either on manual handwritten registers prone to double-bookings or rigid third-party aggregators imposing steep commissions.")
    add_p("DineEase is an enterprise-grade fullstack web application designed to unify restaurant table reservations, multi-outlet catalog exploration, dish pre-ordering, and billing settlement. Engineered on the MERN stack (MongoDB, Express.js, React 18, Node.js), DineEase introduces:")
    add_p("Multi-Restaurant Menu Explorer: Filtering outlets across culinary themes with dishes categorized by meal timings:\nBreakfast, Starters, Lunch, Snacks, Dinner, and Beverages.")
    add_p("Table Seating Atmosphere Customization: Standard, Window View, Outdoor Patio, and Private Booth seating.")
    add_p("Omnichannel Service Modes: Dine-In Table, Takeaway Pickup, and Doorstep Delivery.")
    add_p("Dual Payment Gateway: Dynamic UPI QR Code SVG generation (Google Pay, PhonePe, Paytm, BHIM) alongside Cash on Delivery / Counter.")
    add_p("Dual-Store Resilient Architecture: Automatic zero-downtime fallback to an in-memory synchronized store if MongoDB is offline.")

    # ==========================================
    # INDEX
    # ==========================================
    doc.add_page_break()
    index_table = doc.add_table(rows=10, cols=2)
    index_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    ih0 = index_table.cell(0, 0)
    ih1 = index_table.cell(0, 1)
    set_cell_background(ih0, "F1F5F9")
    set_cell_background(ih1, "F1F5F9")
    set_cell_margins(ih0, top=100, bottom=100, left=120, right=120)
    set_cell_margins(ih1, top=100, bottom=100, left=120, right=120)
    
    p0 = ih0.paragraphs[0]
    r0 = p0.add_run("INDEX            ACKNOWLEDGMENT   ABSTRACT   LIST OF FIGURE   LIST OF TABLE   LIST OF SCREENSHOTS         TITLE")
    r0.bold = True
    r0.font.name = "Calibri"
    r0.font.size = Pt(9)
    r0.font.color.rgb = RGBColor(15, 23, 42)

    p1 = ih1.paragraphs[0]
    p1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
    r1 = p1.add_run("PAGE NO")
    r1.bold = True
    r1.font.name = "Calibri"
    r1.font.size = Pt(9)
    r1.font.color.rgb = RGBColor(15, 23, 42)

    toc_rows = [
        ("1. INTRODUCTION", "1"),
        ("2. LITERATURE SURVEY", "2"),
        ("3. SYSTEM ANALYSIS AND DESIGN", "3 - 5"),
        ("4. IMPLEMENTATION", "6 - 7"),
        ("5. OUTPUT SCREENSHOT", "8 - 10"),
        ("6. SOURCE CODE", "11 - 14"),
        ("7. TESTING AND DEBUGGING", "15 - 16"),
        ("8. CONCLUSION AND FUTURE ENHANCEMENT", "17"),
        ("9. REFERENCES", "18")
    ]

    for idx, (t, pg) in enumerate(toc_rows):
        c0 = index_table.cell(idx+1, 0)
        c1 = index_table.cell(idx+1, 1)
        set_cell_margins(c0, top=80, bottom=80, left=120, right=120)
        set_cell_margins(c1, top=80, bottom=80, left=120, right=120)
        
        cp0 = c0.paragraphs[0]
        cr0 = cp0.add_run(t)
        cr0.bold = True
        cr0.font.name = "Calibri"
        cr0.font.size = Pt(9.5)
        cr0.font.color.rgb = RGBColor(30, 41, 59)

        cp1 = c1.paragraphs[0]
        cp1.alignment = WD_ALIGN_PARAGRAPH.RIGHT
        cr1 = cp1.add_run(pg)
        cr1.bold = True
        cr1.font.name = "Calibri"
        cr1.font.size = Pt(9.5)
        cr1.font.color.rgb = RGBColor(217, 119, 6)

    set_table_borders(index_table, "CBD5E1", "4")

    # ==========================================
    # 1. INTRODUCTION
    # ==========================================
    doc.add_page_break()
    add_h1("1. INTRODUCTION")
    add_h2("1.1 Background & Motivation")
    add_p("The food service industry is undergoing rapid digital modernization. Traditional dining environments suffer from high table reservation collision rates, front-desk telephone bottlenecks, and disjointed ordering workflows where patrons spend excessive time waiting for menus and meal preparation after being seated. DineEase eliminates these inefficiencies through an automated, responsive web-based platform bridging diners and restaurant managers.")

    add_h2("1.2 Purpose & Scope")
    add_p("The DineEase portal provides a responsive single-page application (SPA) allowing diners to: (1) Browse partner restaurants, (2) Filter dishes across meal timing slots (Breakfast, Starters, Lunch, Snacks, Dinner, Beverages), (3) Select specific physical table atmospheres (Window, Patio, Booth), (4) Choose service channels (Dine-In, Takeaway, Delivery), and (5) Settle payments seamlessly via Dynamic UPI QR Code Scan or Cash on Delivery.")

    add_h2("1.3 Technological Stack Overview")
    add_p("Client Tier: React 18, Vite Bundler, React Router v6, Tailwind CSS, Lucide Icons, Axios.")
    add_p("Application Server Tier: Node.js (v20+), Express.js (v4.21), RESTful JSON Endpoints.")
    add_p("Security Tier: JSON Web Tokens (JWT), Bcrypt.js, Helmet, CORS, Express Rate Limiter.")
    add_p("Data Tier: MongoDB (NoSQL) & Mongoose ODM (v8.9), with in-memory dual-store failover engine.")

    # ==========================================
    # 2. LITERATURE SURVEY
    # ==========================================
    doc.add_page_break()
    add_h1("2. LITERATURE SURVEY")
    add_p("The development of web-based restaurant reservation and food management applications has gained significant importance with the rapid expansion of digital lifestyle platforms and modern food-service automation. Online dining systems provide an effective method for discovering restaurants, browsing menus, reserving tables in advance, and avoiding long waiting times during peak rush hours. Various hospitality platforms and aggregator applications use web-based booking systems to make dining more organized and convenient for both customers and restaurant staff.")
    add_p("Traditional restaurant management methods generally depend on physical register books, landline phone calls, and manual paper billing. Although these methods are simple to implement, they require additional time and effort for recording customer details, checking table availability, and managing orders. Physical registers are also prone to human errors such as double bookings, lost reservation details, and confusion during peak dining hours. Online restaurant management systems overcome many of these limitations by automating table allocations, displaying available time slots, and updating order records immediately without requiring manual logbooks.")
    add_p("Several existing food delivery and table booking platforms provide restaurant discovery and order features. These systems commonly include restaurant listings, categorized food menus, cart management, and online payment options. Some advanced platforms also provide features such as user accounts, rating and reviews, real-time table tracking, promotional offers, and digital receipts. These features demonstrate how modern web technologies can be effectively used to build interactive hospitality applications.")
    add_p("Modern web development technologies have made it easier to develop responsive and interactive restaurant applications. HTML and modern JSX components provide the basic structure of the application, while CSS and utility frameworks like Tailwind CSS are used to create an attractive, modern, and responsive user interface. JavaScript and modern libraries like React provide dynamic functionality, such as filtering dishes by meal categories (Breakfast, Starters, Lunch, Snacks, Dinner), selecting table atmospheres (Window, Patio, Booth), pre-ordering food items, calculating bills dynamically, and rendering dynamic UPI QR codes for payment.")
    add_p("A review of existing dining applications shows that a good restaurant portal should have a clean interface, clear navigation, properly organized food categories, and a simple checkout system. User experience is an important factor because complicated checkout steps or slow menu loading can cause customer frustration. Therefore, the proposed DineEase application focuses on maintaining a clean, responsive, and user-friendly design.")
    add_p("Existing systems also show that meal timing categorization and atmosphere preferences can greatly improve the usefulness of a dining platform. Segmenting food items into Breakfast, Starters, Lunch, Snacks, and Dinner makes it easy for diners to find the right dish quickly according to the time of day. Providing options for seating atmosphere like Window View, Outdoor Patio, or Private Booth allows customers to personalize their dining experience.")
    add_p("From the study of existing systems and web technologies, it can be concluded that a web-based restaurant management application can provide a convenient and efficient alternative to traditional manual dining workflows. The proposed DineEase Application applies these concepts to create a simple, responsive, and interactive platform for table reservations, menu exploration, and contactless payments.")

    # ==========================================
    # 3. SYSTEM ANALYSIS AND DESIGN
    # ==========================================
    doc.add_page_break()
    add_h1("3. SYSTEM ANALYSIS AND DESIGN")
    add_p("The System Analysis and Design section explains how the DineEase Restaurant Management Application works and what is required to develop it. Before developing the application, the requirements of a modern dining and reservation system were studied. Based on this analysis, the application was designed to allow users to explore partner restaurants, filter dishes across meal times, reserve tables with atmosphere preferences, pre-order food, choose delivery or dine-in modes, and complete payments using dynamic UPI QR codes or cash.")

    add_h2("3.1 System Analysis")
    add_p("System analysis helps to understand the requirements of the Restaurant Management Application and the problems that can occur in a normal dining system.")
    add_p("Existing System: In a traditional restaurant workflow, table reservations are made by phone calls or direct walk-ins. Hostesses record names and party sizes in paper diaries. Menus are handed out physically after customers sit down, and bills are calculated on paper or separate standalone billing machines. Kitchen orders are verbally communicated or manually written on paper KOT slips.")

    add_h2("Problems in the Existing System:")
    add_p("Manual register books can cause accidental double-booked tables during peak hours")
    add_p("Diners spend 20 to 30 minutes waiting for food preparation after being seated")
    add_p("Customers cannot preview or choose table atmosphere (such as Window View or Outdoor Patio)")
    add_p("Menus are not organized by meal timing slots (Breakfast, Snacks, Lunch, Dinner)")
    add_p("Customers cannot see real-time booking confirmation or order status")
    add_p("Manual bill calculation can lead to arithmetic mistakes")
    add_p("Heavy third-party delivery apps charge 18% to 30% commission fees on every order")
    add_p("If the computer or network disconnects, traditional cloud software crashes completely")

    add_h2("Proposed System:")
    add_p("To solve these problems, we developed DineEase: Restaurant Management System using React 18, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB. In this application, the user can browse multiple restaurants and view menus categorized into Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages. Diners can select food items, choose their preferred seating atmosphere (Standard, Window, Patio, Private Booth), pick service mode (Dine-In, Takeaway, Doorstep Delivery), and complete their booking with an instant Dynamic UPI QR Code scan or Cash on Delivery / Counter. The application also provides an administrative operations dashboard where restaurant staff can view real-time reservation requests, see total revenue metrics, track customer table statuses, and manage menu inventory.")

    add_h2("Advantages of the Proposed System:")
    add_p("Eliminates double-booking and paper register errors")
    add_p("Saves customer waiting time through advance food pre-ordering")
    add_p("Categorizes menus cleanly into Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages")
    add_p("Allows customers to select their preferred table atmosphere (Window, Patio, Booth, Standard)")
    add_p("Supports flexible service channels: Dine-In, Takeaway, and Doorstep Delivery")
    add_p("Provides an instant Dynamic UPI QR Code for contactless payments with GPay, PhonePe, Paytm, and BHIM")
    add_p("Supports Cash on Delivery / Pay at Counter for non-digital payments")
    add_p("Features a resilient dual-store architecture with automatic in-memory fallback if MongoDB is offline")

    add_diagram_box(
        "Fig. 3.1 – Module and Data Flow Diagram",
        "+-----------------------------------------------------------------------------------------+\n"
        "| [Start] -> [Browse Restaurants] -> [Select Meal Tab] -> [Pick Table Atmosphere]         |\n"
        "|               (Home/Menu)         (Breakfast/Snacks)      (Window/Patio/Booth)          |\n"
        "|                     |                                             |                     |\n"
        "|                     v                                             v                     |\n"
        "|        [Add Dishes to Pre-Order Cart] <---------------------------+                     |\n"
        "|                     |                                                                   |\n"
        "|                     v                                                                   |\n"
        "|     [Select Service Mode: Dine-In / Takeaway / Delivery]                                |\n"
        "|                     |                                                                   |\n"
        "|                     v                                                                   |\n"
        "|     [Choose Payment Mode: Dynamic UPI QR Scan vs. Cash on Arrival]                      |\n"
        "|                     |                                                                   |\n"
        "|                     v                                                                   |\n"
        "|  [Confirm Booking] -> [Save to MongoDB / Mock DB] -> [Admin Live Dashboard] -> [End]    |\n"
        "+-----------------------------------------------------------------------------------------+"
    )

    add_h2("3.2 System Design")
    add_p("The system design explains the different parts of the DineEase Application and how they work together.")
    add_p("Modules of the System:\n"
          "1. User Details Module: Handles customer & admin registration, login, and JWT claims.\n"
          "2. Menu Explorer & Meal Module: Displays outlets with dishes filtered across Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages.\n"
          "3. Table Reservation & Atmosphere Module: 4-step wizard with seating selection (Standard, Window, Patio, Booth).\n"
          "4. Dual Payment & Service Mode Module: Generates Dynamic UPI QR Code SVG and supports Cash on Delivery.\n"
          "5. Admin Dashboard Module: Live order queue, occupancy metrics, and table lifecycle management.")

    add_h2("System Flow")
    add_p("The working flow of the application is:")
    add_p("Home Page -> Select Restaurant -> Browse Meal Category (Breakfast/Snacks/Lunch/Dinner) -> Choose Table Atmosphere -> Add Food to Cart -> Select Service Mode -> Pay via UPI QR / Cash -> Booking Confirmed -> Admin Live Update.")

    add_h2("Technologies Used:")
    add_p("HTML / React 18: Used to create the reactive component structure of all the pages.")
    add_p("CSS / Tailwind CSS: Used to design the dark-mode layout, buttons, forms, meal tabs, cards, and modal dialogs.")
    add_p("JavaScript / Node.js & Express.js: Used to make the application interactive, handle API routes, session tokens, dynamic UPI QR calculations, and database operations.")

    add_diagram_box(
        "Fig. 3.2 – Component Architecture Diagram",
        "+-----------------------------------------------------------------------------------------+\n"
        "|                            User / Browser (Students / Guests)                            |\n"
        "|    [ HomePage.jsx ]   [ MenuPage.jsx ]   [ ReservationPage.jsx ]   [ PaymentModal.jsx ] |\n"
        "|                                     |                                                   |\n"
        "|                                     v                                                   |\n"
        "|                          [ Tailwind CSS Framework ]                             |\n"
        "|                                     |                                                   |\n"
        "|                                     v                                                   |\n"
        "|                      [ Axios Client Interceptor (Port 5000) ]                           |\n"
        "|                                     |                                                   |\n"
        "|                                     v                                                   |\n"
        "|                   [ Node.js / Express.js Application Server ]                           |\n"
        "|                                     |                                                   |\n"
        "|                    +----------------+----------------+                                  |\n"
        "|                    v                                 v                                  |\n"
        "|       [ Primary: MongoDB Database ]         [ Fail-Safe: In-Memory Mock Store ]         |\n"
        "+-----------------------------------------------------------------------------------------+"
    )

    # ==========================================
    # 4. IMPLEMENTATION
    # ==========================================
    doc.add_page_break()
    add_h1("4. IMPLEMENTATION")
    add_p("The implementation part explains how we developed the DineEase Restaurant Management Application. We used React 18, Tailwind CSS, Node.js, Express.js, and MongoDB to develop the complete system.")
    add_p("First, we created the Home Page using React and Tailwind CSS. The page contains a top navigation bar with brand identity, quick links to \"Explore Menu\", \"Book Table\", \"My Bookings\", and authentication buttons. The hero section features an engaging heading, action buttons, and operational guarantee badges (Instant Confirmation, Zero Booking Fee, 100% Contactless).")
    add_p("Next, we implemented the Menu Exploration Page (MenuPage.jsx). When the user clicks on a partner restaurant (such as Urban Bistro or Grand Heritage), the application updates the URL query string using React Router's useSearchParams hook (/menu?restaurant=Urban+Bistro). This ensures that browser back and forward buttons work correctly. We organized the menu items into six dedicated tabs: Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages & Sweets. When the user clicks on any tab, React dynamically filters and displays the food items for that specific meal category. We also added Vegetarian and Non-Vegetarian toggle switches that filter dishes instantly using React's useMemo hook without requiring extra server reloads.")
    add_p("For table reservations, we built a 4-step booking wizard (ReservationPage.jsx):")
    add_p("In Step 1, the user selects the dining date, time slot, and party size (from 1 to 20 guests).")
    add_p("In Step 2, the user chooses their desired Table Seating Atmosphere: Standard Dining, Window View, Outdoor Patio, or Private Booth.")
    add_p("In Step 3, the food pre-ordering cart allows customers to attach dishes selected from the menu.")
    add_p("In Step 4, the user chooses their Service Mode: Dine-In Table, Takeaway Pickup, or Doorstep Delivery (with address input).")
    add_p("To handle payments, we created an interactive Payment Modal (PaymentModal.jsx). The modal gives the customer two primary payment options:")
    add_p("Dynamic UPI QR Code: Generates an authentic SVG QR Code encoded with UPI deep-link data (upi://pay?pa=dineease.orders@okaxis&am=TOTAL). Diners can scan using Google Pay, PhonePe, Paytm, or BHIM.")
    add_p("Cash on Arrival: Customers can choose to pay with physical cash directly to the restaurant server or delivery agent.")

    add_diagram_box(
        "Fig. 4.1 – Data Model for DineEase Application (Browser Local State, MongoDB & REST API)",
        "+-----------------------------------------------------------------------------------------+\n"
        "| [User Session]  ------>  [Menu Items Data]  ------>  [Table & Atmosphere Cart]          |\n"
        "| (JWT in Storage)        (Categorized dishes)         (Date, Time, Window/Patio)         |\n"
        "|                                                                 |                       |\n"
        "|                                                                 v                       |\n"
        "| [Customer Receipt View] <---- [Confirmed Order & Payment] <-----+                       |\n"
        "| (History: Status Pills)       (orderType, totalAmount, paymentStatus: 'completed'/'cash')|\n"
        "+-----------------------------------------------------------------------------------------+"
    )

    # ==========================================
    # 5. OUTPUT SCREENSHOT
    # ==========================================
    doc.add_page_break()
    add_h1("5. OUTPUT SCREENSHOT")
    add_p("The screenshots below show the different pages of the developed DineEase Restaurant Management Application. These screenshots demonstrate the complete working flow of the application, starting from the landing page, exploring meal-categorized menus, selecting seating atmosphere, choosing payment mode, and tracking orders.")

    add_h2("5.1 :- Home Page")
    add_p("The Home Page is the starting page of the DineEase Application. It introduces the platform with a modern dark theme and warm amber culinary highlights.")
    add_diagram_box("Fig. 5.1  DineEase Home Page",
        "+-----------------------------------------------------------------------------------------+\n"
        "| DineEase                Explore Menu    Book Table    My Bookings    [Sign In] [Register]|\n"
        "|                                                                                         |\n"
        "|   DISCOVER EXCEPTIONAL DINING & EFFORTLESS RESERVATIONS                                 |\n"
        "|   Experience culinary excellence. Pre-order your meals & select your table atmosphere.  |\n"
        "|                                                                                         |\n"
        "|   [ Reserve Your Table Now ]          [ Explore Restaurants ]                           |\n"
        "|   (v) Instant Confirmation     (v) Zero Booking Fee     (v) 100% Contactless UPI        |\n"
        "+-----------------------------------------------------------------------------------------+"
    )

    add_h2("5.2 :- Restaurant Menu & Meal Categories Page")
    add_p("The Menu Page displays partner restaurant outlets and their categorized food items (Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages & Sweets).")
    add_diagram_box("Fig. 5.2  Restaurant Menu & Meal Categories Page",
        "+-----------------------------------------------------------------------------------------+\n"
        "| URBAN BISTRO | Sector V, Salt Lake, Kolkata | Rating: 4.8 * | Hours: 8:00 AM - 11:30 PM  |\n"
        "| [ Breakfast ]  [ Starters ]  [ Lunch ]  [ * Snacks ]  [ Dinner ]  [ Beverages & Sweets ]|\n"
        "| [x] Vegetarian Only Switch                                         Search: [           ]|\n"
        "| +--------------------------+  +--------------------------+  +--------------------------+|\n"
        "| | Samosa & Chai Platter    |  | Loaded Cheesy Nachos     |  | Kolkata Kathi Roll       ||\n"
        "| | (Veg) | Prep: 10 mins    |  | (Veg) | Prep: 15 mins    |  | (Non-Veg) | Prep: 12 min ||\n"
        "| | Rs 160                   |  | Rs 240                   |  | Rs 180                   ||\n"
        "| | [ -  1  + ] Add to Order |  | [ Add to Pre-Order ]     |  | [ Add to Pre-Order ]     ||\n"
        "| +--------------------------+  +--------------------------+  +--------------------------+|\n"
        "+-----------------------------------------------------------------------------------------+"
    )

    add_h2("5.3 :- Table Reservation & Seating Atmosphere Page")
    add_p("Illustrates Step 2 of the booking wizard with options for Standard Seating, Window View, Outdoor Patio, and Private Booth.")
    add_diagram_box("Fig. 5.3  Table Reservation & Seating Atmosphere Page",
        "+-----------------------------------------------------------------------------------------+\n"
        "| RESERVE A TABLE AT URBAN BISTRO                                                         |\n"
        "| Step 1: Party & Time  ---  (Step 2: Atmosphere)  ---  Step 3: Food Cart  --- Step 4: Pay|\n"
        "| Choose Your Table Seating Atmosphere:                                                   |\n"
        "| +---------------------------+  +---------------------------+                            |\n"
        "| | [x] WINDOW VIEW           |  | [ ] OUTDOOR PATIO         |                            |\n"
        "| | Scenic street/skyline     |  | Open-air garden terrace   |                            |\n"
        "| +---------------------------+  +---------------------------+                            |\n"
        "| +---------------------------+  +---------------------------+                            |\n"
        "| | [ ] STANDARD DINING       |  | [ ] PRIVATE BOOTH         |                            |\n"
        "| | Central dining floor      |  | Intimate acoustic booth   |                            |\n"
        "| +---------------------------+  +---------------------------+                            |\n"
        "| [ Back: Step 1 ]                                        [ Continue: Pre-Order Food -> ] |\n"
        "+-----------------------------------------------------------------------------------------+"
    )

    add_h2("5.4 :- Dynamic UPI QR Code & Cash Payment Modal")
    add_p("Illustrates the checkout modal showing total bill, dynamic UPI QR SVG code, and Cash on Arrival selector.")
    add_diagram_box("Fig. 5.4  Payment Gateway Modal with UPI QR & Cash",
        "+-------------------------------------------------------------+\n"
        "| COMPLETE YOUR PAYMENT                                  (X)  |\n"
        "| Total Amount Payable: Rs 400                                |\n"
        "| [ (*) UPI Dynamic QR Code ]        [ ( ) Cash on Arrival ]  |\n"
        "|                                                             |\n"
        "|           +-----------------------------+                   |\n"
        "|           |   ######  ##  ######  ###   |                   |\n"
        "|           |   #    #  ##  #    #  ###   |  <- Dynamic QR    |\n"
        "|           |   ######  ##  ######  ###   |     SVG Code      |\n"
        "|           +-----------------------------+                   |\n"
        "| Scan with Google Pay, PhonePe, Paytm, or BHIM UPI           |\n"
        "| UPI ID: dineease.orders@okaxis      [Copy UPI ID]           |\n"
        "| [ Simulate Payment Confirmation (Rs 400) ]                  |\n"
        "+-------------------------------------------------------------+"
    )

    add_h2("5.5 :- Customer Bookings Tracking Page")
    add_p("Renders customer reservation records with status pills (Confirmed, Seated, Cancelled) and payment details.")
    add_diagram_box("Fig. 5.5  Customer Bookings Tracking Page",
        "+-----------------------------------------------------------------------------------------+\n"
        "| MY RESERVATIONS & ORDERS                                                                |\n"
        "| +-------------------------------------------------------------------------------------+ |\n"
        "| | URBAN BISTRO                    [ Status: Confirmed (Green) ] [ Mode: Dine-In Table]| |\n"
        "| | Date: Tomorrow, 7:30 PM  | Guests: 4 People | Seating: Window View                  | |\n"
        "| | Pre-Ordered: 1x Samosa & Chai Platter, 1x Loaded Nachos (Total: Rs 400)             | |\n"
        "| | Payment: Paid via UPI QR Scan (ID: TXN-QR-582914)  |  Payment Status: Completed     | |\n"
        "| +-------------------------------------------------------------------------------------+ |\n"
        "+-----------------------------------------------------------------------------------------+"
    )

    # ==========================================
    # 6. SOURCE CODE
    # ==========================================
    doc.add_page_break()
    add_h1("6. SOURCE CODE")
    add_p("The following selected source-code excerpts illustrate the main functions of the DineEase Restaurant Management Application, including server bootstrapping, Mongoose data schemas, resilient controller logic, menu category filtering, and the dynamic UPI QR payment modal.")

    add_h2("6.1  server.js (Server Setup & Middleware)")
    add_p("This function sets up the Express application, applies security middlewares, and mounts API endpoints.")
    add_code_box(
        "import express from 'express';\n"
        "import cors from 'cors';\n"
        "import helmet from 'helmet';\n"
        "import dotenv from 'dotenv';\n"
        "import connectDB from './config/db.js';\n"
        "import authRoutes from './routes/auth.routes.js';\n"
        "import menuRoutes from './routes/menu.routes.js';\n"
        "import reservationRoutes from './routes/reservation.routes.js';\n\n"
        "dotenv.config();\n"
        "const app = express();\n"
        "const PORT = process.env.PORT || 5000;\n"
        "connectDB();\n\n"
        "app.use(helmet());\n"
        "app.use(cors({ origin: 'http://localhost:5173', credentials: true }));\n"
        "app.use(express.json());\n"
        "app.use('/api/auth', authRoutes);\n"
        "app.use('/api/menu', menuRoutes);\n"
        "app.use('/api/reservations', reservationRoutes);\n\n"
        "app.listen(PORT, () => console.log('Server running on port ' + PORT));",
        "server/src/server.js"
    )

    add_h2("6.2  Reservation.js (Mongoose Schema with Atmosphere & Payment)")
    add_p("This schema defines the fields for table preferences, service delivery modes, pre-ordered food items, and dual payment methods.")
    add_code_box(
        "import mongoose from 'mongoose';\n\n"
        "const reservationSchema = new mongoose.Schema({\n"
        "  customerName: { type: String, required: true },\n"
        "  customerEmail: { type: String, required: true },\n"
        "  customerPhone: { type: String, required: true },\n"
        "  restaurant: { type: String, default: 'Grand Heritage Restaurant' },\n"
        "  tablePreference: {\n"
        "    type: String,\n"
        "    enum: ['Standard', 'Window', 'Outdoor Patio', 'Private Booth'],\n"
        "    default: 'Standard'\n"
        "  },\n"
        "  orderType: {\n"
        "    type: String,\n"
        "    enum: ['Dine-In Table', 'Takeaway Pickup', 'Doorstep Delivery'],\n"
        "    default: 'Dine-In Table'\n"
        "  },\n"
        "  deliveryAddress: { type: String, default: '' },\n"
        "  date: { type: String, required: true },\n"
        "  timeSlot: { type: String, required: true },\n"
        "  guests: { type: Number, required: true, min: 1, max: 20 },\n"
        "  preOrderedItems: [{ name: String, price: Number, quantity: Number }],\n"
        "  totalAmount: { type: Number, default: 0 },\n"
        "  paymentMethod: { type: String, default: 'Pay at Restaurant' },\n"
        "  paymentStatus: { type: String, default: 'pending' },\n"
        "  status: { type: String, default: 'Pending' }\n"
        "}, { timestamps: true });\n\n"
        "export default mongoose.model('Reservation', reservationSchema);",
        "server/src/models/Reservation.js"
    )

    add_h2("6.3  reservation.controller.js (Creating Reservation with In-Memory Failover)")
    add_p("This controller handles reservation persistence with an automatic failover to an in-memory mock store if MongoDB is offline.")
    add_code_box(
        "import Reservation from '../models/Reservation.js';\n"
        "import { mockReservations } from './mockStore.js';\n\n"
        "export const createReservation = async (req, res) => {\n"
        "  try {\n"
        "    const reservationData = { ...req.body, status: 'Confirmed' };\n"
        "    try {\n"
        "      const reservation = await Reservation.create(reservationData);\n"
        "      return res.status(201).json({ success: true, data: reservation });\n"
        "    } catch (dbErr) {\n"
        "      console.warn('MongoDB offline. Using in-memory store.');\n"
        "      const mockRecord = { _id: 'mock-' + Date.now(), ...reservationData, createdAt: new Date() };\n"
        "      mockReservations.unshift(mockRecord);\n"
        "      return res.status(201).json({ success: true, data: mockRecord });\n"
        "    }\n"
        "  } catch (error) {\n"
        "    res.status(500).json({ success: false, message: error.message });\n"
        "  }\n"
        "};",
        "server/src/controllers/reservation.controller.js"
    )

    add_h2("6.4  MenuPage.jsx (Menu Filtering & Tabs)")
    add_p("This component synchronizes restaurant selections with URL parameters and filters dishes by Breakfast, Starters, Lunch, Snacks, Dinner, and Beverages.")
    add_code_box(
        "const MEAL_TABS = ['All', 'Breakfast', 'Starters', 'Lunch', 'Snacks', 'Dinner', 'Beverages & Sweets'];\n\n"
        "export default function MenuPage() {\n"
        "  const [searchParams] = useSearchParams();\n"
        "  const selectedRestaurant = searchParams.get('restaurant') || 'All';\n"
        "  const [activeMealType, setActiveMealType] = useState('All');\n"
        "  const [vegOnly, setVegOnly] = useState(false);\n\n"
        "  const filteredItems = useMemo(() => {\n"
        "    return menuItems.filter(item => {\n"
        "      const matchRest = selectedRestaurant === 'All' || item.restaurant === selectedRestaurant;\n"
        "      const matchMeal = activeMealType === 'All' || item.mealType === activeMealType;\n"
        "      const matchVeg = !vegOnly || item.dietary?.isVeg;\n"
        "      return matchRest && matchMeal && matchVeg;\n"
        "    });\n"
        "  }, [menuItems, selectedRestaurant, activeMealType, vegOnly]);\n"
        "  // Render tabs and dishes...\n"
        "}",
        "client/src/pages/MenuPage.jsx"
    )

    add_h2("6.5  PaymentModal.jsx (Dynamic UPI QR Code & Cash)")
    add_p("This component displays an interactive modal where customers can pay using an authentic Dynamic UPI QR Code SVG or choose Cash on Arrival.")
    add_code_box(
        "export default function PaymentModal({ isOpen, onClose, totalAmount, onPaymentSuccess }) {\n"
        "  const [selectedMethod, setSelectedMethod] = useState('qr');\n"
        "  const [isProcessing, setIsProcessing] = useState(false);\n"
        "  if (!isOpen) return null;\n\n"
        "  const vpa = 'dineease.orders@okaxis';\n"
        "  const upiLink = 'upi://pay?pa=' + vpa + '&pn=DineEase&am=' + totalAmount + '&cu=INR';\n"
        "  const qrSvg = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(upiLink);\n\n"
        "  const handlePayment = () => {\n"
        "    setIsProcessing(true);\n"
        "    setTimeout(() => {\n"
        "      setIsProcessing(false);\n"
        "      onPaymentSuccess({\n"
        "        paymentMethod: selectedMethod === 'qr' ? 'QR Code Scan' : 'Cash',\n"
        "        paymentStatus: selectedMethod === 'qr' ? 'completed' : 'cash_on_delivery',\n"
        "        transactionId: 'TXN-' + selectedMethod.toUpperCase() + '-' + Math.floor(100000 + Math.random() * 900000)\n"
        "      });\n"
        "      onClose();\n"
        "    }, 1200);\n"
        "  };\n"
        "  // Render Modal UI with QR code...\n"
        "}",
        "client/src/components/PaymentModal.jsx"
    )

    add_h2("End of Source Code Section")
    add_p("These selected excerpts explain the main implementation. React defines the page structure and reactive state, Express manages API routing and authentication, and MongoDB with in-memory fallback stores application data reliably.")

    # ==========================================
    # 7. TESTING AND DEBUGGING
    # ==========================================
    doc.add_page_break()
    add_h1("7. TESTING AND DEBUGGING")
    add_h2("Introduction")
    add_p("Testing and debugging are important stages in the development of a web-based application. Testing is performed to verify that the application works correctly according to the project requirements, while debugging is the process of identifying and correcting errors in the code. These processes help improve the reliability, functionality, and user experience of the application.")
    add_p("In the DineEase Restaurant Management Application project, testing and debugging were carried out to ensure that the website functions properly, displays partner restaurants and categorized menus correctly, accepts table bookings with seating atmosphere choices, calculates bills accurately, generates dynamic UPI QR codes, and updates order statuses in real time. The application was checked for errors in its structure, design, database persistence, and network resilience.")

    add_h2("Types of Testing")
    add_h2("1. Functional Testing")
    add_p("Functional testing was performed to verify that the main features of DineEase work as expected. The Restaurant selection, Meal Category tabs (Breakfast, Starters, Lunch, Snacks, Dinner), 4-step reservation wizard, atmosphere selector (Window, Patio, Booth, Standard), and checkout modal were checked to confirm each feature performs its intended function.")
    
    add_h2("2. User Interface Testing")
    add_p("User interface testing was conducted to check the appearance and layout of the application. The colors, culinary dark-mode aesthetics, fonts, buttons, dish cards, modal dialogs, and responsive spacing were examined to ensure the interface is clear, modern, and easy to use.")
    
    add_h2("3. Navigation Testing")
    add_p("Navigation testing was performed to ensure that users can move through the platform without difficulty. The URL query parameter routing (/menu?restaurant=Urban+Bistro), wizard step navigation (Next, Back), and browser history back-forward buttons were checked.")
    
    add_h2("4. Score / Payment Calculation Testing")
    add_p("Calculation testing was carried out to verify that item quantities, sub-totals, and total bills are calculated accurately. Dynamic UPI QR code links were verified to confirm that the exact payable amount is encoded correctly into the QR SVG.")
    
    add_h2("5. Compatibility Testing")
    add_p("Compatibility checks were carried out across Google Chrome, Mozilla Firefox, and Microsoft Edge browsers to verify that the application displays and operates consistently.")
    
    add_h2("6. Responsive Testing")
    add_p("Responsive layout checks were carried out across different screen sizes including desktop monitors, tablets, and mobile devices to verify readable and usable layouts.")

    add_h2("Overall Conclusion")
    add_p("Testing and debugging help ensure that the DineEase Application performs its intended functions correctly and provides a satisfactory user experience. By checking the interface, navigation, meal category filtering, atmosphere selection, bill calculation, and payment processing, potential errors were identified and corrected. These processes improve the overall quality, usability, and reliability of the application.")
    add_p("The testing and debugging phase also provided practical experience in identifying web programming errors, correcting asynchronous API code, and maintaining the functionality of a full-stack MERN application.")

    add_h2("TEST CASES:--")
    tc_table = doc.add_table(rows=13, cols=6)
    tc_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    tc_headers = ["Test Case ID", "Input", "Test Description", "Expected Result", "Actual Output", "Status"]
    for j, h in enumerate(tc_headers):
        c = tc_table.cell(0, j)
        set_cell_background(c, "F1F5F9")
        set_cell_margins(c, top=80, bottom=80, left=80, right=80)
        p = c.paragraphs[0]
        r = p.add_run(h)
        r.bold = True
        r.font.name = "Calibri"
        r.font.size = Pt(8.5)
        r.font.color.rgb = RGBColor(15, 23, 42)

    tc_data = [
        ["TC01", "Application URL", "Open DineEase in browser.", "Home page loads with hero.", "As expected", "Pass"],
        ["TC02", "Explore Menu", "Click Explore Menu button.", "Restaurants & dishes appear.", "As expected", "Pass"],
        ["TC03", "Select Restaurant", "Click Urban Bistro card.", "URL updates & filters menu.", "As expected", "Pass"],
        ["TC04", "Select Snacks Tab", "Click Snacks meal tab.", "Only snacks dishes displayed.", "As expected", "Pass"],
        ["TC05", "Veg Only Switch", "Toggle Vegetarian switch.", "Non-veg dishes filtered out.", "As expected", "Pass"],
        ["TC06", "Table Atmosphere", "Select Window View in Step 2.", "Atmosphere set to Window.", "As expected", "Pass"],
        ["TC07", "Food Cart in Step 3", "Add dishes to order cart.", "Subtotal updates accurately.", "As expected", "Pass"],
        ["TC08", "Doorstep Delivery", "Choose Delivery mode.", "Address input field appears.", "As expected", "Pass"],
        ["TC09", "Dynamic UPI QR", "Open modal for Rs 400 order.", "UPI QR SVG generated.", "As expected", "Pass"],
        ["TC10", "Cash on Arrival", "Select Cash on Arrival mode.", "Order saved as cash_on_delivery.", "As expected", "Pass"],
        ["TC11", "Customer History", "Open /reservations page.", "Order receipt & badges rendered.", "As expected", "Pass"],
        ["TC12", "DB Offline Fallback", "Stop MongoDB & book table.", "Saved to in-memory store cleanly.", "As expected", "Pass"]
    ]

    for i, row in enumerate(tc_data):
        for j, val in enumerate(row):
            c = tc_table.cell(i+1, j)
            set_cell_margins(c, top=60, bottom=60, left=60, right=60)
            p = c.paragraphs[0]
            r = p.add_run(val)
            r.font.name = "Calibri"
            r.font.size = Pt(8)
            if j == 0 or j == 5:
                r.bold = True
            if j == 5:
                r.font.color.rgb = RGBColor(5, 150, 105)
            else:
                r.font.color.rgb = RGBColor(51, 65, 85)

    set_table_borders(tc_table, "CBD5E1", "4")

    # ==========================================
    # 8. CONCLUSION AND FUTURE ENHANCEMENT
    # ==========================================
    doc.add_page_break()
    add_h1("8. CONCLUSION AND FUTURE ENHANCEMENT")
    add_p("The DineEase: Restaurant Management System is a full-stack web application developed as part of the Web Development curriculum to provide an interactive, convenient, and reliable platform for dining reservations, multi-outlet menu exploration, and contactless billing. The main purpose of this project is to eliminate customer waiting times, prevent double-bookings, and streamline restaurant dining operations.")
    add_p("The project demonstrates the practical implementation of modern web development technologies including React 18, Vite, Tailwind CSS, Node.js, Express.js, and MongoDB. React is used to create dynamic single-page components and responsive state management; Tailwind CSS is used to design a clean culinary user interface; Node.js and Express manage RESTful API endpoints; and MongoDB alongside an in-memory fallback store provides robust data persistence. The integration of these technologies creates a fully functional, fault-tolerant, and visually appealing web application.")
    add_p("The application allows users to explore partner restaurants, filter dishes across meal times (Breakfast, Starters, Lunch, Snacks, Dinner, Beverages), reserve tables with personalized seating atmospheres (Window View, Outdoor Patio, Private Booth), choose service channels (Dine-In, Takeaway, Doorstep Delivery), and settle payments via Dynamic UPI QR Code or Cash.")
    add_p("This group project has also provided valuable practical experience in full-stack web engineering, database schema design, asynchronous REST API integration, testing, and debugging. Working collaboratively as a team has helped us understand the importance of coordination, task distribution, and teamwork in completing a software development project successfully.")
    add_p("Overall, the DineEase Application successfully demonstrates how modern web technologies can be used to digitize hospitality management. The project has helped us improve our technical knowledge and practical skills while understanding the basic process of designing, developing, and testing an enterprise-grade full-stack web application.")

    add_h2("Future Enhancement")
    add_p("Although the current DineEase Application provides complete reservation, ordering, and payment functionality, several additional features can be implemented in the future to improve its usability, performance, and overall capabilities:")
    add_p("1. Real-Time WebSocket Kitchen Display System (KDS):\nIntegrating Socket.io to stream incoming table pre-orders directly to kitchen line monitors with zero latency.")
    add_p("2. Multiple Restaurant Outlets & Meal Categories Expansion:\nDifferent partner outlets and extended culinary branches can be onboarded seamlessly.")
    add_p("3. Automated SMS & WhatsApp Alerts:\nIntegrating Twilio or WhatsApp Business APIs to send instant booking confirmation vouchers, table numbers, and directions directly to customer mobile numbers.")
    add_p("4. Live GPS Delivery Tracking:\nEmbedding interactive Google Maps or Mapbox APIs to provide real-time turn-by-turn tracking of delivery couriers for Doorstep Delivery orders.")

    # ==========================================
    # 9. REFERENCES (EXACT CLEAN LAYOUT LIKE SAMPLE)
    # ==========================================
    doc.add_page_break()
    add_h1("REFERENCES")

    def add_reference_block(title, url, description):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(4)
        p.paragraph_format.space_after = Pt(6)
        p.paragraph_format.line_spacing = 1.15
        
        # Title
        rt = p.add_run(f"{title}\n")
        rt.bold = True
        rt.font.name = "Calibri"
        rt.font.size = Pt(10)
        rt.font.color.rgb = RGBColor(15, 23, 42)

        # URL
        ru = p.add_run(f"{url}\n")
        ru.font.name = "Calibri"
        ru.font.size = Pt(9.5)
        ru.font.color.rgb = RGBColor(2, 132, 199)

        # Description
        rd = p.add_run(f"{description}")
        rd.italic = True
        rd.font.name = "Calibri"
        rd.font.size = Pt(9.5)
        rd.font.color.rgb = RGBColor(71, 85, 105)

    add_reference_block(
        "MDN Web Docs:",
        "https://developer.mozilla.org",
        "(For JavaScript, HTML and CSS reference)"
    )

    add_reference_block(
        "Web APIs Reference:",
        "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API\nhttps://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API",
        "(For retrieving data through REST APIs and managing client-side storage)"
    )

    add_reference_block(
        "React Official Documentation:",
        "https://react.dev",
        "(For React 18 functional components, hooks, and single-page routing)"
    )

    add_reference_block(
        "Node.js & Express:",
        "https://nodejs.org\nhttps://expressjs.com",
        "(For server-side JavaScript runtime environment and RESTful routing)"
    )

    add_reference_block(
        "MongoDB & Mongoose ODM:",
        "https://www.mongodb.com\nhttps://mongoosejs.com",
        "(For NoSQL BSON document database modeling and schema validation)"
    )

    add_reference_block(
        "National Payments Corporation of India (NPCI):",
        "https://www.npci.org.in",
        "(For Unified Payments Interface - UPI deep-linking specifications)"
    )

    add_reference_block(
        "GeeksforGeeks:",
        "https://geeksforgeeks.org",
        "(For basic web development tutorials and suggestions)"
    )

    add_reference_block(
        "W3Schools:",
        "https://www.w3schools.com",
        "(For basic web development tutorials and examples)"
    )

    p_notes = doc.add_paragraph()
    p_notes.paragraph_format.space_before = Pt(6)
    p_notes.paragraph_format.space_after = Pt(8)
    rn = p_notes.add_run("Class notes and study materials provided by Brainware University")
    rn.bold = True
    rn.font.name = "Calibri"
    rn.font.size = Pt(10)
    rn.font.color.rgb = RGBColor(15, 23, 42)

    p_tools = doc.add_paragraph()
    p_tools.paragraph_format.space_before = Pt(4)
    p_tools.paragraph_format.space_after = Pt(6)
    rt1 = p_tools.add_run("TOOLS in use: ")
    rt1.bold = True
    rt1.font.name = "Calibri"
    rt1.font.size = Pt(10)
    rt1.font.color.rgb = RGBColor(15, 23, 42)
    rt2 = p_tools.add_run("Visual Studio Code ")
    rt2.font.name = "Calibri"
    rt2.font.size = Pt(9.5)
    rt3 = p_tools.add_run("https://code.visualstudio.com ")
    rt3.font.name = "Calibri"
    rt3.font.size = Pt(9.5)
    rt3.font.color.rgb = RGBColor(2, 132, 199)
    rt4 = p_tools.add_run("(For Development environment)")
    rt4.italic = True
    rt4.font.name = "Calibri"
    rt4.font.size = Pt(9.5)
    rt4.font.color.rgb = RGBColor(71, 85, 105)

    add_reference_block(
        "GitHub:",
        "https://github.com",
        "(For version control and collaboration)"
    )

    add_reference_block(
        "Vite:",
        "https://vitejs.dev",
        "(For next-generation fast frontend tooling and bundling)"
    )

    # Save to primary and fallback files
    out_paths = [
        r"C:\Users\soura\OneDrive\Desktop\ReactProject\DineEase_Restaurant_Management_Report_Brainware.docx",
        r"C:\Users\soura\OneDrive\Desktop\ReactProject\DineEase_Restaurant_Management_System_Project_Report.docx"
    ]
    
    saved_paths = []
    for p in out_paths:
        try:
            doc.save(p)
            saved_paths.append(p)
            print(f"[Success] Saved: {p}")
        except PermissionError:
            print(f"[Notice] {p} is currently open in Word. Skipped overwrite.")
        except Exception as e:
            print(f"[Error] {p}: {e}")

    return saved_paths

if __name__ == "__main__":
    create_document()
