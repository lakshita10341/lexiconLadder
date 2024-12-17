import { Devvit } from "@devvit/public-api"
import { PixelText } from "./PixelText.js"

interface Props {
    onPress?: () => void
    width: number
    height: number
    label?: string
    backgroundColor: string
    borderColor: string
}

export const StyledButton = (props: Props): JSX.Element => {
    const { height, width, onPress, label, backgroundColor, borderColor } = props;

    return  (  
        <zstack alignment="start top" onPress={onPress}>
          <vstack width="100%" height="100%">
            <spacer height="4px" />
            <hstack width="100%" height="100%">
              <spacer width="4px" />
              <hstack height={height} width={width} backgroundColor={backgroundColor} />
            </hstack>
          </vstack>
            <hstack
                height={height}
                width={width}
                onPress={onPress}
                backgroundColor={borderColor}
                padding="small"
            >
            <hstack
                  height="100%"
                  width="100%"
                  gap="small"
                  alignment="middle center"
                  backgroundColor={backgroundColor}
            >
                  {/*leadingIcon ? <PixelSymbol scale={2} type={leadingIcon} color={style.color} /> : null */}
                  {label ? <PixelText color={"white"}>{label}</PixelText> : null}
                  {/*trailingIcon ? <PixelSymbol scale={2} type={trailingIcon} color={style.color} /> : null*/}
            </hstack>
            </hstack>
        </zstack>
    );
}