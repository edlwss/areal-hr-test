import { jwtDecode } from 'jwt-decode';

export function getUserRole() {
  const token = localStorage.getItem('access_token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role_ID;
  } catch (error) {
    console.error('Ошибка при декодировании токена:', error);
    return null;
  }
}
