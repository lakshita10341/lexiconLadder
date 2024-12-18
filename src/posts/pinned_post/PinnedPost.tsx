import { Context, Devvit } from "@devvit/public-api";
import { StyledButton } from "../../components/StyledButton.js";
import { PageProps } from "../../types.js";

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