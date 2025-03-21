"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendEmail } from "./api/send/route";

export default function Home() {
  const [senderEmail, setSenderEmail] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [prompt, setPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const generateEmailBody = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setAiResponse(data.response);
    } catch (error) {
      console.error("Error generating AI response:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendEmail({ senderEmail, recipientEmail, message: aiResponse });
    alert("Email sent successfully!");
  };

  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center">
      <h1 className="uppercase font-[400] text-6xl mt-10">AI Email Sender</h1>
      <h2 className="uppercase font-normal text-xl mt-5">
        Your one-stop destination for sending emails using Groq AI!
      </h2>
      <form onSubmit={handleSubmit} className="w-3/5 flex flex-col">
        <Input
          className="w-full mt-6"
          placeholder="Enter your email address"
          value={senderEmail}
          onChange={(e) => setSenderEmail(e.target.value)}
          id="senderemail"
        />
        <Input
          className="w-full mt-6"
          placeholder="Enter recipient email address"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          id="recipientemail"
        />
        <Input
          className="w-full mt-6"
          placeholder="Enter prompt for AI-generated email"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          id="recipientemail"
        />
        <Button
          type="button"
          className="hover:cursor-pointer hover:text-black hover:bg-white p-3 text-xl bg-gray-600 text-white mt-4 rounded-xl"
          onClick={generateEmailBody}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate AI Email"}
        </Button>
        <textarea
          className="w-full min-h-screen mt-6 p-3 bg-gray-800 text-white rounded-md"
          rows={6}
          value={aiResponse}
          onChange={(e) => setAiResponse(e.target.value)}
          placeholder="AI-generated email will appear here..."
        />
        <Button
          type="submit"
          className="hover:cursor-pointer hover:text-black hover:bg-white mb-10 p-6 text-xl bg-white text-black mt-6 rounded-xl"
        >
          Send Email
        </Button>
      </form>
    </div>
  );
}
