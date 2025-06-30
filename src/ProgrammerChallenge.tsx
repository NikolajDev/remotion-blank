import React from 'react';
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from 'remotion';
import {TypewriterText} from './components/TypewriterText';
import {TerminalOutput} from './components/TerminalOutput';
import {SubtitleText} from './components/SubtitleText';

interface Props {
  day: number;
  challenge: string;
}

export const ProgrammerChallenge: React.FC<Props> = ({day, challenge}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Define animation phases with frame ranges
  const phases = [
    {
      name: 'hook',
      start: 0,
      duration: fps * 6, // 6 seconds
      subtitle: `Your task for Day ${day}: ${challenge}`,
    },
    {
      name: 'thinking',
      start: fps * 6,
      duration: fps * 8, // 8 seconds
      subtitle: "Let's start by defining our function and thinking through the approach",
    },
    {
      name: 'coding',
      start: fps * 14,
      duration: fps * 12, // 12 seconds
      subtitle: "We'll use a variable to track the maximum value as we iterate",
    },
    {
      name: 'testing',
      start: fps * 26,
      duration: fps * 8, // 8 seconds
      subtitle: "Now let's test it with some sample data",
    },
    {
      name: 'error',
      start: fps * 34,
      duration: fps * 10, // 10 seconds
      subtitle: "Oops! What happens if we pass an empty array? Let's see the error",
    },
    {
      name: 'fixing',
      start: fps * 44,
      duration: fps * 12, // 12 seconds
      subtitle: "Let's fix this by adding proper error handling",
    },
    {
      name: 'recap',
      start: fps * 56,
      duration: fps * 4, // 4 seconds
      subtitle: "Perfect! Remember: always handle edge cases like empty inputs",
    },
  ];

  const codeSnippets = {
    initial: `def find_max(numbers):
    # We'll use a variable to track the maximum
    max_value = numbers[0]
    
    for num in numbers:
        if num > max_value:
            max_value = num
    
    return max_value`,
    
    withTest: `def find_max(numbers):
    # We'll use a variable to track the maximum
    max_value = numbers[0]
    
    for num in numbers:
        if num > max_value:
            max_value = num
    
    return max_value

# Test our function
test_array = [3, 7, 2, 9, 1, 5]
result = find_max(test_array)
print(f"Maximum value: {result}")`,

    withError: `def find_max(numbers):
    # We'll use a variable to track the maximum
    max_value = numbers[0]  # This will cause an error!
    
    for num in numbers:
        if num > max_value:
            max_value = num
    
    return max_value

# Test with empty array
empty_array = []
result = find_max(empty_array)
print(f"Maximum value: {result}")`,

    fixed: `def find_max(numbers):
    if not numbers:  # Check for empty array
        return None
    
    max_value = numbers[0]
    
    for num in numbers:
        if num > max_value:
            max_value = num
    
    return max_value

# Test both cases
test_array = [3, 7, 2, 9, 1, 5]
empty_array = []

print(f"Max of {test_array}: {find_max(test_array)}")
print(f"Max of empty array: {find_max(empty_array)}")`
  };

  return (
    <AbsoluteFill style={{backgroundColor: '#1a1a1a'}}>
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}
      >
        <h1 style={{
          color: 'white',
          fontSize: 32,
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif',
        }}>
          Think Like a Programmer – Day {day} Challenge
        </h1>
      </div>

      {/* Challenge Badge */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          left: 20,
          background: 'linear-gradient(90deg, #fbbf24, #f59e0b)',
          color: 'black',
          padding: '8px 16px',
          borderRadius: 20,
          fontSize: 14,
          fontWeight: 'bold',
          zIndex: 10,
        }}
      >
        🎯 Day {day}/100
      </div>

      {/* Main Content Area */}
      <div style={{
        display: 'flex',
        height: '100%',
        paddingTop: 80,
        paddingBottom: 120,
      }}>
        {/* Left Side - Code Editor */}
        <div style={{
          width: '50%',
          backgroundColor: '#2d2d2d',
          borderRight: '1px solid #4a4a4a',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            backgroundColor: '#3a3a3a',
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 'bold',
            color: 'white',
            borderBottom: '1px solid #4a4a4a',
          }}>
            📝 Code Editor - challenge.py
          </div>
          <div style={{
            flex: 1,
            padding: 16,
            overflow: 'auto',
            fontFamily: 'monospace',
          }}>
            {/* Hook Phase */}
            <Sequence from={phases[0].start} durationInFrames={phases[0].duration}>
              <div style={{
                color: '#fbbf24',
                fontSize: 24,
                textAlign: 'center',
                marginTop: 100,
                animation: 'pulse 2s infinite',
              }}>
                {challenge}
              </div>
            </Sequence>

            {/* Coding Phases */}
            <Sequence from={phases[1].start} durationInFrames={phases[1].duration + phases[2].duration}>
              <TypewriterText 
                text={codeSnippets.initial}
                startFrame={phases[1].start}
                charactersPerSecond={20}
              />
            </Sequence>

            <Sequence from={phases[3].start} durationInFrames={phases[3].duration}>
              <TypewriterText 
                text={codeSnippets.withTest}
                startFrame={phases[3].start}
                charactersPerSecond={25}
              />
            </Sequence>

            <Sequence from={phases[4].start} durationInFrames={phases[4].duration}>
              <TypewriterText 
                text={codeSnippets.withError}
                startFrame={phases[4].start}
                charactersPerSecond={25}
                highlightErrors={true}
              />
            </Sequence>

            <Sequence from={phases[5].start} durationInFrames={phases[5].duration + phases[6].duration}>
              <TypewriterText 
                text={codeSnippets.fixed}
                startFrame={phases[5].start}
                charactersPerSecond={25}
              />
            </Sequence>
          </div>
        </div>

        {/* Right Side - Terminal Output */}
        <div style={{
          width: '50%',
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            backgroundColor: '#3a3a3a',
            padding: '12px 16px',
            fontSize: 14,
            fontWeight: 'bold',
            color: 'white',
            borderBottom: '1px solid #4a4a4a',
          }}>
            💻 Terminal Output
          </div>
          <div style={{
            flex: 1,
            padding: 16,
            overflow: 'auto',
            fontFamily: 'monospace',
          }}>
            {/* Successful output */}
            <Sequence from={phases[3].start + fps * 4} durationInFrames={phases[3].duration - fps * 4}>
              <TerminalOutput 
                lines={["Maximum value: 9"]}
                startFrame={phases[3].start + fps * 4}
                isSuccess={true} text={''} charactersPerSecond={0}              />
            </Sequence>

            {/* Error output */}
            <Sequence from={phases[4].start + fps * 4} durationInFrames={phases[4].duration - fps * 4}>
              <TerminalOutput 
                lines={["IndexError: list index out of range"]}
                startFrame={phases[4].start + fps * 4}
                isError={true} text={''} charactersPerSecond={0}              />
            </Sequence>

            {/* Fixed output */}
            <Sequence from={phases[5].start + fps * 6} durationInFrames={phases[5].duration - fps * 6}>
              <TerminalOutput 
                lines={[
                  "Max of [3, 7, 2, 9, 1, 5]: 9",
                  "Max of empty array: None"
                ]}
                startFrame={phases[5].start + fps * 6}
                isSuccess={true} text={''} charactersPerSecond={0}              />
            </Sequence>
          </div>
        </div>
      </div>

      {/* Bottom Subtitles */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 120,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 40px',
      }}>
        {phases.map((phase, index) => (
          <Sequence
            key={index}
            from={phase.start}
            durationInFrames={phase.duration}
          >
            <SubtitleText text={phase.subtitle} />
          </Sequence>
        ))}
      </div>

      {/* Progress Indicators */}
      <div style={{
        position: 'absolute',
        top: 100,
        right: 20,
        display: 'flex',
        gap: 8,
        zIndex: 10,
      }}>
        {phases.map((phase, index) => {
          const isActive = frame >= phase.start && frame < phase.start + phase.duration;
          return (
            <div
              key={index}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: isActive ? '#3b82f6' : '#4a4a4a',
                transition: 'background-color 0.3s',
              }}
            />
          );
        })}
      </div>

      {/* Optional background music */}
      {/* <Audio src={staticFile('background-music.mp3')} volume={0.1} /> */}
    </AbsoluteFill>
  );
};