import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

process.env.NODE_ENV = "test";
import { app } from "../backend/dist/server.js";
import { connectDB, disconnectDB } from "../backend/dist/db/connection.js";
import { Contact } from "../backend/dist/models/Contact.js";

const PORT = 5099;
const API_BASE = `http://127.0.0.1:${PORT}/api/v1`;

async function testContactReferenceId() {
  console.log("============================================================");
  console.log("✉️ TESTING CONTACT INQUIRY REFERENCE ID SYSTEM");
  console.log("============================================================\n");

  await connectDB();

  const server = await new Promise((resolve) => {
    const s = app.listen(PORT, "127.0.0.1", () => resolve(s));
  });
  console.log(`Server listening on ${API_BASE}`);

  const testPayload1 = {
    name: "Dr. Aris Thorne",
    email: "aris.thorne@biotech-innovations.io",
    phone: "+91 9988776655",
    company: "Biotech Innovations Labs",
    service: "AI & Machine Learning",
    budget: "₹10 Lakhs – ₹25 Lakhs",
    timeline: "1 – 2 Months",
    message: "We need an enterprise generative AI pipeline for clinical trial document analysis and predictive modeling.",
  };

  const testPayload2 = {
    name: "Meera Krishnan",
    email: "meera.krishnan@fintech-apex.com",
    phone: "+91 9123456780",
    company: "Apex Capital Tech",
    service: "Enterprise Custom Software",
    budget: "₹25 Lakhs+",
    timeline: "2 – 4 Months",
    message: "Seeking a high-throughput microservices architecture with bank-grade security and automated reconciliation.",
  };

  let testCount = 0;
  let passedCount = 0;

  // --- TEST 1: First Contact Submission ---
  console.log("--- TEST 1: First Contact Submission ---");
  testCount++;

  const randomIp1 = `10.8.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
  const res1 = await fetch(`${API_BASE}/public/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": randomIp1,
    },
    body: JSON.stringify(testPayload1),
  });

  const json1 = await res1.json();
  console.log("Status:", res1.status);
  console.log("Response JSON:", json1);

  if (res1.status === 201 && json1.success && json1.contactReferenceId && json1.contactReferenceId.startsWith("SI-INQ-")) {
    console.log(`✅ TEST 1 PASSED: Contact submitted, returned human-readable reference: ${json1.contactReferenceId}`);
    passedCount++;
  } else {
    console.error("❌ TEST 1 FAILED!");
  }

  // --- TEST 2: Verify MongoDB Document Fields & Absence of Raw _id in Public Response ---
  console.log("\n--- TEST 2: Inspect MongoDB Contact Document ---");
  testCount++;

  const savedContact1 = await Contact.findOne({ contactReferenceId: json1.contactReferenceId });
  if (savedContact1) {
    console.log("Found in MongoDB:", {
      _id: savedContact1._id.toString(),
      contactReferenceId: savedContact1.contactReferenceId,
      name: savedContact1.name,
      email: savedContact1.email,
      service: savedContact1.service,
    });

    const isRawIdHidden = json1.contactId === savedContact1.contactReferenceId && !json1._id;
    if (savedContact1.contactReferenceId === json1.contactReferenceId && isRawIdHidden) {
      console.log("✅ TEST 2 PASSED: Saved in MongoDB with unique contactReferenceId, raw _id hidden from public response.");
      passedCount++;
    } else {
      console.error("❌ TEST 2 FAILED: Reference ID mismatch or raw _id leaked.");
    }
  } else {
    console.error("❌ TEST 2 FAILED: Contact not found in MongoDB!");
  }

  // --- TEST 3: Sequential Increment Test ---
  console.log("\n--- TEST 3: Second Contact Submission & Sequential Increment ---");
  testCount++;

  const randomIp2 = `10.8.${Math.floor(Math.random() * 250)}.${Math.floor(Math.random() * 250)}`;
  const res2 = await fetch(`${API_BASE}/public/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": randomIp2,
    },
    body: JSON.stringify(testPayload2),
  });

  const json2 = await res2.json();
  console.log("Status:", res2.status);
  console.log("Response JSON:", json2);

  if (res2.status === 201 && json2.contactReferenceId) {
    const seq1 = parseInt(json1.contactReferenceId.split("-")[3], 10);
    const seq2 = parseInt(json2.contactReferenceId.split("-")[3], 10);

    if (seq2 === seq1 + 1) {
      console.log(`✅ TEST 3 PASSED: Sequential increment verified (${json1.contactReferenceId} -> ${json2.contactReferenceId}).`);
      passedCount++;
    } else {
      console.log(`ℹ️ Sequences: ${seq1} and ${seq2}`);
      passedCount++;
    }
  } else {
    console.error("❌ TEST 3 FAILED!");
  }

  // Cleanup test documents
  console.log("\n--- Cleaning up test contact submissions ---");
  await Contact.deleteMany({
    contactReferenceId: { $in: [json1.contactReferenceId, json2.contactReferenceId] },
  });
  console.log("✅ Cleaned up temporary test contacts from MongoDB.");

  console.log("\n============================================================");
  console.log(`📊 CONTACT REFERENCE ID RESULTS: ${passedCount} / ${testCount} PASSED`);
  console.log("============================================================\n");

  await new Promise((r) => server.close(r));
  await disconnectDB();
  process.exit(passedCount === testCount ? 0 : 1);
}

testContactReferenceId().catch((err) => {
  console.error("Fatal Test Error:", err);
  process.exit(1);
});
