package handler

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"mlvt-api/api/model"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

// TTSHandler handles the Text-to-Speech (TTS) processing requests synchronously.
func (h *Handler) TTSHandler(c *gin.Context) {
	var req model.TTSRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		log.Printf("Failed to bind JSON: %v", err)
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Log detailed request information
	reqJSON, _ := json.MarshalIndent(req, "", "  ")
	log.Printf("Incoming TTS request details:\n%s\n", string(reqJSON))

	// Generate a unique job ID
	jobID := uuid.New().String()
	startTime := time.Now()

	// Notify request received
	h.notifyRequest(c, "TTS", jobID)

	// Create a new job
	job := &model.Job{
		ID:        jobID,
		Type:      "tts",
		Request:   &req,
		Status:    "received",
		CreatedAt: time.Now().Format(time.RFC3339),
		UpdatedAt: time.Now().Format(time.RFC3339),
	}

	// Add job to the status store
	h.JobStore.AddJob(job)

	// Log job details before processing
	log.Printf("Job %s: Processing TTS request with:\n- Input Text: %s\n- Input Audio: %s\n- Language: %s\n- Output: %s\n- Model: %s",
		jobID, req.InputFileName, req.InputAudioFileName, req.Lang, req.OutputFileName, req.Model)

	// Try to enqueue the job with a timeout
	if !h.JobQueue.TryEnqueueWithTimeout(job, 30*time.Second) {
		// Failed to enqueue within timeout
		log.Printf("Job %s: Failed to enqueue - queue is full", jobID)
		h.JobStore.UpdateJob(jobID, "failed", "Server is too busy, please try again later", nil)
		c.JSON(http.StatusServiceUnavailable, gin.H{
			"message": "Server is too busy, please try again later",
			"job_id":  jobID,
			"status":  "failed",
		})
		return
	}

	// Wait for the job to be processed with a timeout
	select {
	case <-job.Done:
		processingTime := time.Since(startTime)
		// Job completed successfully
		if job.Status == "succeeded" {
			h.notifySuccess("TTS", job.ID, processingTime)
			c.JSON(http.StatusOK, gin.H{
				"message": "TTS processing completed",
				"job_id":  job.ID,
				"status":  job.Status,
				"result":  job.Result, // Include the result in the response if available
			})
		} else {
			// Job failed
			errorMsg := "Unknown error"
			if job.Error != "" {
				errorMsg = job.Error
			}
			h.notifyFailure("TTS", job.ID, errorMsg, processingTime)
			c.JSON(http.StatusInternalServerError, gin.H{
				"message": "TTS processing failed",
				"job_id":  job.ID,
				"status":  job.Status,
				"error":   job.Error,
			})
		}
	case <-time.After(5 * time.Minute):
		// Timeout after 5 minutes
		h.notifyTimeout("TTS", job.ID)
		c.JSON(http.StatusGatewayTimeout, gin.H{
			"message": "TTS processing timed out",
			"job_id":  job.ID,
			"status":  "timeout",
		})
		return
	}
}
