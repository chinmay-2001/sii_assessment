// data.ts
export const USERS = [
  {
    id: 1,
    name: 'John Doe',
    roles: ['ADMIN'],
    groups: ['GROUP_1', 'GROUP_2'],
  },
  {
    id: 2,
    name: 'Grabriel Monroe',
    roles: ['PERSONAL'],
    groups: ['GROUP_1', 'GROUP_2'],
  },
  { id: 3, name: 'Alex Xavier', roles: ['PERSONAL'], groups: ['GROUP_2'] },
  {
    id: 4,
    name: 'Jarvis Khan',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_2'],
  },
  {
    id: 5,
    name: 'Martines Polok',
    roles: ['ADMIN', 'PERSONAL'],
    groups: ['GROUP_1'],
  },
  {
    id: 6,
    name: 'Gabriela Wozniak',
    roles: ['VIEWER', 'PERSONAL'],
    groups: ['GROUP_1'],
  },
];

export type RoleCode = 'ADMIN' | 'PERSONAL' | 'VIEWER';

export const ROLES: RoleCode[] = ['ADMIN', 'PERSONAL', 'VIEWER'];

export type GroupCode = 'GROUP_1' | 'GROUP_2';

export const GROUPS: GroupCode[] = ['GROUP_1', 'GROUP_2'];

export const PERMISSIONS = ['CREATE', 'VIEW', 'EDIT', 'DELETE'];

export const MODIFIED_ROLES = [
  {
    name: 'Admin',
    code: 'ADMIN',
    permissions: ['CREATE', 'VIEW', 'EDIT', 'DELETE'],
  },
  { name: 'Personal', code: 'PERSONAL', permissions: [] },
  { name: 'Viewer', code: 'VIEWER', permissions: ['VIEW'] },
];
