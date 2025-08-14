const { ModuleFederationPluginV1: ModuleFederationPlugin } =
	require("@rspack/core").container;

/** @type {import("@rspack/core").Configuration} */
module.exports = {
	mode: "development",
	plugins: [
		new ModuleFederationPlugin({
			name: "A",
			filename: "container-a.js",
			shared: {
				shared: {
					version: false,
					requiredVersion: false,
					singleton: true,
					strictVersion: false,
					version: "0.1.2"
				}
			}
		}),
		function (compiler) {
			compiler.hooks.thisCompilation.tap(
				"ChangeDataRequest",
				(compilation, { normalModuleFactory }) => {
					normalModuleFactory.hooks.beforeResolve.tap(
						"ChangeDataRequest",
						data => {
							if (data.request === "shared") {
								data.request = "./my-shared";
							}
						}
					);
				}
			);
		}
	]
};
