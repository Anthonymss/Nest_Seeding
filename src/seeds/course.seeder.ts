import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../entities/course.entity';
import { Teacher } from '../entities/teacher.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class CourseSeeder {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async loadPredefinedCourses() {
    const teachers = await this.teacherRepo.find();
    if (teachers.length === 0) return;

    const predefinedCourses = [
      { name: 'Matemáticas', teacher: teachers[0] },
      { name: 'Historia', teacher: teachers[1] },
      { name: 'Física', teacher: teachers[2] },
    ];

    await this.courseRepo.save(predefinedCourses);
  }

  async generateCourses(count: number) {
    const teachers = await this.teacherRepo.find();
    if (teachers.length === 0) return;

    const courses = Array.from({ length: count }).map(() => ({
      name: faker.word.noun(), 
      teacher: teachers[Math.floor(Math.random() * teachers.length)],  
    }));

    await this.courseRepo.save(courses);
  }

  async seed() {
    const existingCourses = await this.courseRepo.count();
    if (existingCourses > 0) return;
    await this.loadPredefinedCourses();
  }
}
