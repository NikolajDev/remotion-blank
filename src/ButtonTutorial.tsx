// src/ButtonTutorial.tsx
import React from 'react';
import './index.css'
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, spring} from 'remotion';

// You would typically have a Tailwind CSS setup in your Remotion project.
// For this example, we'll use inline styles or a simple global CSS import if needed,
// but assume Tailwind classes are available.
// If you don't have Tailwind set up, you'd need to replace Tailwind classes with regular CSS.

// Helper function to animate text typing (simple version)
const TypewriterText: React.FC<{ text: string; startFrame: number; durationFrames: number; className?: string }> = ({
  text,
  startFrame,
  durationFrames,
  className,
}) => {
  const frame = useCurrentFrame();
  const animatedText = interpolate(
    frame,
    [startFrame, startFrame + durationFrames],
    [0, text.length],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }
  );

  return (
    <p className={className} style={{ whiteSpace: 'pre-wrap' }}>
      {text.substring(0, Math.floor(animatedText))}
    </p>
  );
};

// Main tutorial component
export const ButtonTutorial: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Define key timings for different sections (in frames)
  const introDuration = 3 * fps;
  const htmlSectionStart = introDuration;
  const htmlDuration = 10 * fps;
  const cssSectionStart = htmlSectionStart + htmlDuration;
  const cssDuration = 10 * fps;
  const jsSectionStart = cssSectionStart + cssDuration;
  const jsDuration = 12 * fps; // Includes button click animation
  const miniTaskStart = jsSectionStart + jsDuration;
  const miniTaskDuration = 12 * fps; // Includes second button click
  const outroStart = miniTaskStart + miniTaskDuration;
  const outroDuration = 5 * fps;

  // Animation for the main layout opacity
  const mainLayoutOpacity = spring({
    frame: frame,
    fps: fps,
    from: 0,
    to: 1,
    durationInFrames: 30, // Fade in duration
    delay: 30,
  });

  // Animation for the simulated button click
  const buttonScale = spring({
    frame: frame - (jsSectionStart + 7 * fps), // Start animation after JS code is shown
    fps: fps,
    config: {
      damping: 200,
      stiffness: 1000,
      mass: 0.5,
    },
    from: 1,
    to: 0.95,
    durationInFrames: 5,
  });

  const buttonScaleBack = spring({
    frame: frame - (jsSectionStart + 7 * fps + 5), // Release after press
    fps: fps,
    config: {
      damping: 200,
      stiffness: 1000,
      mass: 0.5,
    },
    from: 0.95,
    to: 1,
    durationInFrames: 5,
  });

  const finalButtonScale = interpolate(
    frame,
    [jsSectionStart + 7 * fps, jsSectionStart + 7 * fps + 5, jsSectionStart + 7 * fps + 10],
    [1, buttonScale, buttonScaleBack],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Animation for the message box opacity
  const messageBoxOpacity = interpolate(
    frame,
    [jsSectionStart + 7 * fps + 10, jsSectionStart + 7 * fps + 10 + 15, jsSectionStart + 7 * fps + 10 + 15 + 3 * fps, jsSectionStart + 7 * fps + 10 + 15 + 3 * fps + 15],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Animation for the message box text
  const messageBoxText = interpolate(
    frame,
    [jsSectionStart + 7 * fps + 10, jsSectionStart + 7 * fps + 10 + 1],
    [0, 1], // Simple step for text appearance
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  ) > 0 ? "Button clicked!" : "";

  // Mini-task button click simulation
  const miniTaskButtonScale = spring({
    frame: frame - (miniTaskStart + 7 * fps),
    fps: fps,
    config: { damping: 200, stiffness: 1000, mass: 0.5 },
    from: 1,
    to: 0.95,
    durationInFrames: 5,
  });

  const miniTaskButtonScaleBack = spring({
    frame: frame - (miniTaskStart + 7 * fps + 5),
    fps: fps,
    config: { damping: 200, stiffness: 1000, mass: 0.5 },
    from: 0.95,
    to: 1,
    durationInFrames: 5,
  });

  const finalMiniTaskButtonScale = interpolate(
    frame,
    [miniTaskStart + 7 * fps, miniTaskStart + 7 * fps + 5, miniTaskStart + 7 * fps + 10],
    [1, miniTaskButtonScale, miniTaskButtonScaleBack],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const miniTaskMessageBoxOpacity = interpolate(
    frame,
    [miniTaskStart + 7 * fps + 10, miniTaskStart + 7 * fps + 10 + 15, miniTaskStart + 7 * fps + 10 + 15 + 3 * fps, miniTaskStart + 7 * fps + 10 + 15 + 3 * fps + 15],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  const miniTaskMessageBoxText = interpolate(
    frame,
    [miniTaskStart + 7 * fps + 10, miniTaskStart + 7 * fps + 10 + 1],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  ) > 0 ? "You pressed the button!" : "";


  return (
    <AbsoluteFill className="bg-gradient-to-br from-gray-950 to-black text-gray-100 flex items-center justify-center"> {/* Darker background with subtle gradient */}
      {/* Intro Title */}
      <Sequence from={0} durationInFrames={introDuration}>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-6xl font-extrabold text-yellow-400 text-center drop-shadow-lg">
            100 Days of Code: Day 16<br />Web Tutorial: Button Click
          </h1>
        </div>
      </Sequence>

      {/* Main Layout (Code and Output Panels) */}
      <Sequence from={introDuration} durationInFrames={durationInFrames - introDuration}>
        <div
          className="w-full h-full p-10 grid grid-cols-2 grid-rows-2 gap-8"
          style={{ opacity: mainLayoutOpacity }}
        >
          {/* Top-Left: HTML Code Panel */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-700 p-8 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-3xl"> {/* Added hover effects */}
            <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-gray-600 pb-2">HTML Code</h2>
            <div className="flex-1 overflow-auto text-green-400 font-mono text-xl leading-relaxed">
              <Sequence from={0} durationInFrames={htmlDuration}>
                <TypewriterText
                  text={`<body>
    <div class="container">
        <h1>Web Interaction Example</h1>
        <button id="myButton">Click on me</button>
        <div id="messageBox">
            <!-- Message will appear here -->
        </div>
    </div>
</body>`}
                  startFrame={0}
                  durationFrames={htmlDuration - fps * 2}
                  className="text-green-400"
                />
              </Sequence>
            </div>
          </div>

          {/* Top-Right: CSS Code Panel */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-700 p-8 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-3xl"> {/* Added hover effects */}
            <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-gray-600 pb-2">CSS Code</h2>
            <div className="flex-1 overflow-auto text-blue-400 font-mono text-xl leading-relaxed">
              <Sequence from={cssSectionStart - htmlSectionStart} durationInFrames={cssDuration}>
                <TypewriterText
                  text={`body { display: flex; justify-content: center; align-items: center; }\n\n.container {\n    background-color: #2a2a2a;\n    border-radius: 16px;\n    display: flex; flex-direction: column;\n    align-items: center; justify-content: center;\n}\n\n.button-style {\n    background-color: #4CAF50;\n    padding: 15px 30px;\n    border-radius: 8px;\n}\n\n.message-box {\n    background-color: #1e1e1e;\n    border: 1px solid #0f0;\n    opacity: 0; /* Initially hidden */\n    transition: opacity 0.5s ease-in-out;\n}\n.message-box.show { opacity: 1; }`}
                  startFrame={0}
                  durationFrames={cssDuration - fps * 2}
                  className="text-blue-400"
                />
              </Sequence>
            </div>
          </div>

          {/* Bottom-Left: JavaScript Code Panel */}
          <div className="bg-gray-800 rounded-2xl shadow-2xl border-2 border-gray-700 p-8 flex flex-col transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-3xl"> {/* Added hover effects */}
            <h2 className="text-3xl font-bold text-white mb-4 border-b-2 border-gray-600 pb-2">JavaScript Code</h2>
            <div className="flex-1 overflow-auto text-yellow-400 font-mono text-xl leading-relaxed">
              <Sequence from={jsSectionStart - htmlSectionStart} durationInFrames={jsDuration}>
                <TypewriterText
                  text={`const myButton = document.getElementById('myButton');\nconst messageBox = document.getElementById('messageBox');\n\nfunction showCustomMessage(message) {\n    messageBox.textContent = message;\n    messageBox.classList.add('show');\n    setTimeout(() => {\n        messageBox.classList.remove('show');\n    }, 3000);\n}\n\nmyButton.addEventListener('click', () => {\n    showCustomMessage("Button clicked!");\n});`}
                  startFrame={0}
                  durationFrames={jsDuration - fps * 2}
                  className="text-yellow-400"
                />
              </Sequence>
              {/* Mini-Task JS Code (appears later in sequence) */}
              <Sequence from={miniTaskStart - htmlSectionStart} durationInFrames={miniTaskDuration}>
                <TypewriterText
                  text={`\n// Mini-Task Update\nmyButton.addEventListener('click', () => {\n    showCustomMessage("You pressed the button!");\n});`}
                  startFrame={0}
                  durationFrames={miniTaskDuration - fps * 2}
                  className="text-purple-400"
                />
              </Sequence>
            </div>
          </div>

          {/* Bottom-Right: Simulated Website Output Panel */}
          <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl border-2 border-green-600 p-0 flex items-center justify-center overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-3xl"> {/* Added hover effects */}
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-xl w-4/5 h-3/5 flex flex-col items-center justify-center p-8 gap-5 shadow-xl shadow-gray-700/50"> {/* Enhanced inner shadow */}
              <h1 className="text-3xl font-bold text-white text-center mb-4">Web Interaction Example</h1>
              {/* Simulated Button (controlled by JS section) */}
              <button
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-out transform ring-2 ring-green-400 ring-opacity-50 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-75"
                style={{ transform: `scale(${finalButtonScale})` }}
              >
                Click on me
              </button>
              {/* Simulated Message Box (controlled by JS section) */}
              <div
                className="bg-gray-800 border border-green-500 rounded-lg p-4 text-green-400 font-mono text-lg text-center w-4/5 shadow-md ring-1 ring-green-400 ring-opacity-30"
                style={{ opacity: messageBoxOpacity }}
              >
                {messageBoxText}
              </div>

              {/* Mini-Task Simulated Button and Message Box (appears later for mini-task) */}
              <Sequence from={miniTaskStart - htmlSectionStart} durationInFrames={miniTaskDuration}>
                <button
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 text-white px-8 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 ease-out transform ring-2 ring-green-400 ring-opacity-50 focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-75"
                  style={{ transform: `scale(${finalMiniTaskButtonScale})` }}
                >
                  Press Me
                </button>
                <div
                  className="bg-gray-800 border border-green-500 rounded-lg p-4 text-green-400 font-mono text-lg text-center w-4/5 shadow-md ring-1 ring-green-400 ring-opacity-30"
                  style={{ opacity: miniTaskMessageBoxOpacity }}
                >
                  {miniTaskMessageBoxText}
                </div>
              </Sequence>
            </div>
          </div>
        </div>

        {/* Subtitle (positioned above the grid) */}
        <div className="absolute top-10 w-full text-center">
          {/* Subtitle for Intro */}
          <Sequence from={0} durationInFrames={htmlSectionStart}>
            <TypewriterText
              text="Welcome to Day 16! Today, we build our first interactive web element! We'll create a button that displays a message when clicked, using HTML, CSS, and JavaScript."
              startFrame={0}
              durationFrames={introDuration - fps * 0.5}
              className="text-white text-4xl font-semibold drop-shadow-md"
            />
          </Sequence>

          {/* Subtitle for HTML Section */}
          <Sequence from={htmlSectionStart} durationInFrames={htmlDuration}>
            <TypewriterText
              text="HTML provides the structure: a container, a button, and a message box. The `id` attributes are crucial for JavaScript to find these elements."
              startFrame={0}
              durationFrames={htmlDuration - fps * 0.5}
              className="text-white text-4xl font-semibold drop-shadow-md"
            />
          </Sequence>

          {/* Subtitle for CSS Section */}
          <Sequence from={cssSectionStart} durationInFrames={cssDuration}>
            <TypewriterText
              text="CSS makes it look good: centering, button appearance, and message box style. We use flexbox for centering and transitions for smooth appearance."
              startFrame={0}
              durationFrames={cssDuration - fps * 0.5}
              className="text-white text-4xl font-semibold drop-shadow-md"
            />
          </Sequence>

          {/* Subtitle for JavaScript Section */}
          <Sequence from={jsSectionStart} durationInFrames={jsDuration}>
            <TypewriterText
              text="JavaScript brings it to life: it listens for clicks and updates the message box. Watch as the button is clicked and the message appears!"
              startFrame={0}
              durationFrames={jsDuration - fps * 0.5}
              className="text-white text-4xl font-semibold drop-shadow-md"
            />
          </Sequence>

          {/* Subtitle for Mini-Task Section */}
          <Sequence from={miniTaskStart} durationInFrames={miniTaskDuration}>
            <TypewriterText
              text="Time for a mini-task: Change the button's text and message! See the updated interaction."
              startFrame={0}
              durationFrames={miniTaskDuration - fps * 0.5}
              className="text-white text-4xl font-semibold drop-shadow-md"
            />
          </Sequence>
        </div>
      </Sequence>

      {/* Outro Call to Action */}
      <Sequence from={outroStart} durationInFrames={outroDuration}>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-5xl font-bold text-white mb-6">
            🆕 Follow for Day 17: More Web Dev!
          </p>
          <p className="text-4xl text-white mb-6">
            ❤️ Like if you're building awesome web pages!
          </p>
          <p className="text-4xl text-white mb-6">
            💬 Comment: What web element do you want to animate next?
          </p>
          <p className="text-4xl text-white mb-6">
            🔥 Share with fellow coders!
          </p>
          <p className="text-4xl text-white">
            👾 Join my Discord, link in description.
          </p>
        </div>
      </Sequence>
    </AbsoluteFill>
  );
};

// --- How to integrate this into your Remotion project ---
// 1. Save this code as 'src/ButtonTutorial.tsx'
//
// 2. Update your 'src/Composition.tsx' (or create it if it doesn't exist) like this:
/*
import { Composition } from 'remotion';
import { ButtonTutorial } from './ButtonTutorial'; // Import the component

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ButtonTutorial"
        component={ButtonTutorial}
        durationInFrames={20 * 60} // Example: 20 minutes (adjust as needed)
        fps={30}
        width={1920}
        height={1080}
      />
      // You can add more compositions here for other videos
    </>
  );
};
*/
//
// 3. Ensure your 'src/Root.tsx' imports and uses RemotionRoot:
/*
import { registerRoot } from 'remotion';
import { RemotionRoot } => './Composition'; // Import your compositions

registerRoot(RemotionRoot);
*/
