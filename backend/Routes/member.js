const express = require("express")
const router = express.Router();
const MemberController = require('../Controllers/member');
const auth = require('../Auth/auth')

router.get('/all-member', auth, MemberController.getAllMember);
router.post('/register-member', auth, MemberController.registerMember);
router.get('/search', auth, MemberController.searchMember);
router.get('/monthly-member', auth, MemberController.monthlyMember);
router.get('/expiring-3-days', auth, MemberController.expiringWithin3Days);
router.get('/expiring-4-7-days', auth, MemberController.expiringWithIn4To7Days);
router.get('/expired-member', auth, MemberController.expiredMember);
router.get('/inactive-member', auth, MemberController.inActiveMember);
router.get('/member-details/:id', auth, MemberController.getMemberDetails);
router.put('/change-status/:id', auth, MemberController.changeStatus);
router.put('/update-plan/:id', auth, MemberController.updateMemberPlan);
router.delete('/delete-member/:id', auth, MemberController.deleteMember);

module.exports = router;