const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const Profile = require('./models/Profile');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/crisis_advocate';

const specializations = ['Criminal Law', 'Corporate Law', 'Family Law', 'Civil Litigation'];

const generateProfiles = (num) => {
  const profiles = [];
  for (let i = 0; i < num; i++) {
    profiles.push({
      name: `Advocate ${faker.person.fullName()}`,
      specialization: faker.helpers.arrayElement(specializations),
      experience: `${faker.number.int({ min: 3, max: 25 })}+ Years`,
      location: `${faker.location.city()}, ${faker.location.country()}`,
      photo: faker.image.avatar(),
      coordinates: [
        faker.location.latitude(),
        faker.location.longitude()
      ],
      credentials: [
        { title: 'Legal Degree', body: `Graduated from ${faker.company.name()} Law School.` },
        { title: 'Bar Council', body: 'Admitted to the High Court.' },
        { title: faker.company.catchPhrase(), body: faker.lorem.sentence() }
      ],
      timeline: [
        { year: '2023', event: faker.person.jobTitle() },
        { year: '2018', event: faker.person.jobTitle() },
        { year: '2015', event: 'Started Legal Practice' }
      ]
    });
  }
  return profiles;
};

const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    console.log('Deleting existing profiles...');
    await Profile.deleteMany({});
    console.log('Existing profiles deleted.');

    console.log('Generating new profiles...');
    const profiles = generateProfiles(25);
    
    console.log('Inserting profiles into database...');
    await Profile.insertMany(profiles);
    console.log('Successfully seeded 25 advocate profiles!');

  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed.');
  }
};

seedDB();
