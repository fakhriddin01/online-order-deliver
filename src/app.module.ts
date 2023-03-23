import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';
import { CurrencyTypeModule } from './currency_type/currency_type.module';
import { OrderModule } from './order/order.module';
import { StatusModule } from './status/status.module';
import { OperationModule } from './operation/operation.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true}),
        MongooseModule.forRoot(process.env.MONGO_URI),
        AdminModule,
        CurrencyTypeModule,
        OrderModule,
        StatusModule,
        OperationModule,
        
        ],
    controllers: [],
    providers: [],
    exports: []
})
export class AppModule {}
