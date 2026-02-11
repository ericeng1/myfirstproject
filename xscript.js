// 🔑 Supabase Connection
const supabaseUrl = "https://onlshmndstcyqdxpimtv.supabase.co";
const supabaseKey = "sb_publishable_sKM_Z6dU7P9_033hGlDWpA_wRve0zt4";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);


// 🎲 Generate random 5–7 digit submission ID
function generateSubmissionId() {
  const min = 10000;      // 5 digits
  const max = 9999999;    // 7 digits
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// 🎧 Form Listener
document.getElementById("submissionForm").addEventListener("submit", async (e) => {

  e.preventDefault();
  const status = document.getElementById("status");

  // Generate submission ID
  const submissionId = generateSubmissionId();

  const formData = {
    submission_id: submissionId,
    first_name: document.getElementById("first_name").value,
    last_name: document.getElementById("last_name").value,
    email: document.getElementById("email").value,
    image_url: document.getElementById("image_url").value,
    comment: document.getElementById("comment").value,
    created_at: new Date().toISOString()
  };


  // 🚀 Insert Into Supabase
  const { data, error } = await supabase
    .from("submissions")
    .insert([formData])
    .select(); // returns inserted row


  if (error) {
    status.textContent = "Error: " + error.message;
    console.error(error);
  } else {
    status.textContent = `Submission successful! Your ID is ${submissionId}`;
    document.getElementById("submissionForm").reset();
  }

});
