import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from './require-permission.decorator';
import { PermissionService } from './permission.service';
import { Request } from 'express';
import { User } from '@database/entities';

type PermissionAggregate = {
  subject: (request: Request) => string | string[];
  actions: string[];
};

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly permissionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user as User;
    const requiredPermissionsArray = this.reflector.getAllAndMerge<
      PermissionAggregate[]
    >(PERMISSION_KEY, [context.getHandler(), context.getClass()]);

    const requiredPermissionsMap = requiredPermissionsArray
      .map((p) => {
        const subject = p.subject(request);
        return Array.isArray(subject)
          ? subject.map((s) => ({
              subject: s,
              actions: p.actions,
            }))
          : {
              subject: subject,
              actions: p.actions,
            };
      })
      .flat()
      .reduce(
        (prev, curr) => ({ ...prev, [curr.subject]: curr.actions }),
        {} as Record<string, string[]>,
      );

    return this.permissionService.checkUserPermissions(
      user,
      requiredPermissionsMap,
    );
  }
}
