import type {SidebarsConfig} from "@docusaurus/plugin-content-docs";

const sidebars: SidebarsConfig = {
	intro: [
		"intro",
		"domain/overview",
		"requirements/overview",
		"architecture/overview",
	],
	domain: [
		"domain/overview",
		"domain/business-vision",
		"domain/core-domain-concepts",
		"domain/ubiquitous-language",
		"domain/bounded-contexts",
		"domain/process-workflows",
	],
	requirements: [
		"requirements/overview",
		"requirements/introduction",
		"requirements/business-requirements",
		"requirements/functional-requirements",
		"requirements/non-functional-requirements",
		"requirements/user-stories",
		"requirements/system-requirements",
	],
	architecture: [
		"architecture/overview",
	],
};

export default sidebars;
