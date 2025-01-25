import { faker } from '@faker-js/faker';

export const dataToUser = () => {
    const data = {
        name: faker.person.fullName(),
        job: faker.person.jobTitle()
    };
    return data;
};