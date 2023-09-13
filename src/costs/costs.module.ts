import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';


import { AutModule } from 'src/auth/auth.module';
import { CostsService } from './costs.service';
import { CostController } from './costs.controller';
import { Cost, CostSchema } from 'src/schemas/costs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cost.name, schema: CostSchema }]),
   AutModule
  ],
  controllers: [CostController],
  providers: [CostsService],
 
})
export class CostsModule {}
