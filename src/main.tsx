import type { Context } from '@devvit/public-api';
import { Devvit } from '@devvit/public-api';
import { Service } from "./service/Service.js";
import { Router } from './posts/router/Router.js';
import { PixelText } from './components/PixelText.js';
import { LoadingState } from './components/LoadingState.js';
import { newGamePost } from './actions/CreateNewGamePost.js';

Devvit.configure({
  redis: true,
  redditAPI: true,
  media: true
});

Devvit.addCustomPostType({
  name: 'Lexicon-Link',
  description: 'Guess words and Enjoy!',
  height: 'tall',
  render: Router
});

Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Add Score',
  onPress: async (event, context: Context) => {
    const serviceInstance = new Service({
      redis: context.redis,
    });
    try {
      const currUser = await context.reddit.getCurrentUser();
      const username = currUser?.username ?? 'anon';
    
      const data2 = await serviceInstance.AddScore(username, 15);
    
      console.log(data2);
      context.ui.showToast('Score added successfully');
    } catch (error) {
      console.error('Error in AddScore:', error);
      context.ui.showToast('Failed to add score');
    }
  },
});

Devvit.addMenuItem(newGamePost);

export default Devvit;
