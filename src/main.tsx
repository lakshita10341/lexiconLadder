import type { Context } from '@devvit/public-api';
import { Devvit, useState } from '@devvit/public-api';
import {Service} from "./backend/Service.js"
import {User} from '@devvit/public-api'
import LeaderboardNavigation from './components/LeaderBoardNavigation.js';
Devvit.configure({
  redis: true,
  redditAPI: true,
});

//to add score of user in leaderboard
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
      title: 'My devvit post',
      subredditName: subreddit.name,
  
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
   const scheduleLeaderboardReset = async () => {
    const { scheduler } = _context;
 
    await scheduler.runJob({
      name: 'reset-weekly-leaderboard',
      cron: '0 12 * * 0', 
    });
    await scheduler.runJob({
      name: 'reset-daily-leaderboard',
      cron: '0 12 * * *', 
    });
  };

   if (showLeaderboard) {
     return <LeaderboardNavigation onClose={() => setShowLeaderboard(false)} />;
   }

 
   return (
     <button
       appearance="secondary"
       onPress={() => {setShowLeaderboard(true) ; scheduleLeaderboardReset()}}
     >
       Go to Leaderboard
     </button>
   );
  },
});


Devvit.addSchedulerJob({
  name: 'reset-weekly-leaderboard',
  onRun: async (_, context) => {
    console.log('Resetting weekly leaderboard...');
    try {
      const redis = context.redis; 
      await redis.del('leaderboard:weekly');
      console.log('Weekly leaderboard reset successfully!');
    } catch (error) {
      console.error('Error resetting leaderboard:', error);
    }
  },
});

Devvit.addSchedulerJob({
  name: 'reset-daily-leaderboard',
  onRun: async (_, context) => {
    console.log('Resetting daily leaderboard...');
    try {
      const redis = context.redis; 
      await redis.del('leaderboard:daily');
      console.log('Weekly leaderboard reset successfully!');
    } catch (error) {
      console.error('Error resetting leaderboard:', error);
    }
  },
});




export default Devvit;
