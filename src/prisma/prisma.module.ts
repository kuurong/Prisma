import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
//다른곳에서 prisma 써야하므로
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
