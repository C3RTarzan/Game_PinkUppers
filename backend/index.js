require('dotenv').config();
const express = require('express')
const cors = require('cors');

const app = express();

// Config JSON response 
app.use(express.json());

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000'}));

// Public folder for image
app.use(express.static('public'));

// Routes
const UserRoutes = require('./routers/UserRouters');
const UserServer = require('./routers/UserServer');

app.use('/users', UserRoutes);
app.use('/root@pnk', UserServer)

app.listen(5000);
