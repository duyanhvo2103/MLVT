package queue

import (
	"mlvt-api/api/model"
	"time"
)

// JobQueue represents a job queue.
type JobQueue struct {
	queue chan *model.Job
	wg    *WorkerGroup
}

// NewJobQueue initializes a new JobQueue with a specified buffer size.
func NewJobQueue(bufferSize int) *JobQueue {
	return &JobQueue{
		queue: make(chan *model.Job, bufferSize),
		wg:    NewWorkerGroup(),
	}
}

// Enqueue adds a job to the queue and initializes the Done channel.
func (jq *JobQueue) Enqueue(job *model.Job) {
	job.Done = make(chan struct{}) // Initialize the Done channel
	jq.queue <- job
}

// TryEnqueueWithTimeout attempts to enqueue a job with a timeout.
// Returns true if the job was enqueued successfully, false if it timed out.
func (jq *JobQueue) TryEnqueueWithTimeout(job *model.Job, timeout time.Duration) bool {
	job.Done = make(chan struct{}) // Initialize the Done channel
	select {
	case jq.queue <- job:
		return true
	case <-time.After(timeout):
		return false
	}
}

// StartWorkers starts the specified number of worker goroutines.
func (jq *JobQueue) StartWorkers(numWorkers int, store *model.JobStatusStore, callbackURL string) {
	for i := 0; i < numWorkers; i++ {
		jq.wg.AddWorker()
		worker := NewWorker(i, jq.queue, store, callbackURL, jq.wg)
		worker.Start()
	}
}

// Wait waits for all workers to finish.
func (jq *JobQueue) Wait() {
	jq.wg.Wait()
}

// Close gracefully shuts down the job queue by closing the queue channel.
func (jq *JobQueue) Close() {
	close(jq.queue)
}
