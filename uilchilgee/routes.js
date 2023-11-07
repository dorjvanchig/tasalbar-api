const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/protect');

const { khereglegchBurtgekh, nevtrekh } = require('./controller/khereglegchiinController');
const { togloltBurtgekh, togloltiinJagsaaltAvya, togloltiinZuragOruulya, tankhimiinJagsaaltAvya , tankhimBurtgekh, togloltAvya, biletZakhialya, zakhialsanSuudluudAvya } = require('./controller/togloltiinController');

router.route('/khereglegchBurtgekh').post(khereglegchBurtgekh);
router.route('/nevtrekh').post(nevtrekh);
router.route('/togloltiinJagsaaltAvya').post(togloltiinJagsaaltAvya);
router.route('/togloltAvya').post(togloltAvya);
router.route('/togloltBurtgekh').post(protect, togloltBurtgekh);
router.route('/togloltiinZuragOruulya/:id').post(protect, togloltiinZuragOruulya);
router.route('/tankhimiinJagsaaltAvya').post(tankhimiinJagsaaltAvya);
router.route('/tankhimBurtgekh').post(protect, tankhimBurtgekh);
router.route('/biletZakhialya').post(protect, biletZakhialya);
router.route('/zakhialsanSuudluudAvya').post(protect, zakhialsanSuudluudAvya);


module.exports = router;