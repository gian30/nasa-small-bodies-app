import { Col, Row, Spin } from 'antd';
import React, { useState } from 'react';
import { Asteroid } from '../utils/types';
import AsteroidCard from './AsteroidCard';
import AsteroidModal from './AsteroidModal';

interface AsteroidListProps {
	asteroids: Asteroid[];
	loading: boolean;
}

const AsteroidList: React.FC<AsteroidListProps> = ({ asteroids, loading }) => {
	const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);
	
	// close modal
	const handleModalClose = () => {
		setIsModalVisible(false);
	};

	// open modal with asteroid details on card click
	const handleAsteroidCardClick = (asteroid: Asteroid) => {
		setSelectedAsteroid(asteroid);
		setIsModalVisible(true);
	};

	return (
		<>
			{loading ? (<Spin size="large" style={{ margin: 'auto', display: 'block' }} />) : (
				<>
					<Row gutter={[0, 18]} style={styles.row}>
						{asteroids.map((asteroid) => (
							<Col xs={24} sm={12} md={8} lg={6} key={asteroid.id}>
								<AsteroidCard asteroid={asteroid} onClick={() => handleAsteroidCardClick(asteroid)} />
							</Col>
						))}
					</Row>

					<AsteroidModal asteroid={selectedAsteroid} isVisible={isModalVisible} onClose={handleModalClose} />
				</>
			)}
		</>
	);
};

const styles = {
	row: {
		width: '100%',
		paddingBottom: '20px',
	} as React.CSSProperties,
};

export default AsteroidList;
