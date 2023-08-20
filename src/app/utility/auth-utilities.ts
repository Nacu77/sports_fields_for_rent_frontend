import { UserService } from '../services/user/user.service';

export function shouldElementDisplay(userService: UserService, ownedBy: string | null): boolean {
  const username = userService.getUsername();
  if (!userService.isLoggedIn() || ownedBy !== username || (ownedBy === null && username === null)) {
    return false;
  }

  return true;
}
