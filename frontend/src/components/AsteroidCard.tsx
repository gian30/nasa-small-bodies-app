import { StarFilled, StarOutlined } from '@ant-design/icons';
import { Button, Card } from 'antd';
import React, { useState } from 'react';
import { addToFavorites, removeFromFavorites } from '../utils/services/asteroid-service';
import { Asteroid } from '../utils/types';
import asteroidImage from "./../assets/img/asteroid.jpg";
const { Meta } = Card;

interface AsteroidCardProps {
	asteroid: Asteroid;
	onClick: (asteroid: Asteroid) => void;
}

const AsteroidCard: React.FC<AsteroidCardProps> = ({ asteroid, onClick }) => {
	const [isFavorite, setIsFavorite] = useState(asteroid.is_favorite);
	const handleAddToFavorites = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (asteroid.is_favorite) {
			removeFromFavorites(asteroid.id).then(() => setFavoriteStatus(false)).catch((error: any) => console.error('Failed to remove asteroid from favorites:', error));
		} else {
			addToFavorites(asteroid.id).then(() => setFavoriteStatus(true)).catch((error: any) => console.error('Failed to add asteroid to favorites:', error));
		}
	};

	// update asteroid's favorite status
	const setFavoriteStatus = (isFavorite: boolean) => {
		asteroid.is_favorite = isFavorite;
		setIsFavorite(isFavorite);
	};

	return (
		<Card style={styles.card} key={asteroid.id} onClick={() => onClick(asteroid)} cover={<img alt="asteroid" style={styles.cover} src={asteroidImage} />}>
			<Meta title={asteroid.name} />
			<div style={{ position: 'absolute', top: 9, right: 10 }}>
				<Button type="default" style={{ lineHeight: 1 }} ghost icon={isFavorite ? <StarFilled /> : <StarOutlined />} onClick={handleAddToFavorites} />
			</div>
			<p>Absolute Magnitude: {asteroid.absolute_magnitude_h}</p>
			<p>Is Potentially Hazardous: {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</p>
		</Card>
	);
};

const styles = {
	card: {
		width: 'calc(100% - 40px)',
		margin: '0 auto',
		cursor: 'pointer',
	} as React.CSSProperties,
	cover: {
		width: '100%',
		height: '200px',
		objectFit: 'cover',
	} as React.CSSProperties,
};

export default AsteroidCard;
