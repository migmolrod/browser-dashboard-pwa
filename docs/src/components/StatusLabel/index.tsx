import styles from "@site/src/components/StatusLabel/styles.module.css";

function getBadgeClassFromStatus(status: string): string {
	return styles.reqStatus + " " + styles[`reqStatus${status}`];
}

export default function StatusLabel(props) {
	return (
		<span className={getBadgeClassFromStatus(props.status)}>
			{props.status || "-"}
		</span>
	);
}
