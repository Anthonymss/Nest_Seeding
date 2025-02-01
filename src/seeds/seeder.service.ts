import { Injectable } from '@nestjs/common';
import { TeacherSeeder } from './teacher.seeder';
import { CourseSeeder } from './course.seeder';
import { StudentSeeder } from './student.seeder';

@Injectable()
export class SeederService {
  constructor(
    private readonly teacherSeeder: TeacherSeeder,
    private readonly courseSeeder: CourseSeeder,
    private readonly studentSeeder: StudentSeeder,
  ) {}
  async seed() {    
    await this.teacherSeeder.seed();
    await this.courseSeeder.seed();
    await this.studentSeeder.seed();
    console.log('se agregaron todos los datos de listas');
    
    }
  async generateTeachersDynamic() {
    await this.teacherSeeder.generateTeachers(100);
    console.log('.')
  }

  async generateCoursesDynamic() {
    await this.courseSeeder.generateCourses(100);
    console.log('..')
  }

  async generateStudentsDynamic() {
    await this.studentSeeder.generateStudents(100);
    console.log('...')
  }
  async generateAllDynamic(){
    await this.generateTeachersDynamic();
    await this.generateCoursesDynamic();
    await this.generateStudentsDynamic();
    console.log('se agregaron todos los datos dinamicos')
  }
  
}
