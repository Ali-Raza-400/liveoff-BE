import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../custom-decorators/role_decorator'; // Updated path
import { UserRole } from '../user/enums/role.enum'; // Updated path (depending on folder structure)

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required means it's public
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;  // This user is injected from `JwtStrategy`

    console.log("Decoded User in Guard:::", user);
    console.log("Required Roles:::", requiredRoles);

    if (!user) {
      return false; // No user found, deny access
    }

    return requiredRoles.includes(user.role);
  }
}
