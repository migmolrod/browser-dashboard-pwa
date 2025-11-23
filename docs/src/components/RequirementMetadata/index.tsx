import styles from "./styles.module.css";
import StatusLabel from "@site/src/components/StatusLabel";
import useFrontMatter from '@theme/useFrontMatter';

function formatDate(date: Date): string {
	const formatter = new Intl.DateTimeFormat('en-US', {dateStyle: 'long'});
	return formatter.format(date);
}

export default function RequirementMetadata() {
	const {status, lastUpdated} = useFrontMatter();
	return (
		<div className={styles.reqMetadata}>
			<div>
				<strong>Status: </strong>
				<StatusLabel status={status}/>
			</div>
			{lastUpdated && <span><strong>Last updated</strong>: {formatDate(lastUpdated)}</span>}
			{/*{reviewers?.length > 0 && <span>Reviewers: {reviewers.join(", ")}</span>}*/}
		</div>
	);
}
