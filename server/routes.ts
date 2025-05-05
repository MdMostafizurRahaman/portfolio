import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      
      // Validate input
      if (!name || !email || !subject || !message) {
        return res.status(400).json({ 
          message: "All fields are required" 
        });
      }
      
      // In a real application, this would send an email
      // For now, just log the message
      console.log(`Contact form submission from ${name} (${email}): ${subject}`);
      
      // Return success response
      return res.status(200).json({ 
        message: "Message received. Thank you for contacting me!" 
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      return res.status(500).json({ 
        message: "Failed to process your message. Please try again later." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
