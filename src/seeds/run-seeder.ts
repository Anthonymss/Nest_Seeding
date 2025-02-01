import { NestFactory } from '@nestjs/core';
import { SeederModule } from './seeder.module';
import { SeederService } from './seeder.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(SeederModule);
  const seeder = app.get(SeederService);

  await seeder.seed();//listas
  await seeder.generateAllDynamic();

  await app.close();
}

bootstrap().catch((err) => {
  console.error('Error:', err);
  process.exit(1);
});
