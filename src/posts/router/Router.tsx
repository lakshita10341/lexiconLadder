import { Devvit, useState } from "@devvit/public-api";
import { PixelText } from "../../components/PixelText.js";
import { StyledButton } from "../../components/StyledButton.js";

export const Router: Devvit.CustomPostComponent = ({ui, useState}) => {

    const [dataInit] = useState<{
        postType: string
    }>(
        () => {
            const postType = 'gme';
            return {
                postType
            };
        }
    )

    const postTypes: Record<string, JSX.Element> = {
        game: (<zstack/>),
        leaderboard: (<zstack/>),
    };

    const navigateToYouTube = () => {
        const YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
        ui.navigateTo(YOUTUBE_URL);
    };

    return (
        <zstack width="100%" height="100%">
            <image imageHeight={1024} imageWidth={2048} height="100%" width="100%" url="background.png" resizeMode="cover"/>
            {
                postTypes[dataInit.postType] ||
                <vstack alignment="center middle" height="100%" width="100%">
                    <PixelText>Error: Post type unknown</PixelText>
                    <spacer size="small" shape="invisible" />
                    <StyledButton 
                        width={400} 
                        height={100} 
                        onPress={navigateToYouTube} 
                        backgroundColor="red" 
                        borderColor="red" 
                        label="See Magic"
                    />
                </vstack>
            }    
        </zstack>
    )
}
