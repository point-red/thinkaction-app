import type { ThinkActionCategory } from '../types/think-action'

export const Categories: ThinkActionCategory[] = [
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Kesehatan',
    category: 'Kesehatan'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Karir',
    category: 'Karir'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Keuangan',
    category: 'Keuangan'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Pendidikan',
    category: 'Pendidikan'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Hobi',
    category: 'Hobi'
  },
  {
    id: Math.random().toFixed(32).toString().substring(3),
    label: 'Relasi',
    category: 'Relasi'
  }
]
