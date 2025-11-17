import styles from "@site/src/components/RequirementMetadata/styles.module.css";

function getBadgeClassFromStatus(status: string): string {
	return styles.reqStatus + " " + styles[`reqStatus${status}`];
}

export default function StatusLabel({status}) {
	return (
		<span className={getBadgeClassFromStatus(status)}>
			{status || "-"}
		</span>
	);
}
