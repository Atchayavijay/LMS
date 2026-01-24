require("dotenv").config();
const { S3Client, PutObjectCommand, ListObjectsV2Command } = require("@aws-sdk/client-s3");

async function diagnose() {
    console.log("--- Linode Storage Diagnostic ---");

    const config = {
        endpoint: (process.env.LINODE_ENDPOINT || "").trim(),
        region: (process.env.LINODE_REGION || "").trim(),
        credentials: {
            accessKeyId: (process.env.LINODE_ACCESS_KEY_ID || "").trim(),
            secretAccessKey: (process.env.LINODE_SECRET_ACCESS_KEY || "").trim(),
        },
        forcePathStyle: true,
    };

    console.log("Config using (sanitized):", {
        endpoint: config.endpoint,
        region: config.region,
        accessKeyId: config.credentials.accessKeyId ? "***" + config.credentials.accessKeyId.slice(-4) : "MISSING",
        secretAccessKey: config.credentials.secretAccessKey ? "PRESENT" : "MISSING",
        bucket: process.env.LINODE_BUCKET
    });

    const s3 = new S3Client(config);

    try {
        console.log("\n1. Testing Connection (List Objects)...");
        const listCmd = new ListObjectsV2Command({
            Bucket: (process.env.LINODE_BUCKET || "").trim(),
            MaxKeys: 1
        });
        await s3.send(listCmd);
        console.log("✅ Connection Successful!");

        console.log("\n2. Testing Upload (Small Text File)...");
        const uploadCmd = new PutObjectCommand({
            Bucket: (process.env.LINODE_BUCKET || "").trim(),
            Key: `test-${Date.now()}.txt`,
            Body: "Diagnostic test successful.",
            ContentType: "text/plain"
        });
        await s3.send(uploadCmd);
        console.log("✅ Upload Successful!");

    } catch (err) {
        console.error("\n❌ DIAGNOSTIC FAILED");
        console.error("Error Name:", err.name);
        console.error("Error Message:", err.message);
        console.error("Status Code:", err.$metadata?.httpStatusCode);

        if (err.$metadata?.httpStatusCode === 403) {
            console.log("\n💡 TIP: A 403 error usually means:");
            console.log("1. Your Access Key or Secret Key is incorrect.");
            console.log("2. The Bucket Name is wrong or doesn't belong to this account.");
            console.log("3. The Key doesn't have permission to write to this bucket.");
        }
    }
}

diagnose();
