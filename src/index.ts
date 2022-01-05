require("dotenv").config();
import { app } from './app';


const start = async() => {

}

start();

app.listen(3000, () => {
    console.log(`Starting server at port ${3000}`)
});