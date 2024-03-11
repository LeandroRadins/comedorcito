import { PermissionObject } from './types'; // Import the PermissionObject type

export const PERMISSIONS: Record<string, PermissionObject> = {
        // ... (other permissions)
        EMPLOYEE_EDIT_ACCOUNT: {
            name: 'EMPLOYEE_EDIT_ACCOUNT',
            path: ['/employees/edit-employee', '/employees/add-employee'],
        },
        // ... (other permissions)
    };
