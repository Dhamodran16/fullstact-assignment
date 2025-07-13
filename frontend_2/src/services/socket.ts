import { io, Socket } from 'socket.io-client';
import type { Department, Faculty } from './api';

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  connect() {
    if (this.socket) return;

    this.socket = io('http://localhost:5000', {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    // Set up event listeners
    this.setupEventListeners();
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  private setupEventListeners() {
    if (!this.socket) return;

    // Department events
    this.socket.on('departmentCreated', (department: Department) => {
      this.notifyListeners('departmentCreated', department);
    });

    this.socket.on('departmentUpdated', (department: Department) => {
      this.notifyListeners('departmentUpdated', department);
    });

    this.socket.on('departmentDeleted', (data: { id: string; name: string }) => {
      this.notifyListeners('departmentDeleted', data);
    });

    // Faculty events
    this.socket.on('facultyCreated', (faculty: Faculty) => {
      this.notifyListeners('facultyCreated', faculty);
    });

    this.socket.on('facultyUpdated', (faculty: Faculty) => {
      this.notifyListeners('facultyUpdated', faculty);
    });

    this.socket.on('facultyDeleted', (data: { id: string; department: string }) => {
      this.notifyListeners('facultyDeleted', data);
    });
  }

  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
  }

  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
    }
  }

  private notifyListeners(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error(`Error in socket event listener for ${event}:`, error);
        }
      });
    }
  }
}

export const socketService = new SocketService(); 