import type { Context } from '@devvit/public-api';
import { Devvit, useState } from '@devvit/public-api';
import {Service} from "./service/Service.js"
import {User} from '@devvit/public-api'
import LeaderboardNavigation from './components/LeaderBoardNavigation.js';
import { PixelText } from './components/PixelText.js';

Devvit.configure({
  redis: true,
  redditAPI: true,
  media: true
});

//Devvit.addMenuItem() this will play post type in subreddit
//Devvit.addMenuItem()// this will be 

Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Add Score',
  onPress: async (event,context) => {
    const serviceInstance = new Service({
      redis: context.redis,
    });
    try {
      const currUser = await context.reddit.getCurrentUser();
      const username = currUser?.username ?? 'anon';
    
      const data2 = await serviceInstance.AddScore(username,15);
    
      console.log(data2);
    } catch (error) {
      console.error('Error in GameStart:', error);
    }
  },
});



Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: '',
      subredditName: subreddit.name,
  
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <PixelText size={8} color='white'>Loading ...</PixelText>
        </vstack>
      ),
    });
    ui.navigateTo(post);
  },
});

// Add a post type definition
Devvit.addCustomPostType({
  name: 'Experience Post',
  height: 'regular',
  render: (_context) => {
 
   const [showLeaderboard, setShowLeaderboard] = useState(false);


   if (showLeaderboard) {
     return <LeaderboardNavigation onClose={() => setShowLeaderboard(false)} />;
   }

 
   return (
     <button
       appearance="secondary"
       onPress={() => setShowLeaderboard(true)}
     >
       Go to Leaderboard
     </button>
   );
  },
});

export default Devvit;
