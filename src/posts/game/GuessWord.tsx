import { useState } from "react";
import { Devvit } from "@devvit/public-api";
import { PixelText } from "../../components/PixelText.js";
import { StyledButton } from "../../components/StyledButton.js";
import { GamePageProps } from "../../types.js";

export function GuessWord({ setGamePage }: GamePageProps): JSX.Element {
    const [words, setWords] = useState<string[]>([]);

    // Fetch words during the first render
    if (words.length === 0) {
        (async () => {
            const fetchedWords = [
                'word1', 'word2', 'word3', 'word4', 'word5', 'word6', 'word7', 'word8', 'word9'
            ];
            setWords(fetchedWords);
        })();
    }

    const renderButtons = (startIndex: number) => (
        <vstack>
            {words.slice(startIndex, startIndex + 3).map((word, idx) => (
                <vstack key={`${word}-${idx}`}>
                    <StyledButton
                        width={200}
                        height={50}
                        label={word}
                        backgroundColor="black"
                        borderColor="black"
                        onPress={() => {
                        }}
                    />
                    <spacer height={4} />
                </vstack>
            ))}
        </vstack>
    );

    return (
        <vstack height="100%" width="100%" alignment="middle center">
            <PixelText color="black">Choose a word....</PixelText>
            <spacer height={4} />
            <hstack>
                {renderButtons(0)}
                <spacer width={4} />
                {renderButtons(3)}
                <spacer width={4} />
                {renderButtons(6)}
            </hstack>
        </vstack>
    );
}
