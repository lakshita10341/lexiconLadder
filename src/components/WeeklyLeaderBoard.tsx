import { Devvit, useState, Context, useAsync } from '@devvit/public-api';
import {Service} from '../backend/Service.js'
Devvit.configure({
    redis: true,
    redditAPI: true,
  });
  type ScoreBoardEntry = {
 
    member: string;      
    score: number;  
   
  }
  const Layout = (props: { children: JSX.Element; onClose: () => void }): JSX.Element => (
    <vstack width="100%" height="100%">
      <spacer height="24px" />
      <hstack width="100%" alignment="middle">
        <spacer width="24px" />
      
        <spacer width="20px" />
      </hstack>
      <spacer height="24px" />
  
      <hstack grow>
        <spacer width="24px" />
        <zstack alignment="start top" grow>
          {/* Shadow */}
          <vstack width="100%" height="100%">
            <spacer height="4px" />
            <hstack grow>
              <spacer width="4px" />
           
            </hstack>
          </vstack>
  
          {/* Card */}
          <vstack width="100%" height="100%">
            <hstack grow>
              <vstack grow backgroundColor="white">
                <spacer height="4px" />
                {props.children}
                <spacer height="4px" />
              </vstack>
              <spacer width="4px" />
            </hstack>
            <spacer height="4px" />
          </vstack>
        </zstack>
        <spacer width="20px" />
      </hstack>
  
      <spacer height="20px" />
    </vstack>
  );
  const WeeklyLeaderBoard = (props: { onClose: () => void }, context: Context): JSX.Element => {
      const serviceInstance = new Service({
          redis: context.redis,
        });
       
  
   
        const { data, error, loading } = useAsync<{ leaderboard: ScoreBoardEntry[] }>(async () => {
          console.log("Fetching scores...");
          const scores = await serviceInstance.getWeeklyScores(10);
          console.log("Fetched scores:", scores);
          return { leaderboard: scores };
        });
      
        if (loading) {
          return <text>Loading...</text>; // Show a loading state while data is being fetched
        }
      
        if (error) {
          console.error("Error fetching leaderboard data:", error);
          return <text>Error loading scores. Please try again later.</text>; // Handle errors gracefully
        }
      
        const leaderboard = data?.leaderboard ?? []; // Default to an empty array if data or leaderboard is null
        
        const leaderboardRows = leaderboard.map((entry,index)=>{
          
          return(
          
            <>
            <hstack alignment="center middle" gap="medium" padding="medium">
            <text>{index+1}</text>
        
            <spacer grow />
            <text>{entry.member}</text>
         
            <spacer grow />
  
           
            <text>{entry.score}</text>
            </hstack>
            <spacer grow />
            </>
            
  
          )
        })
        return (
          <vstack>
              <text size="large" weight="bold">Weekly Leaderboard</text>
            <Layout onClose={props.onClose}>
              
        {leaderboardRows}
 
      
      </Layout>
          </vstack>
        );
    };
    
export default WeeklyLeaderBoard;