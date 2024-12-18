import { Devvit } from "@devvit/public-api";
import { PixelText } from "../../components/PixelText.js";
import { StyledButton } from "../../components/StyledButton.js";
import { PinnedPost } from "../pinned_post/PinnedPost.js";
import { GameStart } from "../game/GameStart.js";
import LeaderboardNavigation from "../../components/LeaderBoardNavigation.js";

export const Router: Devvit.CustomPostComponent = (context) => {
    const { useState, ui } = context;

    const [page, setPage] = useState<{
        postType: string
    }>(() => ({
        postType: 'pinnedPost'
    }));
    const [showLeaderboard, setShowLeaderboard] = useState<boolean>(false);

 
  
    const postTypes: Record<string, JSX.Element> = {
        pinnedPost: (<PinnedPost setPage={setPage} />),
        leaderboard: (<LeaderboardNavigation context={context} />), 
        game: (<GameStart/>) // replace leaderboard here
    };

    const navigateToYouTube = () => {
        const YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        ui.navigateTo(YOUTUBE_URL);
    };

    return (
        <zstack width="100%" height="100%">
            <image imageHeight={1024} imageWidth={2048} height="100%" width="100%" url="background.png" resizeMode="cover"/>
            {
                postTypes[page.postType] ||
                <vstack alignment="center middle" height="100%" width="100%">
                    <PixelText>Error: Unknown post type</PixelText>
                    <spacer size="small" shape="invisible" />
                    <StyledButton 
                        width={400} 
                        height={100} 
                        onPress={navigateToYouTube} 
                        backgroundColor="red-dark" 
                        borderColor="black" 
                        label="Watch Youtube!"
                    />
                </vstack>
            }    
        </zstack>
    );
};