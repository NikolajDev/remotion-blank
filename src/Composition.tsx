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
    </>
  );
};