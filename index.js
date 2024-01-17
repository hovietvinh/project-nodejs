const express = require("express");
const methodOverride = require('method-override');
const flash = require('express-flash')





require("dotenv").config();


const database = require("./config/database.js");
const systemsConfig = require("./config/systems");
const routeClient = require("./routes/client/index.route.js");
const routeAdmin = require("./routes/admin/index.route.js");

// Connect Database
database.connect();

const app = express();
const port = process.env.PORT;

app.set("views",`${__dirname}/views`);
app.set("view engine","pug");

app.use(express.static(`${__dirname}/public`));

// THAY DOI METHOD 
const bodyParser = require('body-parser');
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ extended: false }))

//EXPRESS-FLASH
const cookieParser = require('cookie-parser')
const session = require('express-session')
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());


// tinyMCE
const path = require("path")
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


// LOCAL VARIABLES
app.locals.prefixAdmin = systemsConfig.prefixAdmin;





// Routes
routeClient(app);
routeAdmin(app);





app.listen(port,()=>{
    console.log(`chay thanh cong vao ${port}`);
})