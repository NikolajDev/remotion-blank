import React from 'react';
import {
  AbsoluteFill,
  useVideoConfig,
  Sequence,
} from 'remotion';
import {TypewriterText} from './components/TypewriterText';
import {TerminalOutput} from './components/TerminalOutput';

interface Props {
  day: number;
  challenge: string;
}

export const ProgrammerChallengeShort: React.FC<Props> = ({day, challenge}) => {
  const {fps} = useVideoConfig();

  return (
    <AbsoluteFill style={{backgroundColor: '#1a1a1a'}}>
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <h1 style={{
          color: 'white',
          fontSize: 24,
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
          textAlign: 'center',
          margin: 0,
        }}>
          Think Like a Programmer
        </h1>
        <div style={{
          color: '#fbbf24',
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 8,
        }}>
          Day {day} Challenge
        </div>
      </div>

      {/* Challenge Hook */}
      <div style={{
        position: 'absolute',
        top: 140,
        left: 20,
        right: 20,
        padding: 20,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        border: '2px solid #3b82f6',
        borderRadius: 12,
        textAlign: 'center',
      }}>
        <Sequence from={0} durationInFrames={fps * 4}>
          <div style={{
            color: '#fbbf24',
            fontSize: 20,
            fontWeight: 'bold',
            lineHeight: 1.4,
          }}>
            {challenge}
          </div>
        </Sequence>
      </div>

      {/* Quick Code Preview */}
      <div style={{
        position: 'absolute',
        top: 280,
        left: 20,
        right: 20,
        height: 400,
        backgroundColor: '#2d2d2d',
        borderRadius: 12,
        padding: 16,
        fontFamily: 'monospace',
        fontSize: 14,
      }}>
        <Sequence from={fps * 2} durationInFrames={fps * 6}>
          <TypewriterText 
            text={`def find_max(numbers):
    if not numbers:
        return None
    
    max_value = numbers[0]
    for num in numbers:
        if num > max_value:
            max_value = num
    return max_value

print(find_max([3,7,2,9,1]))`}
            startFrame={fps * 2}
            charactersPerSecond={30}
          />
        </Sequence>
      </div>

      {/* Quick Output */}
      <div style={{
        position: 'absolute',
        bottom: 120,
        left: 20,
        right: 20,
        backgroundColor: '#000000',
        borderRadius: 12,
        padding: 16,
        fontFamily: 'monospace',
      }}>
        <Sequence from={fps * 10} durationInFrames={fps * 5}>
          <TerminalOutput 
                      lines={["Output: 9"]}
                      startFrame={fps * 10}
                      isSuccess={true} text={''} charactersPerSecond={0}          />
        </Sequence>
      </div>

      {/* CTA */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        textAlign: 'center',
        color: '#fbbf24',
        fontSize: 18,
        fontWeight: 'bold',
      }}>
        <Sequence from={fps * 12} durationInFrames={fps * 3}>
          <div style={{animation: 'pulse 1s infinite'}}>
            Watch the full solution! 👆
          </div>
        </Sequence>
      </div>
    </AbsoluteFill>
  );
};