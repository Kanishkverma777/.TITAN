const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');



const PORT = process.env.PORT || 8000;
app.use(cookieParser());
app.use(express.json());

require('./Databaseconnections/conn'); 


const gymroute = require('./Routes/gymroute');






app.use("/auth", gymroute);




app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});