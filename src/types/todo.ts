// src/types/todo.ts
export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    userId?: number; // Optional, added for TodoDetail.tsx
  }