import type { ThinkActionCategory } from '../types/think-action'

export const Categories: ThinkActionCategory[] = [
  {
    id: Math.random().toFixed(32).toString().substring(3),
    category: 'Finance'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    category: 'Mental Health'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    category: 'Education'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    category: 'Service'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    category: 'Relationship'
  }
]
