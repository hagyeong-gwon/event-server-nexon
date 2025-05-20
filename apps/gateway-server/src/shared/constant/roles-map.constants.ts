export interface RouteAccess {
  method: string;
  path: string;
  roles: string[];
}

export const RoleAccessList: RouteAccess[] = [
  { method: 'ANY', path: '**/api/**', roles: ['USER'] },
  { method: 'GET', path: '**/claim/**', roles: ['AUDITOR'] },
  { method: 'ANY', path: '**/admin/event/**', roles: ['OPERATOR'] },
  { method: 'ANY', path: '**/admin/reward/**', roles: ['OPERATOR'] },
  { method: 'ANY', path: '/**', roles: ['ADMIN'] },
];

export const PublicAccessList = [
  '/auth/signIn',
  '/auth/signUp',
  '**/docs/**',
  '**/docs-json',
  '/favicon.ico',
];
