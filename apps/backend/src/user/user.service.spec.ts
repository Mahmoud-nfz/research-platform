import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModuleMock } from '@/database/database.module.mock';
import { DatabaseModule } from '@/database/database.module';
import { UserService } from './user.service';
import { createTestUserDto } from '@/common/utils/create-test-user';
import { ConfigModule } from '@/config';
import { LoggerModule } from '@/logger/logger.module';
import { User } from '@/database/entities';
import { FindOneOptions } from 'typeorm';

describe('User Service', () => {
	let module: TestingModule;
	let userService: UserService;
	let testUserDto: Partial<User>;
	const select: FindOneOptions<User>['select'] = [
		'firstName',
		'lastName',
		'email',
		'passwordHash',
		'salt',
		'status',
	];

	beforeEach(async () => {
		module = await Test.createTestingModule({
			imports: [ConfigModule.forRoot(), LoggerModule, DatabaseModule],
			providers: [UserService],
		})
			.overrideModule(DatabaseModule)
			.useModule(DatabaseModuleMock)
			.compile();
		module.enableShutdownHooks();
		testUserDto = createTestUserDto();
		userService = module.get(UserService);
	});

	afterEach(() => {
		module.close();
	});

	it('should be defined', () => {
		expect(userService).toBeDefined();
	});

	it('should be able to create a user', async () => {
		const result = await userService.createOne({ ...testUserDto });
		expect(result).toMatchObject(testUserDto);
	});

	it('should be able to find a user by id', async () => {
		const { id } = await userService.createOne({ ...testUserDto });
		const result = await userService.findOne(id, select);
		expect(result).toMatchObject(testUserDto);
	});

	it('should be able to update a user by id', async () => {
		const { id } = await userService.createOne({ ...testUserDto });
		const updates = {
			firstName: 'harry',
			lastName: 'potter',
		};
		await userService.updateOne(id, { ...updates });
		const result = await userService.findOne(id, select);
		expect(result).toMatchObject({
			...testUserDto,
			...updates,
		});
	});

	it('should be able to find a user by email', async () => {
		await userService.createOne({ ...testUserDto });
		const result = await userService.findOneByEmail(testUserDto.email, select);
		expect(result).toMatchObject(testUserDto);
	});

	it('should be able to update a user by email', async () => {
		await userService.createOne({ ...testUserDto });
		const updates = {
			firstName: 'harry',
			lastName: 'styles',
		};
		await userService.updateOneByEmail(testUserDto.email, { ...updates });
		const result = await userService.findOneByEmail(testUserDto.email, select);
		expect(result).toMatchObject({
			...testUserDto,
			...updates,
		});
	});
});
