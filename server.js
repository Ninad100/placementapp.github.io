import { connectToMongodb } from "./db.config.js";
import { app } from "./index.js";


app.listen(3000,()=>{
    console.log("App is listening at 3000");
    connectToMongodb();
})