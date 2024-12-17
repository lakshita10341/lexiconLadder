import type { MenuItem } from '@devvit/public-api';

import { LoadingState } from '../components/LoadingState.js';

export const newPinnedPost: MenuItem = {
  label: 'New Pinned post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post...");
    try {
      const subreddit = await reddit.getCurrentSubreddit();
      const post = await reddit.submitPost({
        title: 'Lexicon-Link',
        subredditName: subreddit.name,
        preview: LoadingState(),
      });
      ui.navigateTo(post);
    } catch (error) {
      console.error('Error submitting post:', error);
      ui.showToast('Failed to submit post');
    }
  },
};