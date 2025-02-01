import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from '../entities/teacher.entity';
import { faker } from '@faker-js/faker';

@Injectable()
export class TeacherSeeder {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
  ) {}

  async loadPredefinedTeachers() {
    const predefinedTeachers = [
      { name: 'Juan Pérez' },
      { name: 'María López' },
      { name: 'Carlos Gómez' },
    ];
    await this.teacherRepo.save(predefinedTeachers);
  }

  async generateTeachers(count: number) {
    const teachers = Array.from({ length: count }).map(() => ({
      name: faker.person.firstName(),
    }));

    await this.teacherRepo.save(teachers);
  }

  async seed() {
    const existingTeachers = await this.teacherRepo.count();
    if (existingTeachers > 0) return;
    await this.loadPredefinedTeachers();
  }
}
