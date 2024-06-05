import { env } from '$env/dynamic/private';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
export class S3Service {
	private readonly client: S3Client;

	constructor() {
		this.client = new S3Client({
			region: 'us-east-1',
			credentials: {
				accessKeyId: env.AWS_ACCESS_KEY_ID,
				secretAccessKey: env.AWS_ACCESS_KEY_SECRET
			}
		});
	}

	async get(Key: string) {
		try {
			const getObjectCommand = new GetObjectCommand({
				Bucket: env.AWS_S3_BUCKET_NAME,
				Key
			});
			return this.client.send(getObjectCommand);
		} catch (error) {
			console.error('S3Respository GET failed', error);
		}
	}
}
