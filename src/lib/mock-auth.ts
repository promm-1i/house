// 데모용 로컬(브라우저) 인증. 실 서비스에서는 서버 인증(API Route + DB,
// 또는 NextAuth/Clerk 등)으로 교체해야 한다. 비밀번호를 평문으로 localStorage에
// 저장하는 것도 데모에서만 허용되는 방식이다.

interface StoredUser {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const USERS_KEY = "sample_demo_users";
const SESSION_KEY = "sample_demo_session";

function readUsers(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function signUp(user: StoredUser): { ok: boolean; error?: string } {
  const users = readUsers();
  if (users.some((u) => u.email === user.email)) {
    return { ok: false, error: "이미 가입된 이메일입니다." };
  }
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ name: user.name, email: user.email })
  );
  return { ok: true };
}

export function login(
  email: string,
  password: string
): { ok: boolean; error?: string } {
  const user = readUsers().find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return { ok: false, error: "이메일 또는 비밀번호가 올바르지 않습니다." };

  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ name: user.name, email: user.email })
  );
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession(): { name: string; email: string } | null {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) ?? "null");
  } catch {
    return null;
  }
}
