import {Router} from 'express';
import userManagerDB from '../dao/userManagerDB.js'; 
import passport from 'passport';

const router = Router();
const sessionRouter = router;

router.post("/register", passport.authenticate('register',{failureRedirect:'/failregister'}) ,async (req, res) => {
    res.redirect('/')
});
router.get('/failregister', async(req,res)=> {
    console.log("Registro erroneo");
    res.send({error:"Failed"})
})

router.post("/login", passport.authenticate('login',{failureRedirect:'/faillogin'}) ,async (req, res) => {
    req.session.user = req.user;
    res.redirect('/')
});
router.post("faillogin", async(req,res) => {
    console.log("Ingreso erroneo");
    res.send({error:"Failed"})
})

router.get('/github', passport.authenticate('github',{scope:['user:email']}),async(req,res) => {});
router.get('/githubcallback',passport.authenticate('github',{failureRedirect: '/login'}), async(req,res) =>{
    res.redirect('/');
})

export default sessionRouter;