module.exports = {
	root: true,
	env: {
		node: true,
		"es6": true
	},
	rules: {
		"no-console": [
			"error",
			{
				allow: ["log", "error", "warn"]
			}
		],
		"vue/no-v-html": 0,
		"vue/require-prop-types": 0,
		"vue/require-default-prop": 0,
		quotes: [1, "double", "avoid-escape"]
	},
	parserOptions: {
		ecmaVersion: 2017,
		sourceType: "module"
	}
}
