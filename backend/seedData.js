const mongoose = require('mongoose');
const Department = require('./models/Department');
const Faculty = require('./models/Faculty');

const connectDB = require('./config/db');

const sampleDepartments = [
  {
    name: 'Computer Science',
    description: 'Department of Computer Science and Engineering',
    facultyCount: 12
  },
  {
    name: 'Mathematics',
    description: 'Department of Mathematics and Statistics',
    facultyCount: 8
  },
  {
    name: 'Physics',
    description: 'Department of Physics and Applied Sciences',
    facultyCount: 10
  },
  {
    name: 'Chemistry',
    description: 'Department of Chemistry and Biochemistry',
    facultyCount: 7
  },
  {
    name: 'Biology',
    description: 'Department of Biological Sciences',
    facultyCount: 9
  }
];

const sampleFaculty = [
  {
    name: 'Dr. John Smith',
    department: 'Computer Science',
    email: 'john.smith@university.edu',
    phone: '+1-555-0123',
    status: 'Active'
  },
  {
    name: 'Prof. Sarah Johnson',
    department: 'Mathematics',
    email: 'sarah.johnson@university.edu',
    phone: '+1-555-0124',
    status: 'Active'
  },
  {
    name: 'Dr. Michael Brown',
    department: 'Physics',
    email: 'michael.brown@university.edu',
    phone: '+1-555-0125',
    status: 'Active'
  },
  {
    name: 'Prof. Emily Davis',
    department: 'Chemistry',
    email: 'emily.davis@university.edu',
    phone: '+1-555-0126',
    status: 'Active'
  },
  {
    name: 'Dr. Robert Wilson',
    department: 'Computer Science',
    email: 'robert.wilson@university.edu',
    phone: '+1-555-0127',
    status: 'Active'
  },
  {
    name: 'Prof. Lisa Anderson',
    department: 'Biology',
    email: 'lisa.anderson@university.edu',
    phone: '+1-555-0128',
    status: 'Active'
  }
];

const seedData = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Clear existing data
    await Department.deleteMany({});
    await Faculty.deleteMany({});
    
    console.log('Cleared existing data');
    
    // Insert departments
    const createdDepartments = await Department.insertMany(sampleDepartments);
    console.log('✅ Departments seeded successfully');
    
    // Insert faculty
    const createdFaculty = await Faculty.insertMany(sampleFaculty);
    console.log('✅ Faculty seeded successfully');
    
    console.log('\n📊 Database Summary:');
    console.log(`- Departments: ${createdDepartments.length}`);
    console.log(`- Faculty: ${createdFaculty.length}`);
    
    console.log('\n🎉 Sample data has been successfully added to the database!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData(); 