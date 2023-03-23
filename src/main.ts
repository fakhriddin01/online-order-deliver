import { AppModule } from './app.module';
import { NestFactory } from "@nestjs/core"
import * as cookieParser from 'cookie-parser';

const start = async () => {
    try {
        const app = await NestFactory.create(AppModule)
        const PORT = process.env.PORT
        app.setGlobalPrefix('api');
        app.use(cookieParser());
        app.listen(PORT, ()=> {
            console.log(`Server is running on ${PORT}`);
        });
    } catch (error) {
        console.log(error);        
    }    
}

start();