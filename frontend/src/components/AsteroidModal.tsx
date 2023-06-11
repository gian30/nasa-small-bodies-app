import { Modal } from 'antd';
import React from 'react';
import { Asteroid } from '../utils/types';

interface AsteroidModalProps {
	asteroid: Asteroid | null;
	isVisible: boolean;
	onClose: () => void;
}

const AsteroidModal: React.FC<AsteroidModalProps> = ({ asteroid, isVisible, onClose }) => {
	if (!asteroid) return null;

	// render asteroid details field value title and value
	const renderField = (title: string, value: string | number) => (
		<p><span style={styles.modalTitleStyle}>{title}:</span> {value}</p>
	);

	return (
		<Modal title="Asteroid Details" visible={isVisible} onCancel={onClose} footer={null}>
			<div style={styles.container}>
				{renderField('Name', asteroid.name)}
				{renderField('Absolute Magnitude (H)', asteroid.absolute_magnitude_h)}
				{renderField('Estimated Diameter (kilometers)', asteroid.diameter)}
				{renderField('Close Approach Date', asteroid.close_approach_date_full)}
				{renderField('Relative Velocity (kilometers per hour)', asteroid.relative_velocity)}
				{renderField('Miss Distance (kilometers)', asteroid.miss_distance)}
				{renderField('Is Potentially Hazardous', asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No')}
			</div>
		</Modal>
	);
};

const styles = {
	container: {
		display: 'flex',
		flexDirection: 'column',
	} as React.CSSProperties,
	modalTitleStyle: {
		fontWeight: 'bold',
	} as React.CSSProperties,
};

export default AsteroidModal;