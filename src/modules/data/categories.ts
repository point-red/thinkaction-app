import type { ThinkActionCategory } from '../types/think-action'

export const Categories: ThinkActionCategory[] = [
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Finance',
    category: 'Finance'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Mental Health',
    category: 'Mental Health'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Education',
    category: 'Education'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Service',
    category: 'Service'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Relationship',
    category: 'Relationship'
  }
]
