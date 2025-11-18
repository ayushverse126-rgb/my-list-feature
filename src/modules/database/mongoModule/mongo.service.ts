import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';

@Injectable()
export class MongoService implements OnModuleInit, OnModuleDestroy {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  async onModuleInit() {
    // Connect to MongoDB
    console.log('Establishing MongoDB Connection');
    await this.connect();
  }

  async connect() {
    try {
      console.log(process.env.MONGODB_URI)
      const connectionString = process.env.MONGODB_URI;
      await mongoose.connect(connectionString || '', {
        minPoolSize: 5,
        maxPoolSize: 30,
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.log(`MongoDB connection error: ${JSON.stringify(error)}`);
    }
  }

  async onModuleDestroy() {
    // Disconnect from MongoDB
    await this.connection.close();
  }
}
