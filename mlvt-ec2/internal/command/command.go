package command

import (
	"context"
	"fmt"
	"log"
	"mlvt-api/internal/python"
	"os"
	"os/exec"
	"strings"
	"time"
)

// ExecuteCommand runs a Python script with the given arguments.
func ExecuteCommand(pythonVersion python.PythonVersion, scriptPath string, args []string, timeout time.Duration) error {
	pythonExec := python.GetPythonExecutable(pythonVersion)

	// Prepare the command context with timeout.
	ctx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	cmdArgs := append([]string{scriptPath}, args...)

	// Log detailed command information
	log.Printf("Executing command:\n- Python: %s\n- Script: %s\n- Arguments: %s",
		pythonExec, scriptPath, strings.Join(cmdArgs[1:], ", "))

	cmd := exec.CommandContext(ctx, pythonExec, cmdArgs...)

	// Log working directory
	if wd, err := os.Getwd(); err == nil {
		log.Printf("Working directory: %s", wd)
	}

	// Execute the command.
	output, err := cmd.CombinedOutput()
	if err != nil {
		log.Printf("Command failed with output:\n%s", string(output))
		return fmt.Errorf("failed to execute command: %v, output: %s", err, string(output))
	}

	log.Printf("Command completed successfully with output:\n%s", string(output))
	return nil
}

// RunSTT executes the stt.py script.
func RunSTT(pythonVersion python.PythonVersion, scriptPath, inputFile, outputFile string) error {
	log.Printf("Running STT with:\n- Input: %s\n- Output: %s", inputFile, outputFile)
	args := []string{inputFile, outputFile}
	timeout := 5 * time.Minute // Adjust as needed.

	return ExecuteCommand(pythonVersion, scriptPath, args, timeout)
}

// RunTTS executes the tts.py script.
func RunTTS(pythonVersion python.PythonVersion, scriptPath, inputTextFile, inputAudioFile, targetLanguage, outputFile string) error {
	log.Printf("Running TTS with:\n- Input Text: %s\n- Input Audio: %s\n- Language: %s\n- Output: %s",
		inputTextFile, inputAudioFile, targetLanguage, outputFile)
	args := []string{inputTextFile, inputAudioFile, targetLanguage, outputFile}
	timeout := 5 * time.Minute // Adjust as needed.

	return ExecuteCommand(pythonVersion, scriptPath, args, timeout)
}

// RunTTT executes the ttt.py script.
func RunTTT(pythonVersion python.PythonVersion, scriptPath, inputFile, outputFile, sourceLang, targetLang string) error {
	log.Printf("Running TTT with:\n- Input: %s\n- Output: %s\n- Source Lang: %s\n- Target Lang: %s",
		inputFile, outputFile, sourceLang, targetLang)
	args := []string{inputFile, outputFile, sourceLang, targetLang}
	timeout := 5 * time.Minute // Adjust as needed.

	return ExecuteCommand(pythonVersion, scriptPath, args, timeout)
}

// RunLS executes the ls.py (lip-sync) script.
func RunLS(pythonVersion python.PythonVersion, scriptPath, inputVideoFile, inputAudioFile, outputFile string) error {
	log.Printf("Running LS with:\n- Input Video: %s\n- Input Audio: %s\n- Output: %s",
		inputVideoFile, inputAudioFile, outputFile)
	args := []string{inputVideoFile, inputAudioFile, outputFile}
	timeout := 25 * time.Minute // Adjust as needed.

	return ExecuteCommand(pythonVersion, scriptPath, args, timeout)
}
