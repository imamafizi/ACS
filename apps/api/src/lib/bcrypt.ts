import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const saltRound = 10;
  return await bcrypt.hash(password, saltRound);
}

export async function comparePasswords(
  candidatePassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, hashedPassword);
}
