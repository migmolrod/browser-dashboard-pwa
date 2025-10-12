import type {ReactNode} from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
	title: string;
	Svg: React.ComponentType<React.ComponentProps<"svg">>;
	description: ReactNode;
	uri: string;
};

const FeatureList: FeatureItem[] = [
	{
		title: "Requirements",
		Svg: require("@site/static/img/intro/requirements.svg").default,
		description: (
			<>
				In the SRD (Software Requirements Document) we will describe the requirements (both functional and
				non-functional) of the project.
			</>
		),
		uri: "requirements/overview",
	},
	{
		title: "Architecture",
		Svg: require("@site/static/img/intro/architecture.svg").default,
		description: (
			<>
				In the ADD (Architecture Document) we will describe the high-level structure of the system. That is, what
				smaller parts (modules) it consists of.
			</>
		),
		uri: "architecture",
	},
	{
		title: "Design",
		Svg: require("@site/static/img/intro/design.svg").default,
		description: (
			<>
				In the several DDD (Detailed Design Documents) we will separately describe the low-level structure (including
				design patterns, protocols, etc) of each module.
			</>
		),
		uri: "design",
	},
];

function Feature({title, Svg, description, uri}: FeatureItem) {
	return (
		<div className={clsx("col col--4")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img"/>
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p>{description}</p>
				<a href={`/docs/${uri}`}>Read more</a>
			</div>
		</div>
	);
}

export default function HomepageFeatures(): ReactNode {
	return (
		<section className={styles.features}>
			<div className="container">
				<div className="row">
					{FeatureList.map((props, idx) => (
						<Feature key={idx} {...props} />
					))}
				</div>
			</div>
		</section>
	);
}
