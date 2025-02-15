# Table Setup

```sql
DROP TABLE IF EXISTS lu_claim_status;
CREATE TABLE IF NOT EXISTS lu_claim_status (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50),
    name VARCHAR(50),
    description VARCHAR(50),
    is_active BOOLEAN,
    colour VARCHAR(50),
    fore_colour VARCHAR(50),
    sort_order SMALLINT,
    icon VARCHAR(50),
    is_default BOOLEAN
);

-- Insert a record into the table
INSERT INTO lu_claim_status (code, name, description, is_active, colour, fore_colour, sort_order, icon, is_default)
VALUES ('Est', 'Estimate', 'Estimate of loss', TRUE, 'orange', '#ffffff', 1, NULL, FALSE);

DROP TABLE IF EXISTS lu_risk_type;
CREATE TABLE IF NOT EXISTS lu_risk_type (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50),
    name VARCHAR(500),
    description VARCHAR(500),
    is_active BOOLEAN,
    colour VARCHAR(50),
    fore_colour VARCHAR(50),
    sort_order SMALLINT,
    icon VARCHAR(50),
    is_default BOOLEAN
);

INSERT INTO lu_risk_type (code, name, description, is_active, colour, fore_colour, sort_order, icon, is_default) VALUES
(NULL, 'Homeowners', NULL, TRUE, '#de8bc0', '#fff', 1, NULL, NULL),
(NULL, 'Household Contents', NULL, TRUE, '#be51fe', '#fff', 2, NULL, NULL),
(NULL, 'All Risk', NULL, TRUE, '#602903', '#fff', 3, NULL, NULL),
(NULL, 'Motor Vehicle', NULL, TRUE, '#13d871', '#fff', 5, NULL, NULL),
(NULL, 'Motorcycle', NULL, TRUE, '#2ccff4', '#fff', 6, NULL, NULL),
(NULL, 'Watercraft', NULL, TRUE, '#d0ca51', '#fff', 7, NULL, NULL),
(NULL, 'Car hire', NULL, TRUE, '#783036', '#fff', 8, NULL, NULL),
(NULL, 'Roadside Assist', NULL, TRUE, '#8838fd', '#fff', 9, NULL, NULL),
(NULL, 'Home Assist', NULL, TRUE, '#6c969a', '#fff', 10, NULL, NULL),
(NULL, 'Unspecified All Risk', NULL, TRUE, '#4e694b', '#fff', 4, NULL, NULL),
(NULL, 'SASRIA', NULL, TRUE, '#cef0af', '#fff', 11, NULL, NULL),
(NULL, 'Broker Fee', NULL, TRUE, '#24f027', '#fff', 11, NULL, NULL),
(NULL, 'Insurer Fee', NULL, TRUE, '#3211d1', '#fff', 12, NULL, NULL),
(NULL, 'Personal Legal Liability', NULL, TRUE, '#90950c', '#fff', 14, NULL, NULL),
(NULL, 'Credit Shortfall', NULL, TRUE, '#fbd338', '#fff', 15, NULL, NULL),
(NULL, 'Classic Car', NULL, TRUE, '#d37382', '#fff', 15, NULL, NULL),
(NULL, 'MUA Concierge', NULL, TRUE, '#bbbf22', '#fff', 16, NULL, NULL),
(NULL, 'Vitality Drive', NULL, TRUE, '#a1a9a4', '#fff', 17, NULL, NULL),
(NULL, 'Accidental Damage', NULL, TRUE, '#2d65a6', '#fff', 18, NULL, NULL),
(NULL, 'Average Waiver', NULL, TRUE, '#8a1285', '#fff', 20, NULL, NULL),
(NULL, 'Geyser maintenance', NULL, TRUE, '#40216', '#fff', 20, NULL, NULL);


DROP TABLE IF EXISTS lu_risk_status;
CREATE TABLE IF NOT EXISTS lu_risk_status (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50),
    name VARCHAR(50),
    description VARCHAR(50),
    is_active BOOLEAN,
    colour VARCHAR(50),
    fore_colour VARCHAR(50),
    sort_order SMALLINT,
    icon VARCHAR(50),
    is_default BOOLEAN
);

-- Insert records into the table
INSERT INTO lu_risk_status (code, name, description, is_active, colour, fore_colour, sort_order, icon, is_default) 
VALUES 
    ('Active', 'Active', 'Test of policy risk status save and reload', TRUE, '#70c81d', '#fff', 1, NULL, FALSE),
    ('Inactive', 'Inactive', 'Inactive Risk', TRUE, 'red', '#fff', 2, NULL, FALSE),
    ('WriteOff', 'Write Off', 'Risk is a write off.', TRUE, '#701119', '#fff', 3, NULL, FALSE);

DROP TABLE IF EXISTS lu_policy_type;
CREATE TABLE IF NOT EXISTS lu_policy_type (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50),
    name VARCHAR(100),
    description VARCHAR(100),
    is_active BOOLEAN,
    colour VARCHAR(50),
    fore_colour VARCHAR(50),
    sort_order SMALLINT,
    icon VARCHAR(50),
    is_default BOOLEAN
);

-- Insert new records
INSERT INTO lu_policy_type (code, name, description, is_active, colour, fore_colour, sort_order, icon, is_default) VALUES
(NULL, 'Albatros Comm Direct (M)', 'Albatros Comm Direct (M)', TRUE, NULL, NULL, 3, NULL, NULL),
(NULL, 'Albatros PL Direct (M)', 'Albatros PL Direct (M)', TRUE, NULL, NULL, 1, NULL, NULL),
(NULL, 'Alexander Forbes Dom Direct (M)', 'Alexander Forbes Dom Direct (M)', TRUE, NULL, NULL, 5, NULL, NULL),
(NULL, 'Anderson PL Monthly', 'Anderson PL Monthly', TRUE, NULL, NULL, 6, NULL, NULL),
(NULL, 'Apex Motorcycle Direct (M)', 'Apex Motorcycle Direct (M)', TRUE, NULL, NULL, 2, NULL, NULL),
(NULL, 'Auto & General Direct (M)', 'Auto & General Direct (M)', TRUE, NULL, NULL, 7, NULL, NULL),
(NULL, 'Bryte Commercial Annual', 'Bryte Commercial (v1_20022019) - Annual', TRUE, NULL, NULL, 4, NULL, NULL),
(NULL, 'Bryte Commercial Monthly', 'Bryte Commercial (v1_20022019) - Monthly', TRUE, NULL, NULL, 8, NULL, NULL),
(NULL, 'Bryte Dom Direct (A)', 'Bryte Dom Direct (A)', TRUE, NULL, NULL, 9, NULL, NULL),
(NULL, 'Bryte Dom Direct (M)', 'Bryte Dom Direct (M)', TRUE, NULL, NULL, 10, NULL, NULL),
(NULL, 'CIA Direct (M)', 'CIA Direct (M)', TRUE, NULL, NULL, 11, NULL, NULL),
(NULL, 'Contractors All Risks (A)', 'Contractors All Risks (A)', TRUE, NULL, NULL, 12, NULL, NULL),
(NULL, 'Contractors All Risks (Once off)', 'Contractors All Risks (Once off)', TRUE, NULL, NULL, 13, NULL, NULL),
(NULL, 'Cross Country Direct (M)', 'Cross Country Direct (M)', TRUE, NULL, NULL, 14, NULL, NULL),
(NULL, 'Discovery Commercial Policy (M)', 'Discovery Commercial Policy (M)', TRUE, NULL, NULL, 15, NULL, NULL),
(NULL, 'Discovery Insure Direct (M)', 'Discovery Insure Direct (M)', TRUE, NULL, NULL, 16, NULL, NULL),
(NULL, 'Echelon PL Direct (M)', 'Echelon PL Direct (M)', TRUE, NULL, NULL, 17, NULL, NULL),
(NULL, 'Execuline Motor Policy Direct (M)', 'Execuline Motor Policy Direct (M)', TRUE, NULL, NULL, 18, NULL, NULL),
(NULL, 'Firedart Engineering Underwriting Managers Annual (PTY) Ltd', 'Firedart Engineering Underwriting Managers Annual (PTY) Ltd', TRUE, NULL, NULL, 19, NULL, NULL),
(NULL, 'Firedart Engineering Underwriting Managers Monthly (PTY) Ltd', 'Firedart Engineering Underwriting Managers Monthly (PTY) Ltd', TRUE, NULL, NULL, 20, NULL, NULL),
(NULL, 'FSP Comm Direct (M)', 'FSP Comm Direct (M)', TRUE, NULL, NULL, 21, NULL, NULL),
(NULL, 'FSP Solutions Direct (M)', 'FSP Solutions Direct (M)', TRUE, NULL, NULL, 22, NULL, NULL),
(NULL, 'GuardRisk IUM Commercial Annual', 'GuardRisk IUM Commercial Annual', TRUE, NULL, NULL, 23, NULL, NULL),
(NULL, 'GuardRisk IUM Commercial Monthly', 'GuardRisk IUM Commercial Monthly', TRUE, NULL, NULL, 24, NULL, NULL),
(NULL, 'GuardRisk IUM Domestic Annual', 'GuardRisk IUM Domestic Annual', TRUE, NULL, NULL, 25, NULL, NULL),
(NULL, 'GuardRisk IUM Domestic Monthly', 'GuardRisk IUM Domestic Monthly', TRUE, NULL, NULL, 26, NULL, NULL),
(NULL, 'Hollard PL Direct (A)', 'Hollard PL Direct (A)', TRUE, NULL, NULL, 27, NULL, NULL),
(NULL, 'Hollard PL Direct (M)', 'Hollard PL Direct (M)', TRUE, NULL, NULL, 28, NULL, NULL),
(NULL, 'Insurefin Commercial (Annual)', 'Insurefin Commercial (Annual)', TRUE, NULL, NULL, 29, NULL, NULL),
(NULL, 'Insurefin Commercial (Monthly)', 'Insurefin Commercial (Monthly)', TRUE, NULL, NULL, 30, NULL, NULL),
(NULL, 'Insurefin Dom (Underwritten by NNA) Annual', 'Insurefin Dom (Underwritten by NNA) Annual', TRUE, NULL, NULL, 31, NULL, NULL),
(NULL, 'Insurefin Dom (Underwritten by NNA) Monthly', 'Insurefin Dom (Underwritten by NNA) Monthly', TRUE, NULL, NULL, 32, NULL, NULL),
(NULL, 'King Price Commercial Annual', 'King Price Commercial Annual', TRUE, NULL, NULL, 33, NULL, NULL),
(NULL, 'King Price Commercial Monthly', 'King Price Commercial Monthly', TRUE, NULL, NULL, 34, NULL, NULL),
(NULL, 'Liability Special Events (A)', 'Liability Special Events (A)', TRUE, NULL, NULL, 35, NULL, NULL),
(NULL, 'Liability Special Events (Once off)', 'Liability Special Events (Once off)', TRUE, NULL, NULL, 36, NULL, NULL),
(NULL, 'Liability Special Events Direct (A)', 'Liability Special Events (A) Paid to Insurer', TRUE, NULL, NULL, 37, NULL, NULL),
(NULL, 'Liability Special Events Direct (M)', 'Liability Special Events Direct (M)', TRUE, NULL, NULL, 38, NULL, NULL),
(NULL, 'M/MARKIII (M)', 'M/MARKIII (M)', TRUE, NULL, NULL, 39, NULL, NULL),
(NULL, 'Mirabilis Contractors A/R Direct (M)', 'Mirabilis Contractors A/R Direct (M)', TRUE, NULL, NULL, 40, NULL, NULL),
(NULL, 'Mirabilis Contractors A/R Direct (Once off)', 'Mirabilis Contractors A/R (Once off) Paid to Ins', TRUE, NULL, NULL, 41, NULL, NULL),
(NULL, 'Momentum Comm Direct (A)', 'Momentum Comm (A) Paid to Insurer', TRUE, NULL, NULL, 42, NULL, NULL),
(NULL, 'Momentum Comm Direct (M)', 'Momentum Comm Direct (M)', TRUE, NULL, NULL, 43, NULL, NULL),
(NULL, 'Momentum Dom Direct (A)', 'Momentum Dom (A) Paid to Insurer', TRUE, NULL, NULL, 44, NULL, NULL),
(NULL, 'Momentum Dom Direct (M)', 'Momentum Dom Direct (M)', TRUE, NULL, NULL, 45, NULL, NULL),
(NULL, 'Motorcycle Direct (M)', 'Motorcycle Direct (M)', TRUE, NULL, NULL, 46, NULL, NULL),
(NULL, 'MUA Direct (A)', 'MUA (A) Paid to Insurer', TRUE, NULL, NULL, 47, NULL, NULL),
(NULL, 'MUA Direct (M)', 'MUA Direct (M)', TRUE, NULL, NULL, 48, NULL, NULL),
(NULL, 'MUA Motor Policy', 'MUA Motor Policy', TRUE, NULL, NULL, 49, NULL, NULL),
(NULL, 'MULTIPERIL (M)', 'MULTIPERIL (M)', TRUE, NULL, NULL, 50, NULL, NULL),
(NULL, 'New Wheels Motorcycles Direct (M)', 'New Wheels Motorcycles Direct (M)', TRUE, NULL, NULL, 51, NULL, NULL),
(NULL, 'NNA Comm Direct (A)', 'NNA Comm (A) Paid to Insurer', TRUE, NULL, NULL, 52, NULL, NULL),
(NULL, 'NNA Comm Direct (M)', 'NNA Comm Direct (M)', TRUE, NULL, NULL, 53, NULL, NULL),
(NULL, 'NNA PL Direct (M)', 'NNA PL Direct (M)', TRUE, NULL, NULL, 54, NULL, NULL),
(NULL, 'Oakhurst Direct (M)', 'Oakhurst Direct (M)', TRUE, NULL, NULL, 55, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Allsure Direct (A)', 'Old Mutual Insure Ltd Allsure (A) Paid to Insurer', TRUE, NULL, NULL, 56, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Allsure Direct (M)', 'Old Mutual Insure Ltd Allsure Direct (M)', TRUE, NULL, NULL, 57, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Com Direct (M)', 'Old Mutual Insure Ltd Com Direct (M)', TRUE, NULL, NULL, 58, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Dom Direct (A)', 'Old Mutual Insure Ltd Dom Direct (A)', TRUE, NULL, NULL, 59, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Dom Direct (M)', 'Old Mutual Insure Ltd Dom Direct (M)', TRUE, NULL, NULL, 60, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd MMIII Direct (A)', 'Old Mutual Insure Ltd MMIII (A) Paid to Insurer', TRUE, NULL, NULL, 61, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd MMIII Direct (M)', 'Old Mutual Insure Ltd MMIII Direct (M)', TRUE, NULL, NULL, 62, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Multisure (Annual)', 'Old Mutual Insure Ltd Multisure (Annual)', TRUE, NULL, NULL, 63, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Multisure (Monthly)', 'Old Mutual Insure Ltd Multisure (Monthly)', TRUE, NULL, NULL, 64, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Personal (Annual)', 'Old Mutual Insure Ltd Personal (Annual)', TRUE, NULL, NULL, 65, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Personal (Monthly)', 'Old Mutual Insure Ltd Personal (Monthly)', TRUE, NULL, NULL, 66, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Personal Group Schemes (A)', 'Old Mutual Insure Ltd Personal Group Schemes (A)', TRUE, NULL, NULL, 67, NULL, NULL),
(NULL, 'Old Mutual Insure Ltd Personal Group Schemes (M)', 'Old Mutual Insure Ltd Personal Group Schemes (M)', TRUE, NULL, NULL, 68, NULL, NULL),
(NULL, 'ONE Commercial Direct (M)', 'ONE Commercial Direct (M)', TRUE, NULL, NULL, 69, NULL, NULL),
(NULL, 'Phishield Funds Protect Business Policy', 'Phishield Funds Protect Business Policy -Annual', TRUE, NULL, NULL, 70, NULL, NULL),
(NULL, 'Phishield Funds Protect Personal Policy', 'Phishield Funds Protect Personal Policy - Annual', TRUE, NULL, NULL, 71, NULL, NULL),
(NULL, 'Phishield Funds Protect Personal Policy', 'Phishield Funds Protect Personal Policy - Monthly', TRUE, NULL, NULL, 72, NULL, NULL),
(NULL, 'Professional Indemnity Direct (M)', 'Professional Indemnity Direct (M)', TRUE, NULL, NULL, 73, NULL, NULL),
(NULL, 'Quicksure Comm Direct (M)', 'Quicksure Comm Direct (M)', TRUE, NULL, NULL, 74, NULL, NULL),
(NULL, 'Quicksure Lion of Africa Comm Direct (M)', 'Quicksure Lion of Africa Comm Direct (M)', TRUE, NULL, NULL, 75, NULL, NULL),
(NULL, 'Quicksure PL Direct (M)', 'Quicksure PL Direct (M)', TRUE, NULL, NULL, 76, NULL, NULL),
(NULL, 'Risk Guard Direct (M)', 'Risk Guard Direct (M)', TRUE, NULL, NULL, 77, NULL, NULL),
(NULL, 'SA Underwriters PL Direct (M)', 'SA Underwriters PL Direct (M)', TRUE, NULL, NULL, 78, NULL, NULL),
(NULL, 'Santam Commercial Annual', 'Santam Commercial Annual', TRUE, NULL, NULL, 79, NULL, NULL),
(NULL, 'Santam Commercial Policy (M) (V1_2013_10IA)', 'Santam Commercial Policy (M) (V1_2013_10IA)', TRUE, NULL, NULL, 80, NULL, NULL),
(NULL, 'Santam MMIII Direct (M)', 'Santam MMIII Direct (M)', TRUE, NULL, NULL, 81, NULL, NULL),
(NULL, 'Santam Personal Product (Monthly)', 'Santam Personal Product Monthly (Rating Engine)', TRUE, NULL, NULL, 82, NULL, NULL),
(NULL, 'Santam PL Direct (M)', 'Santam PL Direct (M)', TRUE, NULL, NULL, 83, NULL, NULL),
(NULL, 'Small Craft Marine Direct (A)', 'Small Craft Marine (A) Paid to Insurer', TRUE, NULL, NULL, 84, NULL, NULL),
(NULL, 'Small Craft Marine Direct (M)', 'Small Craft Marine Direct (M)', TRUE, NULL, NULL, 85, NULL, NULL),
(NULL, 'Thatch Risk Commercial Annual', 'Thatch Risk Commercial Annual', TRUE, NULL, NULL, 86, NULL, NULL),
(NULL, 'Thatch Risk Commercial Monthly', 'Thatch Risk Commercial Monthly', TRUE, NULL, NULL, 87, NULL, NULL),
(NULL, 'Unique PL Direct (M)', 'Unique PL Direct (M)', TRUE, NULL, NULL, 88, NULL, NULL),
(NULL, 'Vantage Direct (A)', 'Vantage (A) Paid to Insurer', TRUE, NULL, NULL, 89, NULL, NULL),
(NULL, 'Vantage Direct (M)', 'Vantage Direct (M)', TRUE, NULL, NULL, 90, NULL, NULL),
(NULL, 'Western BC Direct (M)', 'Western BC Direct (M)', TRUE, NULL, NULL, 91, NULL, NULL),
(NULL, 'Western Comm Direct (M)', 'Western Comm Direct (M)', TRUE, NULL, NULL, 92, NULL, NULL);

DROP TABLE IF EXISTS lu_policy_status;
CREATE TABLE IF NOT EXISTS lu_policy_status (
    id SERIAL PRIMARY KEY,
    code VARCHAR(50),
    name VARCHAR(50),
    description VARCHAR(50),
    is_active BOOLEAN,
    colour VARCHAR(50),
    fore_colour VARCHAR(50),
    sort_order SMALLINT,
    icon VARCHAR(50),
    is_default BOOLEAN
);

-- Insert records into the table
INSERT INTO lu_policy_status (code, name, description, is_active, colour, fore_colour, sort_order, icon, is_default) 
VALUES 
    ('Acitve', 'Active', NULL, TRUE, 'green', '#ffffff', 1, 'fa-sharp fa-solid fa-building-shield', TRUE),
    ('Inactive', 'Inactive', NULL, TRUE, 'red', '#ffffff', 1, 'fa-sharp fa-solid fa-building-shield', TRUE),
    ('Quote', 'Quote', NULL, TRUE, 'orange', '#ffffff', 1, 'fa-sharp fa-solid fa-building-shield', TRUE),
    ('Est', 'Estimate', NULL, TRUE, '#b5761b', '#fff', 4, NULL, FALSE);

DROP TABLE IF EXISTS ma_insurer;
CREATE TABLE IF NOT EXISTS ma_insurer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    code VARCHAR(50),
    description VARCHAR(50),
    is_active BOOLEAN,
    colour VARCHAR(50),
    fore_colour VARCHAR(50),
    sort_order SMALLINT,
    icon VARCHAR(50),
    is_default BOOLEAN
);

-- Insert new records
INSERT INTO ma_insurer (name, code, description, is_active, colour, fore_colour, sort_order, icon, is_default) VALUES
('Santam Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('CONSORT TECHNICAL UNDERWRITERS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Quicksure Lion of Africa Comm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Sasria Domestic Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SA Underwriters', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Quicksure PL Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Risk Guard Alliance', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Anderson Supreme PL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('HOLLARD BROKERS BRANCH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Santam Domestic Sasria Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Insurefin Domestic', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Insurefin Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Albatros Insurance Admin Com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Digicall Assist Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Stalker Hutchison Admiral', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Bryte Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Discovery Insure', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Bryte DOMESTIC ANNUAL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Direct Commercial', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('MUA Insurance Acceptances (Pty) Ltd - Sasria Month', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Discovery Commercial Sasria Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Digicall Assist Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('C&G Underwriters', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('ONE Financial Services H Sasria Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd M/MarkIII Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Commercial Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Sasria Commercial Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Bryte Commercial Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Momentum Commercial', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Santam Commercial Sasria Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Vantage Insurance Acceptances', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Discovery Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Ins Co', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Alexander Forbes Personal Insurance', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Hollard Domestic Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Camarque Underwriting Managers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd DOMESTIC DIRECT R/I', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Eikos Risk Applications', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('NNA - New National', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Global Choices PWV Assist', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Vanguard Marine & Leisure', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Execuline Motor Underwriting Managers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('FSP SOLUTIONS', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SANTAM BROKERS BRANCH', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd M/MarkIII Monthly Sasria', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Unique Domestic', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Hollard Sasria Domestic Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Bryte Sasria Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Royal Administrators Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Bryte Domestic', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Sasria Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Albatros Insurance Admin PL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Neptune Pleasure Craft', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('New Wheels Motorcycles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Phishield Funds Protect Personal Cover - Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('SANTAM Comm. Annual Page 1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Domestic Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('MUA Insurance Acceptances (Pty) Ltd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Bryte Sasria Commercial Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Sasria Domestic Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Direct Domestic Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('GuardRisk IUM Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Sasria Domestic Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('APEX Underwriting Managers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Santam Sasria Domestic Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Insurefin Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Associated Marine', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Compass Insurance Company Ltd Thatch Risk', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Bryte INS COMPANY', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Western Commercial', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Quicksure Comm Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('MUA Insurance Acceptances (Pty) Ltd - Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Santam Domestic Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Bryte PLIP (ANNUAL)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('FIREDART ENGINEERING MONTHLY', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Merx Commercial Underwriters', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Bryte Insurance Company So Sasria Domestic Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Commercial & Industrial Acceptances', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Royal Administrators Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Risk Benefit Solutions', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Momentum', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Firedart Engineering U/W Managers', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Lombard Insurance Company Limited', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('CROSS COUNTRY INSURANCE CONS.', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('New National Assurance Company', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd DIRECT SMALLCRAFT (M)', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Hollard Domestic Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('MUA Insurance Acceptances (Pty) Ltd - Sasria Annua', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Sasria Direct Domestic', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('New Wheels Motorcycles Sasria', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Sasria Direct Commercial', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('AUTO & GENERAL', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Smart Credit Motorcycles', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('MIRABILIS ENGINEERING', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('MUA Insurance Acceptances (Pty) Ltd - Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Insurefin Com Sasria Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('FSP Solutions Comm', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Hollard Sasria Domestic Annual', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('ONE Commercial Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Domestic Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Echelon', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Old Mutual Insure Ltd Direct Domestic Monthly', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('Oakhurst Insurance Company Ltd', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
```
