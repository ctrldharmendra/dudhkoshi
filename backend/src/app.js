const express = require('express');
const app = express();
const path = require("node:path")
const fs = require("fs")
const requestIp = require('request-ip');
const cookieParser = require('cookie-parser')
const cors = require("cors");




app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

// app.use(
//   '/uploads',
//   express.static(path.join(process.cwd(), 'uploads'))
// );

app.use(cookieParser());
app.use(requestIp.mw());

app.use(
  cors({
    origin: [
      "https://dudhkoshi.gyanbato.com",
      "http://localhost:3000",
      "https://dudhkoshihydro.com.np",
      "http://dudhkoshihydro.com.np",
    ],
    credentials: true, // needed for cookies/auth sessions
  })
);


// IMPORT ROUTES 
const userRouter = require('../routes/user.routes');
const authRouter = require('../routes/auth.routes')
const invitationRoutes = require('../routes/invitation.routes')
const permissionRoutes = require('../routes/permission.routes')
const roleRoutes = require('../routes/role.routes')
const emailContentRoutes = require('../routes/email.routes')
const userOrganizationRoute = require('../routes/userOrganization.routes')
const awardRoute = require('../routes/bid/bidAward.routes')
const forgotPasswordRoutes = require('../routes/resetPassword/resetPass.routes')
const reproposeRoutes = require('../routes/repropose/repropose.routes')
 

const protectedFileRoutes = require('../routes/protectFile/protectFile.routes') 

// bid 
const bidRoutes = require('../routes/bid/bid.routes')

// ANDMI PANEL 
const heroRoutes = require('../routes/adminPanel/hero.routes')
const aboutusRoutes = require('../routes/adminPanel/aboutus.routes')
const teamRoutes = require('../routes/adminPanel/team.routes')
const projectOverviewRoutes = require('../routes/adminPanel/projectOverview.routes')
const contactsRoutes = require('../routes/adminPanel/contacts.routes')
const galleryRoutes = require('../routes/adminPanel/gallery.routes')
const faqsRoutes = require('../routes/adminPanel/faqs.routes')
const blogRoutes = require('../routes/adminPanel/blog.routes')
const miscRoutes = require('../routes/adminPanel/misccellaneous.routes')
// ANDMI PANEL END 


// console.log("cwd:", process.cwd());

app.get("/debug", (req, res) => {
  res.json({
    cwd: process.cwd(),
    dirname: __dirname,
  });
});


// ROUTE DECLARATION  ---BID----
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/invite', invitationRoutes);
app.use('/api/roles', permissionRoutes)  //add or remove role's permission
app.use('/api/manage/roles', roleRoutes)
app.use('/api/emailcontents', emailContentRoutes)
app.use('/api/userorg', userOrganizationRoute)
app.use('/api/auction', awardRoute) //-- award
app.use('/api/resetpass', forgotPasswordRoutes)
app.use('/api/proposal', reproposeRoutes)
// TESTING ONLY
app.use('/', protectedFileRoutes)
// bid 
app.use('/api/bid', bidRoutes)
// ROUTE DECLARATION  ---BID---- END


// ROUTE DECLARATION ---ADMIN PANEL----
app.use('/api/admin/hero', heroRoutes)
app.use('/api/admin/aboutus', aboutusRoutes)
app.use('/api/admin/team', teamRoutes)
app.use('/api/admin/projectoverview', projectOverviewRoutes)
app.use('/api/admin/contacts', contactsRoutes)
app.use('/api/admin/gallery', galleryRoutes)
app.use('/api/admin/faqs', faqsRoutes)
app.use('/api/admin/blog', blogRoutes)
app.use('/api/admin/misc', miscRoutes)
// ROUTE DECLARATION ---ADMIN PANEL END----





module.exports = app;