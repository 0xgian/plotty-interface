export interface SessionUserServer {
  currentAccount: `0x${string}`;
  accounts: {
    [key: `0x${string}`]: {
      address: `0x${string}`;
      access_token: string;
      refresh_token: string;
    };
  };
}

export interface SessionUser {
  currentAccount: `0x${string}`;
  accounts: {
    [key: `0x${string}`]: {
      address: `0x${string}`;
      access_token: string;
    };
  };
}

export const susToSu = ({
  currentAccount,
  accounts,
}: SessionUserServer): SessionUser => {
  return {
    currentAccount: currentAccount,
    accounts: Object.values(accounts).reduce((memo, account) => {
      return {
        ...memo,
        [account.address]: {
          address: account.address,
          access_token: account.access_token,
        },
      };
    }, {}),
  };
};
