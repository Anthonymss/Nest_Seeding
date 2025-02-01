import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Teacher } from '../entities/teacher.entity';
import { Course } from '../entities/course.entity';
import { Student } from '../entities/student.entity';
import { SeederService } from './seeder.service';
import { TeacherSeeder } from './teacher.seeder';
import { CourseSeeder } from './course.seeder';
import { StudentSeeder } from './student.seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
        isGlobal: true,
      }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres', 
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USER','admin'),
        password: configService.get<string>('DB_PASSWORD','root'),
        database: configService.get<string>('DB_NAME','postgres'),
        entities: [Teacher, Course, Student],
        synchronize: false,
      }),
    }),

    TypeOrmModule.forFeature([Teacher, Course, Student]), 
  ],
  providers: [
    TeacherSeeder,
    CourseSeeder,
    StudentSeeder,
    SeederService,
  ],
})
export class SeederModule {
  constructor(private dataSource: DataSource) {} 
}
