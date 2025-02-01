import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from '../entities/student.entity';
import { Course } from '../entities/course.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class StudentSeeder {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepo: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepo: Repository<Course>,
  ) {}

  async loadPredefinedStudents() {
    const courses = await this.courseRepo.find();
    if (courses.length === 0) return;

    const predefinedStudents = [
      { name: 'Pedro', email: 'pedro@example.com', courses: [courses[0], courses[1]] },
      { name: 'Ana', email: 'ana@example.com', courses: [courses[1]] },
    ];

    await this.studentRepo.save(predefinedStudents);
  }

  async generateStudents(count: number) {
    const courses = await this.courseRepo.find();
    if (courses.length === 0) return;

    const students = Array.from({ length: count }).map(() => ({
      name: faker.person.firstName(),
      email: faker.internet.email(),
      courses: [courses[Math.floor(Math.random() * courses.length)]],
    }));

    await this.studentRepo.save(students);
  }

  async seed() {
    const existingStudents = await this.studentRepo.count();
    if (existingStudents > 0) return;
    await this.loadPredefinedStudents();
  }
}
