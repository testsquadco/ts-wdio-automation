import fs from 'fs';
import path from 'path';
import { faker } from '@faker-js/faker';
import { EnvironmentUtils } from './environment.utils';

export class DataUtils {
    /**
     * Loads test data from a JSON file
     */
    loadTestData(fileName?: string) {
        const env = process.env.TEST_ENV?.toLowerCase() || 'qa';
        const dataFile = fileName || `${env}.json`;
        const filePath = path.join(process.cwd(), 'test/data', dataFile);
        try {
            const rawData = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(rawData);
        } catch (error) {
            throw new Error(`Error loading test data from ${fileName}: ${error}`);
        }
    }

    /**
     * Generates random test data using faker
     */
    generateTestData() {
        return {
            user: {
                email: faker.internet.email(),
                password: faker.internet.password(),
                firstName: faker.person.firstName(),
                lastName: faker.person.lastName(),
                phone: faker.phone.number()
            },
            address: {
                street: faker.location.street(),
                city: faker.location.city(),
                state: faker.location.state(),
                zipCode: faker.location.zipCode()
            }
        };
    }

    /**
     * Saves test data to a JSON file
     */
    saveTestData(data: any, fileName: string) {
        const filePath = path.join(process.cwd(), 'test/data', fileName);
        try {
            fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        } catch (error) {
            throw new Error(`Error saving test data to ${fileName}: ${error}`);
        }
    }
}

export default new DataUtils(); 