import { Composition } from 'remotion';
import { CollectionsAnimation } from './CollectionsAnimation';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CollectionsAnimation"
        component={CollectionsAnimation}
        durationInFrames={30 * 80} // Adjust based on total duration (~80 seconds)
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};