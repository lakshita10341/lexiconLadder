

import type { RedisClient } from "@devvit/public-api";
type UserData= {
    dailyScore : number,
    weeklyScore : number,
}
type ScoreBoardEntry = { 
  member: string;      
  score: number;  
}
export class Service {
    readonly redis?: RedisClient;

    constructor(context: { redis: RedisClient }) {
        this.redis = context.redis;
    }

    // async GameStart(username: string): Promise<{ Score: UserData }> {
    //     let dailyScore = await this.redis?.zScore('leaderboard:daily', username);
    //     let weeklyScore = await this.redis?.zScore('leaderboard:weekly', username);

      
    //     if (dailyScore === null) {
    //         await this.redis?.zAdd('leaderboard:daily', { member: username, score: 0 });
    //         dailyScore = 0;
    //     }

    //     if (weeklyScore === null) {
    //         await this.redis?.zAdd('leaderboard:weekly', { member: username, score: 0 });
    //         weeklyScore = 0;
    //     }

    //     const score: UserData = {
    //         dailyScore: Number(dailyScore),
    //         weeklyScore: Number(weeklyScore),
    //     };

    //     return { Score: score };
    // }

    async AddScore(username: string, score: number): Promise<{ Score: UserData }> {
        let dailyScore = await this.redis?.zScore('leaderboard:daily', username);
        let weeklyScore = await this.redis?.zScore('leaderboard:weekly', username);

      
        if (dailyScore === null) {
            await this.redis?.zAdd('leaderboard:daily', { member: username, score: 0 });
            dailyScore = 0;
        }

        if (weeklyScore === null) {
            await this.redis?.zAdd('leaderboard:weekly', { member: username, score: 0 });
            weeklyScore = 0;
        }

        await this.redis?.zIncrBy('leaderboard:daily', username, score) ;
        await this.redis?.zIncrBy('leaderboard:weekly', username, score);
            
        
        const updatedDailyScore = (await this.redis?.zScore('leaderboard:daily', username)) || 0;
        const updatedWeeklyScore = (await this.redis?.zScore('leaderboard:weekly', username)) || 0;

        const updatedScore: UserData = {
            dailyScore: Number(updatedDailyScore),
            weeklyScore: Number(updatedWeeklyScore),
        };

        return { Score: updatedScore };
    }
    async getDailyScores(limit: number): Promise<ScoreBoardEntry[]> {
        const dailyScores = await this.redis?.zRange('leaderboard:daily', 0, limit - 1) || [];

        return dailyScores;
    }
    async getWeeklyScores(limit: number): Promise<ScoreBoardEntry[]> {
        const weeklyScores = await this.redis?.zRange('leaderboard:weekly', 0, limit - 1,) || [];
        return weeklyScores;
    }
}
