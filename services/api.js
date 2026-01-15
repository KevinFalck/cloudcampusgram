const BASE_URL = 'https://packtpublishing.github.io/Simplifying-State-Management-in-React-Native';

export const fetchUsers = async () => {
  const response = await fetch(`${BASE_URL}/users.json`);
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
};

export const fetchMainUser = async () => {
  const response = await fetch(`${BASE_URL}/john_doe.json`);
  if (!response.ok) throw new Error('Failed to fetch main user');
  return response.json();
};

export const fetchHomeFeed = async () => {
  const response = await fetch(`${BASE_URL}/home.json`);
  if (!response.ok) throw new Error('Failed to fetch home feed');
  return response.json();
};

export const fetchConversations = async () => {
  const response = await fetch(`${BASE_URL}/conversations.json`);
  if (!response.ok) throw new Error('Failed to fetch conversations');
  return response.json();
};

export const fetchMessages = async (id) => {
  const response = await fetch(`${BASE_URL}/messages/${id}.json`);
  if (!response.ok) throw new Error(`Messages not found for user ${id}`);
  return response.json();
};
