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
    origin: "http://localhost:3000",
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


const protectedFileRoutes = require('../routes/protectFile/protectFile.routes') 

// bid 
const bidRoutes = require('../routes/bid/bid.routes')


// console.log("cwd:", process.cwd());

app.get("/debug", (req, res) => {
  res.json({
    cwd: process.cwd(),
    dirname: __dirname,
  });
});


// ROUTE DECLARATION
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/invite', invitationRoutes);
app.use('/api/roles', permissionRoutes)  //add or remove role's permission
app.use('/api/manage/roles', roleRoutes)
app.use('/api/emailcontents', emailContentRoutes)
app.use('/api/userorg', userOrganizationRoute)


// TESTING ONLY
app.use('/', protectedFileRoutes)

// bid 
app.use('/api/bid', bidRoutes)



module.exports = app;