import styles from "./styles.module.css";
import StatusLabel from "@site/src/components/StatusLabel";

export default function RequirementMetadata({status, lastUpdated}) {
	return (
		<div className={styles.reqMetadata}>
			<div>
				<strong>Status: </strong>
				<StatusLabel status={status}/>
			</div>
			{lastUpdated && <span><strong>Last updated</strong>: {lastUpdated.toLocaleDateString()}</span>}
			{/*{reviewers?.length > 0 && <span>Reviewers: {reviewers.join(", ")}</span>}*/}
		</div>
	);
}
