import { Module } from '@nestjs/common';
import { HttpModule as AxiosModule } from '@nestjs/axios';
import { HTTPProvider } from './http.provider';
import { HTTPService } from './services';

@Module({
  imports: [AxiosModule],
  providers: [HTTPProvider, HTTPService],
  exports: [HTTPProvider, HTTPService]
})
export class HTTPModule {}
