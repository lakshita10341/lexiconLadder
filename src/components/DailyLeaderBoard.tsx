import { Devvit, useState, Context } from '@devvit/public-api';
import {Service} from '../backend/Service.js'
Devvit.configure({
    redis: true,
    redditAPI: true,
  });
  type UserData= {
    dailyScore : number,
    weeklyScore : number,
}
type ScoreBoardEntry = {
  member: string;      
  score: number;  
}

const DailyLeaderBoard = (props: { onClose: () => void }, context: Context): JSX.Element => {
    const serviceInstance = new Service({
        redis: context.redis,
      });
     

      const fetchScores = async () => {
        const scores = await serviceInstance.getDailyScores(4);
       
        return scores; 
      };
      const [leaderboard, setLeaderboard] = useState(async () => {
        return await fetchScores();
      });
      fetchScores();
      console.log(leaderboard)
    
  
      return (
        <vstack >
          <text >Daily Leaderboard</text>
          {leaderboard?.map((entry:ScoreBoardEntry) => (
            <vstack
          
            >
              <hstack>{entry.member}</hstack>
              <hstack>{entry.score}</hstack>
            </vstack>
          ))}
        </vstack>
      );
  };
  
export default DailyLeaderBoard;