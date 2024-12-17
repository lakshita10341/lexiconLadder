import { Context, MenuItem } from "@devvit/public-api";
import { Service } from "../service/Service.js";

export const addScore: MenuItem = {
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
}