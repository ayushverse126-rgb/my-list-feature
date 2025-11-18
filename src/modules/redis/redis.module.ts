import { Global, Module } from '@nestjs/common';
import { RedisProvider } from './redis.provider';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS',
      useFactory: async () => {
        const client = createClient({
          url: 'redis://localhost:6379',
        });

        client.on('error', (err) => console.error('Redis Error:', err));
        await client.connect();
        console.log('Redis connected');
        return client;
      },
    },
  ],
  exports: ['REDIS'],
})
export class RedisModule {}
