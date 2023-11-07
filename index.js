const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const fileupload = require('express-fileupload');
const routes = require('./uilchilgee/routes');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

dotenv.config({path: './config/config.env'});
const app = express();

connectDB();
app.use(express.json({limit: '10mb'}));
app.use(express.json());
app.use(cors());
app.use(fileupload());
app.use(logger);
app.use('/api', routes);
app.use("/togloltiinZurag", express.static(process.env.FILE_UPLOAD_PATH));
app.use(errorHandler);

const server = app.listen(process.env.PORT, console.log('Express сервер аслаа: ', process.env.PORT));
process.on('unhandledRejection', (err, promise) => {
    console.log(`Алдаа гарлаа : ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});

