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
		title: "Business & Domain",
		Svg: require("@site/static/img/intro/domain.svg").default,
		description: (
			<>
				In the DMD (Domain Modeling Document) we will describe the business domain of the project, before any
				requirements or technical details are defined.
			</>
		),
		uri: "domain/overview",
	},
	{
		title: "Requirements",
		Svg: require("@site/static/img/intro/requirements.svg").default,
		description: (
			<>
				In the SRS (Software Requirements Specification) we will describe all kind of requirements of the project.
			</>
		),
		uri: "requirements/overview",
	},
	{
		title: "Architecture",
		Svg: require("@site/static/img/intro/architecture.svg").default,
		description: (
			<>
				In the SAD (Software Architecture Document) we will describe the high-level structure of the system. That is,
				what smaller parts (modules) it consists of.
			</>
		),
		uri: "architecture/overview",
	},
	{
		title: "Design",
		Svg: require("@site/static/img/intro/design.svg").default,
		description: (
			<>
				In the several CDDs (Component Design Documents) we will separately describe the low-level structure (including
				design patterns, protocols, etc) of each component defined in the SAD.
			</>
		),
		uri: "design/overview",
	},
];

function Feature({title, Svg, description, uri}: FeatureItem) {
	return (
		<div className={clsx("col col--3")}>
			<div className="text--center">
				<Svg className={styles.featureSvg} role="img"/>
			</div>
			<div className="text--center padding-horiz--md">
				<Heading as="h3">{title}</Heading>
				<p className="text--justify">{description}</p>
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
