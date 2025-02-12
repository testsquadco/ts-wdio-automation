export interface Environment {
    baseUrl: string;
    apiUrl: string;
    timeout: number;
    retries: number;
    users: {
        admin: {
            username: string;
            password: string;
        };
        standard: {
            username: string;
            password: string;
        };
    };
}

export const environments: Record<string, Environment> = {
    qa: {
        baseUrl: 'https://qa.example.com',
        apiUrl: 'https://api.qa.example.com',
        timeout: 30000,
        retries: 2,
        users: {
            admin: {
                username: 'qa-admin',
                password: 'password123'
            },
            standard: {
                username: 'qa-user',
                password: 'password123'
            }
        }
    },
    staging: {
        baseUrl: 'https://staging.example.com',
        apiUrl: 'https://api.staging.example.com',
        timeout: 30000,
        retries: 1,
        users: {
            admin: {
                username: 'admin@staging.com',
                password: 'stagingAdmin123'
            },
            standard: {
                username: 'user@staging.com',
                password: 'stagingUser123'
            }
        }
    },
    production: {
        baseUrl: 'https://example.com',
        apiUrl: 'https://api.example.com',
        timeout: 40000,
        retries: 0,
        users: {
            admin: {
                username: 'admin@example.com',
                password: process.env.PROD_ADMIN_PASSWORD || ''
            },
            standard: {
                username: 'user@example.com',
                password: process.env.PROD_USER_PASSWORD || ''
            }
        }
    }
}; 