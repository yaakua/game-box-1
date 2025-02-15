import {
	GetObjectCommand,
	PutObjectCommand,
	S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

let globalClient: S3Client = null as any

export function getS3Client() {
	if (globalClient) {
		return globalClient
	}
	globalClient = new S3Client({
		endpoint:
			"xxxxxx",
		region: "auto",
		credentials: {
			accessKeyId: "xxxxx",
			secretAccessKey:
				"xxxxxxxxxxxxxxxx",
		},
	})
	return globalClient
}

export function getBucket(custom?: string) {
	return custom ?? "fafafa"
}

export async function putObject(key: string, body: any, customBucket?: string) {
	const bucket = getBucket(customBucket)
	const client = getS3Client()
	await client.send(
		new PutObjectCommand({
			Bucket: bucket,
			Key: key,
			Body: body,
		}),
	)
	return key
}

export function createPutSingedUrl(
	key: string,
	customBucket?: string,
	expiresIn = 3600,
) {
	const bucket = getBucket(customBucket)
	const command = new PutObjectCommand({ Bucket: bucket, Key: key! })
	const client = getS3Client()

	return getSignedUrl(client, command, {
		expiresIn,
	})
}

export async function createGetSingedUrl(
	key?: string | null,
	customBucket?: string,
	expiresIn = 3600,
) {
	if (!key) {
		return key
	}
	const bucket = getBucket(customBucket)
	const command = new GetObjectCommand({ Bucket: bucket, Key: key })
	const client = getS3Client()
	return await getSignedUrl(client, command, {
		expiresIn,
	})
}
