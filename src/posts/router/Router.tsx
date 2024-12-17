import { Devvit, useState } from "@devvit/public-api";
import { PixelText } from "../../components/PixelText.js";

export const Router: Devvit.CustomPostComponent = () => {

    const [dataInit] = useState<{
        postType: string
    }>(
        () => {
            const postType = 'game';
            return {
                postType
            };
        }
    )

    const postTypes: Record<string, JSX.Element> = {
        game: (<Game/>),
        leaderboard: (<Leaderboard/>),
    };

    return (
        <zstack width="100%" height="100%">
            <image imageHeight={1024} imageWidth={2048} height="100%" width="100%" url="background.png" />
            {
                postTypes[dataInit.postType] ||
                <vstack alignment="center middle">
                    <PixelText>Error: Post type unknown</PixelText>
                </vstack>
            }
        </zstack>
    )
}
