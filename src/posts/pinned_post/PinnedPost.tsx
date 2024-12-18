import { Context, Devvit } from "@devvit/public-api";
import { StyledButton } from "../../components/StyledButton.js";
import { PageProps } from "../../types.js";

export function PinnedPost({ setPage }: PageProps, context: Context): JSX.Element {
    const { postId } = context;
    const scheduleLeaderboardReset = async () => {
        const { scheduler } = context;
        try {
            await scheduler.runJob({
                name: 'reset-weekly-leaderboard',
                cron: '0 12 * * 0', // Reset on Sunday at 12 PM
            });
            await scheduler.runJob({
                name: 'reset-daily-leaderboard',
                cron: '0 12 * * *', // Reset every day at 12 PM
            });
            console.log('Leaderboard reset jobs scheduled successfully!');
        } catch (error) {
            console.error('Error scheduling leaderboard reset:', error);
        }
    };
    const createNewPost = async () => {
        const subreddit = await context.reddit.getCurrentSubreddit();
        const uniqueId = Date.now().toString();
    
        const newPost = await context.reddit.submitPost({
          title: 'New Game',
          subredditName: subreddit.name,
          preview: (
            <vstack height="100%" width="100%" alignment="middle center">
              <text>Loading game...</text>
            </vstack>
          ),
        });
        context.ui.showToast('Created new game post!');

        setPage({
            postType: 'game'
        })
        //context.ui.navigateTo(newPost);
    }

    return (
        <vstack height="100%" width="100%" alignment="middle center">
            <StyledButton 
                width={200} 
                height={50} 
                label="+ Game" 
                backgroundColor="black" 
                borderColor="black" 
                onPress = {createNewPost}
            />
            <spacer height={10} />
            <StyledButton 
                width={200}
                height={50}
                label="Leaderboard"
                backgroundColor="black"
                borderColor="black"
                onPress={() => {
                    setPage({
                        postType: 'leaderboard'
                    });
                    scheduleLeaderboardReset(); 
                }}
            />
        </vstack>
    )
}
// Adding the scheduler jobs to reset weekly and daily leaderboards
Devvit.addSchedulerJob({
    name: 'reset-weekly-leaderboard',
    onRun: async (_, context) => {
      console.log('Resetting weekly leaderboard...');
      try {
        const redis = context.redis;
        await redis.del('leaderboard:weekly');  // Delete the weekly leaderboard from Redis
        console.log('Weekly leaderboard reset successfully!');
      } catch (error) {
        console.error('Error resetting weekly leaderboard:', error);
      }
    },
  });
  
  Devvit.addSchedulerJob({
    name: 'reset-daily-leaderboard',
    onRun: async (_, context) => {
      console.log('Resetting daily leaderboard...');
      try {
        const redis = context.redis;
        await redis.del('leaderboard:daily');  // Delete the daily leaderboard from Redis
        console.log('Daily leaderboard reset successfully!');
      } catch (error) {
        console.error('Error resetting daily leaderboard:', error);
      }
    },
  });
  