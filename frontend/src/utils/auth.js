export const hasPermission = (permissionKey) => {
  try {
    const permsString = localStorage.getItem('permissions');
    if (!permsString) return false;
    const perms = JSON.parse(permsString);
    return Array.isArray(perms) && perms.includes(permissionKey);
  } catch (e) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('permissions');
  localStorage.removeItem('userName');
  window.location.href = '/login';
};
