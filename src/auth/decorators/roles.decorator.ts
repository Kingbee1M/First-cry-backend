import { SetMetadata } from "@nestjs/common";
import { UserRole } from "../enums/role.enums";

export const ROLES_KEYS = 'roles';

// Change "UserRole" to "role" in the second argument of SetMetadata
export const Roles = (...role: UserRole[]) => SetMetadata(ROLES_KEYS, role);