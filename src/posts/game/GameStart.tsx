import { Devvit, useState } from "@devvit/public-api";
import { HeroButton } from "../../components/HeroButton.js";
import { GuessWord } from "./GuessWord.js";
import { LoadingState } from "../../components/LoadingState.js";

export function GameStart(): JSX.Element {
    const [ gamePage, setGamePage ] = useState<string>('start');
    let currentPage = gamePage
    switch (currentPage) {
        case 'start':
            return (
                <vstack height="100%" width="100%" alignment="middle center">
                    <HeroButton
                        label="Play"
                        onPress={() => {
                            setGamePage('guessWord');
                        }}
                    />
                </vstack>
        )
        case 'guessWord':
            return (
                <GuessWord setGamePage={setGamePage} />
            )
        default:
            return (
                <LoadingState />
            )
    }
}   