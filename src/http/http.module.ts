import { Module } from '@nestjs/common';
import { HttpModule as AxiosModule } from '@nestjs/axios';
import { HttpProvider } from './http.provider';
import { HttpService } from './services';

@Module({
  imports: [AxiosModule],
  providers: [HttpProvider, HttpService],
  exports: [HttpProvider, HttpService]
})
export class HttpModule {}
