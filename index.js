const express = require('express');
const cors = require('cors');
const authRoutes = require('./app/routes/authRoutes');
const feedbackRoutes = require('./app/routes/feedbackRoutes');
const dashboardRoutes = require('./app/routes/dashboardRoutes');

const app = express();
const PORT = 3001;

// MIDDLEWARES //
app.use( express.json() );
// END OF MIDDLEWARES //

// ROUTES //
app.use( '/api/auth', authRoutes );
app.use( '/api/feedback', feedbackRoutes );
app.use( '/api/dashboard', dashboardRoutes );
// END OF ROUTES //

app.listen( PORT, () => {
    console.log(` Customer Feedback Server Running On Port: ${ PORT } `);
});