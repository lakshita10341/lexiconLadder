import { Devvit } from "@devvit/public-api"

interface Props {
    onPress?: () => void
    children: JSX.Element
    width: number
    height: number
    backgroundColor?: string
}

export const StyledButton = (props: Props): JSX.Element => {
    const { height, width, children, onPress, backgroundColor } = props;

    return  (  
        <zstack alignment="start top" onPress={onPress}>
          <vstack width="100%" height="100%">
            <spacer height="4px" />
            <hstack width="100%" height="100%">
              <spacer width="4px" />
              <hstack height={height} width={width} backgroundColor={backgroundColor} />
            </hstack>
          </vstack>
          {children}
        </zstack>
    );
}