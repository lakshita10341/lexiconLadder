import { Devvit, useState, Context } from '@devvit/public-api';
import {Service} from '../service/Service.js'
Devvit.configure({
    redis: true,
    redditAPI: true,
  });
  type ScoreBoardEntry = {
 
    member: string;      
    score: number;  
   
  }
const WeeklyLeaderBoard = (props: { onClose: () => void }, context: Context): JSX.Element => {
  const serviceInstance = new Service({
    redis: context.redis,
  });
 

  const fetchScores = async () => {
    const scores = await serviceInstance.getWeeklyScores(4);
   console.log(scores);
    return scores; 
  };
  const [leaderboard, setLeaderboard] = useState(async () => {
    return await fetchScores();
  });
  fetchScores();
  console.log(leaderboard)


  return (
    <vstack>
  <text>Weekly Leaderboard</text>
 
  {leaderboard && leaderboard.length > 0 ? (
    leaderboard.map((entry: ScoreBoardEntry, index: number) => (
      <vstack >
        <text>{entry.member}</text>
        <text>{entry.score}</text>
      </vstack>
    ))
  ) : (
    <text>Loading leaderboard...</text>
  )}
</vstack>
  );
};
  
export default WeeklyLeaderBoard;