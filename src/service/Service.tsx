import words from '../data/words.json'

import type { RedditAPIClient, RedisClient, Scheduler, ZRangeOptions } from "@devvit/public-api";
type UserData = {
    dailyScore: number,
    weeklyScore: number,
}
type ScoreBoardEntry = {
    member: string;
    score: number;
}
export type CurrentPostState = {
	time : number,
	word : string,
	score : number,
} 
export class Service {
    readonly redis?: RedisClient;
    readonly reddit?: RedditAPIClient;
    readonly scheduler?: Scheduler;

    constructor(
        context: {
            redis: RedisClient;
            reddit?: RedditAPIClient; 
            scheduler?: Scheduler
        }) {
        this.redis = context.redis;
        this.reddit = context.reddit;
        this.scheduler = context.scheduler;
        
    }

    readonly API_LINK = "https://api.datamuse.com/words?rel_trg=";


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

        await this.redis?.zIncrBy('leaderboard:daily', username, score);
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
        const options: ZRangeOptions = { reverse: true, by: 'rank' };
        const dailyScores = await this.redis?.zRange('leaderboard:daily', 0, limit - 1,options) || [];
      
        return dailyScores;
    }
    async getWeeklyScores(limit: number): Promise<ScoreBoardEntry[]> {
        const options: ZRangeOptions = { reverse: true, by: 'rank' };
        const weeklyScores = await this.redis?.zRange('leaderboard:weekly', 0, limit - 1,options) || [];
        return weeklyScores;
    }
     
    async updateGlobalState( PostState : CurrentPostState): Promise<void> {
	await this.redis?.set('currentPostState', JSON.stringify(PostState));
    }

     async getGlobalState(): Promise<CurrentPostState> {
	const state = await this.redis?.get('currentPostState');
	return JSON.parse(state || '{}');
     }

    async getRelatedWords(word: string): Promise<any[]> {

        let data: any;
    
        try {
            const link = `${this.API_LINK}${encodeURIComponent(word)}`;
            console.log(link);
    
            const request = new Request(link , {
                method: 'GET',
                headers: {
                    Accept : 'application/json',
                },
            });
    
            const res = await fetch(request);
            data = await res.json();
            
            return data
                .slice(0, 10)
                .map((item: { word: string }) => item.word);
        } catch (error) {
            console.error('Error fetching related words:', error);
            return [];
        }
    }

    getRandomWord(): string{
        const wordsArray = Object.values(words);
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        return wordsArray[randomIndex];
    }
    
}
