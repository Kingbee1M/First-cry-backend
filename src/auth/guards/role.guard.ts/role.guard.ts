import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEYS } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/auth/enums/role.enums';


@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean {

    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEYS, [
      context.getHandler(),
      context.getClass(),
    ])


    const { user } = context.switchToHttp().getRequest();
    const haseRequiredRole = requiredRoles.some((role) => user.role === role);

    return haseRequiredRole
  }
}
