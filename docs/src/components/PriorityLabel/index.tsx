import styles from "@site/src/components/PriorityLabel/styles.module.css";

function getLabelClassFromPriority(priority: string): string {
	const normalizedPriority = priority
		.replaceAll(" ", "")
		.replaceAll("'", "");
	return styles.priorityLabel + " " + styles[`priorityLabel${normalizedPriority}`];
}

export default function PriorityLabel(props) {
	return (
		<span className={getLabelClassFromPriority(props.priority)}>
			{props.priority || "-"}
		</span>
	);
}
