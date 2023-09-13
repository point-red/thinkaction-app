export const uuid = function () {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c: any) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

export const Users = [
  {
    id: '47d5e69b-5346-4c88-8f41-7e31e977f5ab',
    goal_type: 'resolution',
    full_name: 'John Doe',
    username: 'johndoe123',
    avatar:
      'https://fastly.picsum.photos/id/1027/200/300.jpg?hmac=WCxdERZ7sgk4jhwpfIZT0M48pctaaDcidOi3dKSHJYY',
    bio: "Hello, I'm John!",
    is_private: false,
    is_supporting: true,
    goals_performance: 68,
    supporting_count: 45,
    supporter_count: 82
  },
  {
    id: 'e36ffbd7-1a79-4f28-8c62-9a396a7c2718',
    full_name: 'Jane Smith',
    username: 'janesmith456',
    avatar: 'https://picsum.photos/299/299',
    bio: 'Travel enthusiast and nature lover.',
    is_private: false,
    is_supporting: false,
    goals_performance: 90,
    supporting_count: 20,
    supporter_count: 60
  },
  {
    id: 'a1f4a1ca-8c35-4a42-a8c0-5f6d5e889aed',
    full_name: 'David Johnson',
    username: 'davidj85',
    avatar: 'https://picsum.photos/300/300',
    bio: 'Fitness freak and foodie!',
    is_private: true,
    is_supporting: true,
    goals_performance: 75,
    supporting_count: 60,
    supporter_count: 75
  },
  {
    id: 'f231c27d-4a05-464f-ba7b-53c38cfe0c2f',
    full_name: 'Emily Wilson',
    username: 'emilywonder',
    avatar: 'https://picsum.photos/301/301',
    bio: 'Adventurer and storyteller.',
    is_private: false,
    is_supporting: true,
    goals_performance: 72,
    supporting_count: 35,
    supporter_count: 48
  },
  {
    id: '889bcd09-0a0b-4b87-8c22-51a3b3987034',
    full_name: 'Michael Brown',
    username: 'mikebrown',
    avatar: 'https://picsum.photos/302/302',
    bio: 'Tech geek and gamer.',
    is_private: false,
    is_supporting: false,
    goals_performance: 56,
    supporting_count: 15,
    supporter_count: 40
  },
  {
    id: '6e89f049-834b-475b-a6a7-081fce1095d9',
    full_name: 'Olivia Davis',
    username: 'oliviad',
    avatar: 'https://picsum.photos/303/303',
    bio: 'Bookworm and coffee addict.',
    is_private: true,
    is_supporting: true,
    goals_performance: 85,
    supporting_count: 50,
    supporter_count: 70
  },
  {
    id: 'c1a0f792-057d-48eb-8047-158bdff8a32e',
    full_name: 'William Taylor',
    username: 'willtay',
    avatar: 'https://picsum.photos/304/304',
    bio: 'Music lover and musician.',
    is_private: false,
    is_supporting: false,
    goals_performance: 42,
    supporting_count: 10,
    supporter_count: 30
  },
  {
    id: '72ec4395-c9b0-4ec3-bcdf-952ce41b6ecb',
    full_name: 'Sophia Anderson',
    username: 'sophiaa',
    avatar: 'https://picsum.photos/305/305',
    bio: 'Art enthusiast and painter.',
    is_private: false,
    is_supporting: true,
    goals_performance: 78,
    supporting_count: 40,
    supporter_count: 55
  },
  {
    id: 'f11d4c86-7c52-4ac3-9d11-19f1cdd3c7c1',
    full_name: 'James Martinez',
    username: 'jamesm',
    avatar: 'https://picsum.photos/306/306',
    bio: 'Nature photographer.',
    is_private: true,
    is_supporting: true,
    goals_performance: 63,
    supporting_count: 25,
    supporter_count: 35
  },
  {
    id: '1b8d166b-b4c7-4027-8dd9-7b5bbec8f672',
    full_name: 'Ava Robinson',
    username: 'avarob',
    avatar: 'https://picsum.photos/307/307',
    bio: 'Fashionista and stylist.',
    is_private: false,
    is_supporting: false,
    goals_performance: 70,
    supporting_count: 18,
    supporter_count: 42
  }
]

export const UserRelations = [
  {
    user_id: '47d5e69b-5346-4c88-8f41-7e31e977f5ab',
    related_user_id: 'e36ffbd7-1a79-4f28-8c62-9a396a7c2718',
    supported_by_current: true,
    supported_by_related: false
  },
  {
    user_id: 'e36ffbd7-1a79-4f28-8c62-9a396a7c2718',
    related_user_id: 'a1f4a1ca-8c35-4a42-a8c0-5f6d5e889aed',
    supported_by_current: false,
    supported_by_related: true
  },
  {
    user_id: 'a1f4a1ca-8c35-4a42-a8c0-5f6d5e889aed',
    related_user_id: 'f231c27d-4a05-464f-ba7b-53c38cfe0c2f',
    supported_by_current: true,
    supported_by_related: false
  },
  {
    user_id: 'f231c27d-4a05-464f-ba7b-53c38cfe0c2f',
    related_user_id: '889bcd09-0a0b-4b87-8c22-51a3b3987034',
    supported_by_current: false,
    supported_by_related: true
  },
  {
    user_id: '889bcd09-0a0b-4b87-8c22-51a3b3987034',
    related_user_id: '6e89f049-834b-475b-a6a7-081fce1095d9',
    supported_by_current: true,
    supported_by_related: false
  },
  {
    user_id: '6e89f049-834b-475b-a6a7-081fce1095d9',
    related_user_id: 'c1a0f792-057d-48eb-8047-158bdff8a32e',
    supported_by_current: false,
    supported_by_related: true
  },
  {
    user_id: 'c1a0f792-057d-48eb-8047-158bdff8a32e',
    related_user_id: '72ec4395-c9b0-4ec3-bcdf-952ce41b6ecb',
    supported_by_current: true,
    supported_by_related: false
  },
  {
    user_id: '72ec4395-c9b0-4ec3-bcdf-952ce41b6ecb',
    related_user_id: 'f11d4c86-7c52-4ac3-9d11-19f1cdd3c7c1',
    supported_by_current: false,
    supported_by_related: true
  },
  {
    user_id: 'f11d4c86-7c52-4ac3-9d11-19f1cdd3c7c1',
    related_user_id: '1b8d166b-b4c7-4027-8dd9-7b5bbec8f672',
    supported_by_current: true,
    supported_by_related: false
  },
  {
    user_id: '1b8d166b-b4c7-4027-8dd9-7b5bbec8f672',
    related_user_id: '47d5e69b-5346-4c88-8f41-7e31e977f5ab',
    supported_by_current: false,
    supported_by_related: true
  }
]
