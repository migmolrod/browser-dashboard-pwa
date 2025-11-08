import styles from "./styles.module.css";

function getBadgeClassFromStatus(status: string): string {
	return styles.reqStatus + " " + styles[`reqStatus${status}`];
}

export default function RequirementMetadata({status, lastUpdated}) {
	return (
		<div className={styles.reqMetadata}>
			<span className={getBadgeClassFromStatus(status)}>
				{status || "-"}
			</span>
			{lastUpdated && <span><strong>Last updated</strong>: {lastUpdated.toLocaleDateString()}</span>}
			{/*{reviewers?.length > 0 && <span>Reviewers: {reviewers.join(", ")}</span>}*/}
		</div>
	);
}
