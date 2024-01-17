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

export interface FeedbackStore {
  [plotId: string]: {
    useful: number;
    status: null | 0 | 1;
    replotStatus: null | 1;
    totalReplots: number;
  };
}

export const fbDataTofbStore = (nodes: any[]): FeedbackStore => {
  return nodes.reduce((memo, nodeItem, i) => {
    const node = nodeItem.node;
    const parent = node?.parent_post
      ? {
          [node.parent_pid]: {
            useful: node.parent_post.feedback.useful,
            status: node.parent_post.feedback.user_feedback_status,
            replotStatus: node.parent_post.feedback.user_replot_status,
            totalReplots: node.parent_post.feedback.total_replot,
          },
        }
      : {};

    return {
      ...memo,
      [node.id]: {
        useful: node.feedback.useful,
        status: node.feedback.user_feedback_status,
        replotStatus: node.feedback.user_replot_status,
        totalReplots: node.feedback.total_replot,
      },
      ...parent,
    };
  }, {});
};

export enum FeedTabTypes {
  Following = "Following",
  Foryou = "Foryou",
}

export interface Topic {
  topic_id: string;
  topic_name: string;
}
