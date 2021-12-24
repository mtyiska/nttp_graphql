import dotenv from "dotenv";
import {createConnection} from "typeorm";
import app from "./app";
import config from "./config/database";
dotenv.config()


const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

const bootstrap = async () =>{
    /* Server startup */
    const serverApp = await app();
    const server = serverApp.listen(PORT, () =>{
        console.log(`App listening on port ${PORT}`);
        return  createConnection(config).catch((err) =>{
            console.warn("Unable to connect to db", err);
            process.exit(1);
        })
    })

    /* Server shutdown */
    const gracefulShutdown = async (callType: any) =>{
        console.error(`${callType} signal recieved`);
        // Stops server from accepting new connection and finishes exiting
        server.close(function(err:any){
            if(err){
                console.error("sever error", err);
                process.exit(1);
            }else{
                process.exit(0);
            }
        })
    }
    process.on("SIGINT", async () => gracefulShutdown("SIGNINT"));
}

export default bootstrap();



