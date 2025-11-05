const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/database');
const setupSwagger = require('./docs/swagger');
const indexRoutes = require('./routes/indexRoutes');
const booksRoutes = require('./routes/booksRoutes');
const authorsRoutes = require('./routes/authorsRoutes');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');

connectDB();
setupSwagger(app);

app.use(express.static(path.join(__dirname, 'frontend')));

app.use(cors({
    origin: 'http://localhost:5173',
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'x-api-key'],
}));

app.use(express.json());

app.use(indexRoutes);
app.use(authRoutes);
app.use('/api',authMiddleware.authenticate);
app.use(booksRoutes);
app.use(authorsRoutes);



app.use(errorMiddleware.errorHandler);

app.listen(process.env.PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${process.env.PORT}`);
});

