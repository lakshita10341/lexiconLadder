import { Devvit, useState, Context } from '@devvit/public-api';
import DailyLeaderBoard from './DailyLeaderBoard.js';
import WeeklyLeaderBoard from './WeeklyLeaderBoard.js';
Devvit.configure({
    redis: true,
    redditAPI: true,
  });
  
const LeaderboardNavigation = (props: { onClose: () => void }, context: Context): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<string>('');
    if (currentPage=="daily"){
        return (<DailyLeaderBoard {...props} />)
    }else if(currentPage=="weekly"){
        return (<WeeklyLeaderBoard {...props} />)
    }
    return (
    
        <vstack width="100%" alignment="center middle">
          <button
            appearance={currentPage === 'daily' ? 'primary' : 'secondary'}
          
            onPress={() => setCurrentPage('daily')}
          >DailyLeaderBoard</button>
          <button
            appearance={currentPage === 'weekly' ? 'primary' : 'secondary'}
           
            onPress={() => setCurrentPage('weekly')}
          >Weekly Leaderboard </button>
        </vstack>
       
    
    );
  };

export default LeaderboardNavigation;

