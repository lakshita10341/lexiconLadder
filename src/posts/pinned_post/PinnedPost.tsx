import { Context, Devvit , useState , useInterval } from "@devvit/public-api";
import { StyledButton } from "../../components/StyledButton.js";
import { PageProps } from "../../types.js";
import {Service,CurrentPostState} from "./backend/Service.js"

export function PinnedPost({ setPage }: PageProps, context: Context): JSX.Element {
    const { postId } = context;
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
    
   const [ currentPostState , setCurrentPostState] = useState<CurrentPostState>({time:0,word:"noword",score:0});
   const interval = useInterval(handleInterval , 1000);
   const serviceInstance = new Service({
	  redis: context.redis,
    });
    
       function handleInterval() {

	    setCurrentPostState(prevState => ({
        ...prevState,
        score: prevState.score - 10,
        time: prevState.time + 1,
    	}));

		updateglobalstate();

		if( currentPostState.time > 10){
			interval.stop();
			startTimer();
		}

   }
  // starts timer , updates values of all the global variables every second
    async function startTimer(){
		const targetword = await serviceInstance.getRandomWord();
	    setCurrentPostState(prevState => ({
	        ...prevState,
	        word: targetword,
	        score: 1000,
	        time: 1,
	    }));
		interval.start();
	}

   const updateglobalstate = () => {
		serviceInstance.updateGlobalState(currentPostState);
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
                    })
                }}
            />
        </vstack>
    )
}
