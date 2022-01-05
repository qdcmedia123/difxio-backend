require("dotenv").config();
import { app } from './app';


const start = async() => {

}

start();

app.listen(process.env.PORT || 8000, () => {
    console.log(`Starting server at port ${process.env.PORT || 3000}`)
});