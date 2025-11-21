const express = require('express');
const router = express.Router();

// In-memory store for demo purposes
let members = [];
let nextId = 1;

// GET /api/members - list members
router.get('/', (req, res) => {
  res.json(members);
});

// GET /api/members/:id - get single member
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const member = members.find((m) => m.id === id);
  if (!member) return res.status(404).json({ error: 'Member not found' });
  res.json(member);
});

// POST /api/members - create member
router.post('/', (req, res) => {
  const { name, email, phone } = req.body || {};
  if (!name || !email) return res.status(400).json({ error: 'name and email are required' });

  const member = { id: nextId++, name, email, phone: phone || null, createdAt: new Date().toISOString() };
  members.push(member);
  res.status(201).json(member);
});

// PUT /api/members/:id - update member
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = members.findIndex((m) => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Member not found' });

  const { name, email, phone } = req.body || {};
  if (!name && !email && typeof phone === 'undefined') {
    return res.status(400).json({ error: 'At least one of name, email or phone must be provided' });
  }

  const updated = Object.assign({}, members[idx], { name: name ?? members[idx].name, email: email ?? members[idx].email, phone: typeof phone === 'undefined' ? members[idx].phone : phone, updatedAt: new Date().toISOString() });
  members[idx] = updated;
  res.json(updated);
});

// DELETE /api/members/:id - delete member
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = members.findIndex((m) => m.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Member not found' });
  const removed = members.splice(idx, 1)[0];
  res.json(removed);
});

module.exports = router;
