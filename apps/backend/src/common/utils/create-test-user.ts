import { User, UserStatus } from '@/database/entities';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export function createTestUserDto() {
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync('Efrei@2024', salt);
  const testUserDto: Partial<User> = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    status: faker.helpers.enumValue(UserStatus),
    salt,
    passwordHash,
  };

  return testUserDto;
}
