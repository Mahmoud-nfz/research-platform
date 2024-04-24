import { AddUserGuard } from '@auth/guards/add-user.guard';
import { UseGuards } from '@nestjs/common';

export const UseAddUserAuth = () => UseGuards(AddUserGuard);
