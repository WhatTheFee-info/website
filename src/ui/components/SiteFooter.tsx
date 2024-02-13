import { GithubCircle } from 'iconoir-react';
import config from '../../config';
import { usePlayWTFeeAudio } from '../hooks';

export default function SiteFooter() {
  const playWTFeeAudio = usePlayWTFeeAudio();
  return (
    <footer
      className="bg-white dark:bg-gray-900 w-full py-2 text-center
            border-t border-gray-200 dark:border-gray-600"
    >
      <p>
        {`Version ${config.appVersion}. `}
        This project is open source.{' '}
        <span onClick={playWTFeeAudio}>
          Made with white coffee ☕ from Coseco 🏴‍☠️⚔️.
        </span>
      </p>
      <a href={config.repoUrl} target="_blank">
        <GithubCircle className="inline-block" />
      </a>
    </footer>
  );
}
