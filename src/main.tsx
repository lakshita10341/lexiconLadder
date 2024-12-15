import type { Context } from '@devvit/public-api';
import { Devvit, useState } from '@devvit/public-api';
import {Service} from "./backend/Service.js"
import {User} from '@devvit/public-api'
import LeaderboardNavigation from './LeaderBoardNavigation.js';
Devvit.configure({
  redis: true,
  redditAPI: true,
});


// Add a menu item
Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Test Redis',
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
  location: 'subreddit',
  label: 'ADDscore',
  onPress: async (event,context) => {
    const serviceInstance = new Service({
      redis: context.redis,
    });
    try {
      const currUser = await context.reddit.getCurrentUser();
      const username = currUser?.username ?? 'anon';
      
      // const data = await serviceInstance.GameStart(username);
      const data2 = await serviceInstance.AddScore(username,15);
    
      console.log(data2);
    } catch (error) {
      console.error('Error in GameStart:', error);
    }
  },
});

// Devvit.addMenuItem({
//   location: 'subreddit',
//   label: 'Test Redis',
//   onPress: async () => {
//     try {
//       const data = Service.GameStart('user123');
//       console.log(data)

      
//     } catch (error) {
//       console.error('Error connecting to Redis:', error);
//     }
//   },
// });

Devvit.addMenuItem({
  label: 'Add my post',
  location: 'subreddit',
  forUserType: 'moderator',
  onPress: async (_event, context) => {
    const { reddit, ui } = context;
    ui.showToast("Submitting your post - upon completion you'll navigate there.");

    const subreddit = await reddit.getCurrentSubreddit();
    const post = await reddit.submitPost({
      title: 'My devvit post',
      subredditName: subreddit.name,
      // The preview appears while the post loads
      preview: (
        <vstack height="100%" width="100%" alignment="middle center">
          <text size="large">Loading ...</text>
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
