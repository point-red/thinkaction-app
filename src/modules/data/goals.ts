import { Categories } from './categories'

export const Goals = [
  {
    id: '93e850f0-18e5-439e-8f1e-9f87cfdbb540',
    user_id: '47d5e69b-5346-4c88-8f41-7e31e977f5ab',
    user: {
      name: 'John Doe',
      username: 'johndoe123',
      avatar:
        'https://fastly.picsum.photos/id/1027/300/300.jpg?hmac=WCxdERZ7sgk4jhwpfIZT0M48pctaaDcidOi3dKSHJYY'
    },
    category: 'Financial',
    caption: 'Save money for a vacation.',
    photos: ['https://picsum.photos/id/48/5000/3333', 'https://picsum.photos/id/57/5000/3333'],
    is_liked_by_user: false,
    cheers_count: 20,
    comments_count: 10,
    visibility: 'public',
    date_time: '2023-09-31T10:00:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-01T09:45:00Z'
  },
  {
    id: '71eb33e1-87f7-4ec5-9c48-9f0357f9fda4',
    user_id: 'e36ffbd7-1a79-4f28-8c62-9a396a7c2718',
    user: {
      name: 'Jane Smith',
      username: 'janesmith456',
      avatar: 'https://example.com/avatar2.jpg'
    },
    category: 'Health',
    caption: 'Run a marathon by the end of the year.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 15,
    comments_count: 5,
    visibility: 'public',
    date_time: '2023-09-15T08:30:00Z',
    goal_type: 'weekly',
    meta: {},
    created_at: '2023-09-12T10:30:00Z'
  },
  {
    id: '7d2efb3f-c6e9-4c4e-88d9-4d11e9bf0b88',
    user_id: 'a1f4a1ca-8c35-4a42-a8c0-5f6d5e889aed',
    user: {
      name: 'David Johnson',
      username: 'davidj85',
      avatar: 'https://example.com/avatar3.jpg'
    },
    category: 'Career',
    caption: 'Get a promotion within the next six months.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 25,
    comments_count: 8,
    visibility: 'public',
    date_time: '2023-09-20T14:00:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-12T11:15:00Z'
  },
  {
    id: 'fadec193-2b49-4c51-8af2-99ac2b82e7b0',
    user_id: 'f231c27d-4a05-464f-ba7b-53c38cfe0c2f',
    user: {
      name: 'Emily Wilson',
      username: 'emilywonder',
      avatar: 'https://example.com/avatar4.jpg'
    },
    category: 'Travel',
    caption: 'Visit 5 new countries this year.',
    photos: ['https://example.com/photo4.jpg'],
    is_liked_by_user: false,
    cheers_count: 30,
    comments_count: 12,
    visibility: 'public',
    date_time: '2023-09-18T09:00:00Z',
    goal_type: 'weekly',
    meta: {},
    created_at: '2023-09-12T11:45:00Z'
  },
  {
    id: '06d6d6e5-727b-438b-b1e1-1d4bc4d3c76f',
    user_id: '889bcd09-0a0b-4b87-8c22-51a3b3987034',
    user: {
      name: 'Michael Brown',
      username: 'mikebrown',
      avatar: 'https://example.com/avatar5.jpg'
    },
    category: 'Fitness',
    caption: 'Complete a 30-day fitness challenge.',
    photos: ['https://example.com/photo5.jpg'],
    is_liked_by_user: false,
    cheers_count: 18,
    comments_count: 7,
    visibility: 'public',
    date_time: '2023-09-14T17:30:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-12T12:00:00Z'
  },
  {
    id: '0f6823d2-6b7c-4d84-93ce-3a55f81c4a75',
    user_id: '6e89f049-834b-475b-a6a7-081fce1095d9',
    user: {
      name: 'Olivia Davis',
      username: 'oliviad',
      avatar: 'https://example.com/avatar6.jpg'
    },
    category: 'Education',
    caption: 'Learn a new language by the end of the year.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 22,
    comments_count: 9,
    visibility: 'public',
    date_time: '2023-09-16T11:00:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-12T12:30:00Z'
  },
  {
    id: '1c7de7e2-021d-4e3f-bd9e-31d963d8b125',
    user_id: 'c1a0f792-057d-48eb-8047-158bdff8a32e',
    user: {
      name: 'William Taylor',
      username: 'willtay',
      avatar: 'https://example.com/avatar7.jpg'
    },
    category: 'Hobby',
    caption: 'Paint a masterpiece this month.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 27,
    comments_count: 11,
    visibility: 'public',
    date_time: '2023-09-13T15:45:00Z',
    goal_type: 'weekly',
    meta: {},
    created_at: '2023-09-12T13:15:00Z'
  },
  {
    id: '4db4e878-0db0-4316-8c82-8d6e61f9c12f',
    user_id: '72ec4395-c9b0-4ec3-bcdf-952ce41b6ecb',
    user: {
      name: 'Sophia Anderson',
      username: 'sophiaa',
      avatar: 'https://example.com/avatar8.jpg'
    },
    category: 'Fitness',
    caption: 'Complete a half marathon this year.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 30,
    comments_count: 12,
    visibility: 'public',
    date_time: '2023-09-19T08:00:00Z',
    goal_type: 'weekly',
    meta: {},
    created_at: '2023-09-12T13:45:00Z'
  },
  {
    id: 'f3e631e3-eb6a-48d7-bd35-cd6b249b36a7',
    user_id: '1b8d166b-b4c7-4027-8dd9-7b5bbec8f672',
    user: {
      name: 'Ava Robinson',
      username: 'avarob',
      avatar: 'https://example.com/avatar10.jpg'
    },
    category: 'Fashion',
    caption: 'Launch my own clothing line by next year.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 15,
    comments_count: 6,
    visibility: 'public',
    date_time: '2023-09-17T14:30:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-12T14:00:00Z'
  },
  {
    id: 'cdc354c9-859f-48ed-9f39-6ed92e542179',
    user_id: '47d5e69b-5346-4c88-8f41-7e31e977f5ab',
    user: {
      name: 'John Doe',
      username: 'johndoe123',
      avatar: 'https://example.com/avatar1.jpg'
    },
    category: 'Travel',
    caption: 'Explore the Amazon Rainforest.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 12,
    comments_count: 4,
    visibility: 'public',
    date_time: '2023-09-21T09:30:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-12T14:30:00Z'
  },
  {
    id: '8a944051-2826-41e3-b885-5a95c57a28e9',
    user_id: 'e36ffbd7-1a79-4f28-8c62-9a396a7c2718',
    user: {
      name: 'Jane Smith',
      username: 'janesmith456',
      avatar: 'https://example.com/avatar2.jpg'
    },
    category: 'Fitness',
    caption: 'Complete 100 push-ups every day for a month.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 30,
    comments_count: 15,
    visibility: 'public',
    date_time: '2023-09-22T07:45:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-02T17:30:00Z'
  },
  {
    id: '4a69575c-67ef-4f6a-9e6f-96491bf9f227',
    user_id: 'a1f4a1ca-8c35-4a42-a8c0-5f6d5e889aed',
    user: {
      name: 'David Johnson',
      username: 'davidj85',
      avatar: 'https://example.com/avatar3.jpg'
    },
    category: 'Education',
    caption: 'Earn a certification in project management.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 20,
    comments_count: 9,
    visibility: 'public',
    date_time: '2023-09-23T13:00:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-02T17:30:00Z'
  },
  {
    id: '952f234a-bb5c-4bf0-8ed5-01367e959aae',
    user_id: 'f231c27d-4a05-464f-ba7b-53c38cfe0c2f',
    user: {
      name: 'Emily Wilson',
      username: 'emilywonder',
      avatar: 'https://example.com/avatar4.jpg'
    },
    category: 'Travel',
    caption: 'Climb Mount Kilimanjaro.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 28,
    comments_count: 10,
    visibility: 'public',
    date_time: '2023-09-24T09:30:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-02T17:30:00Z'
  },
  {
    id: 'a4fcf81c-7056-4e82-8652-54d2e699e3e2',
    user_id: '889bcd09-0a0b-4b87-8c22-51a3b3987034',
    user: {
      name: 'Michael Brown',
      username: 'mikebrown',
      avatar: 'https://example.com/avatar5.jpg'
    },
    category: 'Health',
    caption: 'Achieve a healthy weight by the end of the year.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 32,
    comments_count: 14,
    visibility: 'public',
    date_time: '2023-09-25T14:45:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-02T17:30:00Z'
  },
  {
    id: 'fe4aa1b4-184d-45c3-8ad0-8ac1b89990eb',
    user_id: '6e89f049-834b-475b-a6a7-081fce1095d9',
    user: {
      name: 'Olivia Davis',
      username: 'oliviad',
      avatar: 'https://example.com/avatar6.jpg'
    },
    category: 'Fitness',
    caption: 'Run a marathon by the end of the year.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 20,
    comments_count: 8,
    visibility: 'public',
    date_time: '2023-09-26T08:00:00Z',
    goal_type: 'resolution',
    meta: {},
    created_at: '2023-09-02T17:30:00Z'
  },
  {
    id: 'd14816f6-9a5e-4c8a-9e17-3e4ac10367ad',
    user_id: 'c1a0f792-057d-48eb-8047-158bdff8a32e',
    user: {
      name: 'William Taylor',
      username: 'willtay',
      avatar: 'https://example.com/avatar7.jpg'
    },
    category: 'Hobby',
    caption: 'Complete a 1000-piece jigsaw puzzle.',
    photos: [],
    is_liked_by_user: false,
    cheers_count: 25,
    comments_count: 10,
    visibility: 'public',
    date_time: '2023-09-27T09:30:00Z',
    goal_type: 'weekly',
    meta: {},
    created_at: '2023-09-02T17:30:00Z'
  }
]
