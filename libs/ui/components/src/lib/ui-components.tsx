import styles from './ui-components.module.scss';

/* eslint-disable-next-line */
export type UiComponentsProps = {};

export function UiComponents(_props: UiComponentsProps) {
	return (
		<div className={styles.container}>
			<h1>Welcome to UiComponents!</h1>
		</div>
	);
}

export default UiComponents;
