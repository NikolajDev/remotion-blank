import React from 'react';
import {Composition} from 'remotion';
import {ProgrammerChallenge} from './ProgrammerChallenge';

// Define the props interface
export interface ProgrammerChallengeProps {
  day: number;
  challenge: string;
}

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Main 16:9 Video */}
      <Composition<ProgrammerChallengeProps>
        id="ProgrammerChallenge"
        component={ProgrammerChallenge}
        durationInFrames={1800} // 60 seconds at 30fps
        fps={30}
        width={1920}
        height={1080}
        defaultProps={{
          day: 1,
          challenge: "Write a function that finds the maximum number in an array",
        }}
      />
      
      {/* Short 9:16 Preview */}
      <Composition<ProgrammerChallengeProps>
        id="ProgrammerChallengeShort"
        component={ProgrammerChallengeShort}
        durationInFrames={450} // 15 seconds at 30fps
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          day: 1,
          challenge: "Write a function that finds the maximum number in an array",
        }}
      />
    </>
  );
};