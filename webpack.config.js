module.exports = {
    entry: {
        app: './src/js/app.js',
        admin: './src/js/admin.js',
        mobile: './src/js/mobile.js',
        device: './src/js/device.js'
    },
    output: {
        filename: 'dist/js/[name].js'
    },
    module: {
    	loaders: [
    		{ test: /\.less$/, loader: "style!css!less"}
    	]
	}
};