import { Devvit } from "@devvit/public-api";
import { StyledButton } from "../../components/StyledButton.js";

export function GameStart(): JSX.Element {
    return (
        <vstack height="100%" width="100%" alignment="middle center">
            <StyledButton 
                width={200} 
                height={50} 
                label="+ Game" 
                backgroundColor="black" 
                borderColor="white" 
                onPress={() => {}}
            />
            <spacer height={100} />
            <StyledButton 
                width={200}
                height={50}
                label="Leaderboard"
                backgroundColor="black"
                borderColor="white"
                onPress={() => {}}
            />
        </vstack>
    )
}