const express = require('express');
const app = express();
const cors = require('cors');
const connectToMongoDb = require('./dbConnection/connect');

const customer = require('./routes/customersRoute');
const requestBloodRoute = require('./routes/bloodRequestRoute');
const bloodBag = require('./routes/BoolBagRoute');
const RequestBloodBags = require('./routes/requestBloodbagRoute');
const patient = require('./routes/PatientRoute');



const cookieParser = require('cookie-parser');


// middleawre
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());


//set route
app.use('/api/v1/customers', customer);

app.use('/api/v1/requestBloodByAdmission', requestBloodRoute);

app.use('/api/v1/BloodBags', bloodBag);

app.use('/api/v1/RequestBloodBags', RequestBloodBags);

app.use('/api/v1/patient', patient);



const runServerApplication = async () => {
    try {
        await connectToMongoDb(process.env.MONGO_URL_KEY);
        app.listen(3000, () => {
            console.log('the server is running on port 3000');
        })
    } catch (error) {
        console.error(error);
    }
}

runServerApplication();