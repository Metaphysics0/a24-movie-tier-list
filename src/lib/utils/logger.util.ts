function info(...msgs: any) {
	console.info(`[INFO]`, ...msgs);
}

function error(...msgs: any) {
	console.error(`[ERROR]`, ...msgs);
}

function warn(...msgs: any) {
	console.warn(`[WARN]`, ...msgs);
}

const logger = Object.freeze({
	info,
	error,
	warn
});

export { logger };
