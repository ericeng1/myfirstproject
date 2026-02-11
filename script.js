// ===============================
// Supabase Setup
// ===============================

const supabaseUrl = "https://onlshmndstcyqdxpimtv.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9ubHNobW5kc3RjeXFkeHBpbXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0MjQxNzAsImV4cCI6MjA4NDAwMDE3MH0.IV9gNNZnEwBepC2G1aDai-Kbu2zSLz06UkMyoSfJR0w";

const supabaseClient = window.supabase.createClient(
  supabaseUrl,
  supabaseKey
);


// ===============================
// Generate Random 5–7 Digit ID
// ===============================

function generateSubmissionId() {
  const min = 10000;      // 5 digits
  const max = 9999999;    // 7 digits
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ===============================
// Insert With Retry Protection
// ===============================

async function insertSubmission(formData, retries = 3) {

  for (let attempt = 0; attempt < retries; attempt++) {

    formData.submission_id = generateSubmissionId();

    const { error } = await supabaseClient
      .from("submissions")
      .insert([formData]);

    if (!error) {
      return formData.submission_id;
    }

    // If duplicate submission_id → retry
    if (error.message.includes("duplicate")) {
      console.warn("Duplicate ID detected. Retrying...");
      continue;
    }

    // Other errors → throw immediately
    throw error;
  }

  throw new Error("Failed to generate unique submission ID.");
}


// ===============================
// Form Event Listener
// ===============================

document.getElementById("submissionForm").addEventListener("submit", async (e) => {

  e.preventDefault();

  const status = document.getElementById("status");
  status.textContent = "Submitting...";

  try {

    const formData = {
      first_name: document.getElementById("first_name").value,
      last_name: document.getElementById("last_name").value,
      email: document.getElementById("email").value,
      image_url: document.getElementById("image_url").value,
      comment: document.getElementById("comment").value,
      created_at: new Date().toISOString()
    };

    const submissionId = await insertSubmission(formData);

    status.textContent = `✅ Submission successful! Your submission ID is ${submissionId}`;

    document.getElementById("submissionForm").reset();

  } catch (err) {

    console.error(err);
    status.textContent = "❌ Error submitting form. Please try again.";

  }

});
