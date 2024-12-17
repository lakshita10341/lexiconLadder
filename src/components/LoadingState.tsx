import { Devvit } from "@devvit/public-api";
import { PixelText } from "./PixelText.js";

export function LoadingState(): JSX.Element {
    return (
        <vstack height="100%" width="100%" alignment="middle center">
            <PixelText size={8} color='white'>Loading....</PixelText>
        </vstack>
    )
} 