import React, { type FC, memo } from 'react';
import styles from './DescriptionUnit.module.scss';

interface Film {
  vote_average?: number | null;
  release_date?: string | null;
  overview?: string | null;
  [key: string]: any;
}

interface DescriptionUnitProps {
  film: Film;
  className?: string;
  showScore?: boolean;
  showReleaseDate?: boolean;
  showOverview?: boolean;
}

const DescriptionUnit: FC<DescriptionUnitProps> = memo(({ 
  film, 
  className = '',
  showScore = true,
  showReleaseDate = true,
  showOverview = true
}) => {
  const { vote_average, release_date, overview } = film;

  const formattedScore = vote_average 
    ? vote_average.toFixed(1) 
    : 'N/A';

  const formattedDate = release_date 
    ? new Date(release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown release date';

  const truncatedOverview = overview && overview.length > 500 
    ? `${overview.substring(0, 500)}...` 
    : overview || 'No description available.';

  const infoParts = [];
  if (showScore) infoParts.push(`Score: ${formattedScore}`);
  if (showReleaseDate) infoParts.push(`Release Date: ${formattedDate}`);
  const infoString = infoParts.join(' | ');

  return (
    <div className={`${styles.descriptionUnit} ${className}`}>
      {infoString && (
        <p className={styles.info} aria-label="Movie information">
          {infoString}
        </p>
      )}
      
      <hr className={styles.whiteLine} aria-hidden="true" />
      
      {showOverview && (
        <p className={styles.info} aria-label="Movie overview">
          {truncatedOverview}
        </p>
      )}
      
      <hr className={styles.whiteLine} aria-hidden="true" />
    </div>
  );
});

DescriptionUnit.displayName = 'DescriptionUnit';

export default DescriptionUnit;