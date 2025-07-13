const io = require('socket.io-client');

// Connect to the server
const socket = io('http://localhost:5000');

socket.on('connect', () => {
  console.log('Connected to server');
  
  // Test department creation event
  console.log('Testing department creation event...');
  socket.emit('testDepartmentCreated', {
    _id: 'test123',
    name: 'Test Department',
    description: 'Test Description',
    facultyCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });
});

socket.on('departmentCreated', (data) => {
  console.log('Received departmentCreated event:', data);
});

socket.on('departmentUpdated', (data) => {
  console.log('Received departmentUpdated event:', data);
});

socket.on('departmentDeleted', (data) => {
  console.log('Received departmentDeleted event:', data);
});

socket.on('facultyCreated', (data) => {
  console.log('Received facultyCreated event:', data);
});

socket.on('facultyUpdated', (data) => {
  console.log('Received facultyUpdated event:', data);
});

socket.on('facultyDeleted', (data) => {
  console.log('Received facultyDeleted event:', data);
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

// Keep the connection alive for testing
setTimeout(() => {
  console.log('Test completed');
  socket.disconnect();
  process.exit(0);
}, 5000); 