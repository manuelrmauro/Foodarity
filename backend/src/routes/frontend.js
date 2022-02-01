/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
const { Router } = require('express');
const express = require('express');
const path = require('path');

const router = new Router();

router.use(express.static(path.join(__dirname, '..','..','..','frontend','build')));

router.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '..','..','..','frontend','build', 'index.html'));
});

module.exports = router;
