require('dotenv').config();

const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

const DATA_DIR = path.join(__dirname, 'data');
const CMS_FILE = path.join(DATA_DIR, 'cms.json');
const MSG_FILE = path.join(DATA_DIR, 'messages.json');

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
if (!fs.existsSync(CMS_FILE)) fs.writeFileSync(CMS_FILE, '{}');
if (!fs.existsSync(MSG_FILE)) fs.writeFileSync(MSG_FILE, '[]');

/* API */
app.get('/api/cms', (req, res) => {
    res.json(JSON.parse(fs.readFileSync(CMS_FILE)));
});

app.post('/api/cms', (req, res) => {
    fs.writeFileSync(CMS_FILE, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
});

app.post('/api/message', (req, res) => {
    const msgs = JSON.parse(fs.readFileSync(MSG_FILE));
    msgs.push({ ...req.body, date: new Date().toISOString() });
    fs.writeFileSync(MSG_FILE, JSON.stringify(msgs, null, 2));
    res.json({ sent: true });
});

app.post('/api/pay', (req, res) => {
    res.json({ success: true, id: 'PAY_' + Date.now() });
});

/* STATIC FRONTEND */
app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, () => {
    console.log('PROD SERVER RUNNING ON PORT', PORT);
});
