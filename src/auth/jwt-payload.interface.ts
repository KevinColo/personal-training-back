export interface JwtPayload {
  sub: number; // ID de l'utilisateur
  username: string; // Nom d'utilisateur
  roles: string[]; // Liste des rôles ou des autorisations de l'utilisateur
  // Vous pouvez ajouter d'autres champs selon vos besoins
}
