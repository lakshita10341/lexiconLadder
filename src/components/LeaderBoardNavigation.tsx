import { Devvit, useState, Context } from '@devvit/public-api';
import DailyLeaderBoard from './DailyLeaderBoard.js';
import WeeklyLeaderBoard from './WeeklyLeaderBoard.js';
Devvit.configure({
    redis: true,
    redditAPI: true,
  });
  
const LeaderboardNavigation = ( { context }: { context: Context }): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<string>('');
    if (currentPage=="daily"){
        return (<DailyLeaderBoard context={context} />)
    }else if(currentPage=="weekly"){
        return (<WeeklyLeaderBoard context={context} />)
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

