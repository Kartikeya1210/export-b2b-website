import { cookies } from 'next/headers';

export type UserContext = {
  isWholesale: boolean;
};

const WHOLESALE_COOKIE = 'wholesale_user';

export function getUserContext(): UserContext {
  const store = cookies();
  const flag = store.get(WHOLESALE_COOKIE)?.value;
  return {
    isWholesale: flag === 'true'
  };
}

